<?php

namespace App\Http\Controllers;

use App\Models\Ourclient;
use Illuminate\Http\Request;
use carbon\Carbon;
use DB;


class OurclientController extends Controller
{
    Private $status = 200;
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('ourclient as oc')
            ->select('oc.*','cg.congregation as cgname','pr.province as prname')
            ->leftjoin('congregation as cg', 'oc.congregation','=','cg.id')
            ->leftjoin('provinces as pr', 'oc.province','=','pr.id')
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
        $cong = $request->congregation;
        $province = $request->province;
        
        // Retrieve file
        $file = $request->file('logo');
        $fileName = $file->getClientOriginalName();

        // Move the file to the desired location
        $file->move(public_path('Ourclient/logo/'), $fileName);

        $input = [
            'congregation' => $cong,
            'province' => $province,
            'logo' => $file->getClientOriginalName()
        ];

        $Ourclient = new Ourclient($input);
        $Ourclient->save();

        if(!is_null($Ourclient)){ 

            return response()->json(["status" => $this->status, "success" => true, 
                    "message" => "File uploaded successfully", "data" => $Ourclient]);
        }    
        else {
            return response()->json(["status" => "failed", "success" => false,
                        "message" => "Whoops! failed to create."]);
        } 
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ourclient  $Ourclient
     * @return \Illuminate\Http\Response
     */
    public function show(Ourclient $Ourclient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ourclient  $Ourclient
     * @return \Illuminate\Http\Response
     */
    public function edit(Ourclient $Ourclient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ourclient  $Ourclient
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ourclient $Ourclient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ourclient  $Ourclient
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Ourclientdel = Ourclient::where('id',$id)->first();
        $Ourclientdel->delete();
        return response()->json(
            ["status" => $this->status, "success" => true, 
            "message" => " Province deleted  successfully"]);
    }
}
