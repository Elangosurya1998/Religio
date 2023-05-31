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
        $data = Domainrenewal::all();

        if(count($data) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($data), "data" => $data]);
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
    public function edit(Domainrenewal $Domainrenewal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Domainrenewal  $Domainrenewal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Domainrenewal $Domainrenewal)
    {
        //
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