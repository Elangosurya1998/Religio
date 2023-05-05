<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Projects;
use App\Models\Clientregistration;
use App\Models\Congregation;
use App\Models\Province;
use App\Http\Controllers\Controller;


class ProjectsController extends Controller
{
    Private $status = 200;

    public function projectstatus(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            "name"          => "required",
            "congregation"  => "required",
            "province"      => "required",
            "testURL"       => "required",
            "textusername"  => "required",
            "textpassword"  => "required",
            "prodURL"       => "required",
            "produsername"  => "required",
            "prodpassword"  => "required"
        ]
       );

            if($validator->fails()) {
                return response()->json(["status" => "failed", 
                                "validation_errors" => $validator->errors()]);
            }

             $projectArray['params'] = array(
                "name"           =>$request->name,
                "congregation"   =>$request->congregation,
                "province"       =>$request->province,
                "dataserver"     =>$request->dataserver,
                "instance"       =>$request->instance,
                "testURL"        =>$request->testURL,
                "textusername"   =>$request->textusername,
                "textpassword"   =>$request->textpassword,
                "prodURL"        =>$request->prodURL,
                "produsername"   =>$request->produsername,
                "prodpassword"   =>$request->prodpassword
                             );
            $project  =  Projects::create($projectArray['params']);
      
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

    public function projectList(Request $request) {
    // $project = Projects::orderBy('id','desc')->get();

    $project = \DB::table('projects as pro')
    ->select('pro.*','co.congregation','pr.province')
    ->leftjoin('congregation as co','co.id','pro.congregation')
    ->leftjoin('provinces as pr','pr.id','pro.province')
    ->orderBy('id','desc')
    ->get();

// dd($project);
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
      public function projectEdit($id)
      {
          $projectedit = Projects::where('id',$id)->get();
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
      public function projectupdate($id,Request $request){
         
          $projectupdate = Projects::where('id',$id)
          ->update([
              "name"           =>$request->name,
              "congregation"   =>$request->congregation,
              "province"       =>$request->province,
              "dataserver"     =>$request->dataserver,
              "instance"       =>$request->instance,
              "testURL"        =>$request->testURL,
              "textusername"   =>$request->textusername,
              "textpassword"   =>$request->textpassword,
              "prodURL"        =>$request->prodURL,
              "produsername"   =>$request->produsername,
              "prodpassword"   =>$request->prodpassword
          ]);
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => " Project Status updated  successfully"]);
      }
  
       // delete
       public function projectDelete($id){
          $projectdelte = Projects::find($id);
          $projectdelte->delete();
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => "Project Status deleted  successfully"]);
      }


 }




