<?php

namespace App\Models;

use Database\Factories\VentureFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property string $short_label
 * @property string|null $subtitle
 * @property string|null $badge
 * @property string $icon_name
 * @property string $summary
 * @property string|null $description
 * @property string|null $location_details
 * @property string|null $external_url
 * @property string|null $external_cta_label
 * @property array<int, string>|null $highlights
 * @property array<int, int>|null $image
 * @property array<int, int>|null $hero_images
 * @property bool $is_featured
 * @property bool $is_active
 * @property int $sort_order
 */
#[Fillable([
    'slug',
    'name',
    'short_label',
    'subtitle',
    'badge',
    'icon_name',
    'summary',
    'description',
    'location_details',
    'external_url',
    'external_cta_label',
    'highlights',
    'image',
    'hero_images',
    'is_featured',
    'is_active',
    'sort_order',
])]
class Venture extends Model
{
    /** @use HasFactory<VentureFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'icon_name' => 'Building2',
        'is_featured' => true,
        'is_active' => true,
        'sort_order' => 0,
    ];

    /**
     * @return HasMany<Project, $this>
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class)->orderBy('sort_order')->orderByDesc('id');
    }

    /**
     * @return HasMany<Catalog, $this>
     */
    public function catalogs(): HasMany
    {
        return $this->hasMany(Catalog::class)->orderBy('sort_order')->orderByDesc('id');
    }

    /**
     * @return HasMany<Certification, $this>
     */
    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class)->orderBy('sort_order')->orderByDesc('id');
    }

    /**
     * @return HasMany<PromoVideo, $this>
     */
    public function promoVideos(): HasMany
    {
        return $this->hasMany(PromoVideo::class)->orderBy('sort_order')->orderByDesc('id');
    }

    /**
     * @param  Builder<Venture>  $query
     * @return Builder<Venture>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param  Builder<Venture>  $query
     * @return Builder<Venture>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'highlights' => 'array',
            'image' => 'array',
            'hero_images' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
