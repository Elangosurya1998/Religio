<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Clientregistration;
use DB;

class PaymentController extends Controller
{
    Private $status = 200;
    public function paymentstore(Request $request){

        $paymentArray['params'] = array(
                    "clienttype" => $request->clienttype,
                    "congregation" => $request->congregation,
                    "province" => $request->province,
                    "product" => $request->product,
                    "place" => $request->place,
                    "financialyear"   => $request->financialyear,
                    "clientcode" => $request->clientcode,
                    "pi"   => $request->pi,
                    "projectvalue"   => $request->projectvalue,
                    "amcvalue" => $request->amcvalue,
                    "gst" => $request->gst,
                    "total"   => $request->total,
                    "paid" => $request->paid,
                    "balancepaid" => $request->balancepaid,
                    "balance"   => $request->balance,
                    "renewelmonth"   => $request->renewelmonth,
                );
                $payment  = Payment::create($paymentArray['params']);

                if(!is_null($payment)){

                    return response()->json(["status" => $this->status, "success" => true,
                            "message" => "Payment record created successfully", "data" => $payment]);
                }
                else {
                    return response()->json(["status" => "failed", "success" => false,
                                "message" => "Whoops! failed to create."]);
            }
    }

    public function Paymentlist() {
            $payment = DB::table('payments as pay')
            ->select('pay.*','co.congregation','pr.province','cl.amcvalue','cl.projectvalue')
            ->leftjoin('congregation as co','co.id','pay.congregation')
            ->leftjoin('provinces as pr','pr.id','pay.province')
            ->leftjoin('client_registrations as cl','cl.province','pay.province')
            ->orderBy('pay.id','desc')
            ->get();

            if(count($payment) > 0) {
                return response()->json(["status" => $this->status, "success" => true,
                            "count" => count($payment), "data" => $payment]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }

    }

    public function paymentuploadfile(Request $request){
       
       

        $getid = Payment::latest('id')->first(); 
        $id = $getid->id;
       
    
            $file = $request->file('File'); 
            $filereceipt = $request->file('FileRes'); 
            // $filerecept
           
            $filename = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $location = 'Invoice';

            $receptname = $filereceipt->getClientOriginalName();
            $extension = $filereceipt->getClientOriginalExtension();
            $place = 'Receipt';

            $Registerfile = Payment::where('id',$id)->update([
                "invoice"   =>$file->getClientOriginalName(),
                "receipt"   =>$filereceipt->getClientOriginalName()
            ]);

            $file->move($location,$filename);
            $filereceipt->move($place,$receptname);
            $filepath = url('Invoice/'.$filename);
            $resfilepath = url('Receipt/'.$receptname);
    
            if(!is_null($Registerfile)){ 

                return response()->json(["status" => $this->status, "success" => true, 
                        "message" => "Registered  successfully", "data" => $Registerfile]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false,
                            "message" => "Whoops! failed to create."]);
            }   
              
    }

    public function updateuploadfile(Request $request,$id){
       
        $file = $request->file('File'); 
        $filereceipt = $request->file('FileRes'); 
        
        $filename = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $location = 'Invoice';

        $receptname = $filereceipt->getClientOriginalName();
        $extension = $filereceipt->getClientOriginalExtension();
        $place = 'Receipt';

        $Registerfile = Payment::where('id',$id)->update([
            "invoice"   =>$file->getClientOriginalName(),
            "receipt"   =>$filereceipt->getClientOriginalName()
        ]);

        $file->move($location,$filename);
        $filereceipt->move($place,$receptname);
        $filepath = url('Invoice/'.$filename);
        $resfilepath = url('Receipt/'.$receptname);

        if(!is_null($Registerfile)){ 

            return response()->json(["status" => $this->status, "success" => true, 
                    "message" => "Registered  successfully", "data" => $Registerfile]);
        }    
        else {
            return response()->json(["status" => "failed", "success" => false,
                        "message" => "Whoops! failed to create."]);
        }   
    }
    public function PaymentEdit($id){

        $payment = Payment::where('id',$id)->get();
        if(count($payment) > 0) {
            return response()->json(["status" => $this->status, "success" => true,
                        "count" => count($payment), "data" => $payment]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }

    }

    public function PaymentUpdate($id, Request $request){
        $payment = Payment::where('id',$id)
            ->update([
                "clienttype" => $request->clienttype,
                "congregation" => $request->congregation,
                "province" => $request->province,
                "product" => $request->product,
                "place" => $request->place,
                "financialyear"   => $request->financialyear,
                "clientcode" => $request->clientcode,
                "pi"   => $request->pi,
                "renewelmonth"   => $request->renewelmonth,
                "projectvalue"   => $request->projectvalue,
                "amcvalue" => $request->amcvalue,
                "gst" => $request->gst,
                "total"   => $request->total,
                "paid" => $request->paid,
                "balancepaid" => $request->balancepaid,
                "balance"   => $request->balance,
               ]);

               return response()->json(
                   ["status" => $this->status, "success" => true,
                   "message" => " Payment Status updated  successfully"]);
           }

     public function PaymentDelete($id){
        $payment = Payment::find($id);
        $payment->delete();
            return response()->json(
                ["status" => $this->status, "success" => true,
                "message" => " Province deleted  successfully"]);
        }


    public function PaymentAddress($id){

        $clientRegisterData = Clientregistration::where('province',$id)->first();

            if($clientRegisterData) {
                return response()->json(["status" => $this->status, "success" => true, "data" => $clientRegisterData]);
            }
            else {
                return response()->json(["status" => "failed",
                "success" => false, "message" => "Whoops! no record found"]);
            }

        }

}
