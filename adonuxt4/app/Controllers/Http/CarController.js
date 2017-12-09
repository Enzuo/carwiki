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

  async update ({ params, request }) {
    const data = request.only([
      'name',
      'gearRatio',
      'gearSpeed',
      'weight',
      'length',
      'width',
      'height',
      'engine_id',
    ])
    const car = await Car.findOrFail(params.id)
    car.merge(data)
    await car.save()
    return car.toJSON()
  }
}

module.exports = CarController
