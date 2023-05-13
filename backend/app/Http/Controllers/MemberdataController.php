<?php

namespace App\Http\Controllers;

use App\Models\Memberdata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MemberdataController extends Controller
{
    Private $status = 200;

    public function memberdatacreate(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            "memberdate"    => "required",
            "memberstatus"  => "required"
        ]
       );

            if($validator->fails()) {
                return response()->json(["status" => "failed", 
                                "validation_errors" => $validator->errors()]);
            }

             $projectArray['params'] = array(
                "memberdate"    => $request->memberdate,
                "memberstatus"  => $request->memberstatus
             );
            $project  =  Memberdata::create($projectArray['params']);
      
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

    public function memberdataList() {

    $project = Memberdata::orderBy('id','desc')->get();
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
      public function memberdataEdit($id)
      {
          $projectedit = Memberdata::where('id',$id)->get();
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
      public function memberdataUpdate($id,Request $request){
         
          $projectupdate = Memberdata::where('id',$id)
          ->update([
            "memberdate"    => $request->memberdate,
            "memberstatus"  => $request->memberstatus,
            "client_id"      =>$request->client_id
          ]);
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => " Project Status updated  successfully"]);
      }
  
       // delete
       public function memberdataDelete($id){
          $projectdelte = Memberdata::find($id);
          $projectdelte->delete();
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => "Project Status deleted  successfully"]);
      }
}
