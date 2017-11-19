'use strict'

const Engine = use('App/Models/Engine')

class EngineController {
  async index () {
    let engines = await Engine.all()
    return engines
  }

  async show ({params}) {
    let id = params.id
    let engine = await Engine.find(id)
    if(!engine){
      throw Error('no such engine')
    }
    return engine
  }
}

module.exports = EngineController
