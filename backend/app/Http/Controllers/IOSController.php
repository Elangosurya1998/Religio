<?php

namespace App\Http\Controllers;

use App\Models\Ios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IOSController extends Controller
{
    Private $status = 200;

    public function ioscreate(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            "Iosdate"       => "required",
            "Iosstatus"     => "required"
        ]
       );

            if($validator->fails()) {
                return response()->json(["status" => "failed", 
                                "validation_errors" => $validator->errors()]);
            }

             $projectArray['params'] = array(
                "Iosdate"       => $request->Iosdate,
                "Iosstatus"     => $request->Iosstatus
             );
            $project  =  Ios::create($projectArray['params']);
      
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

    public function iosList() {
    $project = Ios::orderBy('id','desc')->get();
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
      public function iosEdit($id)
      {
          $projectedit = Ios::where('id',$id)->get();
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
      public function iosUpdate($id,Request $request){
         
          $projectupdate = Ios::where('id',$id)
          ->update([
            "Iosdate"       => $request->Iosdate,
            "Iosstatus"     => $request->Iosstatus,
            "client_id"      =>$request->client_id
          ]);
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => " Project Status updated  successfully"]);
      }
  
       // delete
       public function iosDelete($id){
          $projectdelte = Ios::find($id);
          $projectdelte->delete();
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => "Project Status deleted  successfully"]);
      }
}
