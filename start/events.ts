import emitter from '@adonisjs/core/services/emitter'

emitter.on('slogan:vote', function (dt) {
    console.log(dt)
})