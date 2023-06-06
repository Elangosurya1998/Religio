<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clientregistration;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function exportTable()
    {
  
        $records = DB::table('client_registrations as cr')
        ->leftjoin('congregation as co', 'co.id', 'cr.congregation')
        ->leftjoin('provinces as pr', 'pr.id', 'cr.province')
        ->select('co.congregation','pr.province')
        ->select('cr.id','co.congregation','pr.province','cr.name','cr.place','cr.clienttype','cr.financialyear','cr.clientcode','cr.dateofjoining','cr.dateofcontractsigning',
                    'cr.amcdate','cr.projectvalue','cr.amcvalue','cr.projectstatus','cr.fileattachment','cr.webapplication','cr.app','cr.website','cr.address1','cr.state','cr.address2','cr.postcode','cr.city','cr.country','cr.mobile','cr.email')
        ->get();
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="client_registration.csv"',
        ];

        $callback = function () use ($records) {
            $file = fopen('php://output', 'w');

            // Write CSV headers
            fputcsv($file, array_keys((array) $records[0]));

            // Write CSV data
            foreach ($records as $record) {
                fputcsv($file, (array) $record);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
    public function exportcongregationTable()
    {
        $records = DB::table('congregation')->get();
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="congregation_data.csv"',
        ];

        $callback = function () use ($records) {
            $file = fopen('php://output', 'w');

            // Write CSV headers
            fputcsv($file, array_keys((array) $records[0]));

            // Write CSV data
            foreach ($records as $record) {
                fputcsv($file, (array) $record);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
    public function exportprovinceTable()
    {
        $records = DB::table('client_registrations as cr')
        ->leftjoin('congregation as co', 'co.id', 'cr.congregation')
        ->leftjoin('provinces as pr', 'pr.id', 'cr.province')
        ->select('pr.id','co.congregation','pr.province','pr.address1','pr.state','pr.address2','pr.postcode','pr.city','pr.country','pr.mobile','pr.email',
        'pr.contactname','pr.contactrole','pr.contactemail','pr.contactmobile','pr.contactstatus')
        ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="province_data.csv"',
        ];

        $callback = function () use ($records) {
            $file = fopen('php://output', 'w');

            // Write CSV headers
            fputcsv($file, array_keys((array) $records[0]));

            // Write CSV data
            foreach ($records as $record) {
                fputcsv($file, (array) $record);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
    public function exportpaymentTable()
    {
        $records = DB::table('client_registrations as cr')
        ->leftjoin('congregation as co', 'co.id', 'cr.congregation')
        ->leftjoin('provinces as pr', 'pr.id', 'cr.province')
        ->leftjoin('payments as pay','cr.id','=','pay.id')
        ->select('pay.id','co.congregation','pr.province','pay.product','pay.pi','pay.balancepaid','pay.renewelmonth','pay.gst','pay.total','pay.paid',
                    'pay.balance','pay.clienttype','pay.financialyear','pay.clientcode','pay.projectvalue','pay.amcvalue','pay.place',    
                    DB::raw('(CASE 
                    WHEN pay.status IS NOT NULL THEN pay.status 
                    ELSE "Pending"
                    END) AS status')
                )
        ->get();


    


        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="payment_data.csv"',
        ];

        $callback = function () use ($records) {
            $file = fopen('php://output', 'w');

            // Write CSV headers
            fputcsv($file, array_keys((array) $records[0]));

            // Write CSV data
            foreach ($records as $record) {
                fputcsv($file, (array) $record);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
    public function exportuserTable()
    {
        $records = DB::table('users')->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="users_data.csv"',
        ];

        $callback = function () use ($records) {
            $file = fopen('php://output', 'w');

            // Write CSV headers
            fputcsv($file, array_keys((array) $records[0]));

            // Write CSV data
            foreach ($records as $record) {
                fputcsv($file, (array) $record);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
    public function OurClientExport(){
        $data = DB::table('ourclient as oc')
            ->select('cg.congregation as congregation','pr.province as province','cr.name as name','oc.logo')
            ->leftjoin('congregation as cg', 'oc.congregation','=','cg.id')
            ->leftjoin('provinces as pr', 'oc.province','=','pr.id')
            ->leftjoin('client_registrations as cr', 'oc.client','=','cr.id')
            ->get();
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="users_data.csv"',
            ];
            $callback = function () use ($data) {
                $file = fopen('php://output', 'w');
    
                // Write CSV headers
                fputcsv($file, array_keys((array) $data[0]));
    
                // Write CSV data
                foreach ($data as $record) {
                    fputcsv($file, (array) $record);
                }
    
                fclose($file);
            };
    
            return new StreamedResponse($callback, 200, $headers);
    }
    public function domainexport(){
        $data = DB::table('domainrenewal')->get();
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="users_data.csv"',
        ];
        $callback = function () use ($data) {
            $file = fopen('php://output', 'w');

            // Write CSV headers
            fputcsv($file, array_keys((array) $data[0]));

            // Write CSV data
            foreach ($data as $record) {
                fputcsv($file, (array) $record);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
    public function Ourcustomersayexport(){
        $data = DB::table('ourcustomersays as cs')
            ->select('cg.congregation as congregation','pr.province as province','cr.name as name','cs.title','cs.comments')
            ->leftjoin('congregation as cg', 'cs.congregation','=','cg.id')
            ->leftjoin('provinces as pr', 'cs.province','=','pr.id')
            ->leftjoin('client_registrations as cr', 'cs.client','=','cr.id')
            ->leftjoin('ourclient as oc', 'cs.client','=','oc.client')
            ->get();
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="users_data.csv"',
            ];
            $callback = function () use ($data) {
                $file = fopen('php://output', 'w');
    
                // Write CSV headers
                fputcsv($file, array_keys((array) $data[0]));
    
                // Write CSV data
                foreach ($data as $record) {
                    fputcsv($file, (array) $record);
                }
    
                fclose($file);
            };
    
            return new StreamedResponse($callback, 200, $headers);
    }

}
