<?php

namespace App\Http\Controllers;

use App\Models\Domainrenewal;
use Illuminate\Http\Request;
use carbon\Carbon;
use DB;


class DomainrenewalController extends Controller
{
    Private $status = 200;
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
        $data= DB::table('domainrenewal')->orderBy('id','desc')->get();
       $alldata=[];
        foreach ($data as $key => $value) {
           $id =$value->id;
           $sitename=$value->sitename;
           $servername=$value->servername;
           $siteurl =$value->siteurl;
            $domain_expire_date = date("d-m-Y", strtotime($value->domain_expire_date));
            $alldata[] = [
                'id'=> $id,
                'sitename'=>$sitename,
                'servername'=>$servername,
                'siteurl'=>$siteurl,
                'domain_expire_date'=>$domain_expire_date
            ];
        
        }
        
        if(count($data) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($data), "data" => $alldata]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $input = $request->all();
       
        $Domainrenewal = new Domainrenewal($input);
        $Domainrenewal->save();

        if(!is_null($Domainrenewal)){ 

            return response()->json(["status" => $this->status, "success" => true, 
                    "message" => "File uploaded successfully", "data" => $Domainrenewal]);
        }    
        else {
            return response()->json(["status" => "failed", "success" => false,
                        "message" => "Whoops! failed to create."]);
        } 
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Domainrenewal  $Domainrenewal
     * @return \Illuminate\Http\Response
     */
    public function show(Domainrenewal $Domainrenewal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Domainrenewal  $Domainrenewal
     * @return \Illuminate\Http\Response
     */
    public function domainEdit($id)
    {
        $Getdomain = Domainrenewal::where('id',$id)->first();
        
        if (!is_null($Getdomain)) {
           
            return response()->json(["status" => $this->status, "success" => true, 
            "message" => "success", "data" => $Getdomain]);
        }else {
            return response()->json(["status" => $this->status, "success" => false, 
            "message" => "Failed", "data" => 'empty']);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Domainrenewal  $Domainrenewal
     * @return \Illuminate\Http\Response
     */
    public function domainupdate(Request $request,$id)
    {
        $Domainrenewalupdate = Domainrenewal::where('id',$id)
            ->update([
                'sitename' =>$request->sitename,
                'siteurl' =>$request->siteurl,
                'serverdetail' =>$request->serverdetail,
                'servername' =>$request->servername,
                'domain_create_date' =>$request->domain_create_date,
                'domain_expire_date' =>$request->domain_expire_date
            ]);

        if(!is_null($Domainrenewalupdate)){ 

            return response()->json(["status" => $this->status, "success" => true, 
                    "message" => "Updated successfully", "data" => $Domainrenewalupdate]);
        }    
        else {
            return response()->json(["status" => "failed", "success" => false,
                        "message" => "Whoops! failed to create."]);
        } 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Domainrenewal  $Domainrenewal
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Domainrenewaldel = Domainrenewal::where('id',$id)->first();
        $Domainrenewaldel->delete();
        return response()->json(
            ["status" => $this->status, "success" => true, 
            "message" => " Province deleted  successfully"]);
    }
}
