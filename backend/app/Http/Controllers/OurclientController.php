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
            ->select('oc.*','cg.congregation as cgname','pr.province as prname','cr.name as crname')
            ->leftjoin('congregation as cg', 'oc.congregation','=','cg.id')
            ->leftjoin('provinces as pr', 'oc.province','=','pr.id')
            ->leftjoin('client_registrations as cr', 'oc.client','=','cr.id')
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
        $client = $request->client;
        
        // Retrieve file
        $file = $request->file('logo');
        $fileName = $file->getClientOriginalName();

        // Move the file to the desired location
        $file->move(public_path('Ourclient/logo/'), $fileName);

        $input = [
            'congregation' => $cong,
            'province' => $province,
            'client' => $client,
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
    public function edit($id)
    {
        $Ourclientedit = Ourclient::where('id',$id)->get();
            if(count($Ourclientedit) > 0) {
                return response()->json(["status" => $this->status, "success" => true, 
                            "count" => count($Ourclientedit), "data" => $Ourclientedit]);
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
     * @param  \App\Models\Ourclient  $Ourclient
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $cong = $request->congregation;
        $province = $request->province;
        $client = $request->client;
        $filename =$request->file('logo');
        // Retrieve file
        // Move the file to the desired location
      
        if($filename != null){
            $file = $request->file('logo');
            $fileName = $file->getClientOriginalName();
            $file->move(public_path('Ourclient/logo/'), $fileName);
        }else{
            $fileName = $request->logo;
        }

        $input = [
            'congregation' => $request->congregation,
            'province' => $province,
            'client' => $client,
            'logo' => $fileName
        ];

        

        $Clientupdate = Ourclient::where('id',$id)->update($input);

  

        if(!is_null($Clientupdate)){ 

            return response()->json(["status" => $this->status, "success" => true, 
                    "message" => "File uploaded successfully", "data" => $Clientupdate]);
        }    
        else {
            return response()->json(["status" => "failed", "success" => false,
                        "message" => "Whoops! failed to create."]);
        } 
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
