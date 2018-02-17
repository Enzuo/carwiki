const Database = use('Database')
const User = use('App/Models/User')
const Engine = use('App/Models/Engine')
const Car = use('App/Models/Car')


async function user () {
  var users = await User.createMany([{
    full_name: 'Darth Vader',
    email: 'darth_vader@starwars.com',
    password: 'darth-1234'
  },{
    full_name: 'Yoda',
    email: 'yoda@starwars.com',
    password: 'yoda-1234'
  }])
  return users
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
  var cars = await Car.createMany([{
    id : 1,
    name : 'clio 4',
    weight : 1055,
    engine_id : 1,
    gearRatio : [3, 2.2],
  },{
    id : 2,
    name : 'clio 4 diesel',
    weight : 1300,
    engine_id : 2,
  }])
  await Database.raw('ALTER SEQUENCE "cars_id_seq" RESTART WITH 3;')
  await Database.raw('ALTER SEQUENCE "engines_id_seq" RESTART WITH 3;')

  return cars
}

module.exports = { user, car }
