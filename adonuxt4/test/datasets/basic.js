const User = use('App/Models/User')
const Engine = use('App/Models/Engine')
const Car = use('App/Models/Car')


async function user () {
  var user = await User.create({
    full_name: 'Darth Vader',
    email: 'darth_vader@starwars.com',
    password: 'darth-1234'
  })
  return user
}

async function car () {
  var engine1 = await Engine.create({
    id : 1,
    name : 'petrol engine 1.2 (75)',
    profile : [
      [1500,67],
      [6000,92]
    ]
  })
  var engine2 = await Engine.create({
    id : 2,
    name : 'diesel engine 1.6',
    profile : [
      [1500,180],
      [4000,130]
    ]
  })
  await Car.create({
    name : 'clio 4',
    weight : 1055,
    engine_id : 1
  })
  await Car.create({
    name : 'clio 4 diesel',
    weight : 1300,
    engine_id : 2,
  })
}

module.exports = { user, car }
