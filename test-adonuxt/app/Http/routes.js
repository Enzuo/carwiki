'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')


// Route.get('/api/engine/', 'EngineController.index')
Route.get('/api/engine/', (ctx) => {
  console.log('I am in the callback func')
  // ctx.request
  // ctx.response
  return 'gottcha'
})
Route.get('/api/engine/:id', 'EngineController.show')

// Route
// .resource('engine', 'EngineController')
// .apiOnly()
// .middleware(new Map([
//   ['auth'], ['engine.store', 'engine.update', 'engine.delete']
// ]))
// .formats(['json'])
// prefix('api')


// wildcard route (SPA http://adonisjs.com/docs/4.0/routing#_routing_for_spa_s)
// Route.any('*', 'NuxtController.render')
