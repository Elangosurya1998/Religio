<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Congregation;
use Illuminate\Support\Facades\Validator;
class ReligioController extends Controller
{ 
        Private $status = 200;
       
        public function Congregation(Request $request)
        {
           
            $validator    =  Validator::make($request->all(), 
            [
                "CongregationName" => 'required',
                "Address1"  => "required",
                "state"  => "required",
                "Postcode"=> "required",
                "country"  => "required",
                "Mobile"  => "required",
                "Email"  => "required",
            ]
           );
                if($validator->fails()) {
                    return response()->json(["status" => "failed", 
                                    "validation_errors" => $validator->errors()]);
                }
                 $projectArray['params'] = array(
                                "CongregationName" => $request->CongregationName,
                                "Address1" => $request->Address1,
                                "state" => $request->state,
                                "Address2" => $request->Address2,
                                "Postcode" => $request->Postcode,
                                "City"   => $request->City,
                                "country" => $request->country,
                                "Mobile"   => $request->Mobile, 
                                "Email"   => $request->Email,  
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
    
        $Congregation = Congregation::all();
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
                "CongregationName" => $request->CongregationName,
                "Address1" => $request->Address1,
                "state" => $request->state,
                "Address2" => $request->Address2,
                "Postcode" => $request->Postcode,
                "City"   => $request->City,
                "country"   => $request->country,
                "Mobile"   => $request->Mobile, 
                "Email"   => $request->Email, 
            ]);
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation updated  successfully"]);
        }
}
