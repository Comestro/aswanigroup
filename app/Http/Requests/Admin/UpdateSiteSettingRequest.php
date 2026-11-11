<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateSiteSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('access-admin');
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'company_name' => ['required', 'string', 'max:120'],
            'company_full_name' => ['required', 'string', 'max:180'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'hero_description' => ['nullable', 'string', 'max:1000'],
            'est_year' => ['required', 'string', 'max:16'],
            'logo_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:2048'],
            'founder_name' => ['nullable', 'string', 'max:120'],
            'founder_title' => ['nullable', 'string', 'max:120'],
            'chairman_quote' => ['nullable', 'string', 'max:500'],
            'chairman_message' => ['nullable', 'string', 'max:4000'],
            'chairman_image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'vision_text' => ['nullable', 'string', 'max:1000'],
            'mission_text' => ['nullable', 'string', 'max:1000'],
            'core_values' => ['nullable', 'array'],
            'core_values.*' => ['required', 'string', 'max:200'],
            'timeline_items' => ['nullable', 'array'],
            'timeline_items.*.year' => ['required', 'string', 'max:20'],
            'timeline_items.*.title' => ['required', 'string', 'max:160'],
            'timeline_items.*.description' => ['required', 'string', 'max:600'],
            'hero_stats' => ['nullable', 'array'],
            'hero_stats.*.value' => ['required', 'string', 'max:80'],
            'hero_stats.*.label' => ['required', 'string', 'max:120'],
            'hero_stats.*.icon' => ['nullable', 'string', 'max:40'],
            'hq_address' => ['nullable', 'string', 'max:500'],
            'office_hours' => ['nullable', 'string', 'max:120'],
            'primary_phone' => ['nullable', 'string', 'max:32'],
            'secondary_phone' => ['nullable', 'string', 'max:32'],
            'whatsapp_number' => ['nullable', 'string', 'max:32'],
            'primary_email' => ['nullable', 'email', 'max:160'],
            'distributor_email' => ['nullable', 'email', 'max:160'],
            'inquiry_recipient_email' => ['nullable', 'email', 'max:160'],
            'footer_regions' => ['nullable', 'string', 'max:255'],
            'footer_summary' => ['nullable', 'string', 'max:500'],
            'social_links' => ['nullable', 'array'],
            'social_links.linkedin' => ['nullable', 'url', 'max:255'],
            'social_links.instagram' => ['nullable', 'url', 'max:255'],
            'social_links.youtube' => ['nullable', 'url', 'max:255'],
        ];
    }
}
