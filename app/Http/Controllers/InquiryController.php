<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Mail\NewInquiryMail;
use App\Models\Inquiry;
use App\Models\SiteSetting;
use App\Services\WhatsappLinkBuilder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request, WhatsappLinkBuilder $whatsapp): RedirectResponse
    {
        $validated = $request->validated();
        unset($validated['website']);

        $settings = SiteSetting::current();

        $inquiry = Inquiry::query()->create([
            'venture_id' => $validated['venture_id'] ?? null,
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'city_region' => $validated['city_region'] ?? null,
            'interest_division' => $validated['interest_division'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'source_page' => $validated['source_page'] ?? 'contact',
            'status' => 'new',
        ]);

        $whatsappUrl = $whatsapp->forInquiry($inquiry, $settings);
        $emailSent = false;

        $recipient = $settings->inquiry_recipient_email ?: $settings->primary_email;

        if (is_string($recipient) && $recipient !== '') {
            try {
                Mail::to($recipient)->send(new NewInquiryMail($inquiry));
                $emailSent = true;
            } catch (\Throwable $exception) {
                report($exception);
            }
        }

        $inquiry->update([
            'whatsapp_url' => $whatsappUrl,
            'email_sent' => $emailSent,
        ]);

        return back()->with([
            'success' => 'Thank you! Your inquiry has been recorded and forwarded to our team. Click below to also send it instantly on WhatsApp.',
            'whatsapp_url' => $whatsappUrl,
        ]);
    }
}
