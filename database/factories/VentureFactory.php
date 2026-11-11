<?php

namespace Database\Factories;

use App\Models\Venture;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Venture>
 */
class VentureFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->word().' '.fake()->word();

        return [
            'slug' => Str::slug($name),
            'name' => ucwords($name),
            'short_label' => ucwords($name),
            'subtitle' => fake()->sentence(4),
            'badge' => 'Venture',
            'icon_name' => 'Building2',
            'summary' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'location_details' => fake()->city().', India',
            'external_url' => null,
            'external_cta_label' => null,
            'highlights' => [fake()->sentence(4), fake()->sentence(4)],
            'division_image' => '/images/ashwin-water-division.jpg',
            'hero_image' => '/images/industries-hero-bg.png',
            'is_featured' => true,
            'is_active' => true,
            'sort_order' => 1,
        ];
    }
}
