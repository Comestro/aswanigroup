<?php

namespace App\Services;

use App\Models\Inquiry;
use App\Models\SiteSetting;

class WhatsappLinkBuilder
{
    /**
     * Build a pre-filled WhatsApp click-to-chat URL for an inquiry lead.
     */
    public function forInquiry(Inquiry $inquiry, ?SiteSetting $settings = null): string
    {
        $settings ??= SiteSetting::current();
        $phone = $settings->normalizedWhatsappNumber();

        $lines = array_filter([
            "*New {$settings->company_name} Inquiry*",
            "Name: {$inquiry->name}",
            "Phone: {$inquiry->phone}",
            $inquiry->email ? "Email: {$inquiry->email}" : null,
            $inquiry->city_region ? "Location: {$inquiry->city_region}" : null,
            "Division: {$inquiry->interest_division}",
            "Subject: {$inquiry->subject}",
            "Message: {$inquiry->message}",
        ]);

        return 'https://wa.me/'.$phone.'?text='.rawurlencode(implode("\n", $lines));
    }
}
