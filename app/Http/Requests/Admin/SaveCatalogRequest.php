<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class SaveCatalogRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:1000'],
            'file_upload' => [
                Rule::when($this->isMethod('POST') && ! $this->filled('file_path'), ['required']),
                'nullable',
                'file',
                'mimes:pdf',
                'max:20480',
            ],
            'file_path' => ['nullable', 'string', 'max:255'],
            'file_size_label' => ['nullable', 'string', 'max:32'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0', 'max:9999'],
        ];
    }
}
