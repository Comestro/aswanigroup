<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use App\Models\Venture;
use App\Services\ImageService;
use Inertia\Inertia;
use Inertia\Response;

class VentureHubController extends Controller
{
    public function index(ImageService $images): Response
    {
        $ventures = Venture::query()
            ->active()
            ->ordered()
            ->with([
                'catalogs' => fn ($query) => $query->active()->ordered(),
            ])
            ->withCount(['projects', 'catalogs', 'promoVideos', 'certifications'])
            ->get();

        $images->hydrateCollection($ventures, 'image', 'division_image', 'division_image_urls', 'division_images_data');
        $images->hydrateCollection($ventures, 'hero_images', 'hero_image', 'hero_image_urls', 'hero_images_data');

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

    public function show(Venture $venture, ImageService $images): Response
    {
        abort_unless($venture->is_active, 404);

        $venture->load([
            'projects' => fn ($query) => $query->active()->ordered(),
            'catalogs' => fn ($query) => $query->active()->ordered(),
            'promoVideos' => fn ($query) => $query->active()->ordered(),
            'certifications' => fn ($query) => $query->active()->ordered(),
        ]);

        $images->hydrateCollection($venture, 'image', 'division_image', 'division_image_urls', 'division_images_data');
        $images->hydrateCollection($venture, 'hero_images', 'hero_image', 'hero_image_urls', 'hero_images_data');
        $images->hydrateCollection($venture->projects, 'image', 'image_path', 'image_urls', 'images_data');
        $images->hydrateCollection($venture->certifications, 'image', 'image_path', 'image_urls', 'images_data');
        $images->hydrateCollection($venture->promoVideos, 'poster_image', 'poster_path', 'poster_urls', 'poster_images_data');

        $otherVentures = Venture::query()
            ->active()
            ->where('id', '!=', $venture->id)
            ->ordered()
            ->get(['id', 'slug', 'name', 'short_label', 'subtitle', 'badge', 'location_details', 'image']);

        $images->hydrateCollection($otherVentures, 'image', 'division_image', 'division_image_urls', 'division_images_data');

        return Inertia::render('VentureShow', [
            'venture' => $venture,
            'otherVentures' => $otherVentures,
        ]);
    }
}
