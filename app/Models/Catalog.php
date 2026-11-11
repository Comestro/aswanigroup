<?php

namespace App\Models;

use Database\Factories\CatalogFactory;
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
 * @property string $file_path
 * @property string|null $file_size_label
 * @property int $download_count
 * @property bool $is_active
 * @property int $sort_order
 */
#[Fillable([
    'venture_id',
    'title',
    'description',
    'file_path',
    'file_size_label',
    'download_count',
    'is_active',
    'sort_order',
])]
class Catalog extends Model
{
    /** @use HasFactory<CatalogFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'download_count' => 0,
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
     * @param  Builder<Catalog>  $query
     * @return Builder<Catalog>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param  Builder<Catalog>  $query
     * @return Builder<Catalog>
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
            'download_count' => 'integer',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
