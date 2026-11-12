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
 * @property array<string, array<string, string|null>>|null $page_headers
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
    'page_headers',
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
     * Default page headers & section copy fallback when database fields are not customized yet.
     *
     * @return array<string, array<string, string>>
     */
    public static function defaultPageHeaders(): array
    {
        return [
            'home' => [
                'ventures_eyebrow' => 'Group Business Verticals',
                'ventures_title' => 'Our Ventures & Operating Companies',
                'ventures_subtitle' => 'Explore dedicated pages for each business vertical—complete with project galleries, regional coverage, downloadable catalogs, and direct inquiry desks.',
                'certifications_eyebrow' => 'Verified Credibility',
                'certifications_title' => 'Official Agreements & Certifications',
                'certifications_subtitle' => 'Official partnership authorizations, quality compliance records, and milestone documentation.',
                'media_eyebrow' => 'Media & Commercials',
                'media_title' => 'Promotional Films & YouTube Spotlights',
                'catalogs_eyebrow' => 'Direct Sales Tools',
                'catalogs_title' => 'Downloadable Catalogs',
                'cta_eyebrow' => 'Instant Lead Desk',
                'cta_title' => 'Partner with Ashwin Group',
                'cta_subtitle' => 'Interested in Water Industries distributorship, Green Energy & Eco-Resort development, brand collaborations, or retail franchises? Submit once to notify our email desk and connect instantly on WhatsApp.',
            ],
            'about' => [
                'badge' => 'Corporate Heritage',
                'title' => 'Our Legacy.',
                'subtitle' => 'Decades of enduring excellence, building trusted ventures that power regional growth and sustainability.',
                'hero_image' => '/images/about-hero-bg.png',
            ],
            'industries' => [
                'badge' => 'Group Portfolio',
                'title' => 'Our Business Ventures.',
                'subtitle' => 'Dedicated operating companies across packaged drinking water, green energy & hospitality, fine jewelry, and commercial distribution.',
                'hero_image' => '/images/industries-hero-bg.png',
                'cta_eyebrow' => 'Direct Partnership Desk',
                'cta_title' => 'Need Territory Pricing, Catalogs, or Custom Quotes?',
                'cta_subtitle' => 'Reach our acquisition desk directly via hotline, email, or WhatsApp.',
            ],
            'portfolio' => [
                'badge' => 'Completed Projects & Catalogs',
                'title' => 'Ventures & Portfolio.',
                'subtitle' => 'Completed facilities, solar & hospitality projects, fine jewelry collections, and commercial retail operations across Eastern India.',
                'hero_image' => '/images/portfolio-hero-bg.png',
            ],
            'certifications' => [
                'badge' => 'Verified Credibility',
                'title' => 'Certifications & Agreements.',
                'subtitle' => 'Official documentation, partnership photos, BIS/FSSAI standards, and the first-copy verification of our flagship brand agreements.',
                'hero_image' => '/images/about-hero-bg.png',
            ],
            'contact' => [
                'badge' => 'Get In Touch',
                'title' => 'Connect With Us.',
                'subtitle' => 'Interested in Water Industries distributorship, Green Energy & Eco-Resort projects, or group brand partnerships? Every inquiry forwards to our email & WhatsApp desk.',
                'hero_image' => '/images/contact-hero-bg.png',
                'sidebar_title' => 'Corporate Office',
                'sidebar_subtitle' => 'Direct lines to our division managers.',
                'form_title' => 'Send us a Message',
                'form_subtitle' => 'Captured directly in our lead tracker, emailed to our division heads, and ready for instant WhatsApp handoff.',
            ],
        ];
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
        $defaults = self::defaultPageHeaders();
        $storedHeaders = is_array($this->page_headers) ? $this->page_headers : [];
        $mergedHeaders = [];

        foreach ($defaults as $page => $sectionDefaults) {
            $pageOverrides = $storedHeaders[$page] ?? [];
            $mergedHeaders[$page] = array_merge(
                $sectionDefaults,
                array_filter($pageOverrides, static fn (?string $v): bool => $v !== null && $v !== ''),
            );
        }

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
            'page_headers' => $mergedHeaders,
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
            'page_headers' => 'array',
        ];
    }
}
