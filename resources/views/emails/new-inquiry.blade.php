<x-mail::message>
# New Website Lead Received

A new inquiry was submitted on the Ashwin Group portal.

- **Name:** {{ $inquiry->name }}
- **Phone:** {{ $inquiry->phone }}
- **Email:** {{ $inquiry->email ?: 'Not provided' }}
- **City / Region:** {{ $inquiry->city_region ?: 'Not provided' }}
- **Division:** {{ $inquiry->interest_division }}
- **Subject:** {{ $inquiry->subject }}
- **Source:** {{ $inquiry->source_page }}

**Message:**

{{ $inquiry->message }}

@if ($inquiry->whatsapp_url)
<x-mail::button :url="$inquiry->whatsapp_url">
Reply on WhatsApp
</x-mail::button>
@endif

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

