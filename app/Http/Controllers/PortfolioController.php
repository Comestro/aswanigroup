<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Project;
use App\Models\PromoVideo;
use App\Models\Venture;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function __invoke(): Response
    {
        $projects = Project::query()
            ->active()
            ->ordered()
            ->with('venture:id,slug,short_label,name')
            ->get();

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

        return Inertia::render('Portfolio', [
            'projects' => $projects,
            'ventures' => $ventures,
            'catalogs' => $catalogs,
            'promoVideos' => $promoVideos,
        ]);
    }
}
