<?php

namespace Database\Factories;

use App\Models\PromoVideo;
use App\Models\Venture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PromoVideo>
 */
class PromoVideoFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'venture_id' => Venture::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->sentence(),
            'source_type' => 'youtube',
            'youtube_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'youtube_id' => 'dQw4w9WgXcQ',
            'video_path' => null,
            'poster_path' => '/images/ashwin-distributor.jpg',
            'is_featured' => true,
            'is_active' => true,
            'sort_order' => 1,
        ];
    }
}
