<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class SaveVentureRequest extends FormRequest
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
        $venture = $this->route('venture');
        $ventureId = is_object($venture) && property_exists($venture, 'id') ? $venture->id : $venture;

        return [
            'name' => ['required', 'string', 'max:160'],
            'slug' => [
                'required',
                'string',
                'max:120',
                'alpha_dash',
                Rule::unique('ventures', 'slug')->ignore($ventureId),
            ],
            'short_label' => ['required', 'string', 'max:60'],
            'subtitle' => ['nullable', 'string', 'max:180'],
            'badge' => ['nullable', 'string', 'max:80'],
            'icon_name' => ['nullable', 'string', 'max:40'],
            'summary' => ['required', 'string', 'max:600'],
            'description' => ['nullable', 'string', 'max:4000'],
            'location_details' => ['nullable', 'string', 'max:255'],
            'external_url' => ['nullable', 'url', 'max:255'],
            'external_cta_label' => ['nullable', 'string', 'max:100'],
            'highlights' => ['nullable', 'array'],
            'highlights.*' => ['required', 'string', 'max:255'],
            'division_image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'division_image_id' => ['nullable', 'integer', 'exists:images,id'],
            'division_image' => ['nullable', 'string', 'max:255'],
            'hero_image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'hero_image_id' => ['nullable', 'integer', 'exists:images,id'],
            'hero_image' => ['nullable', 'string', 'max:255'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0', 'max:9999'],
        ];
    }
}
