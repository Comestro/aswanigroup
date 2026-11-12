<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Venture;
use Inertia\Inertia;
use Inertia\Response;

class VentureHubController extends Controller
{
    public function index(): Response
    {
        $ventures = Venture::query()
            ->active()
            ->ordered()
            ->with([
                'catalogs' => fn ($query) => $query->active()->ordered(),
            ])
            ->withCount(['projects', 'catalogs', 'promoVideos', 'certifications'])
            ->get();

        $catalogs = Catalog::query()
            ->active()
            ->ordered()
            ->with('venture:id,name,short_label')
            ->get();

        return Inertia::render('Industries', [
            'ventures' => $ventures,
            'catalogs' => $catalogs,
        ]);
    }

    public function show(Venture $venture): Response
    {
        abort_unless($venture->is_active, 404);

        $venture->load([
            'projects' => fn ($query) => $query->active()->ordered(),
            'catalogs' => fn ($query) => $query->active()->ordered(),
            'promoVideos' => fn ($query) => $query->active()->ordered(),
            'certifications' => fn ($query) => $query->active()->ordered(),
        ]);

        $otherVentures = Venture::query()
            ->active()
            ->where('id', '!=', $venture->id)
            ->ordered()
            ->get(['id', 'slug', 'name', 'short_label', 'subtitle', 'badge', 'location_details', 'division_image']);

        return Inertia::render('VentureShow', [
            'venture' => $venture,
            'otherVentures' => $otherVentures,
        ]);
    }
}
