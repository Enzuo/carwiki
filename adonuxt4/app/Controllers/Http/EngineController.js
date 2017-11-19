'use strict'

const Engine = use('App/Models/Engine')

class EngineController {
  async index () {
    let engines = await Engine.all()
    return engines
  }

  async show ({params}) {
    try {
      let engine = await Engine.find(params.id)
      return engine
    }
    catch (e) {
      console.log(e)
    }
  }
}

module.exports = EngineController
