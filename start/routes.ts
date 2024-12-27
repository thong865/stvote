/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'
import transmit from '@adonisjs/transmit/services/main'
import { middleware } from '#start/kernel'

const AppsController = () => import('#controllers/apps_controller')
import router from '@adonisjs/core/services/router'
const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

transmit.registerRoutes()
router.get('/dashboard', [AppsController, 'dashboard'])
router.get('/list', [AppsController, 'vlist'])
router.get('/login', [AppsController, 'pageLogin'])
router.post('/login', [AppsController, 'login'])
router.get('/slogan', [AppsController, 'sloganList'])
router.get('/vote', [AppsController, 'sloganVoteu']).use(middleware.auth({
    guards: ['web']
}))
router.get('/filelist', [AppsController, 'getFileList'])
router.get('/fileupload', [AppsController, 'uploadfile'])
router.post('/fileStore', [AppsController, 'fileStore'])
router.post('/fileuploadtmp', [AppsController, 'uploadfiletmp'])
router.put('/api/slogan_vote', [AppsController, 'sloganVote']).use(middleware.auth({
    guards: ['web', 'api']
}))

router.get('/invite', [AppsController, 'getQuest'])
router.get('/', [AppsController, 'getGuests'])
router.get('/quests', [AppsController, 'getGuests'])
router.get('/questsTable', [AppsController, 'questsTable'])
router.post('/api/guest_enter', [AppsController, 'guest_enter'])
router.post('/api/guest_leave', [AppsController, 'guest_leave'])


router.get('/uploads/*', ({ request, response }) => {
    const filePath = request.param('*').join(sep)
    const normalizedPath = normalize(filePath)

    let absolutePath;
    if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
        return response.badRequest('Malformed path')
    }
    if (request.input('tmp') == 1) {
        absolutePath = app.makePath('tmp', normalizedPath)
    } else {
        absolutePath = app.makePath('uploads', normalizedPath)
    }


    return response.download(absolutePath)
})
