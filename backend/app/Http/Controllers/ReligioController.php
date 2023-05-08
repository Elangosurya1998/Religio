<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Congregation;
use Illuminate\Support\Facades\Validator;
use DB;
class ReligioController extends Controller
{ 
        Private $status = 200;
       
        public function Congregation(Request $request)
        {
           
            $validator    =  Validator::make($request->all(), 
            [
                "congregation" => 'required',
                "address1"  => "required",
                "state"  => "required",
                "postcode"=> "required",
                "country"  => "required",
                "mobile"  => "required",
                "email"  => "required",
            ]
           );
                if($validator->fails()) {
                    return response()->json(["status" => "failed", 
                                    "validation_errors" => $validator->errors()]);
                }
                 $projectArray['params'] = array(
                                "congregation" => $request->congregation,
                                "address1" => $request->address1,
                                "state" => $request->state,
                                "address2" => $request->address2,
                                "postcode" => $request->postcode,
                                "city"   => $request->city,
                                "country" => $request->country,
                                "mobile"   => $request->mobile, 
                                "email"   => $request->email,  
                         );
    
                $project  = Congregation::create($projectArray['params']);
    
                if(!is_null($project)){ 
    
                    return response()->json(["status" => $this->status, "success" => true, 
                            "message" => "project record created successfully", "data" => $project]);
                }    
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
            }      
        }
    
        // list value
    
        public function CongregationList() {
    
            $Congregation = Congregation::orderBy('id','desc')->get();
            if(count($Congregation) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Congregation), "data" => $Congregation]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }
        }

        public function CongregationDelete($id){

            $Congregationdel =Congregation::find($id);
            $Congregationdel->delete();
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation deleted  successfully"]);
        }
        public function CongregationEdit($id){
           
            $Congregationedit = Congregation::where('id',$id)->get();
            if(count($Congregationedit) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Congregationedit), "data" => $Congregationedit]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }
        }public function Congregationupdate($id,Request $request){
           
            $Congregationupdate = Congregation::where('id',$id)
            ->update([
                "congregation" => $request->congregation,
                "address1" => $request->address1,
                "state" => $request->state,
                "address2" => $request->address2,
                "postcode" => $request->postcode,
                "city"   => $request->city,
                "country" => $request->country,
                "mobile"   => $request->mobile, 
                "email"   => $request->email,  
            ]);
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation updated  successfully"]);
        }
        public function Congregationverifydelete($id){
            
            $verifyData = DB::table('provinces')->select('id')->where('congregation',$id)->first();
       
            if($verifyData !=null){
                return response()->json(["status" => $this->status, "success" => true 
               , "message" => "true"]);
            }else{
                return response()->json(["status" => "failed",
                "success" => false, "message" => "false"]);
            }
        }
}
