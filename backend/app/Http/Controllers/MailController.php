<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

class MailController extends Controller
{
   Private $status = 200;
   public function sendContactMail (Request $request)
   {
    $contact_data = [];
    $contact_data['name'] = $request->input('name');
    $contact_data['email'] = $request->input('email');
    $contact_data['province'] = $request->input('province');
    $contact_data['mobile'] = $request->input('mobile');
    $contact_data['message'] = $request->input('message');

    Mail::to('elango@boscosofttech.com')->send(new ContactFormMail( $contact_data));
    return response()->json(
        ["status" => $this->status, "success" => true, 
        "message" => " Mail Sent successfully"]);
   }
}
