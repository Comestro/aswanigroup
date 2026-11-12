<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Project;
use App\Models\PromoVideo;
use App\Models\Venture;
use App\Services\ImageService;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function __invoke(ImageService $images): Response
    {
        $projects = Project::query()
            ->active()
            ->ordered()
            ->with('venture:id,slug,short_label,name')
            ->get();
        $images->hydrateCollection($projects, 'image', 'image_path', 'image_urls', 'images_data');

        $ventures = Venture::query()
            ->active()
            ->ordered()
            ->get(['id', 'slug', 'short_label', 'name', 'location_details']);

        $catalogs = Catalog::query()
            ->active()
            ->ordered()
            ->with('venture:id,short_label')
            ->get();

        $promoVideos = PromoVideo::query()
            ->active()
            ->ordered()
            ->with('venture:id,short_label')
            ->get();
        $images->hydrateCollection($promoVideos, 'poster_image', 'poster_path', 'poster_urls', 'poster_images_data');

        return Inertia::render('Portfolio', [
            'projects' => $projects,
            'ventures' => $ventures,
            'catalogs' => $catalogs,
            'promoVideos' => $promoVideos,
        ]);
    }
}
