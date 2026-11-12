<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int|null $venture_id
 * @property string $title
 * @property string $category_label
 * @property string $location
 * @property string|null $completion_year
 * @property string|null $summary
 * @property array<int, int>|null $image
 * @property bool $is_featured_hero
 * @property bool $is_active
 * @property int $sort_order
 */
#[Fillable([
    'venture_id',
    'title',
    'category_label',
    'location',
    'completion_year',
    'summary',
    'image',
    'is_featured_hero',
    'is_active',
    'sort_order',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'is_featured_hero' => false,
        'is_active' => true,
        'sort_order' => 0,
    ];

    /**
     * @return BelongsTo<Venture, $this>
     */
    public function venture(): BelongsTo
    {
        return $this->belongsTo(Venture::class);
    }

    /**
     * @param  Builder<Project>  $query
     * @return Builder<Project>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param  Builder<Project>  $query
     * @return Builder<Project>
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
            'image' => 'array',
            'is_featured_hero' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
