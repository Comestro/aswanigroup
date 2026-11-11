<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewInquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Inquiry $inquiry) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "[Ashwin Group Lead] {$this->inquiry->interest_division}: {$this->inquiry->subject}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.new-inquiry',
        );
    }
}
