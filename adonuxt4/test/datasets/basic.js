const User = use('App/Models/User')


async function user () {
  var user = await User.create({
    full_name: 'Darth Vader',
    email: 'darth_vader@starwars.com',
    password: 'darth-1234'
  })
  return user
}

function car () {

}

module.exports = { user, car }
