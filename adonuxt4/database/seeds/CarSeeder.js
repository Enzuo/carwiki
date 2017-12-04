'use strict'

/*
|--------------------------------------------------------------------------
| CarSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Car = use('App/Models/Car')

const carsSeedData = require('../seed-data/Cars')


const Factory = use('Factory')

class CarSeeder {
  async run () {
    for (let car of carsSeedData) {
      await Car.create(car)
    }
  }
}

module.exports = CarSeeder
