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
            ]);

            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation updated  successfully"]);
        }

        public function GetBalance($value){
          
            $Balancefilter =Payment::where('clienttype',$value)->get();
            $balance=[];
            $total=[];
            $year =[];
            $Paid=[];
            $Getmonth =[];
          foreach ($Balancefilter as $key => $value) {
            $balance[]= $value->balance;
            $total[]=$value->total;
            $year[] =$value->financialyear;
            $Paid[]= $value->paid;
            $Getmonth[]=Carbon::parse($value->created_at)->format('F');
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
                                ]
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
        }

        public function GetFinancialyear(){
          
        $years = DB::table('payments')->select('financialyear')->groupby('financialyear')->get();
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
           
            $getBalance = Payment::where('clienttype',$request->type)->where('financialyear',$request->year)->get();
            $balance=[];
            $total=[];
            $Paid=[];
            $Getmonth =[];

          foreach ($getBalance as $key => $value) {
            $balance[]= $value->balance;
            $total[]=$value->total;
            $Paid[]= $value->paid;
            $Getmonth[]=Carbon::parse($value->created_at)->format('F'); 
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
                         ]
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

        }
        public function financialmonth(Request $request){
           
            
            $getBalance = DB::table('payments')
            ->select('balance','total','paid','financialyear')
            ->where('clienttype',$request->type)
            ->where(DB::raw("(DATE_FORMAT(created_at,'%M'))"),$request->month)
            // ->groupby('financialyear')
            ->get();
            $balance=[];
            $total=[];
            $Paid=[];
            $year =[];

          foreach ($getBalance as $key => $value) {
            $balance[]= $value->balance;
            $total[]=$value->total;
            $Paid[]= $value->paid;
            $year[] =$value->financialyear;
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
                                "year" =>$year ?? explode(",", "") ,
                         ]
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
                     "year" =>explode(",", "") ,
                    ]
            ]);
            }

        }
}

