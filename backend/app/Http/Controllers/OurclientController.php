<?php

namespace App\Http\Controllers;

use App\Models\Ourclient;
use Illuminate\Http\Request;
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
        $data = Ourclient::orderBy('id','desc')->get();
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
        Ourclient::insert($input);
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
    public function destroy(Ourclient $Ourclient)
    {
        //
    }
}
