<?php

namespace App\Models;

use Database\Factories\PromoVideoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int|null $venture_id
 * @property string $title
 * @property string|null $description
 * @property string $source_type
 * @property string|null $youtube_url
 * @property string|null $youtube_id
 * @property string|null $video_path
 * @property string|null $poster_path
 * @property bool $is_featured
 * @property bool $is_active
 * @property int $sort_order
 */
#[Fillable([
    'venture_id',
    'title',
    'description',
    'source_type',
    'youtube_url',
    'youtube_id',
    'video_path',
    'poster_path',
    'is_featured',
    'is_active',
    'sort_order',
])]
class PromoVideo extends Model
{
    /** @use HasFactory<PromoVideoFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'source_type' => 'youtube',
        'is_featured' => false,
        'is_active' => true,
        'sort_order' => 0,
    ];

    /**
     * Extract an 11-character YouTube video ID from standard, short, or embed URLs.
     */
    public static function extractYoutubeId(?string $url): ?string
    {
        if ($url === null || trim($url) === '') {
            return null;
        }

        $trimmed = trim($url);

        if (preg_match('/^[a-zA-Z0-9_-]{11}$/', $trimmed) === 1) {
            return $trimmed;
        }

        if (preg_match('/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $trimmed, $matches) === 1) {
            return $matches[1];
        }

        return null;
    }

    /**
     * @return BelongsTo<Venture, $this>
     */
    public function venture(): BelongsTo
    {
        return $this->belongsTo(Venture::class);
    }

    /**
     * @param  Builder<PromoVideo>  $query
     * @return Builder<PromoVideo>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param  Builder<PromoVideo>  $query
     * @return Builder<PromoVideo>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderByDesc('id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'venture_id' => 'integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
