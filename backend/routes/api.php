<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ReligioController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\ClientregistrationController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\MemberdataController;
use App\Http\Controllers\HousecommunityController;
use App\Http\Controllers\IOSController;
use App\Http\Controllers\MobileappController;
use App\Http\Controllers\OnlinemeetController;
use App\Http\Controllers\OnsitemeetController;

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

Route::post('/Register',[RegisterController::class,'Register']);
Route::post('/Login',[RegisterController::class,'Login']);

// Congregation
Route::post('/Religio/Congregation/store',[ReligioController::class, 'Congregation']);
Route::get('/Religio/Congregation',[ReligioController::class, 'CongregationList']);
Route::delete('/Religio/Congregation/{id}',[ReligioController::class, 'CongregationDelete']);
Route::get('/Religio/Congregationedit/{id}',[ReligioController::class, 'CongregationEdit']);
Route::put('/Religio/Congregationupdate/{id}',[ReligioController::class, 'Congregationupdate']);

// Province
Route::post('/Religio/Province/store',[ProvinceController::class, 'Provincestore']);
Route::delete('/Religio/Province/{id}',[ProvinceController::class, 'ProvinceDelete']);
Route::get('/Religio/Province',[ProvinceController::class, 'ProvinceList']);
Route::get('/Religio/Province/Congregation',[ProvinceController::class, 'ProvinceCongregation']);
Route::get('/Religio/Provinceedit/{id}',[ProvinceController::class, 'ProvinceEdit']);
Route::put('/Religio/Provinceupdate/{id}',[ProvinceController::class, 'Provinceupdate']);
Route::get('/Religio/Province/get/{id}',[ProvinceController::class, 'Provinceget']);


// ClientRegisteration
Route::post('/Religio/Clientregistration/store',[ClientregistrationController::class, 'Clientregistrationstore']);
Route::post('/Religio/Clientregistration/uploadfile',[ClientregistrationController::class, 'Clientregistrationuploadfile']);
Route::post('/Religio/Clientregistration/uploadfile/{id}',[ClientregistrationController::class, 'Clientregistrationuploadfileid']);
Route::get('/Religio/Clientregistration',[ClientregistrationController::class, 'ClientregistrationList']);
Route::delete('/Religio/Clientregistration/{id}',[ClientregistrationController::class, 'ClientregistrationDelete']);
Route::get('/Religio/Registeredit/{id}',[ClientregistrationController::class, 'ClientregistrationEdit']);
Route::put('/Religio/Clientregistrationupdate/{id}',[ClientregistrationController::class, 'Clientregistrationupdate']);

// project status
Route::post('/projectstatuscreate', [ProjectsController::class,'projectstatus']);
Route::get('/projectstatus',[ProjectsController::class,'projectlist']);
Route::get('/projectstatusedit/{id}',[ProjectsController::class, 'projectEdit']);
Route::put('/projectstatusupdate/{id}',[ProjectsController::class, 'projectupdate']);
Route::delete('/projectstatusdelete/{id}',[ProjectsController::class, 'projectDelete']);

// hoese and community status
Route::post('housecommunitycreate', [HousecommunityController::class,'housecommunitycreate']);
Route::get('/housecommunity',[HousecommunityController::class,'housecommunityList']);
Route::get('/housecommunityedit/{id}',[HousecommunityController::class, 'housecommunityEdit']);
Route::put('/housecommunityupdate/{id}',[HousecommunityController::class, 'housecommunityUpdate']);
Route::delete('/housecommunitydelete/{id}',[HousecommunityController::class, 'housecommunityDelete']);


// member data status
Route::post('/memberdatacreate', [MemberdataController::class,'memberdatacreate']);
Route::get('/memberdata',[MemberdataController::class,'memberdataList']);
Route::get('/memberdataedit/{id}',[MemberdataController::class, 'memberdataEdit']);
Route::put('/memberdataupdate/{id}',[MemberdataController::class, 'memberdataUpdate']);
Route::delete('/memberdatadelete/{id}',[MemberdataController::class, 'memberdataDelete']);

// IOS status
Route::post('ioscreate', [IOSController::class,'ioscreate']);
Route::get('/ios',[IOSController::class,'iosList']);
Route::get('/iosedit/{id}',[IOSController::class, 'iosEdit']);
Route::put('/iosupdate/{id}',[IOSController::class, 'iosUpdate']);
Route::delete('/iosdelete/{id}',[IOSController::class, 'iosDelete']);

// Mobileapp status
Route::post('mobileappcreate', [MobileappController::class,'mobileappcreate']);
Route::get('/mobileapp',[MobileappController::class,'mobileappList']);
Route::get('/mobileappedit/{id}',[MobileappController::class, 'mobileappEdit']);
Route::put('/mobileappupdate/{id}',[MobileappController::class, 'mobileappUpdate']);
Route::delete('/mobileappdelete/{id}',[MobileappController::class, 'mobileappDelete']);


// Online meet
Route::post('/onlinestatusupload/uploadfile',[OnlinemeetController::class, 'onlinestatusupload']);
Route::post('/onlineuploadupdateid/uploadfile/{id}',[OnlinemeetController::class, 'onlineuploadupdateid']);
Route::put('/onlineuploadupdateid/{id}',[OnlinemeetController::class, 'onlineuploadupdateid']);
Route::post('/onlinemeetstatuscreate', [OnlinemeetController::class,'onlinemeetstatus']);
Route::get('/onlinemeetstatus',[OnlinemeetController::class,'onlinemeetstatusList']);
Route::get('/onlinetatusedit/{id}',[OnlinemeetController::class, 'onlinetatusedit']);
Route::put('/onlinestatusupdate/{id}',[OnlinemeetController::class, 'onlinestatusupdate']);
Route::delete('/onlinestatusdelete/{id}',[OnlinemeetController::class, 'onlinestatusDelete']);

// Onsite meet
Route::post('/onsitestatusupload/uploadfile',[OnsitemeetController::class, 'onsitestatusupload']);
Route::post('/onsiteuploadupdateid/uploadfile/{id}',[OnsitemeetController::class, 'onsiteuploadupdateid']);
Route::put('/onsiteuploadupdateid/{id}',[OnsitemeetController::class, 'onsiteuploadupdateid']);
Route::post('/onsitemeetstatuscreate', [OnsitemeetController::class,'onsitemeetstatus']);
Route::get('/onsitemeetstatus',[OnsitemeetController::class,'onsitemeetstatusList']);
Route::get('/onsitestatusedit/{id}',[OnsitemeetController::class, 'onsitestatusedit']);
Route::put('/onsitestatusupdate/{id}',[OnsitemeetController::class, 'onsitestatusupdate']);
Route::delete('/onsitestatusdelete/{id}',[OnsitemeetController::class, 'onsitestatusDelete']);
