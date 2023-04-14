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
                "Address2"   => "required",
                "Postcode"=> "required",
                "City"  => "required"
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
                                "City"   => $request->City 
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
    
        public function projectList() {
    
        $project = Project::all();
            if(count($project) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($project), "data" => $project]);
            }
            else {
                return response()->json(["status" => "failed",
                            "success" => false, "message" => "Whoops! no record found"]);
            }
        }
}
