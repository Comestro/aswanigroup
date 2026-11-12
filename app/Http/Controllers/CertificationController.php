<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Services\ImageService;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    public function __invoke(ImageService $images): Response
    {
        $certifications = Certification::query()
            ->active()
            ->ordered()
            ->with('venture:id,name,short_label')
            ->get();
        $images->hydrateCollection($certifications, 'image', 'image_path', 'image_urls', 'images_data');

        return Inertia::render('Certifications', [
            'certifications' => $certifications,
        ]);
    }
}
