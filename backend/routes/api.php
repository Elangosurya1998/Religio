<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ReligioController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\ClientregistrationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\MemberdataController;
use App\Http\Controllers\HousecommunityController;
use App\Http\Controllers\IOSController;
use App\Http\Controllers\MobileappController;
use App\Http\Controllers\OnlinemeetController;
use App\Http\Controllers\OnsitemeetController;
use App\Http\Controllers\OurclientController;
use App\Http\Controllers\OurCustomerSayController;
use App\Http\Controllers\DatasupportController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\DomainrenewalController;


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

// Login & Registration

Route::post('/Register',[RegisterController::class,'Register']);
Route::post('/Login',[RegisterController::class,'Login']);


// Congregation
Route::post('/Religio/Congregation/store',[ReligioController::class, 'Congregation']);
Route::get('/Religio/Congregation',[ReligioController::class, 'CongregationList']);
Route::delete('/Religio/Congregation/{id}',[ReligioController::class, 'CongregationDelete']);
Route::get('/Religio/Congregationedit/{id}',[ReligioController::class, 'CongregationEdit']);
Route::put('/Religio/Congregationupdate/{id}',[ReligioController::class, 'Congregationupdate']);
Route::get('/Religio/CongrationAddress/get/{id}',[ReligioController::class, 'CongrationAddress']);
Route::get('/Religio/Congregationverifydelete/{id}',[ReligioController::class, 'Congregationverifydelete']);
Route::get('/Religio/Congregation/export',[ExportController::class, 'exportcongregationTable']);

// Province
Route::post('/Religio/Province/store',[ProvinceController::class, 'Provincestore']);
Route::delete('/Religio/Province/{id}',[ProvinceController::class, 'ProvinceDelete']);
Route::get('/Religio/Provinceverifydelete/{id}',[ProvinceController::class, 'Provinceverifydelete']);
Route::get('/Religio/Province',[ProvinceController::class, 'ProvinceList']);
Route::get('/Religio/Province/Congregation',[ProvinceController::class, 'ProvinceCongregation']);
Route::get('/Religio/Provinceedit/{id}',[ProvinceController::class, 'ProvinceEdit']);
Route::put('/Religio/Provinceupdate/{id}',[ProvinceController::class, 'Provinceupdate']);
Route::get('/Religio/Province/get/{id}',[ProvinceController::class, 'Provinceget']);
Route::get('/Religio/Province/export',[ExportController::class, 'exportprovinceTable']);


// ClientRegisteration
Route::post('/Religio/Clientregistration/store',[ClientregistrationController::class, 'Clientregistrationstore']);
Route::post('/Religio/Clientregistration/uploadfile',[ClientregistrationController::class, 'Clientregistrationuploadfile']);
Route::post('/Religio/Clientregistration/uploadfile/{id}',[ClientregistrationController::class, 'Clientregistrationuploadfileid']);
Route::get('/Religio/Clientregistration',[ClientregistrationController::class, 'ClientregistrationList']);
Route::delete('/Religio/Clientregistration/{id}',[ClientregistrationController::class, 'ClientregistrationDelete']);
Route::get('/Religio/Registeredit/{id}',[ClientregistrationController::class, 'ClientregistrationEdit']);
Route::put('/Religio/Clientregistrationupdate/{id}',[ClientregistrationController::class, 'Clientregistrationupdate']);
Route::get('/Religio/ProvinceAddress/get/{id}',[ClientregistrationController::class, 'ProvinceAddressget']);
Route::get('/Religio/CheckUniquecode/get/{id}',[ClientregistrationController::class, 'CheckUniquecode']);
Route::get('/Religio/Clients/get/{id}',[ClientregistrationController::class, 'Clients']);
Route::get('/Religio/Clientregistration/export',[ExportController::class, 'exportTable']);


// project status
Route::post('/projectstatuscreate', [ProjectsController::class,'projectstatus']);
Route::get('/projectstatus',[ProjectsController::class,'projectlist']);
Route::get('/projectstatusedit/{id}',[ProjectsController::class, 'projectEdit']);
Route::put('/projectstatusupdate/{id}',[ProjectsController::class, 'projectupdate']);
Route::delete('/projectstatusdelete/{id}',[ProjectsController::class, 'projectDelete']);

// dashboard
Route::get('/Dashboardlist',[ProjectsController::class, 'Dashboardlist']);
Route::get('/allDashboardlist/{id}',[ProjectsController::class, 'Dashboardall']);

// RegUsers
Route::get('/Religio/UsersList',[RegisterController::class, 'UsersList']);
Route::get('/Religio/UsersList/{id}',[RegisterController::class, 'UserEdit']);
Route::put('/Religio/Userupdate/{id}',[RegisterController::class, 'Userupdate']);
Route::delete('/Religio/UsersList/{id}',[RegisterController::class, 'UsersListDelete']);
Route::get('/Religio/Users/export',[ExportController::class, 'exportuserTable']);

//Payment status

Route::post('/Religio/Paymentstatus/store',[PaymentController::class, 'paymentstore']);
Route::post('/Religio/Paymentstatus/uploadfile',[PaymentController::class, 'paymentuploadfile']);
Route::post('/Religio/Paymentupdate/uploadfile/{id}',[PaymentController::class, 'updateuploadfile']);
Route::get('/Religio/Paymentlist',[PaymentController::class, 'Paymentlist']);
Route::get('/Religio/Paymentedit/{id}',[PaymentController::class, 'PaymentEdit']);
Route::put('/Religio/Payment/update/{id}',[PaymentController::class, 'PaymentUpdate']);
Route::delete('/Religio/Payment/delete/{id}',[PaymentController::class, 'PaymentDelete']);
Route::get('/Religio/PaymentAddress/get/{id}',[PaymentController::class, 'PaymentAddress']);
Route::get('/Religio/Payments/export',[ExportController::class, 'exportpaymentTable']);



//Home Section - OurClient

Route::post('/Religio/HomeSections/OurClient/Store',[OurclientController::class, 'store']);
Route::get('/Religio/HomeSections/OurClient/list',[OurclientController::class, 'index']);
Route::get('/Religio/HomeSections/OurClient/edit/{id}',[OurclientController::class, 'edit']);
Route::post('/Religio/HomeSections/OurClient/update/{id}',[OurclientController::class, 'update']);
Route::delete('/Religio/HomeSections/OurClient/delete/{id}',[OurclientController::class, 'destroy']);
Route::get('/Religio/HomeSections/OurClient/Export',[ExportController::class,'OurClientExport']);
//Home Section - OurClient

Route::post('/Religio/HomeSections/OurCustomerSay/Store',[OurCustomerSayController::class, 'store']);
Route::get('/Religio/HomeSections/OurCustomerSay/View/{id}',[OurCustomerSayController::class, 'show']);
Route::get('/Religio/HomeSections/OurCustomerSay/list',[OurCustomerSayController::class, 'index']);
Route::get('/Religio/HomeSections/OurCustomerSay/Edit/{id}',[OurCustomerSayController::class, 'edit']);
Route::put('/Religio/HomeSections/OurCustomerSay/Update/{id}',[OurCustomerSayController::class, 'update']);
Route::delete('/Religio/HomeSections/OurCustomerSay/delete/{id}',[OurCustomerSayController::class, 'destroy']);
Route::get('/Religio/HomeSections/OurCustomerSay/OurCustomerSayindex',[OurCustomerSayController::class, 'OurCustomerSayindex']);
Route::get('/Religio/HomeSections/OurCustomerSay/Export',[ExportController::class,'Ourcustomersayexport']);
//Home Section - domain

Route::post('/Religio/Domainrenewal/Store',[DomainrenewalController::class, 'store']);
Route::get('/Religio/Domainrenewal/list',[DomainrenewalController::class, 'index']);
Route::get('/Religio/Domainrenewal/edit/{id}',[DomainrenewalController::class, 'domainEdit']);
Route::put('/Religio/Domainrenewal/update/{id}',[DomainrenewalController::class, 'domainupdate']);
Route::delete('/Religio/Domainrenewal/delete/{id}',[DomainrenewalController::class, 'destroy']);
Route::get('/Religio/Domainrenewal/Export',[ExportController::class,'domainexport']);
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

Route::post('/upload',[OnlinemeetController::class, 'upload']);
Route::post('/onlineuploadid/{id}',[OnlinemeetController::class, 'onlineuploadid']);
Route::post('/onlinemeetstatuscreate', [OnlinemeetController::class,'onlinemeetstatus']);
Route::get('/onlinemeetstatus',[OnlinemeetController::class,'onlinemeetstatusList']);
Route::get('/onlinetatusedit/{id}',[OnlinemeetController::class, 'onlinetatusedit']);
Route::put('/onlinestatusupdate/{id}',[OnlinemeetController::class, 'onlinestatusupdate']);
Route::delete('/onlinestatusdelete/{id}',[OnlinemeetController::class, 'onlinestatusDelete']);

// Onsite meet
Route::post('/onsiteupload',[OnsitemeetController::class, 'onsiteupload']);
Route::post('/onsiteuploadid/{id}',[OnsitemeetController::class, 'onsiteuploadid']);
Route::post('/onsitemeetstatuscreate', [OnsitemeetController::class,'onsitemeetstatus']);
Route::get('/onsitemeetstatus',[OnsitemeetController::class,'onsitemeetstatusList']);
Route::get('/onsitestatusedit/{id}',[OnsitemeetController::class, 'onsitestatusedit']);
Route::put('/onsitestatusupdate/{id}',[OnsitemeetController::class, 'onsitestatusupdate']);
Route::delete('/onsitestatusdelete/{id}',[OnsitemeetController::class, 'onsitestatusDelete']);

// Data Support
Route::post('/Datasupportcreate',[DatasupportController::class,'datasupportcreate']);
Route::get('/Datasupport',[DatasupportController::class,'Datasupportshow']);
Route::get('/Datasupportedit/{id}',[DatasupportController::class, 'Datasupportedit']);
Route::put('/Datasupportupdate/{id}',[DatasupportController::class, 'Datasupportupdate']);
Route::delete('/Datasupportdelete/{id}',[DatasupportController::class, 'Datasupportdestroy']);

// Forget Password Routes
Route::post('/forgetpassword',[RegisterController::class, 'ForgetPassword']);
// Reset Password Routes
Route::post('/resetpassword',[RegisterController::class, 'ResetPassword']);
Route::get('/Religio/Projectexpire',[RegisterController::class, 'Projectexpire']);


// dashboard
Route::get('/Religio/ClientType/getBalance/{value}',[ProvinceController::class, 'GetBalance']);
Route::get('/Religio/ClientType/getBalance/selectall/{value}',[ProvinceController::class, 'GetBalanceall']);
Route::post('/Religio/financialyear/getBalance',[ProvinceController::class, 'financialyear']);
Route::post('/Religio/financialmonth/getBalance',[ProvinceController::class, 'financialmonth']);
Route::get('/Religio/ClientType/Getfinancialyears',[ProvinceController::class, 'GetFinancialyear']);

//notification filter
Route::get('/Religio/Balance/notification',[ReligioController::class, 'BalanceNotification']);
Route::get('/Religio/Outstanding/notification',[ReligioController::class, 'OutstandingNotification']);
Route::get('/Religio/AMC/Outstanding/{id}',[ReligioController::class, 'AMCOutstanding']);


Route::post('/send-email',[MailController::class, 'sendContactMail']);




