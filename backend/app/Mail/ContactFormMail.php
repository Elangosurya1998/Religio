<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;
    public $contact_data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
   
    public function __construct($contact_data)
    {
       $this->contact_data = $contact_data;
      
    }
    public function build()
    {
        return $this->subject('Customer FeedBack')->view('mail.contact');
    }


}
