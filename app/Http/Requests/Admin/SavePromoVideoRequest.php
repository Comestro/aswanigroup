<?php

namespace App\Http\Requests\Admin;

use App\Models\PromoVideo;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class SavePromoVideoRequest extends FormRequest
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
            'source_type' => ['required', Rule::in(['youtube', 'local'])],
            'youtube_url' => [
                Rule::when($this->input('source_type') === 'youtube', ['required']),
                'nullable',
                'string',
                'max:255',
            ],
            'video_file' => ['nullable', 'file', 'mimes:mp4,webm', 'max:30720'],
            'video_path' => ['nullable', 'string', 'max:255'],
            'poster_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:3072'],
            'poster_path' => ['nullable', 'string', 'max:255'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0', 'max:9999'],
        ];
    }

    /**
     * Validate that YouTube URLs yield a recognizable 11-character YouTube video ID.
     *
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($this->input('source_type') !== 'youtube') {
                    return;
                }

                $youtubeId = PromoVideo::extractYoutubeId($this->string('youtube_url')->toString());

                if ($youtubeId === null) {
                    $validator->errors()->add('youtube_url', 'Please enter a valid YouTube video URL or 11-character video ID.');
                }
            },
        ];
    }
}
