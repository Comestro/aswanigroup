<?php

namespace Database\Seeders;

use App\Models\Catalog;
use App\Models\Certification;
use App\Models\Project;
use App\Models\PromoVideo;
use App\Models\SiteSetting;
use App\Models\User;
use App\Models\Venture;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AshwinGroupSeeder extends Seeder
{
    /**
     * Seed Ashwin Group parent-company showcase ventures, projects, certifications, catalogs, and admin account.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@ashwingroup.com'],
            [
                'name' => 'Ashwin Admin',
                'password' => Hash::make('Ashwin@2026'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ],
        );

        SiteSetting::query()->updateOrCreate(
            ['id' => 1],
            [
                'company_name' => 'Ashwin Group',
                'company_full_name' => 'Ashwin Group of Companies',
                'tagline' => 'Powering a Smart, Sustainable & Trusted Future',
                'hero_description' => 'The parent corporate showcase uniting Ashwin Group\'s flagship ventures across packaged mineral water, green energy & eco-hospitality, fine jewelry, and commercial retail distribution.',
                'est_year' => '1995',
                'logo_path' => '/images/logo.png',
                'founder_name' => 'Mr. R.K. Ashwin',
                'founder_title' => 'Founder & Chairman',
                'chairman_quote' => 'Our growth is anchored in trust, verified corporate partnerships, and building sustainable solutions for the communities we serve.',
                'chairman_message' => "When Ashwin Group was established in 1995, our goal was straightforward: to create a values-driven enterprise that delivers top-tier quality and builds long-term distribution partnerships.\n\nToday, as the parent conglomerate overseeing Ashwin Water Industries (licensed by United Spirits / Diageo Group), Ashwin Energie & Hospitality, our Enaure fine jewelry venture, and Ashwin Traders, that core mission remains unchanged.",
                'chairman_image' => '/images/chairman-portrait.png',
                'vision_text' => 'To be Eastern India\'s benchmark parent conglomerate for verified quality, sustainable clean energy, luxury lifestyle brands, and distributor-first trade operations.',
                'mission_text' => 'To empower wholesale partners with profitable opportunities, deliver certified packaged beverages, and grow sustainable infrastructure across every group venture.',
                'core_values' => [
                    'Verified Quality & Official Licensing',
                    'Distributor-First Regional Partnerships',
                    'Clean Energy & Sustainable Hospitality',
                    'Transparency & Long-Term Integrity',
                ],
                'timeline_items' => [
                    [
                        'year' => '1995',
                        'title' => 'Corporate Foundation',
                        'description' => 'Ashwin Group was established in Patna, focusing on regional trade, FMCG logistics, and distribution partnerships.',
                    ],
                    [
                        'year' => '2008',
                        'title' => 'Water Industries Expansion',
                        'description' => 'Expanded beverage operations with Ashwin Water Industries, building institutional distribution across Bihar and Jharkhand.',
                    ],
                    [
                        'year' => '2018',
                        'title' => 'Green Energy & Enaure Jewelry',
                        'description' => 'Launched Ashwin Energie Pvt. Ltd. for solar & Eco-Plug EV charging hubs alongside our Enaure fine jewelry brand.',
                    ],
                    [
                        'year' => '2026',
                        'title' => 'Unified Corporate Hub & Eco-Resort',
                        'description' => 'Launched Signature & Royal Challenge Packaged Drinking Water distributor network, green hotel & resort expansion, and unified parent showcase.',
                    ],
                ],
                'hero_stats' => [
                    ['value' => '4', 'label' => 'Group Business Ventures', 'icon' => 'Building2'],
                    ['value' => 'Bihar · Jharkhand · WB', 'label' => 'Regional Operating Footprint', 'icon' => 'Users'],
                    ['value' => '9507488833 / 44', 'label' => 'Distributor & Lead Hotline', 'icon' => 'Phone'],
                ],
                'hq_address' => "Ashwin House, Corporate Lane\nExhibition Road Area\nPatna, Bihar 800001",
                'office_hours' => 'Mon - Sat: 10:00 AM - 6:00 PM',
                'primary_phone' => '9507488833',
                'secondary_phone' => '9507488844',
                'whatsapp_number' => '919507488833',
                'primary_email' => 'info@ashwingroup.com',
                'distributor_email' => 'distributors@ashwingroup.com',
                'inquiry_recipient_email' => 'info@ashwingroup.com',
                'footer_regions' => 'Bihar · Jharkhand · West Bengal',
                'footer_summary' => 'Powering a smart, sustainable, and trusted future across packaged water, green energy & hospitality, fine jewelry, and trade.',
                'social_links' => [
                    'linkedin' => 'https://www.linkedin.com',
                    'instagram' => 'https://www.instagram.com',
                    'youtube' => 'https://www.youtube.com',
                ],
            ],
        );

        $water = Venture::query()->updateOrCreate(
            ['slug' => 'water-industries'],
            [
                'name' => 'Ashwin Water Industries',
                'short_label' => 'Water Industries',
                'subtitle' => 'Beverage & Packaged Drinking Water',
                'badge' => 'United Spirits / Diageo Partner',
                'icon_name' => 'Droplets',
                'summary' => 'Official licensed partner for Signature Packaged Drinking Water with Minerals and Royal Challenge Packaged Drinking Water across Bihar & Jharkhand.',
                'description' => 'Ashwin Water Industries manufactures and distributes premium packaged mineral drinking water under strict BIS, FSSAI, and United Spirits (Diageo Group) quality benchmarks. Explore completed bottling and depot installations, download the distributor catalog, or send a direct dealership inquiry to our Email and WhatsApp desk.',
                'location_details' => 'Patna (Bihar) · Ranchi (Jharkhand) · Statewide Wholesale Territories',
                'external_url' => null,
                'external_cta_label' => null,
                'highlights' => [
                    'Authorized partner of United Spirits (Diageo Group) beverage brands',
                    'Signature Packaged Drinking Water with essential minerals',
                    'Royal Challenge Packaged Drinking Water institutional & retail supply',
                    'Dedicated distributor onboarding with marketing & rapid stock rotation',
                ],
                'division_image' => '/images/ashwin-water-division.jpg',
                'hero_image' => '/images/industries-hero-bg.png',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
        );

        $energy = Venture::query()->updateOrCreate(
            ['slug' => 'energy'],
            [
                'name' => 'Ashwin Energie & Hospitality',
                'short_label' => 'Energy & Resort',
                'subtitle' => 'Green Energy Infrastructure & Hotel / Resort Venture',
                'badge' => 'Green Energy & Resort',
                'icon_name' => 'Bolt',
                'summary' => 'Engineering solar arrays, Eco-Plug smart EV charging corridors, and sustainable eco-luxury Hotel & Resort developments across Eastern India.',
                'description' => 'Ashwin Energie Pvt. Ltd. combines clean power engineering with sustainable hospitality. Beyond commercial rooftop solar installations and Eco-Plug EV fast-charging hubs, the division is developing an integrated Green Hotel & Resort destination designed around solar microgrids, rainwater harvesting, and low-carbon hospitality.',
                'location_details' => 'Bodh Gaya & Rajgir Hospitality Corridor (Bihar) · Kolkata EV Hub (West Bengal)',
                'external_url' => null,
                'external_cta_label' => null,
                'highlights' => [
                    'Eco-Plug smart EV charging infrastructure for commercial & highway hubs',
                    'Grid-tied & hybrid commercial solar power installations',
                    'Upcoming Solar-Powered Green Hotel & Eco-Resort Project',
                    'Custom site-specific feasibility and regional engineering deployment',
                ],
                'division_image' => '/images/ashwin-energie-division.jpg',
                'hero_image' => '/images/industries-hero-bg.png',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
        );

        $jewelry = Venture::query()->updateOrCreate(
            ['slug' => 'jewelry'],
            [
                'name' => 'Enaure Fine Jewelry',
                'short_label' => 'Jewelry',
                'subtitle' => 'Fine Jewelry & Luxury Brand Showcase',
                'badge' => 'Group Lifestyle Venture',
                'icon_name' => 'Gem',
                'summary' => 'Ashwin Group\'s flagship fine jewelry brand showcasing heritage bridal, 22K gold-plated, and contemporary handcrafted collections.',
                'description' => 'Enaure represents Ashwin Group\'s luxury lifestyle and fine jewelry vertical. This parent-company showcase highlights signature collections, craftsmanship lookbooks, exhibitions, and brand/franchise collaborations.',
                'location_details' => 'Patna Flagship Showcase Studio · Regional Exhibitions & Boutiques',
                'external_url' => null,
                'external_cta_label' => null,
                'highlights' => [
                    'Signature heritage bridal, kundan & polki craftsmanship',
                    'Contemporary 22K gold-plated & 925 sterling silver collections',
                    'Downloadable seasonal brand lookbooks & showcase decks',
                    'Corporate gifting, exhibition & boutique partnership inquiries',
                ],
                'division_image' => '/images/portfolio-energy-2.png',
                'hero_image' => '/images/portfolio-hero-bg.png',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 3,
            ],
        );

        $traders = Venture::query()->updateOrCreate(
            ['slug' => 'traders'],
            [
                'name' => 'Ashwin Traders & Retail',
                'short_label' => 'Traders & Retail',
                'subtitle' => 'Master Franchisee & Commercial Logistics',
                'badge' => 'Barista Master Franchise',
                'icon_name' => 'Truck',
                'summary' => 'Master Franchisee of Barista Coffee Company for Patna, Bihar and strategic retail & FMCG supply-chain partner with Reliance Malls.',
                'description' => 'Ashwin Traders operates flagship cafes, corporate vending kiosks, and organized FMCG warehousing networks. As Master Franchisee for Barista Coffee in Patna and retail partner with leading mall formats, we bridge premium consumer brands with regional scale.',
                'location_details' => 'Patliputra & Gandhi Maidan, Patna (Bihar) · Eastern India Warehousing',
                'external_url' => null,
                'external_cta_label' => null,
                'highlights' => [
                    'Master Franchise rights for Barista Coffee Company in Patna, Bihar',
                    'Multiple cafe formats, mall kiosks, and corporate vending networks',
                    'Organized FMCG logistics and Reliance Mall retail partnerships',
                    'Downloadable Barista Brand Deck 2026 for franchise inquiries',
                ],
                'division_image' => '/images/ashwin-traders-division.jpg',
                'hero_image' => '/images/industries-hero-bg.png',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 4,
            ],
        );

        $projects = [
            [
                'venture_id' => $water->id,
                'title' => 'Signature Mineral Water Bottling Line',
                'category_label' => 'Water',
                'location' => 'Patna, Bihar',
                'completion_year' => '2025',
                'summary' => 'Automated mineral enrichment, UV sterilization, and high-speed PET bottling facility serving Bihar territories.',
                'image_path' => '/images/portfolio-water-1.png',
                'is_featured_hero' => true,
                'sort_order' => 1,
            ],
            [
                'venture_id' => $water->id,
                'title' => 'Royal Challenge Water Regional Depot',
                'category_label' => 'Water',
                'location' => 'Ranchi, Jharkhand',
                'completion_year' => '2026',
                'summary' => 'High-capacity wholesale fulfillment hub supporting district distributors across Jharkhand.',
                'image_path' => '/images/portfolio-water-2.png',
                'is_featured_hero' => false,
                'sort_order' => 2,
            ],
            [
                'venture_id' => $energy->id,
                'title' => 'Eco-Plug Smart EV Charging Hub',
                'category_label' => 'Energy',
                'location' => 'Kolkata, West Bengal',
                'completion_year' => '2025',
                'summary' => 'Solar-assisted multi-bay EV charging corridor with real-time load monitoring.',
                'image_path' => '/images/portfolio-energy-1.png',
                'is_featured_hero' => true,
                'sort_order' => 3,
            ],
            [
                'venture_id' => $energy->id,
                'title' => 'Ashwin Green Eco-Resort & Retreat',
                'category_label' => 'Energy',
                'location' => 'Bodh Gaya & Rajgir, Bihar',
                'completion_year' => '2026',
                'summary' => 'Upcoming sustainable hotel and resort complex powered by rooftop solar microgrids and smart energy automation.',
                'image_path' => '/images/home-headquarters.png',
                'is_featured_hero' => true,
                'sort_order' => 4,
            ],
            [
                'venture_id' => $jewelry->id,
                'title' => 'Enaure Heritage & Bridal Collection Showcase',
                'category_label' => 'Jewelry',
                'location' => 'Patna Showcase Studio, Bihar',
                'completion_year' => '2026',
                'summary' => 'Curated showcase of Enaure\'s bridal kundan, 22K gold-plated sterling silver, and contemporary jewelry lines.',
                'image_path' => '/images/portfolio-energy-2.png',
                'is_featured_hero' => false,
                'sort_order' => 5,
            ],
            [
                'venture_id' => $traders->id,
                'title' => 'Barista Coffee Cafe - Patliputra',
                'category_label' => 'Traders',
                'location' => 'Patliputra, Patna',
                'completion_year' => '2022',
                'summary' => 'Flagship full-service Barista Coffee cafe operated under Ashwin Traders Master Franchise.',
                'image_path' => '/images/portfolio-traders-1.png',
                'is_featured_hero' => true,
                'sort_order' => 6,
            ],
            [
                'venture_id' => $traders->id,
                'title' => 'Barista Coffee Cafe - Gandhi Maidan',
                'category_label' => 'Traders',
                'location' => 'Gandhi Maidan, Patna',
                'completion_year' => '2024',
                'summary' => 'High-footfall central business district cafe and espresso bar.',
                'image_path' => '/images/portfolio-traders-2.png',
                'is_featured_hero' => false,
                'sort_order' => 7,
            ],
            [
                'venture_id' => $traders->id,
                'title' => 'FMCG & Reliance Mall Supply Hub',
                'category_label' => 'Traders',
                'location' => 'Patna, Bihar',
                'completion_year' => '2025',
                'summary' => 'Centralized warehousing and cold/ambient retail logistics supporting corporate partners.',
                'image_path' => '/images/portfolio-traders-4.png',
                'is_featured_hero' => false,
                'sort_order' => 8,
            ],
        ];

        foreach ($projects as $project) {
            Project::query()->updateOrCreate(
                ['title' => $project['title']],
                $project,
            );
        }

        $certifications = [
            [
                'venture_id' => $water->id,
                'type' => 'agreement',
                'title' => 'United Spirits (Diageo Group) Partnership Agreement — First Copy',
                'issuer' => 'United Spirits Ltd. (A Diageo Group Company)',
                'reference_number' => 'USL-ASH-2026-FC01',
                'issued_date' => '2026',
                'description' => 'Official partnership and territory licensing agreement copy verifying Ashwin Water Industries\' authorization for Signature & Royal Challenge Packaged Drinking Water.',
                'image_path' => '/images/ashwin-distributor.jpg',
                'document_path' => '/images/Barista_Brand_Deck_2026.pdf',
                'sort_order' => 1,
            ],
            [
                'venture_id' => $traders->id,
                'type' => 'agreement',
                'title' => 'Barista Coffee Master Franchise Authorization — Patna Region',
                'issuer' => 'Barista Coffee Company Ltd.',
                'reference_number' => 'BCC-PAT-MF-2026',
                'issued_date' => '2026',
                'description' => 'Master franchise documentation covering Patna cafe formats, corporate kiosks, and retail expansion.',
                'image_path' => '/images/portfolio-traders-1.png',
                'document_path' => '/images/Barista_Brand_Deck_2026.pdf',
                'sort_order' => 2,
            ],
            [
                'venture_id' => $water->id,
                'type' => 'certificate',
                'title' => 'BIS IS 14543 & FSSAI Packaged Drinking Water Compliance',
                'issuer' => 'Bureau of Indian Standards & FSSAI',
                'reference_number' => 'BIS-FSSAI-BR-2026',
                'issued_date' => '2025',
                'description' => 'Multi-stage RO, UV, ozonation, and mineral balance certification ensuring institutional-grade purity.',
                'image_path' => '/images/portfolio-water-1.png',
                'document_path' => null,
                'sort_order' => 3,
            ],
            [
                'venture_id' => $energy->id,
                'type' => 'certificate',
                'title' => 'Clean Energy & Smart EV Charger Safety Certification',
                'issuer' => 'Regional Grid & Solar Compliance Authority',
                'reference_number' => 'AEPL-EV-2025-88',
                'issued_date' => '2025',
                'description' => 'Safety and grid-interconnection certification for Eco-Plug EV charging hubs and commercial solar arrays.',
                'image_path' => '/images/portfolio-energy-1.png',
                'document_path' => null,
                'sort_order' => 4,
            ],
            [
                'venture_id' => $water->id,
                'type' => 'partnership_photo',
                'title' => 'Bihar & Jharkhand Distributor Launch & Trade Meet',
                'issuer' => 'Ashwin Water Industries',
                'reference_number' => null,
                'issued_date' => '2026',
                'description' => 'Official partnership campaign rollout with regional wholesale channel partners across Bihar & Jharkhand.',
                'image_path' => '/images/ashwin-distributor.jpg',
                'document_path' => null,
                'sort_order' => 5,
            ],
            [
                'venture_id' => $traders->id,
                'type' => 'partnership_photo',
                'title' => 'Reliance Mall & Retail Format Partnership Showcase',
                'issuer' => 'Ashwin Traders',
                'reference_number' => null,
                'issued_date' => '2025',
                'description' => 'Organized retail operations and high-traffic cafe & FMCG partner installations.',
                'image_path' => '/images/portfolio-traders-2.png',
                'document_path' => null,
                'sort_order' => 6,
            ],
        ];

        foreach ($certifications as $certification) {
            Certification::query()->updateOrCreate(
                ['title' => $certification['title']],
                $certification,
            );
        }

        $catalogs = [
            [
                'venture_id' => $water->id,
                'title' => 'Signature & Royal Challenge Water — Distributor Catalog 2026',
                'description' => 'Complete SKU specs (200ml, 500ml, 1L, 2L), territory terms, margin matrix, and distributor onboarding kit.',
                'file_path' => '/images/Barista_Brand_Deck_2026.pdf',
                'file_size_label' => '5.5 MB PDF',
                'sort_order' => 1,
            ],
            [
                'venture_id' => $traders->id,
                'title' => 'Barista Coffee Master Franchise Brand Deck 2026',
                'description' => 'Official cafe formats, kiosk specs, and franchise unit economics for Patna & Bihar.',
                'file_path' => '/images/Barista_Brand_Deck_2026.pdf',
                'file_size_label' => '5.5 MB PDF',
                'sort_order' => 2,
            ],
            [
                'venture_id' => $energy->id,
                'title' => 'Ashwin Energie — Solar, Eco-Plug EV & Resort Profile',
                'description' => 'Green energy installation specs, EV charging partner roadmap, and eco-resort project overview.',
                'file_path' => '/images/Barista_Brand_Deck_2026.pdf',
                'file_size_label' => '5.5 MB PDF',
                'sort_order' => 3,
            ],
            [
                'venture_id' => $jewelry->id,
                'title' => 'Enaure Fine Jewelry — Brand Showcase Lookbook 2026',
                'description' => 'Curated showcase deck of bridal, heritage, and contemporary collections plus retail partnership guide.',
                'file_path' => '/images/Barista_Brand_Deck_2026.pdf',
                'file_size_label' => '5.5 MB PDF',
                'sort_order' => 4,
            ],
        ];

        foreach ($catalogs as $catalog) {
            Catalog::query()->updateOrCreate(
                ['title' => $catalog['title']],
                $catalog,
            );
        }

        PromoVideo::query()->updateOrCreate(
            ['title' => 'Signature & Royal Challenge Packaged Water — Official TV Commercial'],
            [
                'venture_id' => $water->id,
                'description' => 'Launch commercial showcasing Signature and Royal Challenge Packaged Drinking Water across Bihar & Jharkhand.',
                'source_type' => 'local',
                'youtube_url' => null,
                'youtube_id' => null,
                'video_path' => '/images/ashwani_water_ad.mp4',
                'poster_path' => '/images/ashwin-distributor.jpg',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
        );

        PromoVideo::query()->updateOrCreate(
            ['title' => 'Ashwin Group — Sustainable Green Energy & Corporate Vision (YouTube)'],
            [
                'venture_id' => $energy->id,
                'description' => 'YouTube promo showcase slot — paste your official YouTube promo link anytime in Admin CMS to update.',
                'source_type' => 'youtube',
                'youtube_url' => 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
                'youtube_id' => 'LXb3EKWsInQ',
                'video_path' => null,
                'poster_path' => '/images/home-headquarters.png',
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
        );
    }
}
