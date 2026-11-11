<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Certification;
use App\Models\Project;
use App\Models\PromoVideo;
use App\Models\Venture;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $ventures = Venture::query()
            ->active()
            ->ordered()
            ->with([
                'projects' => fn ($query) => $query->active()->ordered(),
                'catalogs' => fn ($query) => $query->active()->ordered(),
                'promoVideos' => fn ($query) => $query->active()->ordered(),
                'certifications' => fn ($query) => $query->active()->ordered(),
            ])
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

        $firstVenture = $ventures->first();

        return Inertia::render('Home', [
            'ventures' => $ventures,
            'heroProjects' => $heroProjects,
            'certifications' => $certifications,
            'catalogs' => $catalogs,
            'promoVideos' => $promoVideos,
            'initialTab' => $request->string('tab')->toString() ?: ($firstVenture !== null ? $firstVenture->slug : 'certifications'),
        ]);
    }
}
