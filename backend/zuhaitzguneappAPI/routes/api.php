<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ArbolController;

Route::get('/arboles', [ArbolController::class, 'getAll'])->name('api_arboles.getAll');
Route::get('/arboles/all', [ArbolController::class, 'index'])->name('api_arboles.index');
Route::get('/arboles/{id}', [ArbolController::class, 'getIdArbol'])->name('api_arboles.getArbolId');
Route::post('/arboles/create', [ArbolController::class, 'createArbol'])->name('api_arboles.createArbol');
Route::put('/arboles/update/{id}', [ArbolController::class, 'updateArbol'])->name('api_arboles.updateArbol');
Route::delete('/arboles/delete/{id}', [ArbolController::class, 'deleteArbol'])->name('api_arboles.deleteArbol');