'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.group(() => {

  Route
    .resource('users', 'UserController')
    .apiOnly()

  Route.post('login', 'UserController.login')
  Route.post('logout', 'UserController.logout')

  Route.resource('engines', 'EngineController')
  .middleware(new Map([
    [['engines.update'], ['auth']]
  ])).apiOnly()

  Route.resource('cars', 'CarController')
  .middleware(new Map([
    [['cars.update'], ['auth']]
  ])).apiOnly()

}).prefix('api')



Route.any('*', 'NuxtController.render')
