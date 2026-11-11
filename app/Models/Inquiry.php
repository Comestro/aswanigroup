<?php

namespace App\Models;

use Database\Factories\InquiryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int|null $venture_id
 * @property string $name
 * @property string $phone
 * @property string|null $email
 * @property string|null $city_region
 * @property string $interest_division
 * @property string $subject
 * @property string $message
 * @property string $source_page
 * @property string $status
 * @property bool $email_sent
 * @property string|null $whatsapp_url
 */
#[Fillable([
    'venture_id',
    'name',
    'phone',
    'email',
    'city_region',
    'interest_division',
    'subject',
    'message',
    'source_page',
    'status',
    'email_sent',
    'whatsapp_url',
])]
class Inquiry extends Model
{
    /** @use HasFactory<InquiryFactory> */
    use HasFactory;

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'source_page' => 'contact',
        'status' => 'new',
        'email_sent' => false,
    ];

    /**
     * @return BelongsTo<Venture, $this>
     */
    public function venture(): BelongsTo
    {
        return $this->belongsTo(Venture::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'venture_id' => 'integer',
            'email_sent' => 'boolean',
        ];
    }
}
