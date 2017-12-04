'use strict'

const Model = use('Model')

class Engine extends Model {
  static get visible () {
    return ['id', 'name', 'profile']
  }

  setProfile (profile) {
    return JSON.stringify(profile)
  }

  // getProfile (profile) {
  //   return JSON.parse(profile)
  // }
}

module.exports = Engine
