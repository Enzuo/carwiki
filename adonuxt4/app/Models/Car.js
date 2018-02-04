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
    // Weird bug here without that we loose a part of "this" when super.save is called...
    var that = super.save
    await saveRevision(this, CarRevision, 'car_id', async () => {
      await super.save(trx)
    })
  }


  // getGearRatio (gearRatio) {
  //   console.log('before parse', gearRatio)
  //   let parsedRatios = JSON.parse(gearRatio)
  //   console.log('after parse', gearRatio)

  //   return JSON.parse(gearRatio, parsedRatios)
  // }
}

/**
 * save the revision and call the item save,
 * the item is saved before in case of item creation
 * @param {*} item with user_id, isNew : adonis instance of a model
 * @param {Model} RevisionModel Adonis model handeling this kind of revision
 * @param {String} revisionKey the name of the revision column referencing the item
 * @param {Function} saveCallback item saving callback
 */
async function saveRevision(item, RevisionModel, revisionKey, saveCallback){
  // return await saveCallback()
  var user_id = item.user_id
  var after = item.isNew ? true : false
  if(!after){
    await updateOrCreateRevision(item, RevisionModel, revisionKey)
  }

  delete item.$attributes.user_id
  if(saveCallback){
    await saveCallback()
  }

  if(after){
    item.user_id = user_id
    await updateOrCreateRevision(item, RevisionModel, revisionKey)
  }
}

async function updateOrCreateRevision(item, RevisionModel, revisionKey){
  var lastRevision = await RevisionModel.query()
    .where(revisionKey, item.id)
    .andWhere('updated_at', '>', moment().subtract(24, 'hours').format())
    .orderBy('updated_at', 'DESC')
    .first()
  var newRevisionData = item.toJSON()

  var user_id = item.user_id
  // item created or updated without using the api
  if(!user_id){
    var user = await User.first()
    user_id = user.id
    newRevisionData.user_id = user_id
  }
  delete newRevisionData.id
  newRevisionData[revisionKey] = item.id

  if(lastRevision && lastRevision.user_id === user_id){
    lastRevision.merge(newRevisionData)
    await lastRevision.save()
    return
  }
  await RevisionModel.create(newRevisionData)
  return
}

module.exports = Car
