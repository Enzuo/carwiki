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
const Database = use('Database')
const Engine = use('App/Models/Engine')
const Car = use('App/Models/Car')

const enginesSeedData = require('../seed-data/Engines')
const carsSeedData = require('../seed-data/Cars')


const Factory = use('Factory')

class EngineSeeder {
  async run () {
    try {
      await Database.raw('truncate "cars", "engines" restart identity')
      // await Database.truncate('engines')

      var engines = []
      for (let engineData of enginesSeedData) {
        engineData.profile = engineData.torque
        delete engineData.torque
        engines.push(Engine.create(engineData))
      }
      await Promise.all(engines)

      var cars = []
      for (let carData of carsSeedData) {
        cars.push(Car.create(carData))
      }
      await Promise.all(cars)
    }
    catch(err){
      Database.close()
      throw(err)
    }
    Database.close()
  }
}

module.exports = EngineSeeder
