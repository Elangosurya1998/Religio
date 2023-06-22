<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Congregation;
use Illuminate\Support\Facades\Validator;
use DB;
class ReligioController extends Controller
{ 
    Private $status = 200;
    
    public function Congregation(Request $request)
    {
        
        $validator    =  Validator::make($request->all(), 
        [
            "congregation" => 'required',
            "address1"  => "required",
            "state"  => "required",
            "postcode"=> "required",
            "country"  => "required",
            "mobile"  => "required",
            "email"  => "required",
        ]
        );
            if($validator->fails()) {
                return response()->json(["status" => "failed", 
                                "validation_errors" => $validator->errors()]);
            }
                $projectArray['params'] = array(
                            "congregation" => $request->congregation,
                            "address1" => $request->address1,
                            "state" => $request->state,
                            "address2" => $request->address2,
                            "postcode" => $request->postcode,
                            "city"   => $request->city,
                            "country" => $request->country,
                            "mobile"   => $request->mobile, 
                            "email"   => $request->email,  
                        );

            $project  = Congregation::create($projectArray['params']);

            if(!is_null($project)){ 

                return response()->json(["status" => $this->status, "success" => true, 
                        "message" => "project record created successfully", "data" => $project]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false,
                            "message" => "Whoops! failed to create."]);
        }      
    }
    
    // list value

    public function CongregationList() {

        $Congregation = Congregation::orderBy('id','desc')->get();
        if(count($Congregation) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($Congregation), "data" => $Congregation]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
    }

    public function CongregationDelete($id){

        $Congregationdel =Congregation::find($id);
        $Congregationdel->delete();
        return response()->json(
            ["status" => $this->status, "success" => true, 
            "message" => " Congregation deleted  successfully"]);
    }

    public function CongregationEdit($id){
        
        $Congregationedit = Congregation::where('id',$id)->get();
        if(count($Congregationedit) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($Congregationedit), "data" => $Congregationedit]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
    }
    
    public function Congregationupdate($id,Request $request){
           
        $Congregationupdate = Congregation::where('id',$id)
        ->update([
            "congregation" => $request->congregation,
            "address1" => $request->address1,
            "state" => $request->state,
            "address2" => $request->address2,
            "postcode" => $request->postcode,
            "city"   => $request->city,
            "country" => $request->country,
            "mobile"   => $request->mobile, 
            "email"   => $request->email,  
        ]);
        return response()->json(
            ["status" => $this->status, "success" => true, 
            "message" => " Congregation updated  successfully"]);
    }

    public function Congregationverifydelete($id){
        
        $verifyData = DB::table('provinces')->select('id')->where('congregation',$id)->first();
    
        if($verifyData !=null){
            return response()->json(["status" => $this->status, "success" => true 
            , "message" => "true"]);
        }else{
            return response()->json(["status" => "failed",
            "success" => false, "message" => "false"]);
        }
    }

    public function CongrationAddress($id){
        
        $CongrationAddress = DB::table('congregation as cr')
        ->select('cr.address1'
        ,'cr.state','cr.address2','cr.postcode','cr.city','cr.country',
        'cr.mobile','cr.email')
        ->where('cr.id',$id)
        ->get();
        if(count($CongrationAddress) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($CongrationAddress), "data" => $CongrationAddress]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
    }

    public function BalanceNotification()
    {
        
        $currentMonth = date('m');
        $currentyear = date('y');

        $AmcNotification =  DB::table('client_registrations as cr')
            ->where(DB::raw("(DATE_FORMAT(cr.dateofjoining,'%y'))"),'<=',$currentyear)
            ->orderByRaw("MONTH(cr.dateofjoining)")
            ->get();

        
        foreach($AmcNotification as $AmcNoti){

            $amcdate = date('Y-m', strtotime($AmcNoti->dateofjoining));
            $currentDate = date('Y-m');
            $oneYearAgo = date("Y-m", strtotime("-1 year", strtotime($currentDate)));
            $amcYear = date('Y', strtotime($AmcNoti->dateofjoining));
            $amcCurrent = date('Y');
            $amcCount = $amcCurrent-$amcYear;
            
            $Payments =  DB::table('payments')
            ->where('payments.clientcode',$AmcNoti->clientcode)
            ->get();
            
            $dateofjoining = $AmcNoti->dateofjoining;
            $joindate =date("d-m-Y", strtotime($dateofjoining)); 
            $date = explode('-',$dateofjoining);
             $date[0] = date('Y');
            $imdate = implode('-',$date);
            $dformat =date("d-m-Y", strtotime($imdate)); 
            $month =date("F",strtotime($dformat));
            $amc = [];
            $newsales = []; 
            $outstanding = [];
            $paytotal = [];  

            foreach($Payments as $pay){
                switch ($pay->clienttype) {
                    case 'AMC':
                        $amc[] = $pay->paid;
                        $newsales[] = 0;
                        $outstanding[] =  0;
                        break;
                    case 'NewSales':
                        $amc[] = 0;
                        $newsales[] = $pay->paid;
                        $outstanding[] = 0;
                        break;
                    case 'Outstanding':
                        $amc[] = 0;
                        $newsales[] = 0;
                        $outstanding[] = $pay->paid;
                        break;
                    default:
                        $amc[] = 0;
                        $newsales[] = 0;
                        $outstanding[] = 0;
                        break;
                }
               

            }

            $outstandingVal = ($AmcNoti->amcvalue*$amcCount + intdiv($AmcNoti->amcvalue*$amcCount,100) * 18) - array_sum($amc);

            if($outstandingVal > 0){
                if($oneYearAgo >= $amcdate){
                    $overAll[] = [
                        'name' => $AmcNoti->name,
                        'amcdate'=>$dformat,
                        'Month'=>$month,
                        'Joindate' =>$joindate,
                        // 'clientcode' => $AmcNoti->clientcode,
                        // 'projectvalue' => $AmcNoti->projectvalue,
                        // 'GST' => intdiv($AmcNoti->projectvalue,100) * 18,
                        // 'TotalProjectPay+GST' => array_sum($newsales) + array_sum($outstanding),
                        // 'TotalProjectoutstandingGST' => ($AmcNoti->projectvalue + intdiv($AmcNoti->projectvalue,100) * 18)-(array_sum($newsales)+array_sum($outstanding)),
                        'AMC' => $AmcNoti->amcvalue,
                        // 'AMC gst' => intdiv($AmcNoti->amcvalue,100) * 18,
                        // 'OverallAMC+GST' => $AmcNoti->amcvalue*$amcCount + intdiv($AmcNoti->amcvalue*$amcCount,100) * 18,
                        // 'TotalAMCPay+GST' => array_sum($amc),
                        'TotalAMCoutstanding' => ($AmcNoti->amcvalue*$amcCount + intdiv($AmcNoti->amcvalue*$amcCount,100) * 18) - array_sum($amc)
                    ];
                }
            }
        }
        
    
        if(count($overAll) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($overAll), "data" => $overAll]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
        
    }

    public function OutstandingNotification(){
       
        $AmcNotification =  DB::table('client_registrations')
            ->orderBy('financialyear', 'asc')
            ->get();
      
        
        foreach($AmcNotification as $AmcNoti){  
            $Payments =  DB::table('payments')
            ->where('payments.clientcode',$AmcNoti->clientcode)
            ->get();
            
            $amc = [];
            $newsales = []; 
            $outstanding = [];
            $paytotal = [];  

            foreach($Payments as $pay){
                switch ($pay->clienttype) {
                    case 'AMC':
                        $amc[] = $pay->paid;
                        $newsales[] = 0;
                        $outstanding[] =  0;
                        break;
                    case 'NewSales':
                        $amc[] = 0;
                        $newsales[] = $pay->paid;
                        $outstanding[] = 0;
                        break;
                    case 'Outstanding':
                        $amc[] = 0;
                        $newsales[] = 0;
                        $outstanding[] = $pay->paid;
                        break;
                    default:
                        $amc[] = 0;
                        $newsales[] = 0;
                        $outstanding[] = 0;
                        break;
                }
            }
            

            $outstandingVal = ($AmcNoti->projectvalue + intdiv($AmcNoti->projectvalue,100) * 18)-(array_sum($newsales)+array_sum($outstanding));

                
                if ($newsales) {
                    $paidamount = $newsales;
                }else{
                    $paidamount = 0;
                }
            if($outstandingVal > 0){
                    $overAll[] = [
                        'name' => $AmcNoti->name,
                        'financialyear'=>$AmcNoti->financialyear,
                        'clientcode'=>$AmcNoti->clientcode,
                        'paid' =>$paidamount,
                        'type' =>'New Sales',
                        'projectvalue' => $AmcNoti->projectvalue,
                        'TotalAMCoutstanding' => ($AmcNoti->projectvalue + intdiv($AmcNoti->projectvalue,100) * 18)-(array_sum($newsales)+array_sum($outstanding))
                    ];  
            }
        }
       
    
        if(count($overAll) > 0) {
            return response()->json(["status" => $this->status, "success" => true, 
                        "count" => count($overAll), "data" => $overAll]);
        }
        else {
            return response()->json(["status" => "failed",
            "success" => false, "message" => "Whoops! no record found"]);
        }
    }
    public function AMCOutstanding($clientCode)
    {
        $currentMonth = date('m');
        $currentyear = date('y');
        
        $payments = DB::table('payments as py')
            ->where('py.clientcode',$clientCode)
            ->get();
        
        $client = DB::table('client_registrations as cr')
        ->select('cr.*','co.congregation','pr.province')
        ->leftjoin('payments as py','py.province','cr.province')
        ->leftjoin('congregation as co','co.id','cr.congregation')
        ->leftjoin('provinces as pr','pr.id','cr.province')
        ->where(DB::raw("(DATE_FORMAT(cr.dateofcontractsigning, '%y'))"),'<',DB::raw("(DATE_FORMAT(cr.amcdate, '%y'))"))
        ->where(DB::raw("(DATE_FORMAT(cr.amcdate,'%m'))"),$currentMonth)
        ->where(DB::raw("(DATE_FORMAT(cr.amcdate,'%y'))"),'<=',$currentyear)
        ->where('cr.clientcode',$clientCode)
        ->get();
        

        dd($payments,$client);
        return response()->json(["status" => $this->status, "success" => true, 
                    "data" => $clientCode]);
    }
}

