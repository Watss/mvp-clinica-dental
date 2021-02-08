<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::group(['prefix' => 'v1'], function () {

    //users
    Route::apiResource('users','Api\DentistController');
    //dentist
    Route::apiResource('dentists','Api\DentistController');
    Route::post('dentists/{id}','Api\DentistController@restore')->name('dentists.restore');


    //Patients crud
    Route::post('patients/{id}','Api\PatientsController@restore')->name('patients.restore');
    Route::apiResource('patients','Api\PatientsController');


    //schedules
    Route::apiResource('schedules','Api\ScheduleController');

    //items
    Route::apiResource('items','Api\ItemController');
    //categories
    Route::apiResource('categories','Api\CategoryController');

    //Appoinments
    Route::post('appoinments/{id}','Api\AppoinmentsController@restore')->name('appoinments.restore');
    Route::apiResource('appoinments','Api\AppoinmentsController');


});
