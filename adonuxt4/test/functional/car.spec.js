'use strict'

const { test, trait } = use('Test/Suite')('Car')
const Car = use('App/Models/Car')

trait('DatabaseTransactions')
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


// test ('update car', async ({ client }) => {
//   const testCar = {
//     name : 'test car',
//     weight : 1587
//   }
//   var car = await Car.create(testCar)

//   car = car.toJSON()
//   car.name = 'test updated car'
//   car.weight = 2345

//   const response = await client.put('/api/cars/'+car.id).send(car).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     id : car.id,
//     name : car.name,
//     profile : car.profile,
//   })
// })
