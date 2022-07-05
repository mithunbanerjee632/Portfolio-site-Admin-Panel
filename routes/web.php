<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminLoginController;
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
Route::get('/CountSummary',[HomeController::class,'CountSummary']);


//Contact Page Routes
Route::get('/ContactList',[ContactController::class,'ContactList']);
Route::post('/ContactDelete',[ContactController::class,'ContactDelete']);

//Course Page Routes
Route::get('/CourseList',[CourseController::class,'CourseList']);
Route::post('/CourseDelete',[CourseController::class,'CourseDelete']);

//Project Page Routes
Route::get('/ProjectList',[ProjectController::class,'ProjectList']);
Route::post('/ProjectDelete',[ProjectController::class,'ProjectDelete']);

//Client Review Page Routes
Route::get('/ClientReviewList',[ReviewController::class,'ClientReviewList']);
Route::post('/ClientReviewDelete',[ReviewController::class,'ClientReviewDelete']);

//Service Page Routes
Route::get('/ServiceList',[ServiceController::class,'ServiceList']);
Route::post('/ServiceDelete',[ServiceController::class,'ServiceDelete']);

//Admin Login Page Routes
Route::get('/Login',[AdminLoginController::class,'LoginPage']);
//Route::get('/onLogin/{UserName}/{Password}',[AdminLoginController::class,'onLogin']);
Route::post('/onLogin',[AdminLoginController::class,'onLogin']);




















Route::get('/', function () {
    return view('index');
});

Route::get('{AnyRoute}', function () {
    return view('index');
})->where('AnyRoute','.*');
