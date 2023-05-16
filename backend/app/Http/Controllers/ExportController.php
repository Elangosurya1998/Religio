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
        $records = DB::table('client_registrations')->get();

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
        $records = DB::table('provinces')->get();

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
        $records = DB::table('payments')->get();

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
}
