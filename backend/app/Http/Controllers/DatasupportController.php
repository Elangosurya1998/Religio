<?php

namespace App\Http\Controllers;

use App\Models\Datasupport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class DatasupportController extends Controller
{
  Private $status = 200;
    public function datasupportcreate(Request $request)
   
    {
      $validator = Validator::make($request->all(),
      [
        "noofcommunity"   => "required",
        "noofinstitution" => "required",
        "noofmembers"     => "required",
        "dataentry"       => "required"
      ]);
            if($validator->fails()){
                return response()->json(["status" => "failed", 
                    "validation_errors" => $validator->errors()]);
            }
            $dataentryArray['params'] = array(
                "noofcommunity"   =>$request->noofcommunity,
                "noofinstitution" =>$request->noofinstitution,
                "noofmembers"     =>$request->noofmembers,
                "dataentry"       =>$request->dataentry
            );
            $dataentry  =  Datasupport::create($dataentryArray['params']);

            if(!is_null($dataentry)){ 

                return response()->json(["status" => $this->status, "success" => true, 
                        "message" => "Detasupport record created successfully", "data" => $dataentry]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false,
                            "message" => "Whoops! failed to create."]);
        }      
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Datasupport  $datasupport
     * @return \Illuminate\Http\Response
     */
    public function Datasupportshow(Datasupport $datasupport)
    {
        $dataentry= Datasupport::orderBy('id','desc')->get();
        if(count($dataentry) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($dataentry), "data" => $dataentry]);
        }
        else {
            return response()->json(["status" => "failed",
                        "success" => false, "message" => "Whoops! no record found"]);
        }
    }
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Datasupport  $datasupport
     * @return \Illuminate\Http\Response
     */
    public function Datasupportedit($id)
    {
        $dataentryedit = Datasupport::where('id',$id)->get();
        if(count($dataentryedit) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($dataentryedit), "data" => $dataentryedit]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Datasupport  $datasupport
     * @return \Illuminate\Http\Response
     */
    public function Datasupportupdate($id,Request $request)
    {
            $datasupport = Datasupport::where('id',$id)
            ->update([
                "noofcommunity"   =>$request->noofcommunity,
                "noofinstitution" =>$request->noofinstitution,
                "noofmembers"     =>$request->noofmembers,
                "dataentry"       =>$request->dataentry,
                "client_id"      =>$request->client_id
            ]);
            return response()->json(
                ["status" => $this->status, "success" => true, 
                "message" => " Datasupports will updated  successfully"]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Datasupport  $datasupport
     * @return \Illuminate\Http\Response
     */
    public function Datasupportdestroy($id)
    {
        $datasupportdelte = Datasupport::find($id);
        $datasupportdelte->delete();
        return response()->json(
            ["status" => $this->status, "success" => true, 
            "message" => "Datasupport deleted  successfully"]);
    
    }
}
