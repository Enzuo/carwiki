'use strict'

/*
|--------------------------------------------------------------------------
| EngineSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Engine = use('App/Models/Engine')

const enginesSeedData = require('../seed-data/Engines')


const Factory = use('Factory')

class EngineSeeder {
  async run () {
    for (let engine of enginesSeedData) {
      engine.profile = engine.torque
      delete engine.torque
      await Engine.create(engine)
    }
  }
}

module.exports = EngineSeeder
