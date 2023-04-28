<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Payment;
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
            ->select('pay.*','co.congregation','pr.province')
            ->leftjoin('congregation as co','co.id','pay.congregation')
            ->leftjoin('provinces as pr','pr.id','pay.province')
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

}
