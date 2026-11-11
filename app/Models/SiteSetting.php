<?php

namespace App\Models;

use Database\Factories\SiteSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * @property int $id
 * @property string $company_name
 * @property string $company_full_name
 * @property string|null $tagline
 * @property string|null $hero_description
 * @property string $est_year
 * @property string $logo_path
 * @property string|null $founder_name
 * @property string|null $founder_title
 * @property string|null $chairman_quote
 * @property string|null $chairman_message
 * @property string $chairman_image
 * @property string|null $vision_text
 * @property string|null $mission_text
 * @property array<int, string>|null $core_values
 * @property array<int, array<string, string>>|null $timeline_items
 * @property array<int, array<string, string>>|null $hero_stats
 * @property string|null $hq_address
 * @property string|null $office_hours
 * @property string|null $primary_phone
 * @property string|null $secondary_phone
 * @property string|null $whatsapp_number
 * @property string|null $primary_email
 * @property string|null $distributor_email
 * @property string|null $inquiry_recipient_email
 * @property string|null $footer_regions
 * @property string|null $footer_summary
 * @property array<string, string>|null $social_links
 */
#[Fillable([
    'company_name',
    'company_full_name',
    'tagline',
    'hero_description',
    'est_year',
    'logo_path',
    'founder_name',
    'founder_title',
    'chairman_quote',
    'chairman_message',
    'chairman_image',
    'vision_text',
    'mission_text',
    'core_values',
    'timeline_items',
    'hero_stats',
    'hq_address',
    'office_hours',
    'primary_phone',
    'secondary_phone',
    'whatsapp_number',
    'primary_email',
    'distributor_email',
    'inquiry_recipient_email',
    'footer_regions',
    'footer_summary',
    'social_links',
])]
class SiteSetting extends Model
{
    /** @use HasFactory<SiteSettingFactory> */
    use HasFactory;

    public const string CACHE_KEY = 'site_settings.current';

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'company_name' => 'Ashwin Group',
        'company_full_name' => 'Ashwin Group of Companies',
        'est_year' => '1995',
        'logo_path' => '/images/logo.png',
        'chairman_image' => '/images/chairman-portrait.png',
    ];

    protected static function booted(): void
    {
        static::saved(function (): void {
            Cache::forget(self::CACHE_KEY);
        });

        static::deleted(function (): void {
            Cache::forget(self::CACHE_KEY);
        });
    }

    /**
     * Get the active site setting record (cached as raw attributes for Laravel 13 cache safety).
     */
    public static function current(): self
    {
        $cached = Cache::get(self::CACHE_KEY);

        if (! is_array($cached)) {
            $record = self::query()->first();

            if ($record === null) {
                return new self;
            }

            $raw = $record->getAttributes();
            Cache::forever(self::CACHE_KEY, $raw);

            return $record;
        }

        if ($cached === []) {
            return new self;
        }

        return (new self)->newFromBuilder($cached);
    }

    /**
     * Format a clean digits-only WhatsApp number suitable for wa.me links.
     */
    public function normalizedWhatsappNumber(): string
    {
        $raw = preg_replace('/\D+/', '', (string) ($this->whatsapp_number ?: $this->primary_phone ?: '9507488833'));

        if ($raw === null || $raw === '') {
            return '919507488833';
        }

        if (strlen($raw) === 10) {
            return '91'.$raw;
        }

        return $raw;
    }

    /**
     * Build public-safe settings array for Inertia shared props.
     *
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'company_name' => $this->company_name,
            'company_full_name' => $this->company_full_name,
            'tagline' => $this->tagline,
            'hero_description' => $this->hero_description,
            'est_year' => $this->est_year,
            'logo_path' => $this->logo_path,
            'founder_name' => $this->founder_name,
            'founder_title' => $this->founder_title,
            'chairman_quote' => $this->chairman_quote,
            'chairman_message' => $this->chairman_message,
            'chairman_image' => $this->chairman_image,
            'vision_text' => $this->vision_text,
            'mission_text' => $this->mission_text,
            'core_values' => $this->core_values ?? [],
            'timeline_items' => $this->timeline_items ?? [],
            'hero_stats' => $this->hero_stats ?? [],
            'hq_address' => $this->hq_address,
            'office_hours' => $this->office_hours,
            'primary_phone' => $this->primary_phone,
            'secondary_phone' => $this->secondary_phone,
            'whatsapp_number' => $this->normalizedWhatsappNumber(),
            'primary_email' => $this->primary_email,
            'distributor_email' => $this->distributor_email,
            'footer_regions' => $this->footer_regions,
            'footer_summary' => $this->footer_summary,
            'social_links' => $this->social_links ?? [],
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'core_values' => 'array',
            'timeline_items' => 'array',
            'hero_stats' => 'array',
            'social_links' => 'array',
        ];
    }
}
