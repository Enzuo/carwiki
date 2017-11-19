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

}).prefix('api/v1')

Route.get('api/engine', 'EngineController.index')
Route.get('api/engine/:id([0-9]+)', 'EngineController.show')

Route.any('*', 'NuxtController.render')
