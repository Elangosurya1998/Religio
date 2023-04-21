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
                 "Congregation" => 'required',
                "Province"   => "required",
                "Name"  => "required",
                "Place" => "required",
                "ClientType"  => "required",
                "FinancialYear"   => "required",
                "ClientCode"=> "required",
                "DateofJoining"  => "required",
                "DateofContractSigning"  => "required",
                "AMCDate"  => "required",
                "ProjectValue"  => "required",
                "AMCvalue"  => "required",
                "ProjectStatus"  => "required",
                // "FileAttachment"  => "required",
                "Address1"  => "required",
                "state"  => "required",
                "Address2"   => "required",
                "Postcode"=> "required",
                "City"  => "required",
                "country"  => "required",
                "Mobile"  => "required",
                "Email"  => "required",
            ]
           );
           
                if($validator->fails()) {
                return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
                }
               
        //      $file = $request->file('FileAttachment'); 
        //    $filename = $file->getClientOriginalName();
        //    $extension = $file->getClientOriginalExtension();
        //    $location = 'resourcefiles';

                 $RegisterArray['params'] = array(
                                "Congregation" => $request->Congregation,
                                "Province" => $request->Province,
                                "Name" => $request->Name,
                                "Place" => $request->Place,
                                "ClientType" => $request->ClientType,
                                "FinancialYear" => $request->FinancialYear,
                                "ClientCode"   => $request->ClientCode, 
                                "DateofJoining"   => $request->DateofJoining, 
                                "DateofContractSigning" => $request->DateofContractSigning, 
                                "AMCDate"   => $request->AMCDate, 
                                "ProjectValue"   => $request->ProjectValue, 
                                "AMCvalue"   => $request->AMCvalue, 
                                "ProjectStatus"   => $request->ProjectStatus,
                                // "FileAttachment"   =>file->getClientOriginalName()
                                "Address1" => $request->Address1,
                                "state" => $request->state,
                                "Address2" => $request->Address2,
                                "Postcode" => $request->Postcode,
                                "City"   => $request->City,
                                "country"   => $request->country,
                                "Mobile"   => $request->Mobile, 
                                "Email"   => $request->Email, 
                         );

                      
    
                 $Register  = Clientregistration::create($RegisterArray['params']);
                //  $file->move($location,$filename);
                //  $filepath = url('resourcefiles/'.$filename);
    
                if(!is_null($Register)){ 
    
                    return response()->json(["status" => $this->status, "success" => true, 
                            "message" => "Registered  successfully", "data" => $Register]);
                }    
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
            }      
        }
    
        // list value
    
        public function ClientregistrationList() {
    
            $ClientregistrationAll = DB::table('client_registrations as cr')
            ->select('cr.*','co.CongregationName','pr.Province')
            ->leftjoin('congregation as co','co.id','cr.Congregation')
            ->leftjoin('provinces as pr','pr.id','cr.Province')
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
                "Congregation" => $request->Congregation,
                "Province" => $request->Province,
                "Name" => $request->Name,
                "Place" => $request->Place,
                "ClientType" => $request->ClientType,
                "FinancialYear" => $request->FinancialYear,
                "ClientCode"   => $request->ClientCode, 
                "DateofJoining"   => $request->DateofJoining, 
                "DateofContractSigning" => $request->DateofContractSigning, 
                "AMCDate"   => $request->AMCDate, 
                "ProjectValue"   => $request->ProjectValue, 
                "AMCvalue"   => $request->AMCvalue, 
                "ProjectStatus"   => $request->ProjectStatus,
                "Address1" => $request->Address1,
                "state" => $request->state,
                "Address2" => $request->Address2,
                "Postcode" => $request->Postcode,
                "City"   => $request->City,
                "country"   => $request->country,
                "Mobile"   => $request->Mobile, 
                "Email"   => $request->Email,  
            ]);
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation updated  successfully"]);
        }
}
