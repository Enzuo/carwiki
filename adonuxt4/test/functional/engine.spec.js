'use strict'

const { test, trait } = use('Test/Suite')('Engine')
const Engine = use('App/Models/Engine')
const Dataset = require('../datasets/basic')

trait('DatabaseTransactions')
trait('Auth/Client')
trait('Session/Client')
trait('Test/ApiClient')



test ('get list of engines', async ({ client }) => {
  await Engine.create({
    name : 'test engine',
    profile : [
      [1500,10],
      [3500,45]
    ]
  })

  const response = await client.get('/api/engines').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name : 'test engine',
  }])
})

test ('search engine', async ({ client, assert }) => {
  await Dataset.user()
  await Dataset.car()

  var response = await client.get('api/engines?search=petrol').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 1)
  response.assertJSONSubset([{
    id : 1,
    name : 'petrol engine 1.2 (75)',
  }])

  response = await client.get('api/engines?search=eng').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 2)
  response.assertJSONSubset([{
    id : 1,
    name : 'petrol engine 1.2 (75)',
  }])

  response = await client.get('api/engines?search=diesel').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 1)
  response.assertJSONSubset([{
    id : 2,
    name : 'diesel engine 1.6',
  }])

  response = await client.get('api/engines?search=1,2').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 1)
  response.assertJSONSubset([{
    id : 1,
    name : 'petrol engine 1.2 (75)',
  }])

  response = await client.get('api/engines?search=75').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 1)
  response.assertJSONSubset([{
    id : 1,
    name : 'petrol engine 1.2 (75)',
  }])

  response = await client.get('api/engines?search=(75)').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 1)
  response.assertJSONSubset([{
    id : 1,
    name : 'petrol engine 1.2 (75)',
  }])

  response = await client.get('api/engines?search=diesel engine').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 2)
  response.assertJSON([{
    id : 2,
    name : 'diesel engine 1.6',
  },{
    id : 1,
    name : 'petrol engine 1.2 (75)',
  }])

  response = await client.get('api/engines?search=petrol engine 1.2 (75)').end()
  response.assertStatus(200)
  assert.equal(response.body.length, 2)
  response.assertJSON([{
    id : 1,
    name : 'petrol engine 1.2 (75)',
  },{
    id : 2,
    name : 'diesel engine 1.6',
  }])

})


test('update engine', async ({ client }) => {
  var users = await Dataset.user()
  var engine = await Engine.create({
    name : 'test engine',
    profile : [
      [1500,10],
      [3500,45]
    ]
  })

  engine = engine.toJSON()
  engine.name = 'test updated engine'
  engine.profile = [
    [1500,10],
    [3200,45]
  ]

  const response = await client
    .put('/api/engines/'+engine.id)
    .send(engine)
    .loginVia(users[0])
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id : engine.id,
    name : 'test updated engine',
    profile : JSON.stringify(engine.profile),
  })
})

test('create engine', async({ client }) => {
  var users = await Dataset.user()
  var engine = {
    name : 'my new car',
    profile : [
      [1000, 35],
      [3000,100]
    ]
  }
  const response = await client
    .post('/api/engines/')
    .send(engine)
    .loginVia(users[0])
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id : 1,
    name : engine.name,
    profile : JSON.stringify(engine.profile),
  })
})
