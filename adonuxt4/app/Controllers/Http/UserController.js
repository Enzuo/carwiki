'use strict'

const User = use('App/Models/User')

class UserController {

  async index () {
    return await User.all()
  }

  async show ({ params }) {
    return await User.find(params.id)
  }

  async store ({ request }) {
    return await User.create(request.post())
  }

  async update ({ params, request }) {
    return await User
      .query()
      .where({ id: params.id })
      .update(request.post())
  }

  async destroy ({ params }) {
    return await User
      .query()
      .where({ id: params.id })
      .delete()
  }

  async login ({ request, auth, response }) {
    const { email, password } = request.all()

    // try {
    var user =  await auth.remember(true).attempt(email, password)
    console.log('auth', auth)
    // }
    // catch (e) {
    //   console.log(e)
    //   response.status = 401
    //   return 'Incorrect user'+e
    // }
    return user

    return 'Logged in successfully'
  }

  async logout ({ auth }) {
    await auth.logout()
  }

}

module.exports = UserController
