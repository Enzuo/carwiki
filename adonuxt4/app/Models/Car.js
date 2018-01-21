'use strict'

const Model = use('Model')
const CarRevision = use('App/Models/CarRevision')
const User = use('App/Models/User')
const moment = require('moment')

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

  async save (trx) {
    var user_id = this.user_id
    var after = this.isNew ? true : false
    if(!after){
      await updateRevision(this)
    }

    delete this.$attributes.user_id
    await super.save(trx)

    if(after){
      this.user_id = user_id
      await updateRevision(this)
    }
  }


  // getGearRatio (gearRatio) {
  //   console.log('before parse', gearRatio)
  //   let parsedRatios = JSON.parse(gearRatio)
  //   console.log('after parse', gearRatio)

  //   return JSON.parse(gearRatio, parsedRatios)
  // }
}

async function updateRevision(car){
  var lastRevision = await CarRevision.query()
    .where('car_id', car.id)
    .andWhere('updated_at', '>', moment().subtract(24, 'hours').format())
    .orderBy('updated_at', 'DESC')
    .first()
  var newRevisionData = car.toJSON()

  var user_id = car.user_id
  // car created or updated without using the api
  if(!user_id){
    var user = await User.first()
    user_id = user.id
    newRevisionData.user_id = user_id
  }
  delete newRevisionData.id
  newRevisionData.car_id = car.id

  if(lastRevision && lastRevision.user_id === user_id){
    lastRevision.merge(newRevisionData)
    await lastRevision.save()
    return
  }
  await CarRevision.create(newRevisionData)
  return
}

module.exports = Car
