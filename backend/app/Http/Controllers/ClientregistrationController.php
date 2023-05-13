<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Province;
use App\Models\Clientregistration;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Projects;
use App\Models\Datasupport;
use App\Models\Housecommunity;
use App\Models\Mobileapps;
use App\Models\Onlinemeet;
use App\Models\Onsitemeet;
use App\Models\Memberdata;
use App\Models\Ios;
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
                    "clienttype" => "required",
                    "financialyear"  => "required",
                    "clientcode" => "required",
                    "dateofjoining"  => "required",
                    "dateofcontractsigning"  => "required",
                    "amcdate"    => "required",
                    "projectvalue"  => "required",
                    "amcvalue"   => "required",
                    "projectstatus"  => "required",
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

            $Website = $request->website;
            $WebApplication = $request->webapplication;
            $WebApp = $request->app;

            if($Website != 1){
                $websitedata = null;
            }else{
                $websitedata =$Website;
            }
        
            if($WebApplication != 1){
                $WebApplicationdata = null;
            }else{
                $WebApplicationdata =$WebApplication;
            }  
            
            if($WebApp != 1){
                $WebAppdata = null;
            }else{
                $WebAppdata =$WebApp;
            }

            $RegisterArray['params'] = array(
                "congregation"   => $request->congregation,
                "province"   => $request->province,
                "name"       => $request->name,
                "place"      => $request->place,
                "clienttype" => $request->clienttype,
                "financialyear"  => $request->financialyear,
                "clientcode" => $request->clientcode, 
                "dateofjoining"  => $request->dateofjoining, 
                "dateofcontractsigning"  => $request->dateofcontractsigning, 
                "amcdate"    => $request->amcdate, 
                "website"    => $websitedata, 
                "app"        => $WebAppdata, 
                "webapplication"    => $WebApplicationdata, 
                "projectvalue"  => $request->projectvalue, 
                "amcvalue"   => $request->amcvalue, 
                "projectstatus"  => $request->projectstatus,
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

            $getid = [
            "client_id" => $Register->id
            ];

            $project = Projects::create($getid );
            $project = Datasupport::create($getid );
            $project = Housecommunity::create($getid );
            $project = Mobileapps::create($getid );
            $project = Memberdata::create($getid );
            $project = Ios::create($getid );
            $project = Onlinemeet::create($getid );
            $project = Onsitemeet::create($getid );

            if(!is_null($Register)){ 
                return response()->json(["status" => $this->status, "success" => true, 
                    "message" => "Registered  successfully", "data" => $Register]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false,
                        "message" => "Whoops! failed to create."]);
            }      
        }
    

        public function Clientregistrationuploadfile(Request $request)
        {
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
                "fileattachment"   =>$file->getClientOriginalName()
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

        public function Clientregistrationuploadfileid($id,Request $request)
        {
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
            
            $Registerfile = Clientregistration::where('id',$id)->update([
                "fileattachment"   =>$file->getClientOriginalName()
            ]);

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
            ->orderBy('cr.id','desc')
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
        
        public function Clientregistrationupdate($id,Request $request)
        {
            $Website = $request->website;
            $WebApplication = $request->webapplication;
            $WebApp = $request->app;
             if($Website != 1){
                $websitedata = null;
             }else{
                $websitedata =$Website;
             }
            
             if($WebApplication != 1){
                $WebApplicationdata = null;
             }else{
                $WebApplicationdata =$WebApplication;
             }  
             
             if($WebApp != 1){
                $WebAppdata = null;
             }else{
                $WebAppdata =$WebApp;
             }
            //  dd($websitedata);
            $Congregationupdate = Clientregistration::where('id',$id)
                ->update([
                    "congregation"   => $request->congregation,
                    "province"   => $request->province,
                    "name"       => $request->name,
                    "place"      => $request->place,
                    "clienttype" => $request->clienttype,
                    "financialyear"  => $request->financialyear,
                    "clientcode" => $request->clientcode, 
                    "dateofjoining"  => $request->dateofjoining, 
                    "dateofcontractsigning"  => $request->dateofcontractsigning, 
                    "amcdate"    => $request->amcdate, 
                    "projectvalue"  => $request->projectvalue, 
                    "amcvalue"   => $request->amcvalue, 
                    "projectstatus"  => $request->projectstatus,
                    "address1"   => $request->address1,
                    "state"      => $request->state,
                    "address2"   => $request->address2,
                    "postcode"   => $request->postcode,
                    "city"       => $request->city,
                    "country"    => $request->country,
                    "mobile"     => $request->mobile, 
                    "email"      => $request->email, 
                    "website"    => $websitedata, 
                    "app"        => $WebAppdata, 
                    "webapplication"    => $WebApplicationdata, 
                ]);

            // $getid = [
            //     "client_id" => $id
            // ];
            // $project = Projects::where('client_id', $getid['client_id'])->update($getid);
            // $project = Datasupport::where('client_id', $getid['client_id'])->update($getid);
            // $project = Housecommunity::where('client_id', $getid['client_id'])->update($getid);
            // $project = Mobileapps::where('client_id', $getid['client_id'])->update($getid);
            // $project = Memberdata::where('client_id', $getid['client_id'])->update($getid);
            // $project = Ios::where('client_id', $getid['client_id'])->update($getid);
            // $project = Onlinemeet::where('client_id', $getid['client_id'])->update($getid);
            // $project = Onsitemeet::where('client_id', $getid['client_id'])->update($getid);

            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation updated  successfully"]);
        }

        public function ProvinceAddressget($id){
         
            $Provinceaddress = DB::table('congregation as cr')
            ->select('cr.congregation','pr.congregation','pr.address1'
            ,'pr.state','pr.address2','pr.postcode','pr.city','pr.country',
            'pr.mobile','pr.email')
            ->leftjoin('provinces as pr','pr.congregation','cr.id')
            ->where('pr.id',$id)
            ->get();

            if(count($Provinceaddress) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Provinceaddress), "data" => $Provinceaddress]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }

        }

        public function CheckUniquecode($data){

            $CheckUniquecoderegister = Clientregistration::where('clientcode',$data)->first();
         
            if($CheckUniquecoderegister !=null){
                return response()->json(["status" => $this->status, "success" => true 
               , "message" => "true"]);
            }else{
                return response()->json(["status" => "failed",
                "success" => false, "message" => "false"]);
            }

        }

        public function Clients($id){

            $Clients = Clientregistration::where('id',$id)->get();
         
            if($Clients != null){
                return response()->json(["status" => $this->status, "success" => true 
               , "message" => "true", "data" => $Clients]);
            }else{
                return response()->json(["status" => "failed",
                "success" => false, "message" => "false"]);
            }

        }

}
