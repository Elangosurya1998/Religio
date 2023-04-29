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

      


    //   file upload
    public function onlinestatusupload(Request $request){
          
        $getid = onlinemeet::latest('id')->first(); 
        $id = $getid->id;

           $file = $request->file('online'); 
           $filename = $file->getClientOriginalName();
           $extension = $file->getClientOriginalExtension();
           $location = 'online';


            $onlinefile = onlinemeet::where('id',$id)
            ->update([
                "online"   =>$file->getClientOriginalName()
            ]);;
            $file->move($location,$filename);
            $filepath = url('online/'.$filename);

                if(!is_null($onlinefile)){ 

                    return response()->json(["status" => $this->status, "success" => true, 
                            "message" => "online Status record created successfully", "data" => $onlinefile]);
                }    
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
                }   
          
        }
        public function onlineuploadupdateid($id,Request $request){
          
     
            $file = $request->file('online'); 
           $filename = $file->getClientOriginalName();
           $extension = $file->getClientOriginalExtension();
           $location = 'online';
               
                $onlinefile = onlinemeet::where('id',$id)
                ->update([
                    "online"   =>$file->getClientOriginalName()
                ]);;
                $file->move($location,$filename);
                $filepath = url('online/'.$filename);
    
                    if(!is_null($onlinefile)){ 
    
                        return response()->json(["status" => $this->status, "success" => true, 
                                "message" => "Registered  successfully", "data" => $onlinefile]);
                    }    
                    else {
                        return response()->json(["status" => "failed", "success" => false,
                                    "message" => "Whoops! failed to create."]);
                    }   
              
            }


 }




