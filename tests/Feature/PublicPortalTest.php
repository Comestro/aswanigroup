<?php

use App\Models\Catalog;
use App\Models\SiteSetting;
use Database\Seeders\AshwinGroupSeeder;
use Illuminate\Support\Facades\Cache;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->seed(AshwinGroupSeeder::class);
});

test('all public routes render successfully with dynamic inertia props', function (string $routeName, string $component): void {
    $response = $this->get(route($routeName));

    $response->assertSuccessful();
    $response->assertInertia(fn (Assert $page) => $page
        ->component($component)
        ->has('siteSettings')
        ->has('navVentures')
    );
})->with([
    'home' => ['home', 'Home'],
    'about' => ['about', 'About'],
    'industries' => ['industries', 'Industries'],
    'ventures index' => ['ventures.index', 'Industries'],
    'portfolio' => ['portfolio', 'Portfolio'],
    'certifications' => ['certifications', 'Certifications'],
    'contact' => ['contact', 'Contact'],
    'login' => ['login', 'Auth/Login'],
]);

test('venture detail route renders dedicated dynamic venture page', function (): void {
    $this->get(route('ventures.show', 'jewelry'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('VentureShow')
            ->where('venture.slug', 'jewelry')
            ->has('otherVentures', 3)
            ->has('siteSettings.page_headers')
        );
});

test('site settings current works safely with database cache store and serializable_classes disabled', function (): void {
    config()->set('cache.default', 'database');
    Cache::forget(SiteSetting::CACHE_KEY);

    $first = SiteSetting::current();
    $second = SiteSetting::current();

    expect($first)->toBeInstanceOf(SiteSetting::class);
    expect($second)->toBeInstanceOf(SiteSetting::class);
    expect($second->company_name)->toBe($first->company_name);
    expect($second->core_values)->toBeArray();
});

test('catalog download serves file and increments download count', function (): void {
    $catalog = Catalog::query()->firstOrFail();
    $initialDownloads = $catalog->download_count;

    $response = $this->get(route('catalogs.download', $catalog));

    $response->assertSuccessful();
    $response->assertDownload();
    expect($catalog->fresh()?->download_count)->toBe($initialDownloads + 1);
});
