const CarRevision = use('App/Models/CarRevision')
const User = use('App/Models/User')
const moment = require('moment')


const CarHook = {

  /**
   * store a car version
   */
  carRevision: async (car) => {
    console.log('carRevision for car id : ', car.id)
    var lastRevision = await CarRevision.query()
      .where('car_id', car.id)
      .andWhere('updated_at', '>', moment().subtract(24, 'hours').format())
      .orderBy('updated_at', 'DESC')
      .first()
    var newRevisionData = car.toJSON()
    var user = await User.first()
    var user_id = user.id
    delete newRevisionData.id
    newRevisionData.car_id = car.id
    newRevisionData.user_id = user_id
    if(lastRevision && lastRevision.user_id === user_id){
      lastRevision.merge(newRevisionData)
      await lastRevision.save()
      return
    }
    CarRevision.create(newRevisionData)
  }

}

module.exports = CarHook
