<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    public function __invoke(): Response
    {
        $certifications = Certification::query()
            ->active()
            ->ordered()
            ->with('venture:id,name,short_label')
            ->get();

        return Inertia::render('Certifications', [
            'certifications' => $certifications,
        ]);
    }
}
