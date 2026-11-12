<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Venture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'venture_id' => Venture::factory(),
            'title' => fake()->sentence(3),
            'category_label' => 'Water',
            'location' => fake()->city().', Bihar',
            'completion_year' => (string) fake()->numberBetween(2020, 2026),
            'summary' => fake()->sentence(),
            'image' => [],
            'is_featured_hero' => false,
            'is_active' => true,
            'sort_order' => 1,
        ];
    }
}
