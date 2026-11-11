<?php

namespace Database\Factories;

use App\Models\Inquiry;
use App\Models\Venture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Inquiry>
 */
class InquiryFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'venture_id' => Venture::factory(),
            'name' => fake()->name(),
            'phone' => '9507488833',
            'email' => fake()->safeEmail(),
            'city_region' => 'Patna, Bihar',
            'interest_division' => 'Water Industries',
            'subject' => 'Distributor Inquiry',
            'message' => fake()->paragraph(),
            'source_page' => 'contact',
            'status' => 'new',
            'email_sent' => false,
            'whatsapp_url' => 'https://wa.me/919507488833',
        ];
    }
}
