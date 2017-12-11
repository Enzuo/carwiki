'use strict'

const Model = use('Model')

class Car extends Model {
  engine () {
    return this.belongsTo('App/Models/Engine')
  }

  setGearRatio (gearRatio) {
    return JSON.stringify(gearRatio)
  }

  static get dates () {
    return super.dates.concat(['fromProductionDate','toProductionDate'])
  }

  // getGearRatio (gearRatio) {
  //   console.log('before parse', gearRatio)
  //   let parsedRatios = JSON.parse(gearRatio)
  //   console.log('after parse', gearRatio)

  //   return JSON.parse(gearRatio, parsedRatios)
  // }
}

module.exports = Car
