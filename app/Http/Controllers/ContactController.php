<?php

namespace App\Http\Controllers;

use App\Models\Venture;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Contact', [
            'ventures' => Venture::query()
                ->active()
                ->ordered()
                ->get(['id', 'slug', 'name', 'short_label', 'location_details']),
        ]);
    }
}
