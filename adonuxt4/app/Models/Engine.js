'use strict'

const Model = use('Model')

class Engine extends Model {
  static get visible () {
    return ['id', 'name', 'profile']
  }

  setProfile (profile) {
    return JSON.stringify(profile)
  }
}

module.exports = Engine
