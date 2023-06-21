<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Middleware\ValidarJwt;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/* LOGIN */
Route::group([
   'middleware' => [],
   'prefix' => 'login'

], function ($router) {
   Route::post('/', 'App\Http\Controllers\Auth@login');
});

/* USUARIOS */
Route::group([
   'middleware' => [ValidarJwt::class],
   'prefix' => 'usuarios'

], function ($router) {
   Route::get('/ver', 'App\Http\Controllers\Usuarios@ver');
   Route::post('/crear', 'App\Http\Controllers\Usuarios@crear');
   Route::patch('/editar/{id}', 'App\Http\Controllers\Usuarios@editar');
   Route::delete('/eliminar/{id}', 'App\Http\Controllers\Usuarios@eliminar');
   Route::delete('/activar/{id}', 'App\Http\Controllers\Usuarios@activar');
   Route::patch('/password/{id}', 'App\Http\Controllers\Usuarios@password');
});

/* PROCESOS */
Route::group([
   'middleware' => [ValidarJwt::class],
   'prefix' => 'proceso'

], function ($router) {
   Route::get('/ver', 'App\Http\Controllers\Procesos@ver');
   Route::post('/crear', 'App\Http\Controllers\Procesos@crear');
   Route::patch('/editar/{id}', 'App\Http\Controllers\Procesos@editar');
   Route::delete('/eliminar/{id}', 'App\Http\Controllers\Procesos@eliminar');
});

/* TIPOS */
Route::group([
   'middleware' => [ValidarJwt::class],
   'prefix' => 'tipo'

], function ($router) {
   Route::get('/ver', 'App\Http\Controllers\Tipo@ver');
   Route::post('/crear', 'App\Http\Controllers\Tipo@crear');
   Route::patch('/editar/{id}', 'App\Http\Controllers\Tipo@editar');
   Route::delete('/eliminar/{id}', 'App\Http\Controllers\Tipo@eliminar');
});

/* DOCUMENTO */
Route::group([
   'middleware' => [ValidarJwt::class],
   'prefix' => 'documento'

], function ($router) {
   Route::get('/ver', 'App\Http\Controllers\Documento@ver');
   Route::post('/crear', 'App\Http\Controllers\Documento@crear');
   Route::patch('/editar/{id}', 'App\Http\Controllers\Documento@editar');
   Route::delete('/eliminar/{id}', 'App\Http\Controllers\Documento@eliminar');
});

