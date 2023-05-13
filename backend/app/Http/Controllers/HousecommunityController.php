<?php

namespace App\Http\Controllers;

use App\Models\Housecommunity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HousecommunityController extends Controller
{
    Private $status = 200;

    public function housecommunitycreate(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            "housedate"    => "required",
            "housestatus"  => "required"
        ]
       );

            if($validator->fails()) {
                return response()->json(["status" => "failed", 
                                "validation_errors" => $validator->errors()]);
            }

             $projectArray['params'] = array(
                "housedate"     =>$request->housedate,
                "housestatus"  =>$request->housestatus
             );
            $project  =  Housecommunity::create($projectArray['params']);
      
            if(!is_null($project)){ 

                return response()->json(["status" => $this->status, "success" => true, 
                        "message" => "Community record created successfully", "data" => $project]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false,
                            "message" => "Whoops! failed to create."]);
        }      
    }

    // list value

    public function housecommunityList() {

  
    $project= Housecommunity::orderBy('id','desc')->get();
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
      public function housecommunityEdit($id)
      {
          $projectedit = Housecommunity::where('id',$id)->get();
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
      public function housecommunityUpdate($id,Request $request){
         
          $projectupdate = Housecommunity::where('id',$id)
          ->update([
            "housedate"   =>$request->housedate,
            "housestatus" =>$request->housestatus,
            "client_id"   =>$request->client_id
          ]);
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => " Community Status updated  successfully"]);
      }
  
       // delete
       public function housecommunityDelete($id){
          $projectdelte = Housecommunity::find($id);
          $projectdelte->delete();
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => "Community Status deleted  successfully"]);
      }
}
