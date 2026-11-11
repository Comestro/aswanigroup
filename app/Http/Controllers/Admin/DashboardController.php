<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Catalog;
use App\Models\Certification;
use App\Models\Inquiry;
use App\Models\Project;
use App\Models\PromoVideo;
use App\Models\Venture;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'ventures' => Venture::query()->count(),
                'projects' => Project::query()->count(),
                'certifications' => Certification::query()->count(),
                'catalogs' => Catalog::query()->count(),
                'catalog_downloads' => (int) Catalog::query()->sum('download_count'),
                'videos' => PromoVideo::query()->count(),
                'inquiries_new' => Inquiry::query()->where('status', 'new')->count(),
                'inquiries_total' => Inquiry::query()->count(),
            ],
            'recentInquiries' => Inquiry::query()->latest()->limit(6)->get(),
        ]);
    }
}
