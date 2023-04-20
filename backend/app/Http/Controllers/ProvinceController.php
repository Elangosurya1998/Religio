<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Congregation;
use App\Models\Province;
use Illuminate\Support\Facades\Validator;
class ProvinceController extends Controller
{ 
        Private $status = 200;
       
        public function Provincestore(Request $request)
        {
           
            $validator    =  Validator::make($request->all(), 
            [
                "Congregation" => 'required',
                "Province"   => "required",
                "Address1"  => "required",
                "state"  => "required",
                "Address2"   => "required",
                "Postcode"=> "required",
                "City"  => "required",
                "country"  => "required",
            ]
           );
                if($validator->fails()) {
                    return response()->json(["status" => "failed", 
                                    "validation_errors" => $validator->errors()]);
                }
                 $ProvinceArray['params'] = array(
                                "Congregation" => $request->Congregation,
                                "Province" => $request->Province,
                                "Address1" => $request->Address1,
                                "state" => $request->state,
                                "Address2" => $request->Address2,
                                "Postcode"   => $request->Postcode, 
                                "City"   => $request->City, 
                                "country"   => $request->country, 
                         );
    
                $Province  = Province::create($ProvinceArray['params']);
    
                if(!is_null($Province)){ 
    
                    return response()->json(["status" => $this->status, "success" => true, 
                            "message" => "Province created successfully", "data" => $Province]);
                }    
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
            }      
        }
    
        // list value
    
        public function ProvinceList() {
    
        $ProvinceAll = Province::all();
            if(count($ProvinceAll) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($ProvinceAll), "data" => $ProvinceAll]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }
        }

        public function ProvinceDelete($id){

            $Congregationdel =Province::find($id);
            $Congregationdel->delete();
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Province deleted  successfully"]);
        }

        public function ProvinceCongregation(){

            $Congregation =Congregation::all();
            if(count($Congregation) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Congregation), "data" => $Congregation]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }
        }
        public function ProvinceEdit($id){
           
            $Congregationedit = Province::where('id',$id)->get();
            if(count($Congregationedit) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Congregationedit), "data" => $Congregationedit]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }
        }public function Provinceupdate($id,Request $request){
           
            $Congregationupdate = Province::where('id',$id)
            ->update([
                "Congregation" => $request->Congregation,
                "Province" => $request->Province,
                "Address1" => $request->Address1,
                "state" => $request->state,
                "Address2" => $request->Address2,
                "Postcode"   => $request->Postcode, 
                "City"   => $request->City, 
                "country"   => $request->country, 
            ]);
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Congregation updated  successfully"]);
        }
}

