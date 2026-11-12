<?php

use App\Models\Certification;
use App\Models\Image;
use App\Models\Inquiry;
use App\Models\Project;
use App\Models\PromoVideo;
use App\Models\SiteSetting;
use App\Models\User;
use App\Models\Venture;
use Database\Seeders\AshwinGroupSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function (): void {
    $this->seed(AshwinGroupSeeder::class);
});

test('guests and non-admin users cannot access admin cms routes', function (): void {
    $this->get(route('admin.dashboard'))->assertRedirect(route('login'));

    $regularUser = User::factory()->create(['is_admin' => false]);

    $this->actingAs($regularUser)
        ->get(route('admin.dashboard'))
        ->assertForbidden();
});

test('admin can sign in and access all cms management pages', function (string $routeName): void {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route($routeName))
        ->assertSuccessful();
})->with([
    'dashboard' => 'admin.dashboard',
    'settings' => 'admin.settings.edit',
    'ventures' => 'admin.ventures.index',
    'projects' => 'admin.projects.index',
    'images' => 'admin.images.index',
    'certifications' => 'admin.certifications.index',
    'catalogs' => 'admin.catalogs.index',
    'videos' => 'admin.videos.index',
    'inquiries' => 'admin.inquiries.index',
]);

test('admin can update site settings and venture external link', function (): void {
    $admin = User::factory()->admin()->create();
    $setting = SiteSetting::query()->firstOrFail();

    $this->actingAs($admin)
        ->put(route('admin.settings.update'), [
            'company_name' => 'Ashwin Group',
            'company_full_name' => 'Ashwin Group of Companies',
            'est_year' => '1995',
            'primary_phone' => '9507488833',
            'page_headers' => [
                'about' => [
                    'title' => 'Dynamic Heritage',
                ],
            ],
        ])
        ->assertRedirect();

    $freshSetting = $setting->fresh();
    expect($freshSetting?->company_name)->toBe('Ashwin Group');
    expect($freshSetting?->toPublicArray()['page_headers']['about']['title'])->toBe('Dynamic Heritage');

    $jewelry = Venture::query()->where('slug', 'jewelry')->firstOrFail();

    $this->actingAs($admin)
        ->put(route('admin.ventures.update', $jewelry), [
            'name' => $jewelry->name,
            'slug' => $jewelry->slug,
            'short_label' => $jewelry->short_label,
            'summary' => $jewelry->summary,
            'external_url' => 'https://enaure.in',
            'external_cta_label' => 'Visit Official Website',
            'is_active' => true,
            'is_featured' => true,
            'sort_order' => 3,
        ])
        ->assertRedirect();

    expect($jewelry->fresh()?->external_url)->toBe('https://enaure.in');
});

test('admin can upload certification agreement copy and add youtube promo video', function (): void {
    Storage::fake('public');

    $admin = User::factory()->admin()->create();
    $venture = Venture::query()->firstOrFail();

    $this->actingAs($admin)
        ->post(route('admin.certifications.store'), [
            'venture_id' => $venture->id,
            'type' => 'agreement',
            'title' => 'New Partner Agreement Copy',
            'issuer' => 'United Spirits Ltd.',
            'reference_number' => 'REF-2026-99',
            'issued_date' => '2026',
            'document_file' => UploadedFile::fake()->create('agreement.pdf', 200, 'application/pdf'),
            'image_file' => UploadedFile::fake()->image('partnership.jpg'),
            'is_active' => true,
            'sort_order' => 1,
        ])
        ->assertRedirect();

    $cert = Certification::query()->where('title', 'New Partner Agreement Copy')->first();
    expect($cert)->not->toBeNull();
    expect($cert?->document_path)->toStartWith('/storage/certifications/docs/');
    expect($cert?->image)->toBeArray()->not->toBeEmpty();

    $certImage = Image::query()->find($cert?->image[0]);
    expect($certImage?->url)->toStartWith('/storage/certifications/images/');

    $this->actingAs($admin)
        ->post(route('admin.videos.store'), [
            'venture_id' => $venture->id,
            'title' => 'Ashwin Launch Reel',
            'source_type' => 'youtube',
            'youtube_url' => 'https://youtu.be/LXb3EKWsInQ',
            'is_featured' => true,
            'is_active' => true,
            'sort_order' => 1,
        ])
        ->assertRedirect();

    $video = PromoVideo::query()->where('title', 'Ashwin Launch Reel')->first();
    expect($video?->youtube_id)->toBe('LXb3EKWsInQ');
});

test('admin can create and delete project and update inquiry status', function (): void {
    $admin = User::factory()->admin()->create();
    $venture = Venture::query()->firstOrFail();

    $this->actingAs($admin)
        ->post(route('admin.projects.store'), [
            'venture_id' => $venture->id,
            'title' => 'Rajgir Solar Resort Phase 1',
            'category_label' => 'Energy',
            'location' => 'Rajgir, Bihar',
            'completion_year' => '2026',
            'is_featured_hero' => true,
            'is_active' => true,
            'sort_order' => 2,
        ])
        ->assertRedirect();

    $project = Project::query()->where('title', 'Rajgir Solar Resort Phase 1')->firstOrFail();

    $this->actingAs($admin)
        ->delete(route('admin.projects.destroy', $project))
        ->assertRedirect();

    expect(Project::query()->find($project->id))->toBeNull();

    $inquiry = Inquiry::factory()->create(['venture_id' => $venture->id]);

    $this->actingAs($admin)
        ->patch(route('admin.inquiries.update', $inquiry), ['status' => 'qualified'])
        ->assertRedirect();

    expect($inquiry->fresh()?->status)->toBe('qualified');
});
