<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ArbolController;
use App\Http\Controllers\TareasController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\UsersController;

Route::get('/arboles', [ArbolController::class, 'getAll'])->name('api_arboles.getAll');
Route::get('/arboles/all', [ArbolController::class, 'index'])->name('api_arboles.index');
Route::get('/arboles/barrios', [ArbolController::class, 'getArbolesBarrios'])->name('api_arboles.getArbolesBarrios');
Route::get('/arboles/{id}', [ArbolController::class, 'getIdArbol'])->name('api_arboles.getArbolId');
Route::post('/arboles/create', [ArbolController::class, 'createArbol'])->name('api_arboles.createArbol');
Route::put('/arboles/update/{id}', [ArbolController::class, 'updateArbol'])->name('api_arboles.updateArbol');
Route::delete('/arboles/delete/{id}', [ArbolController::class, 'deleteArbol'])->name('api_arboles.deleteArbol');




Route::get('/tarea', [TareasController::class, 'getTareaArbol'])->name('api_arboles.tarea');
Route::put('/tarea/update/{id}', [TareasController::class, 'updateTarea'])->name('api_arboles.updateTarea');
Route::get('/tarea/filtrar/{campo}/{valor}', [TareasController::class, 'getTareaFiltro']);
Route::get('/tarea/{id}', [TareasController::class, 'getTareaId'])->name('api_arboles.tareaId');


// Imagenes

Route::post('/upload-imagen', [ImageController::class, 'store']);
Route::get('/obtener-imagen', [ImageController::class, 'getImageAsBase64']);
Route::delete('/delete-imagen/{nombre}', [ImageController::class, 'deleteFoto']);
Route::get('/foto/{foto}', [ImageController::class, 'getFoto']);

//Usuarios

Route::get('/users', [UsersController::class, 'getAllUsers'])->name('api_users.getAllUsers');
Route::get('/user/{id}', [UsersController::class, 'getUserbyId'])->name('api_users.getUserById');
Route::post('/user/createUser', [UsersController::class, 'createUser'])->name('api_users.createUser');
Route::put('/user/updateUser/{id}', [UsersController::class, 'updateUser'])->name('api_users.updateUsername');
Route::delete('/user/deleteUser/{id}', [UsersController::class, 'deleteUser'])->name('api_users.deleteUser');
Route::post('/user/login', [UsersController::class, 'login'])->name('api_users.login');