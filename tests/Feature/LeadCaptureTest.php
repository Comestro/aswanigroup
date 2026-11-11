<?php

use App\Mail\NewInquiryMail;
use App\Models\Inquiry;
use App\Models\Venture;
use Database\Seeders\AshwinGroupSeeder;
use Illuminate\Support\Facades\Mail;

beforeEach(function (): void {
    $this->seed(AshwinGroupSeeder::class);
});

test('visitor can submit inquiry which saves lead, sends email, and builds whatsapp url', function (): void {
    Mail::fake();

    $venture = Venture::query()->where('slug', 'water-industries')->firstOrFail();

    $response = $this->from(route('contact'))->post(route('inquiries.store'), [
        'venture_id' => $venture->id,
        'name' => 'Amitabh Verma',
        'phone' => '9876543210',
        'email' => 'amitabh@example.com',
        'city_region' => 'Muzaffarpur, Bihar',
        'interest_division' => $venture->name,
        'subject' => 'Signature Water Dealership',
        'message' => 'Interested in district dealership for Muzaffarpur.',
        'source_page' => 'contact',
        'website' => '',
    ]);

    $response->assertRedirect(route('contact'));
    $response->assertSessionHas('whatsapp_url');

    $inquiry = Inquiry::query()->where('email', 'amitabh@example.com')->first();
    expect($inquiry)->not->toBeNull();
    expect($inquiry?->whatsapp_url)->toStartWith('https://wa.me/919507488833?text=');
    expect($inquiry?->email_sent)->toBeTrue();

    Mail::assertSent(NewInquiryMail::class, fn (NewInquiryMail $mail): bool => $mail->inquiry->is($inquiry));
});

test('honeypot blocks spam inquiry submissions', function (): void {
    Mail::fake();

    $this->post(route('inquiries.store'), [
        'name' => 'Spam Bot',
        'phone' => '9999999999',
        'interest_division' => 'Water Industries',
        'subject' => 'SEO Spam',
        'message' => 'Buy cheap backlinks now!',
        'website' => 'https://spam.example.com',
    ])->assertSessionHasErrors('website');

    expect(Inquiry::query()->count())->toBe(0);
    Mail::assertNothingSent();
});
