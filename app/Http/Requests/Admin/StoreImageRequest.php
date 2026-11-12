<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreImageRequest extends FormRequest
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
            'folder' => ['nullable', 'string', 'max:80', 'regex:/^[a-zA-Z0-9_\/-]*$/'],
            'files' => ['required', 'array', 'min:1'],
            'files.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:5120'],
        ];
    }
}
