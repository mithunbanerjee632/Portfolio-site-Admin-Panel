<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Contact Page Routes
Route::get('/ContactList',[ContactController::class,'ContactList']);
Route::post('/ContactDelete',[ContactController::class,'ContactDelete']);






















Route::get('/', function () {
    return view('index');
});

Route::get('{AnyRoute}', function () {
    return view('index');
})->where('AnyRoute','.*');
