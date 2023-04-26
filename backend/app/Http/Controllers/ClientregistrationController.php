<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clientregistration;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use DB;

class ClientregistrationController extends Controller
{ 
        Private $status = 200;
       
        public function Clientregistrationstore(Request $request)
        {
            $validator    =  Validator::make($request->all(), 
            [
            "congregation"   => 'required',
                "province"   => "required",
                "name"       => "required",
                "place"      => "required",
                "clientType" => "required",
            "financialyear"  => "required",
                "clientcode" => "required",
            "dateofjoining"  => "required",
    "dateofcontractsigning"  => "required",
                "amcDate"    => "required",
             "projectValue"  => "required",
                "amcvalue"   => "required",
            "projectStatus"  => "required",
                "address1"   => "required",
                "state"      => "required",
                "address2"   => "required",
                "postcode"   => "required",
                "city"       => "required",
                "country"    => "required",
                "mobile"     => "required",
                "email"      => "required",
            ]
           );
           
                if($validator->fails()) {
                return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
                }
            
                 $RegisterArray['params'] = array(
                             "congregation"   => $request->congregation,
                                 "province"   => $request->province,
                                 "name"       => $request->name,
                                 "place"      => $request->place,
                                 "clientType" => $request->clientType,
                             "financialyear"  => $request->financialyear,
                                 "clientcode" => $request->clientcode, 
                             "dateofjoining"  => $request->dateofjoining, 
                     "dateofcontractsigning"  => $request->dateofcontractsigning, 
                                 "amcDate"    => $request->amcDate, 
                              "projectValue"  => $request->projectValue, 
                                 "amcvalue"   => $request->amcvalue, 
                             "projectStatus"  => $request->projectStatus,
                                 "address1"   => $request->address1,
                                 "state"      => $request->state,
                                 "address2"   => $request->address2,
                                 "postcode"   => $request->postcode,
                                 "city"       => $request->city,
                                 "country"    => $request->country,
                                 "mobile"     => $request->mobile, 
                                 "email"      => $request->email, 
                         ); 
                 $Register  = Clientregistration::create($RegisterArray['params']);
                
                if(!is_null($Register)){ 
    
                    return response()->json(["status" => $this->status, "success" => true, 
                            "message" => "Registered  successfully", "data" => $Register]);
                }    
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
            }      
        }
    

        public function Clientregistrationuploadfile(Request $request){
          
        $getid = Clientregistration::latest('id')->first(); 
        $id = $getid->id;
        $validator    =  Validator::make($request->all(), 
            [     
             "File"  => "required", 
            ]
         
        );
           if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
            }
           $file = $request->file('File'); 
           $filename = $file->getClientOriginalName();
           $extension = $file->getClientOriginalExtension();
           $location = 'resourcefiles';

            $Registerfile = Clientregistration::where('id',$id)
            ->update([
                "fileAttachment"   =>$file->getClientOriginalName()
            ]);;
            $file->move($location,$filename);
            $filepath = url('resourcefiles/'.$filename);

                if(!is_null($Registerfile)){ 

                    return response()->json(["status" => $this->status, "success" => true, 
                            "message" => "Registered  successfully", "data" => $Registerfile]);
                }    
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
                }   
          
        }
        public function Clientregistrationuploadfileid($id,Request $request){
          
            // $getid = Clientregistration::latest('id')->first(); 
            // $id = $getid->id;
            $validator    =  Validator::make($request->all(), 
                [     
                 "File"  => "required", 
                ]
             
            );
               if($validator->fails()) {
                return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
                }
               $file = $request->file('File'); 
               $filename = $file->getClientOriginalName();
               $extension = $file->getClientOriginalExtension();
               $location = 'resourcefiles';
               
                $Registerfile = Clientregistration::where('id',$id)
                ->update([
                    "fileAttachment"   =>$file->getClientOriginalName()
                ]);;
                $file->move($location,$filename);
                $filepath = url('resourcefiles/'.$filename);
    
                    if(!is_null($Registerfile)){ 
    
                        return response()->json(["status" => $this->status, "success" => true, 
                                "message" => "Registered  successfully", "data" => $Registerfile]);
                    }    
                    else {
                        return response()->json(["status" => "failed", "success" => false,
                                    "message" => "Whoops! failed to create."]);
                    }   
              
            }

            
        // list value
    
        public function ClientregistrationList() {
    
            $ClientregistrationAll = DB::table('client_registrations as cr')
            ->select('cr.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','cr.congregation')
            ->leftjoin('provinces as pr','pr.id','cr.province')
            ->get();

            if(count($ClientregistrationAll) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($ClientregistrationAll), "data" => $ClientregistrationAll]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }
        }


        public function ClientregistrationDelete($id){
            $Congregationdel = Clientregistration::find($id);
            $Congregationdel->delete();
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Province deleted  successfully"]);
        }

        public function ClientregistrationEdit($id){
           
            $Congregationedit = Clientregistration::where('id',$id)->get();
            if(count($Congregationedit) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Congregationedit), "data" => $Congregationedit]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }

        }
        
        public function Clientregistrationupdate($id,Request $request){
           
            $Congregationupdate = Clientregistration::where('id',$id)
            ->update([
                "congregation"   => $request->congregation,
                    "province"   => $request->province,
                    "name"       => $request->name,
                    "place"      => $request->place,
                    "clientType" => $request->clientType,
                "financialyear"  => $request->financialyear,
                    "clientcode" => $request->clientcode, 
                "dateofjoining"  => $request->dateofjoining, 
        "dateofcontractsigning"  => $request->dateofcontractsigning, 
                    "amcDate"    => $request->amcDate, 
                "projectValue"  => $request->projectValue, 
                    "amcvalue"   => $request->amcvalue, 
                "projectStatus"  => $request->projectStatus,
                    "address1"   => $request->address1,
                    "state"      => $request->state,
                    "address2"   => $request->address2,
                    "postcode"   => $request->postcode,
                    "city"       => $request->city,
                    "country"    => $request->country,
                    "mobile"     => $request->mobile, 
                    "email"      => $request->email, 
            ]);
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation updated  successfully"]);
        }
}
