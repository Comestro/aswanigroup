<?php

namespace App\Models;

use Database\Factories\CertificationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int|null $venture_id
 * @property string $type
 * @property string $title
 * @property string|null $issuer
 * @property string|null $reference_number
 * @property string|null $issued_date
 * @property string|null $description
 * @property array<int, int>|null $image
 * @property string|null $document_path
 * @property bool $is_active
 * @property int $sort_order
 */
#[Fillable([
    'venture_id',
    'type',
    'title',
    'issuer',
    'reference_number',
    'issued_date',
    'description',
    'image',
    'document_path',
    'is_active',
    'sort_order',
])]
class Certification extends Model
{
    /** @use HasFactory<CertificationFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'type' => 'certificate',
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
     * @param  Builder<Certification>  $query
     * @return Builder<Certification>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param  Builder<Certification>  $query
     * @return Builder<Certification>
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
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
