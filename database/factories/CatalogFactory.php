<?php

namespace Database\Factories;

use App\Models\Catalog;
use App\Models\Venture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Catalog>
 */
class CatalogFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'venture_id' => Venture::factory(),
            'title' => fake()->company().' Catalog',
            'description' => fake()->sentence(),
            'file_path' => '/images/Barista_Brand_Deck_2026.pdf',
            'file_size_label' => '2.4 MB',
            'download_count' => 0,
            'is_active' => true,
            'sort_order' => 1,
        ];
    }
}
