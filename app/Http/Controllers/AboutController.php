<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Venture;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('About', [
            'venturesCount' => Venture::query()->active()->count(),
            'certificationsCount' => Certification::query()->active()->count(),
        ]);
    }
}
