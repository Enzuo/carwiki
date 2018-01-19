'use strict'

const { test, trait } = use('Test/Suite')('Car')
const Car = use('App/Models/Car')
const Dataset = require('../datasets/basic')

trait('DatabaseTransactions')
trait('Auth/Client')
trait('Session/Client')
trait('Test/ApiClient')


test ('get list of cars', async ({ client }) => {
  const testCar = {
    name : 'test car',
    weight : 1587,
    gearRatio : [4, 3.3, 2.1, 1, 0.75],
  }
  await Car.create(testCar)

  const response = await client.get('/api/cars').end()

  response.assertStatus(200)
  response.assertJSONSubset([testCar])
})

test ('get details of a car', async ({ client }) => {
  const testCar = {
    name : 'test car',
    weight : 1587,
    gearRatio : [4, 3.3, 2.1, 1, 0.75],
  }
  var car = await Car.create(testCar)

  const response = await client.get('/api/cars/'+car.id).end()

  response.assertStatus(200)
  response.assertJSONSubset(testCar)
})


test('update car and change its engine', async ({ client }) => {
  var user = await Dataset.user()
  await Dataset.car()
  var car = await Car.create({
    name : 'test car',
    weight : 1587,
    engine_id : 1,
  })

  car = car.toJSON()

  var updatedCar = {
    id : car.id,
    name : 'test updated car',
    weight : 2345,
    engine : {
      id : 2,
    }
  }

  const response = await client.put('/api/cars/'+car.id).send(updatedCar).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id : car.id,
    name : updatedCar.name,
    engine : updatedCar.engine,
  })
})
