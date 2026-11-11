<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class SaveCertificationRequest extends FormRequest
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
            'venture_id' => ['nullable', 'integer', 'exists:ventures,id'],
            'type' => ['required', Rule::in(['agreement', 'certificate', 'partnership_photo'])],
            'title' => ['required', 'string', 'max:200'],
            'issuer' => ['nullable', 'string', 'max:180'],
            'reference_number' => ['nullable', 'string', 'max:100'],
            'issued_date' => ['nullable', 'string', 'max:64'],
            'description' => ['nullable', 'string', 'max:1500'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'image_path' => ['nullable', 'string', 'max:255'],
            'document_file' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,webp', 'max:15360'],
            'document_path' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0', 'max:9999'],
        ];
    }
}
