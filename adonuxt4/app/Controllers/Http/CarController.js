'use strict'

const Car = use('App/Models/Car')
const {prepareTsQuery} = use('App/Helpers/sql')


class CarController {
  async index ({request}) {
    return Car.all('id', 'name')
  }

  async show ({params}) {
    let id = params.id
    let car = await Car.findOrFail(id)
    await car.load('engine')
    // let engine = await car.engine.fetch()
    return car
  }

  async update ({ params, request, auth }) {
    const data = request.only([
      'name',
      'gearRatio',
      'gearSpeed',
      'weight',
      'length',
      'width',
      'height',
    ])
    var user = await auth.getUser()
    data.user_id = user.id
    // TODO in Model engine_id
    data.engine_id = request.body.engine ? request.body.engine.id : undefined
    const car = await Car.findOrFail(params.id)

    car.merge(data)
    await car.save()
    await car.load('engine')
    return car
  }
}

module.exports = CarController
