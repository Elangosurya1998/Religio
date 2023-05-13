<?php

namespace App\Http\Controllers;

use App\Models\Ourcustomersay;
use Illuminate\Http\Request;
use carbon\Carbon;
use DB;


class OurCustomerSayController extends Controller
{
    Private $status = 200;
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('ourcustomersays as cs')
            ->select('cs.*','cg.congregation as cgname','pr.province as prname','cr.name as crname','oc.logo')
            ->leftjoin('congregation as cg', 'cs.congregation','=','cg.id')
            ->leftjoin('provinces as pr', 'cs.province','=','pr.id')
            ->leftjoin('client_registrations as cr', 'cs.client','=','cr.id')
            ->leftjoin('ourclient as oc', 'cs.client','=','oc.client')
            ->get();

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

        $Ourcustomersay = new Ourcustomersay($input);
        $Ourcustomersay->save();

        if(!is_null($Ourcustomersay)){ 

            return response()->json(["status" => $this->status, "success" => true, 
                    "message" => "File uploaded successfully", "data" => $Ourcustomersay]);
        }    
        else {
            return response()->json(["status" => "failed", "success" => false,
                        "message" => "Whoops! failed to create."]);
        } 
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ourcustomersay  $Ourcustomersay
     * @return \Illuminate\Http\Response
     */
    public function show(Ourcustomersay $Ourcustomersay,$id)
    {
        $data = DB::table('ourcustomersays as cs')
            ->select('cs.*','cg.congregation as cgname','pr.province as prname','cr.name as crname','oc.logo')
            ->leftjoin('congregation as cg', 'cs.congregation','=','cg.id')
            ->leftjoin('provinces as pr', 'cs.province','=','pr.id')
            ->leftjoin('client_registrations as cr', 'cs.client','=','cr.id')
            ->leftjoin('ourclient as oc', 'cs.client','=','oc.client')
            ->where('cs.id',$id)
            ->first();

        if($data != null) {
            return response()->json(["status" => $this->status, "success" => true, "data" => $data]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ourcustomersay  $Ourcustomersay
     * @return \Illuminate\Http\Response
     */
    public function edit(Ourcustomersay $Ourcustomersay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ourcustomersay  $Ourcustomersay
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ourcustomersay $Ourcustomersay)
    {

        $input = $request->all();
        $Ourcustomersay = Ourcustomersay::where('id', $request->id)->first();
        $Ourcustomersay->update($input);

        if(!is_null($Ourcustomersay)){ 

            return response()->json(["status" => $this->status, "success" => true, 
                    "message" => "File uploaded successfully", "data" => $Ourcustomersay]);
        }    
        else {
            return response()->json(["status" => "failed", "success" => false,
                        "message" => "Whoops! failed to create."]);
        } 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ourcustomersay  $Ourcustomersay
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Ourcustomersaydel = Ourcustomersay::where('id',$id)->first();
        $Ourcustomersaydel->delete();
        return response()->json(
            ["status" => $this->status, "success" => true, 
            "message" => " Province deleted  successfully"]);
    }

    public function OurCustomerSayindex()
    {
        $data = DB::table('ourcustomersays as cs')
            ->select('cs.*','cg.congregation as cgname','pr.province as prname','cr.name as crname','oc.logo')
            ->leftjoin('congregation as cg', 'cs.congregation','=','cg.id')
            ->leftjoin('provinces as pr', 'cs.province','=','pr.id')
            ->leftjoin('client_registrations as cr', 'cs.client','=','cr.id')
            ->leftjoin('ourclient as oc', 'cs.client','=','oc.client')
            ->limit(3)->latest()
            ->orderBy('cs.id', 'asc')
            ->get();

        if(count($data) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($data), "data" => $data]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
    }
}
