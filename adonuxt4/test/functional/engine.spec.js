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


test('update engine', async ({ client }) => {
  var user = await Dataset.user()
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
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id : engine.id,
    name : 'test updated engine',
    profile : JSON.stringify(engine.profile),
  })
})
