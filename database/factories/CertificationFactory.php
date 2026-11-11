<?php

namespace Database\Factories;

use App\Models\Certification;
use App\Models\Venture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Certification>
 */
class CertificationFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'venture_id' => Venture::factory(),
            'type' => 'certificate',
            'title' => fake()->sentence(4),
            'issuer' => fake()->company(),
            'reference_number' => strtoupper(fake()->bothify('AG-####-??')),
            'issued_date' => '2026',
            'description' => fake()->sentence(),
            'image_path' => '/images/ashwin-distributor.jpg',
            'document_path' => '/images/Barista_Brand_Deck_2026.pdf',
            'is_active' => true,
            'sort_order' => 1,
        ];
    }
}
