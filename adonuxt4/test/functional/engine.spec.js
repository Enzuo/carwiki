'use strict'

const { test, trait } = use('Test/Suite')('Engine')
const Engine = use('App/Models/Engine')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test ('get list of engines', async ({ client }) => {
  await Engine.create({
    name : 'test engine',
    profile : JSON.stringify([
      [1500,10],
      [3500,45]
    ])
  })

  const response = await client.get('/api/engines').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name : 'test engine',
  }])
})


test ('update engine', async ({ client }) => {
  var engine = await Engine.create({
    name : 'test engine',
    profile : JSON.stringify([
      [1500,10],
      [3500,45]
    ])
  })

  engine = engine.toJSON()
  engine.name = 'test updated engine'

  const response = await client.put('/api/engines/'+engine.id).send(engine).end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    id : engine.id,
    name : 'test updated engine',
    profile : JSON.parse(engine.profile),
  }])
})
