'use strict'

const Model = use('Model')
const gravatar = require('gravatar');


class User extends Model {

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  static get hidden () {
    return ['password']
  }

  static get computed () {
    return ['avatar']
  }

  getAvatar () {
    let avatar = gravatar.url(this.email)
    return avatar
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

}

module.exports = User
