<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Onlinemeet;



class OnlinemeetController extends Controller
{
    Private $status = 200;

    public function onlinemeetstatus(Request $request)
    {


             $onlinemeetstatusArray['params'] = array(
                "onlinemeeting" =>$request->onlinemeeting,
                "onlinedate"    =>$request->onlinedate,
                "onlinehours"   =>$request->onlinehours,
                "onlinerating"  =>$request->onlinerating
        
             );
            $onlinemeetstatus  =  onlinemeet::create($onlinemeetstatusArray['params']);
      
            if(!is_null($onlinemeetstatus)){ 

                return response()->json(["status" => $this->status, "success" => true, 
                        "message" => "Online Status record created successfully", "data" => $onlinemeetstatus]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false,
                            "message" => "Whoops! failed to create."]);
        }      
    }

    // list value

    public function onlinemeetstatusList() {
    $online = onlinemeet::all();
        if(count($online) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($online), "data" => $online]);
        }
        else {
            return response()->json(["status" => "failed",
                        "success" => false, "message" => "Whoops! no record found"]);
        }
    }

      // edit
      public function onlinetatusedit($id)
      {
          $onlinestatus = onlinemeet::where('id',$id)->get();
          if(count($onlinestatus) > 0) {
              return response()->json(["status" => $this->status, "success" => true, 
                          "count" => count($onlinestatus), "data" => $onlinestatus]);
          }
          else {
              return response()->json(["status" => "failed",
              "success" => false, "message" => "Whoops! no record found"]);
          }
      }
  
      // update
      public function onlinestatusupdate($id,Request $request){
         
          $onlineupdate = onlinemeet::where('id',$id)
          ->update([
              "onlinemeeting" =>$request->onlinemeeting,
              "onlinedate"    =>$request->onlinedate,
              "onlinehours"   =>$request->onlinehours,
              "onlinerating"  =>$request->onlinerating
          ]);
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => " Online Status record updated  successfully"]);
      }
  
       // delete
       public function onlinestatusDelete($id){
          $onlinedelte = onlinemeet::find($id);
          $onlinedelte->delete();
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => "online status record deleted  successfully"]);
      }

      public function upload(Request $request) 
      { 

            $validator = Validator::make($request->all(),[ 
                    'online' => 'required|mimes:doc,docx,pdf,txt,csv|max:2048',
            ]);   

            if($validator->fails()) {          
                
                return response()->json(['error'=>$validator->errors()], 401);                        
            }  
        
            $name = time().'.'.$request->online->extension();  
        
            $file = $request->online->move(public_path('/online'),$name);
            $save = new Onlinemeet();
            $save->name = $name;
            $save->path= $file;
            $save->save();

     /* Store $imageName name in DATABASE from HERE */

           return response()->json([
             "success" => true,
               "message" => "File successfully uploaded",
               "online" => $name
             
          ]);
  
      
    }

    }
 
 




