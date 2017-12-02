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

  var engines = await Engine.all()
  console.log('all engines', engines.toJSON())

  const response = await client.get('/api/engines').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name : 'test engine',
  }])
})
