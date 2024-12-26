import Mfile from '#models/mfile';
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'
import transmit from '@adonisjs/transmit/services/main'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import { LoginValidate } from '#validators/login';
import User from '#models/user';
import hash from '@adonisjs/core/services/hash';
import Mvote from '#models/mvote';
import Mguest from '#models/mguest';
import MguestGroup from '#models/mguestgroup';
// const subscription = Trams.subscription('cvote')
export default class AppsController {
    async pageLogin({ inertia }: HttpContext) {
        return inertia.render('login')
    }
    async login({ request, auth, response, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(LoginValidate)
            const user = await User.verifyCredentials(payload.uid, payload.uid)
            await auth.use('web').login(user)
            session.flash('success', 'Logined')

            return response.redirect().toRoute('/vote')
        } catch (error) {
            switch (error.code) {
                case 'E_VALIDATION_ERROR':
                    session.flash('errors', { validate: error.messages })
                    response.redirect().back()
                default:
                    response.redirect().back()
            }
        }
    }
    async sloganList({ inertia }: HttpContext) {
        // const users = await User.all()
        const dd = [{ id: 1, title: 'STB', mid: '03024', vote_count: 1213 }]

        await emitter.once('slogan:vote', function (user) {
            var foundIndex = dd.findIndex(x => x.id == user?.slid);
            dd[foundIndex] = { id: user?.slid, title: 'STB', mid: '03024', vote_count: dd[foundIndex].vote_count + 1 }

        })
        const ad = await dd;
        console.log(ad)
        return inertia.render('slogan/index', { data: ad })
    }

    async sloganVote({ request, auth, response }: HttpContext) {
        await auth.authenticate()
        const { iid, vote } = request.all()
        let uaut = auth?.user.uid
        const rs = await Mvote.create({ img_name: iid, whovote: uaut, vote: vote })
        transmit.broadcast('cvote', { fid: rs })
        return response.redirect().back()
    }
    async vlist({ request, auth, inertia }: HttpContext) {

        // await subscription.create()
        const res = []
        const files = await Mfile.query().withAggregate('votes', (query) => {
            query.sum('vote').as('voteSum')
        })
        files.forEach((t) => {
            res.push(Object.assign(t.$original, { cov: t.$extras.voteSum }, t.$preloaded))
        })

        // subscription.onMessage((t) => {
        //     console.log(t)
        // })
        return inertia.render('vlist', { data: res })
    }
    async dashboard({ request, auth, inertia }: HttpContext) {
        const files = await Mfile.query()
        return inertia.render('dashboard', { data: files })
    }
    async sloganVoteu({ request, auth, inertia }: HttpContext) {
        // const users = await User.all()
        await auth.authenticate()
        const res = [];
        const rv = await Mfile.query().withCount('votes', (q) => {
            q.as('voteCount')
        }).preload('votes', (q) => {
            q.where('whovote', auth?.user?.uid)
        })
        rv.forEach((t) => {
            res.push(Object.assign(t.$original, { cov: t.$extras.voteCount }, t.$preloaded))
        })
        return inertia.render('vote', { data: res })
    }

    async getFileList({ request, auth, inertia }: HttpContext) {
        const files = await Mfile.query()
        return inertia.render('filelist', { data: files })
    }
    async fileStore({ request, response }: HttpContext) {
        const payload = request.input('payloads')
        const rs = await Mfile.createMany(payload)
        return response.status(200).json(rs)
    }
    async uploadfiletmp({ request, response }: HttpContext) {
        const files = request.files('files', {
            extnames: ['jpg', 'png', 'jpeg']
        })
        const ufile = [];
        for (let f of files) {

            let iid = cuid()
            let name = `${cuid()}.${f.extname}`
            ufile.push({ filename: name, iid })
            await f.move(app.makePath('tmp'), {
                name
            })
        }
        return response.status(200).json(ufile)
    }
    async uploadfile({ request, auth, inertia }: HttpContext) {
        return inertia.render('fileupload')
    }


    async getQuest({ inertia }: HttpContext) {
        return inertia.render('invite', { data: '' })
    }

    async getGuests({ request, inertia }: HttpContext) {
        const { q } = request.all()
        let rs
        if (q && q != '') {
            rs = await Mguest.query().preload('orgs').where('fullname', 'like', `%${q}%`)
        } else {
            rs = await Mguest.query().preload('orgs')
        }
        const rsg = await MguestGroup.query()

        return inertia.render('quests', { data: rs, datGroup: rsg })
    }

    async guest_enter({ request, response }: HttpContext) {
        const { id, enter } = request.all()
        const g = await Mguest.findOrFail(id)
        g.enter = enter
        g.save()
        return response.redirect('/quests?q=')
    }

}