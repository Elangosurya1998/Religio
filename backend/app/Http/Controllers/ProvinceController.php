<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Congregation;
use App\Models\Payment;
use App\Models\Province;
use App\Models\Clientregistration;
use Illuminate\Support\Facades\Validator;
use DB;
use Carbon\Carbon;

class ProvinceController extends Controller
{ 
        Private $status = 200;
       
        public function Provincestore(Request $request)
        {
           
            $validator    =  Validator::make($request->all(), 
            [
                "congregation" => 'required',
                "province"   => "required",
                "address1"  => "required",
                "state"  => "required",
                "postcode"=> "required",
                "city"  => "required",
                "country"  => "required",
                "mobile"  => "required",
                "email"  => "required",
            ]
           );
                if($validator->fails()) {
                    return response()->json(["status" => "failed", 
                                    "validation_errors" => $validator->errors()]);
                }
                 $ProvinceArray['params'] = array(
                                "congregation" => $request->congregation,
                                "province" => $request->province,
                                "address1" => $request->address1,
                                "state" => $request->state,
                                "address2" => $request->address2,
                                "postcode"   => $request->postcode, 
                                "city"   => $request->city, 
                                "country"   => $request->country, 
                                "mobile"   => $request->mobile, 
                                "email"   => $request->email, 
                                "contactname"   => $request->contactname, 
                                "contactrole"   => $request->contactrole, 
                                "contactemail"   => $request->contactemail, 
                                "contactmobile"   => $request->contactmobile, 
                                "contactstatus"   => $request->contactstatus, 
                         );
    
                $Province  = Province::create($ProvinceArray['params']);
    
                if(!is_null($Province)){ 
    
                    return response()->json(["status" => $this->status, "success" => true, 
                            "message" => "Province created successfully", "data" => $Province]);
                }    
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
            }      
        }
    
        // list value
    
        public function ProvinceList() {
    
            $ProvinceAll = DB::table('provinces as pr')
            ->select('pr.*','co.congregation')
            ->leftjoin('congregation as co','co.id','pr.congregation')
            ->orderBy('pr.id','desc')
            ->get();
            if(count($ProvinceAll) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($ProvinceAll), "data" => $ProvinceAll]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }
        }

        public function ProvinceDelete($id){

            $Congregationdel =Province::find($id);
            $Congregationdel->delete();
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Province deleted  successfully"]);
        }
        public function ProvinceCongregation(){

            $Congregation =Congregation::all();
            if(count($Congregation) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Congregation), "data" => $Congregation]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }
        }

        public function Provinceverifydelete($id){

        $verifyData =DB::table('client_registrations')->select('id')->where('province',$id)->first();
       
        if($verifyData !=null){
            return response()->json(["status" => $this->status, "success" => true 
           , "message" => "true"]);
        }else{
            return response()->json(["status" => "failed",
            "success" => false, "message" => "false"]);
        }


        }
        public function ProvinceEdit($id){
           
            $Congregationedit = Province::where('id',$id)->get();
            if(count($Congregationedit) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Congregationedit), "data" => $Congregationedit]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }

        }

        public function Provinceget($id){
         
            // $Provinceget = Province::where('id',$id)->get();
            
            $Provinceget = DB::table('provinces as pr')
            ->select('pr.*','co.congregation')
            ->leftjoin('congregation as co','co.id','pr.congregation')
            ->where('co.id',$id)
            ->get();
          
            if(count($Provinceget) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Provinceget), "data" => $Provinceget]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }

        }
        public function Provinceupdate($id,Request $request){
           
            $Congregationupdate = Province::where('id',$id)
            ->update([
                "congregation" => $request->congregation,
                "province" => $request->province,
                "address1" => $request->address1,
                "state" => $request->state,
                "address2" => $request->address2,
                "postcode"   => $request->postcode, 
                "city"   => $request->city, 
                "country"   => $request->country, 
                "mobile"   => $request->mobile, 
                "email"   => $request->email, 
                "contactname"   => $request->contactname, 
                "contactrole"   => $request->contactrole, 
                "contactemail"   => $request->contactemail, 
                "contactmobile"   => $request->contactmobile, 
                "contactstatus"   => $request->contactstatus, 
            ]);

            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation updated  successfully"]);
        }

        public function GetBalance($value){
          
            $Year = date('Y');
            $dately = $Year.'-'.$Year + 1;
            if ($value != "Clients") {
    
            $Balancefilter =Payment::where('clienttype',$value)
            ->where('financialyear',$dately)->get();
          
            $yearmonth =Payment::select('financialyear')->where('clienttype',$value)->orderBy('financialyear', 'ASC')->get();
           
            $GetallData = DB::table('payments as pay')
            ->select('pay.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','pay.congregation')
            ->leftjoin('provinces as pr','pr.id','pay.province')
            ->where('financialyear',$dately)
            ->where('clienttype',$value)
            ->get();
         

            $balance=[];
            $total=[];
            $Paid=[];
            $Getmonth =[];

          foreach ($Balancefilter as $key => $value) {
            $balance[]= $value->balance;
            $total[]=$value->total;
            $Paid[]= $value->paid;
            $month = Carbon::parse($value->created_at)->format('F');

            if(!in_array($month,$Getmonth)){
                $Getmonth[] = $month;
            }
          }  
            $year =[];
            foreach ($yearmonth as $key => $value) {
                $yeardata =$value->financialyear;
                        if(!in_array($yeardata,$year)){
                            $year[] = $yeardata;
                        }  
            }
          if(count($Balancefilter) > 0) {
           $balances =array_sum($balance);
           $totalval = array_sum($total);
           $paidval = array_sum($Paid);
           $balanceamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $balances);
           $totalamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $totalval);
           $paidamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $paidval);
 
           $perbal =  round(($balances * 100) / $totalval ,2);
           $perpaid = round(($paidval * 100) / $totalval,2);
         
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Balancefilter), "data" => [
                                "balance" =>$balanceamount ?? '0',
                                "total" => $totalamount ?? '0',
                                "paid" => $paidamount ?? '0',
                                "year" =>$year ?? explode(",", "") ,
                                "balPer" =>$perbal ?? '0' ,
                                "paidPer" =>$perpaid ?? '0',
                                "Month" =>  $Getmonth?? explode(",", "")
                            ],
                                "dataall"=>$GetallData,
                        ]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false,  "count" => count($Balancefilter), "data" => [
                    "balance" =>'0',
                    "total" =>  '0',
                    "paid" =>  '0',
                    "year" => $year ?? explode(",", "") ,
                    "balPer" => '0' ,
                    "paidPer" => '0',
                    "Month" => explode(",", ""),
                    ]
            
            ]);
            }
        }else{

            $clients = DB::table('client_registrations')
            ->select('financialyear')
            ->orderBy('financialyear', 'ASC')
            ->get();
            
            $clientstatus = DB::table('client_registrations')
                ->where('projectstatus','InProgress')
                ->where('financialyear',$dately)
                ->get();

            $clientfyear = DB::table('client_registrations')
            ->where('financialyear',$dately)
            ->get();


            $GetallData = DB::table('client_registrations as cr')
            ->select('cr.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','cr.congregation')
            ->leftjoin('provinces as pr','pr.id','cr.province')
            ->orderBy('cr.id','desc')
            ->where('financialyear',$dately)
            ->get();

            $year=[];
            foreach ($clients as $key => $value) {
                $yeardata =$value->financialyear;
                        if(!in_array($yeardata,$year)){
                            $year[] = $yeardata;
                        } 
            }
            $clientscount= count($clients);
            $newclients= count($clientfyear);
            $clientstatuscount =count($clientstatus);
            if(count($clients) > 0) {

                return response()->json([
                    "status" => $this->status,
                    "success" => true, 
                    "count" => count($clients),
                    "data" => [
                        "balance" =>$clientstatuscount ?? '0',
                        "total" => $clientscount ?? '0',
                         "paid" => $newclients ?? '0',
                         "year" =>$year ?? explode(",", "") ],
                         "dataall"=>$GetallData,
                ]);
            }else{
                return response()->json([
                    "status" => "failed",
                    "success" => false, 
                    "data" => [
                        "balance" =>'0',
                        "total" =>  '0',
                        "paid" => '0']
                ]);
            }
        }
        }
    public function GetBalanceall($value){


           if ($value != "Clients") {
           
            $Balancefilter =Payment::where('clienttype',$value)->get();
            $GetallData = DB::table('payments as pay')
            ->select('pay.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','pay.congregation')
            ->leftjoin('provinces as pr','pr.id','pay.province')
            ->where('clienttype',$value)
            ->orderBy('financialyear', 'ASC')
            ->get();
        
            $balance=[];
            $total=[];
            $Paid=[];
            $Getmonth =[];
            $year =[];
            foreach ($Balancefilter as $key => $value) {
                $balance[]= $value->balance;
                $total[]=$value->total;
                $yeardata =$value->financialyear;
                $Paid[]= $value->paid;
                $month = Carbon::parse($value->created_at)->format('F');
                if(!in_array($month,$Getmonth)){
                    $Getmonth[] = $month;
                }
                if(!in_array($yeardata,$year)){
                    $year[] = $yeardata;
                }
            }
           
           
            if(count($Balancefilter) > 0) {
            $balances =array_sum($balance);
            $totalval = array_sum($total);
            $paidval = array_sum($Paid);
            $balanceamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $balances);
            $totalamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $totalval);
            $paidamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $paidval);

            $perbal =  round(($balances * 100) / $totalval ,2);
            $perpaid = round(($paidval * 100) / $totalval,2);
            
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Balancefilter), "data" => [
                                "balance" =>$balanceamount ?? '0',
                                "total" => $totalamount ?? '0',
                                "paid" => $paidamount ?? '0',
                                "year" =>$year ?? explode(",", "") ,
                                "balPer" =>$perbal ?? '0' ,
                                "paidPer" =>$perpaid ?? '0',
                                "Month" =>  $Getmonth?? explode(",", "")
                            ],
                                "dataall"=>$GetallData,
                        ]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false,  "count" => count($Balancefilter), "data" => [
                    "balance" =>'0',
                    "total" =>  '0',
                    "paid" =>  '0',
                    "year" => explode(",", ""),
                    "balPer" => '0' ,
                    "paidPer" => '0',
                    "Month" => explode(",", ""),
                    ]
            
            ]);
            }

        }else{
          
            $clients = DB::table('client_registrations')
            ->select('financialyear')
            ->orderBy('financialyear', 'ASC')
            ->get();

            $clientstatus = DB::table('client_registrations')
            ->where('projectstatus','InProgress')
            // ->where('financialyear',$request->year)
            ->get();

            $GetallData = DB::table('client_registrations as cr')
            ->select('cr.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','cr.congregation')
            ->leftjoin('provinces as pr','pr.id','cr.province')
            ->orderBy('cr.id','desc')
            ->get();

            $clientscount= count($clients);
            $clientstatuscount =count($clientstatus);

            if(count($clients) > 0) {

                return response()->json([
                    "status" => $this->status,
                    "success" => true, 
                    "count" => count($clients),
                    "data" => [
                        "balance" =>$clientstatuscount ?? '0',
                        "total" => $clientscount ?? '0',
                         "paid" => $clientscount ?? '0',],
                         "dataall"=>$GetallData,
                ]);
            }else{
                return response()->json([
                    "status" => "failed",
                    "success" => false, 
                    "data" => [
                        "balance" =>'0',
                        "total" =>  '0',
                        "paid" => '0']
                ]);
            }
           
        }
    }
        public function GetFinancialyear()
        {
          
            $years = DB::table('payments')->select('financialyear')->groupby('financialyear')->orderBy('financialyear', 'ASC')->get();
            $finnacialyear =[];
            foreach ($years as $key => $value) {
                $finnacialyear[]=$value->financialyear;
            }
                if(count($finnacialyear) > 0) {
                    return response()->json(["status" => $this->status, "success" => true, 
                                "count" => count($finnacialyear), "data" => $finnacialyear]);
                }
                else {
                    return response()->json(["status" => "failed",
                    "success" => false, "message" => "Whoops! no record found"]);
                } 
        }

        public function financialyear(Request $request){
           
           if ($request->type != "Clients") {
          
            $getBalance = Payment::where('clienttype',$request->type)->where('financialyear',$request->year)->orderBy('financialyear', 'ASC')->get();
            
            $GetallData = DB::table('payments as pay')
            ->select('pay.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','pay.congregation')
            ->leftjoin('provinces as pr','pr.id','pay.province')
            ->where('financialyear',$request->year)
            ->where('clienttype',$request->type)
            ->get();
            $balance=[];
            $total=[];
            $Paid=[];
            $Getmonth =[];

            foreach ($getBalance as $key => $value) {
                $balance[]= $value->balance;
                $total[]=$value->total;
                $Paid[]= $value->paid;
                $month=Carbon::parse($value->created_at)->format('F'); 

                if(!in_array($month,$Getmonth)){
                    $Getmonth[] = $month;
                }

            }

            $balances =array_sum($balance);
            $totalval = array_sum($total);
            $paidval = array_sum($Paid);
            $balanceamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $balances);
            $totalamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $totalval);
            $paidamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $paidval);
        
            $perbal =  round(($balances * 100) / $totalval ,2);
            $perpaid = round(($paidval * 100) / $totalval,2);

            if(count($getBalance) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($getBalance), "data" => [
                                "balance" =>$balanceamount ?? '0',
                                "total" => $totalamount ?? '0',
                                "paid" => $paidamount ?? '0',
                                "balPer" =>$perbal ?? '0' ,
                                "paidPer" =>$perpaid ?? '0',
                                "Month" =>  $Getmonth?? explode(",", "")
                            ],
                            "dataall"=>$GetallData,
                ]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false,  "count" => count($getBalance), "data" => [
                    "balance" => '0',
                    "total" =>  '0',
                    "paid" =>'0',
                    "balPer" => '0' ,
                     "paidPer" => '0',
                     "Month" =>  explode(",", "")
                    ]
            ]);
        }
            } else {
                $clients = DB::table('client_registrations')
                ->select('financialyear')
                ->orderBy('financialyear', 'ASC')
                ->get();
                $clientstatus = DB::table('client_registrations')
                ->where('projectstatus','InProgress')
                ->where('financialyear',$request->year)
                ->get();
                
                $clientfyear = DB::table('client_registrations')
                ->where('financialyear',$request->year)
                ->get();
    
    
                $GetallData = DB::table('client_registrations as cr')
                ->select('cr.*','co.congregation','pr.province')
                ->leftjoin('congregation as co','co.id','cr.congregation')
                ->leftjoin('provinces as pr','pr.id','cr.province')
                ->orderBy('cr.id','desc')
                ->where('financialyear',$request->year)
                ->get();
    
                
                $clientscount= count($clients);
                $newclients= count($clientfyear);
                $clientstatuscount =count($clientstatus);
                if(count($clients) > 0) {
    
                    return response()->json([
                        "status" => $this->status,
                        "success" => true, 
                        "count" => count($clients),
                        "data" => [
                            "balance" =>$clientstatuscount ?? '0',
                            "total" => $clientscount ?? '0',
                             "paid" => $newclients ?? '0', ],
                             "dataall"=>$GetallData,
                    ]);
                }else{
                    return response()->json([
                        "status" => "failed",
                        "success" => false, 
                        "data" => [
                            "balance" =>'0',
                            "total" =>  '0',
                            "paid" => '0']
                    ]);
                }
            }
        }

        public function financialmonth(Request $request)
        {
            $month = $request->month;
            if ($month == "Select All") {
                $getBalance = DB::table('payments')
                ->select('balance','total','paid','financialyear')
                ->where('clienttype',$request->type)
                ->where('financialyear',$request->year)
                // ->groupby('financialyear')
                ->get();

             $GetallData = DB::table('payments as pay')
            ->select('pay.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','pay.congregation')
            ->leftjoin('provinces as pr','pr.id','pay.province')
            ->where('financialyear',$request->year)
            ->where('clienttype',$request->type)
            ->get();
            
            }else{
                $getBalance = DB::table('payments')
            ->select('balance','total','paid','financialyear')
            ->where('clienttype',$request->type)
            ->where(DB::raw("(DATE_FORMAT(created_at,'%M'))"),$request->month)
            ->where('financialyear',$request->year)
            ->get();
           
            $GetallData = DB::table('payments as pay')
            ->select('pay.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','pay.congregation')
            ->leftjoin('provinces as pr','pr.id','pay.province')
            ->where(DB::raw("(DATE_FORMAT(pay.created_at,'%M'))"),$request->month)
            ->where('financialyear',$request->year)
            ->where('clienttype',$request->type)
            ->get();

            }
            
            $balance=[];
            $total=[];
            $Paid=[];
            

            foreach ($getBalance as $key => $value) {
                $balance[]= $value->balance;
                $total[]=$value->total;
                $Paid[]= $value->paid;
                
            }
         
            $balances =array_sum($balance);
            $totalval = array_sum($total);
            $paidval = array_sum($Paid);
            $balanceamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $balances);
            $totalamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $totalval);
            $paidamount = preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $paidval);

            $perbal =  round(($balances * 100) / $totalval ,2);
            $perpaid = round(($paidval * 100) / $totalval,2);

            if(count($getBalance) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($getBalance), "data" => [
                                "balance" =>$balanceamount ?? '0',
                                "total" => $totalamount ?? '0',
                                "paid" => $paidamount ?? '0',
                               
                            ],
                            "dataall"=>$GetallData,
                ]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false,  "count" => count($getBalance), "data" => [
                    "balance" => '0',
                    "total" =>  '0',
                    "paid" =>'0',
                    ]
                ]);
            }

        }
}

