<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Certification;
use App\Models\Project;
use App\Models\PromoVideo;
use App\Models\Venture;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $ventures = Venture::query()
            ->active()
            ->ordered()
            ->withCount(['projects', 'catalogs', 'promoVideos', 'certifications'])
            ->get();

        $heroProjects = Project::query()
            ->active()
            ->where('is_featured_hero', true)
            ->ordered()
            ->get();

        if ($heroProjects->isEmpty()) {
            $heroProjects = Project::query()->active()->ordered()->limit(4)->get();
        }

        $certifications = Certification::query()
            ->active()
            ->ordered()
            ->with('venture:id,name,short_label')
            ->limit(3)
            ->get();

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

        return Inertia::render('Home', [
            'ventures' => $ventures,
            'heroProjects' => $heroProjects,
            'certifications' => $certifications,
            'catalogs' => $catalogs,
            'promoVideos' => $promoVideos,
        ]);
    }
}
