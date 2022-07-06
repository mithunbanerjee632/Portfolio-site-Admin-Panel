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
Route::get('/CountSummary',[HomeController::class,'CountSummary'])->middleware('loginCheck');


//Contact Page Routes
Route::get('/ContactList',[ContactController::class,'ContactList'])->middleware('loginCheck');;
Route::post('/ContactDelete',[ContactController::class,'ContactDelete'])->middleware('loginCheck');;

//Course Page Routes
Route::get('/CourseList',[CourseController::class,'CourseList'])->middleware('loginCheck');;
Route::post('/CourseDelete',[CourseController::class,'CourseDelete'])->middleware('loginCheck');;

//Project Page Routes
Route::get('/ProjectList',[ProjectController::class,'ProjectList'])->middleware('loginCheck');
Route::post('/ProjectDelete',[ProjectController::class,'ProjectDelete'])->middleware('loginCheck');
Route::post('/AddProject',[ProjectController::class,'AddProject'])->middleware('loginCheck');

//Client Review Page Routes
Route::get('/ClientReviewList',[ReviewController::class,'ClientReviewList'])->middleware('loginCheck');
Route::post('/ClientReviewDelete',[ReviewController::class,'ClientReviewDelete'])->middleware('loginCheck');
Route::post('/AddReview',[ReviewController::class,'AddReview'])->middleware('loginCheck');

//Service Page Routes
Route::get('/ServiceList',[ServiceController::class,'ServiceList'])->middleware('loginCheck');
Route::post('/ServiceDelete',[ServiceController::class,'ServiceDelete'])->middleware('loginCheck');
Route::post('/AddService',[ServiceController::class,'AddService'])->middleware('loginCheck');

//Admin Login Page Routes
Route::get('/login',[AdminLoginController::class,'LoginPage']);
//Route::get('/onLogin/{UserName}/{Password}',[AdminLoginController::class,'onLogin']);
Route::post('/onLogin',[AdminLoginController::class,'onLogin']);
Route::get('/Logout',[AdminLoginController::class,'onLogout']);



















Route::get('/', function () {
    return view('index');
})->middleware('loginCheck');

Route::get('{AnyRoute}', function () {
    return view('index');
})->where('AnyRoute','.*')->middleware('loginCheck');
