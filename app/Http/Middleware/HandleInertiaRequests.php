<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use App\Models\Venture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $hasSettings = Schema::hasTable('site_settings');
        $hasVentures = Schema::hasTable('ventures');

        $user = $request->user();

        return [
            ...parent::share($request),
            'name' => config('app.name', 'Ashwin Group'),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => (bool) $user->is_admin,
                ] : null,
            ],
            'siteSettings' => $hasSettings
                ? SiteSetting::current()->toPublicArray()
                : (new SiteSetting)->toPublicArray(),
            'navVentures' => $hasVentures
                ? Venture::query()
                    ->active()
                    ->ordered()
                    ->get(['id', 'slug', 'short_label', 'name'])
                    ->toArray()
                : [],
            'flash' => [
                'success' => fn (): mixed => $request->session()->get('success'),
                'error' => fn (): mixed => $request->session()->get('error'),
                'whatsapp_url' => fn (): mixed => $request->session()->get('whatsapp_url'),
            ],
        ];
    }
}
