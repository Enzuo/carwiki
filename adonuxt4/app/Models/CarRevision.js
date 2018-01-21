'use strict'

const Model = use('Model')

class CarRevision extends Model {

  setGearRatio (gearRatio) {
    return JSON.stringify(gearRatio)
  }
}

module.exports = CarRevision
