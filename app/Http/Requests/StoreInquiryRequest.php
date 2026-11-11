<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'venture_id' => ['nullable', 'integer', 'exists:ventures,id'],
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'min:7', 'max:25'],
            'email' => ['nullable', 'email', 'max:160'],
            'city_region' => ['nullable', 'string', 'max:120'],
            'interest_division' => ['required', 'string', 'max:120'],
            'subject' => ['required', 'string', 'max:180'],
            'message' => ['required', 'string', 'min:5', 'max:3000'],
            'source_page' => ['nullable', 'string', 'max:64'],
            'website' => ['nullable', 'max:0'],
        ];
    }
}
