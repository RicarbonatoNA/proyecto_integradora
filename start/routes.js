'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
//rutas queserias
Route.group(() => {
//rutas login
  Route.post('/users/register', 'UserController.register')
  Route.post('/users/login', 'UserController.login')
  Route.get('/users/list', 'UserController.list')
  Route.get('/users/user', 'UserController.profile' )
  Route.put('/users/update', 'UserController.update' )
  
//rutas queseria
  Route.get('queseria/index', 'QueseriaController.index').middleware('auth');
  Route.post('queseria/create', 'QueseriaController.create').middleware('auth');
  Route.delete('queseria/delete/:_id', 'QueseriaController.destroy').middleware('auth');
  Route.patch('queseria/update/:id', 'QueseriaController.update').middleware('auth');
  Route.get('queseria/Queseria/:id', 'QueseriaController.Queseria').middleware('auth');

//rutas apartados
  Route.get('apartados/:_id/get', 'ApartadoController.get').middleware('auth');
  Route.post('apartados/:_id/create', 'ApartadoController.create').middleware('auth');
  Route.delete('apartados/:_id/destroy', 'ApartadoController.destroy').middleware('auth');
  Route.put('apartados/:_id/update', 'ApartadoController.update').middleware('auth');
  Route.get('apartado/:_id/get', 'ApartadoController.apartado').middleware('auth');

//rutas sensores
  Route.post('sensores/:_id/create', 'SensorController.create').middleware('auth');
  Route.get('sensores/:_id/get', 'SensorController.get').middleware('auth');
  Route.delete('sensores/:_id/destroy', 'SensorController.destroy').middleware('auth');
  Route.put('sensores/:_id/update', 'SensorController.update').middleware('auth');
  Route.get('sensores/:_id/get', 'SensorController.DatoSensor').middleware('auth');

  //rutas values
  Route.post('values/:_id/create', 'ValueController.Create').middleware('auth');
  Route.get('values/:_id/get', 'ValueController.get').middleware('auth');

}).prefix('api/v1/')

Route.resource('users', 'UserController')
.apiOnly()
.validator(new Map([
  [['users.store'], ['StoreUser']]
]))

