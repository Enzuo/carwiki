'use strict'

const { test, trait } = use('Test/Suite')('Car')
const Car = use('App/Models/Car')
const CarRevision = use('App/Models/CarRevision')
const Database = use('Database')
const Dataset = require('../datasets/basic')
const moment = require('moment')

trait('DatabaseTransactions')
trait('Auth/Client')
trait('Session/Client')
trait('Test/ApiClient')


test ('get list of cars', async ({ client }) => {
  await Dataset.user()
  const testCar = {
    name : 'test car',
    weight : 1587,
    gearRatio : [4, 3.3, 2.1, 1, 0.75],
  }
  await Car.create(testCar)

  const response = await client.get('/api/cars').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    id : 1,
    name : 'test car'
  }])
})

test ('get details of a car', async ({ client }) => {
  await Dataset.user()
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
  var users = await Dataset.user()
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

  const response = await client.put('/api/cars/'+car.id).send(updatedCar).loginVia(users[0]).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id : car.id,
    name : updatedCar.name,
    engine : updatedCar.engine,
  })
})

test('create a new car', async ({ client }) => {
  var users = await Dataset.user()
  await Dataset.car()
  var car = {
    name : 'test car',
    weight : 1587,
    engine : { id :1 },
  }

  const response = await client
    .post('/api/cars/')
    .send(car)
    .loginVia(users[0])
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id : 3,
    name : car.name,
    engine : car.engine,
  })
})


  test('update car revision (less than 24hours)',  async ({ client, assert }) => {
    var users = await Dataset.user()
    var cars = await Dataset.car()
    var car = cars[0].toJSON()
    car.name = 'update car diesel'

    var response = await client.put('/api/cars/'+car.id).send(car).loginVia(users[0]).end()
    response.assertStatus(200)

    var revisions = await CarRevision.query().where('car_id', car.id).fetch()
    revisions = revisions.toJSON()
    assert.equal(revisions.length, 1)
    assert.equal(revisions[0].car_id, car.id)
    assert.equal(revisions[0].name, car.name)
  })

  test('create a new car revision (last revision more than 24hours)',  async ({ client, assert }) => {
    var users = await Dataset.user()
    var cars = await Dataset.car()
    var car = cars[0].toJSON()
    car.name = 'update car diesel'
    car.gearRatio = [3.1, 2.5]

    // Make previous(base) revision older than 24 hours
    // Use _globalTrx to be sure to do the update in the same transaction as the dataset creation
    var revisionOlder = await CarRevision.query().db._globalTrx.raw('UPDATE car_revisions SET updated_at = ? WHERE car_id = ? returning *',
      [moment().subtract(25,'hours').format(), car.id])
    assert.equal(revisionOlder.rowCount, 1, 'couldnt make revision older')

    var response = await client.put('/api/cars/'+car.id).send(car).loginVia(users[0]).end()
    response.assertStatus(200)

    var revisions = await CarRevision.query().where('car_id', car.id).fetch()
    revisions = revisions.toJSON()
    assert.equal(revisions.length, 2, '2 versions')
    assert.equal(revisions[0].car_id, car.id)
    assert.equal(revisions[0].name, 'clio 4')
    assert.equal(revisions[0].user_id, users[0].id)
    assert.equal(revisions[1].car_id, car.id)
    assert.equal(revisions[1].name, car.name)
    assert.equal(revisions[1].gearRatio, JSON.stringify(car.gearRatio))
    assert.equal(revisions[1].user_id, users[0].id)
  })

  test('create a new car revision when another user update',  async ({ client, assert }) => {
    var users = await Dataset.user()
    var cars = await Dataset.car()
    var car = cars[0].toJSON()
    car.name = 'update car diesel'

    var response = await client.put('/api/cars/'+car.id).send(car).loginVia(users[1]).end()
    response.assertStatus(200)

    var revisions = await CarRevision.query().where('car_id', car.id).fetch()
    revisions = revisions.toJSON()
    assert.equal(revisions.length, 2)
    assert.equal(revisions[0].car_id, car.id)
    assert.equal(revisions[0].name, 'clio 4')
    assert.equal(revisions[0].user_id, users[0].id)
    assert.equal(revisions[1].car_id, car.id)
    assert.equal(revisions[1].name, car.name)
    assert.equal(revisions[1].user_id, users[1].id)
  })

  // test('merge revisions',  async ({ client, assert }) => {
  //   var users = await Dataset.user()
  //   var car = await Dataset.car()
  //   car = car.toJSON()
  //   car.name = 'update car diesel'

  //   await client.put('/api/cars/'+car.id).send(car).loginVia(users[0]).end()

  //   var revisions = await CarRevision.query().where('car_id', car.id).fetch()
  //   revisions = revisions.toJSON()
  //   assert.equal(revisions.length, 1)
  //   assert.equal(revisions[0].car_id, car.id)
  //   assert.equal(revisions[0].name, car.name)
  // })

// })
