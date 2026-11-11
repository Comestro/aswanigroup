<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Certification;
use App\Models\PromoVideo;
use App\Models\Venture;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VentureHubController extends Controller
{
    public function index(Request $request, ?Venture $venture = null): Response
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
        $defaultTab = $request->string('tab')->toString() ?: ($firstVenture !== null ? $firstVenture->slug : 'certifications');
        $initialTab = $venture !== null ? $venture->slug : $defaultTab;

        return Inertia::render('Industries', [
            'ventures' => $ventures,
            'certifications' => $certifications,
            'catalogs' => $catalogs,
            'promoVideos' => $promoVideos,
            'initialTab' => $initialTab,
        ]);
    }
}
