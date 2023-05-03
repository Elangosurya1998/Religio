<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Onsitemeet;

class OnsitemeetController extends Controller
{
    Private $status = 200;

    public function onsitemeetstatus(Request $request)
    {
             $onsitemeetstatusArray['params'] = array(
                "onsitedate"    =>$request->onsitedate,
                "onsitedays"    =>$request->onsitedays,
                "expensive"     =>$request->expensive,
                "onsiterating"  =>$request->onsiterating,
                "onsiteplace"  =>$request->onsiteplace
             );

            $onsitemeetstatus  =  Onsitemeet::create($onsitemeetstatusArray['params'] );
      
            if(!is_null($onsitemeetstatus)){ 

                return response()->json(["status" => $this->status, "success" => true, 
                        "message" => "onsitestatus record created successfully", "data" => $onsitemeetstatus]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false,
                            "message" => "Whoops! failed to create."]);
        }      
    }

    // list value
    public function onsitemeetstatusList() {
    $onsite = Onsitemeet::all();
        if(count($onsite) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($onsite), "data" => $onsite]);
        }
        else {
            return response()->json(["status" => "failed",
                        "success" => false, "message" => "Whoops! no record found"]);
        }
    }

      // edit
      public function onsitestatusedit($id)
      {
          $onsitestatus = Onsitemeet::where('id',$id)->get();
          if(count($onsitestatus) > 0) {
              return response()->json(["status" => $this->status, "success" => true, 
                          "count" => count($onsitestatus), "data" => $onsitestatus]);
          }
          else {
              return response()->json(["status" => "failed",
              "success" => false, "message" => "Whoops! no record found"]);
          }
      }

      // update
      public function onsitestatusupdate($id,Request $request){
         
          $onsitestatusupdate = Onsitemeet::where('id',$id)
          ->update([

              "onsitedate"    =>$request->onsitedate,
              "onsitedays"    =>$request->onsitedays,
              "expensive"     =>$request->expensive,
              "onsiterating"  =>$request->onsiterating,
              "onsiteplace"  =>$request->onsiteplace
          ]);
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => " Onsite Status record updated  successfully"]);
      }
  
       // delete
       public function onsitestatusDelete($id){
          $onsitestatusdelte = Onsitemeet::find($id);
          $onsitestatusdelte->delete();
          return response()->json(
              ["status" => $this->status, "success" => true, 
              "message" => "Onsite status record deleted  successfully"]);
      }

    //   file upload
            public function onsiteupload(Request $request) 
            { 
                $getid = Onsitemeet::latest('id')->first(); 
                $id = $getid->id;
                $validator    =  Validator::make($request->all(), 
                    [     
                     "onsite"  => "required", 
                    ]
                 
                );
                   if($validator->fails()) {
                    return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
                    }
                   $file = $request->file('onsite'); 
                   $filename = $file->getClientOriginalName();
                   $extension = $file->getClientOriginalExtension();
                   $location = 'onsite';
        
                    $document = Onsitemeet::where('id',$id)
                    ->update([
                        "onsite"   =>$file->getClientOriginalName()
                    ]);
                    $file->move($location,$filename);
                    $filepath = url('onsite/'.$filename);
        
                        if(!is_null($document)){ 
        
                            return response()->json(["status" => $this->status, "success" => true, 
                                    "message" => "upload  successfully", "data" => $document]);
                        }    
                        else {
                            return response()->json(["status" => "failed", "success" => false,
                                        "message" => "Whoops! failed to create."]);
                        }   
                  
                    }

//    file upload
    public function onsiteuploadid(Request $request , $id) 
    { 
      
        $validator    =  Validator::make($request->all(), 
            [     
                "onsite"  => "required", 
            ]
            
        );
            if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
            }
            
            $file = $request->File('onsite'); 
            $filename = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $location = 'onsite';

            $updocument = Onsitemeet::where('id',$id)
            ->update([
                "onsite"   =>$file->getClientOriginalName()
            ]);
            $file->move($location,$filename);
            $filepath = url('onsite/'.$filename);

                if(!is_null($updocument)){ 

                    return response()->json(["status" => $this->status, "success" => true, 
                            "message" => "upload  successfully", "data" => $updocument]);
                }    
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
                }   
            
            }

 }




