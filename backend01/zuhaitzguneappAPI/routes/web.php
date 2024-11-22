<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
Route::get('/', function () {
    return view('welcome');
});
