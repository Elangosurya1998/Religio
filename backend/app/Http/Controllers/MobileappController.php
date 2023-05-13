<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Mobileapps;

class MobileappController extends Controller
{
    Private $status = 200;

    public function mobileappcreate(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            "mobiledate"   => "required",
            "mobilestatus" => "required"
        ]
       );

            if($validator->fails()) {
                return response()->json(["status" => "failed", 
                                "validation_errors" => $validator->errors()]);
            }

             $projectArray['params'] = array(
                "mobiledate"   => $request->mobiledate,
                "mobilestatus" => $request->mobilestatus
             );
            $project  =  Mobileapps::create($projectArray['params']);
      
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

    public function mobileappList() {

    $project = Mobileapps::orderBy('id','desc')->get();
        if(count($project) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($project), "data" => $project]);
        }
        else {
            return response()->json(["status" => "failed",
                        "success" => false, "message" => "Whoops! no record found"]);
        }
    }

      // edit
      public function mobileappEdit($id)
      {
          $projectedit = Mobileapps::where('id',$id)->get();
          if(count($projectedit) > 0) {
              return response()->json(["status" => $this->status, "success" => true, 
                          "count" => count($projectedit), "data" => $projectedit]);
          }
          else {
              return response()->json(["status" => "failed",
              "success" => false, "message" => "Whoops! no record found"]);
          }
      }
  
      // update
      public function mobileappUpdate($id,Request $request){
         
          $projectupdate = Mobileapps::where('id',$id)
          ->update([
            "mobiledate"   => $request->mobiledate,
            "mobilestatus" => $request->mobilestatus,
            "client_id"      =>$request->client_id
          ]);
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => " Project Status updated  successfully"]);
      }
  
       // delete
       public function mobileappDelete($id){
          $projectdelte = Mobileapps::find($id);
          $projectdelte->delete();
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => "Project Status deleted  successfully"]);
      }
}
