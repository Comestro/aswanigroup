<?php

namespace Database\Factories;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SiteSetting>
 */
class SiteSettingFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_name' => 'Ashwin Group',
            'company_full_name' => 'Ashwin Group of Companies',
            'tagline' => 'Powering a Smart, Sustainable & Trusted Future',
            'hero_description' => fake()->paragraph(),
            'est_year' => '1995',
            'logo_images' => [],
            'founder_name' => 'Mr. R.K. Ashwin',
            'founder_title' => 'Founder & Chairman',
            'chairman_quote' => fake()->sentence(),
            'chairman_message' => fake()->paragraph(),
            'chairman_images' => [],
            'vision_text' => fake()->sentence(),
            'mission_text' => fake()->sentence(),
            'core_values' => ['Quality Control', 'Transparency'],
            'timeline_items' => [
                ['year' => '1995', 'title' => 'Foundation', 'description' => 'Founded in Bihar.'],
            ],
            'hero_stats' => [
                ['value' => '4', 'label' => 'Core Ventures', 'icon' => 'Building2'],
            ],
            'hq_address' => 'Patna, Bihar 800001',
            'office_hours' => 'Mon - Sat: 10:00 AM - 6:00 PM',
            'primary_phone' => '9507488833',
            'secondary_phone' => '9507488844',
            'whatsapp_number' => '919507488833',
            'primary_email' => 'info@ashwingroup.com',
            'distributor_email' => 'distributors@ashwingroup.com',
            'inquiry_recipient_email' => 'info@ashwingroup.com',
            'footer_regions' => 'Bihar · Jharkhand · West Bengal',
            'footer_summary' => fake()->sentence(),
            'social_links' => [],
        ];
    }
}
