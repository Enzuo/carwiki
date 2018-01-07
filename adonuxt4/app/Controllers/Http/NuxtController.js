'use strict'

const NuxtService = use('App/Services/Nuxt')

class NuxtController {

  async render ({ request, response, auth, session }) {
    response.implicitEnd = false
    // console.log('auth', auth)
    // console.log('request.auth', session)
    // try {
    //   var authUser = await auth.getUser()
    // }
    // catch (e) {
    //   console.log('not logged in')
    // }
    try {
      var authUser = await auth.getUser()
      console.log(authUser.toJSON())
      request.request.authUser = authUser
    } catch (error) {
      console.log('You are not logged in')
    }
    // console.log('session.user', session.all())
    NuxtService.nuxt.render(request.request, response.response)
  }

}

module.exports = NuxtController
