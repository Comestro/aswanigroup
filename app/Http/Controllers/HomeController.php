<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Certification;
use App\Models\Project;
use App\Models\PromoVideo;
use App\Models\Venture;
use App\Services\ImageService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(ImageService $images): Response
    {
        $ventures = Venture::query()
            ->active()
            ->ordered()
            ->withCount(['projects', 'catalogs', 'promoVideos', 'certifications'])
            ->get();
        $images->hydrateCollection($ventures, 'image', 'division_image', 'division_image_urls', 'division_images_data');
        $images->hydrateCollection($ventures, 'hero_images', 'hero_image', 'hero_image_urls', 'hero_images_data');

        $heroProjects = Project::query()
            ->active()
            ->where('is_featured_hero', true)
            ->ordered()
            ->get();

        if ($heroProjects->isEmpty()) {
            $heroProjects = Project::query()->active()->ordered()->limit(4)->get();
        }

        $images->hydrateCollection($heroProjects, 'image', 'image_path', 'image_urls', 'images_data');

        $certifications = Certification::query()
            ->active()
            ->ordered()
            ->with('venture:id,name,short_label')
            ->limit(3)
            ->get();
        $images->hydrateCollection($certifications, 'image', 'image_path', 'image_urls', 'images_data');

        $catalogs = Catalog::query()
            ->active()
            ->ordered()
            ->with('venture:id,name,short_label')
            ->get();

        $promoVideos = PromoVideo::query()
            ->active()
            ->ordered()
            ->with('venture:id,name,short_label')
            ->get();
        $images->hydrateCollection($promoVideos, 'poster_image', 'poster_path', 'poster_urls', 'poster_images_data');

        return Inertia::render('Home', [
            'ventures' => $ventures,
            'heroProjects' => $heroProjects,
            'certifications' => $certifications,
            'catalogs' => $catalogs,
            'promoVideos' => $promoVideos,
        ]);
    }
}
