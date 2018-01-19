'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test ('get list of users', async ({ client }) => {
  await User.create({
    full_name: 'Liam Potter',
    email: 'test@test.com',
    password: 'Sup3rStr0ngPa55w0rd!'
  })

  const response = await client.get('/api/users').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    full_name: 'Liam Potter',
    email: 'test@test.com'
  }])
})
