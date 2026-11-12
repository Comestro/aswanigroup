<?php

use App\Models\Image;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\User;
use App\Models\Venture;
use App\Services\ImageService;
use Database\Seeders\AshwinGroupSeeder;
use Illuminate\Http\Client\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->seed(AshwinGroupSeeder::class);
});

test('imagekit uploads create aswanigroup folder, store image records as [id, id], and clean up on edit and delete', function (): void {
    config()->set('services.imagekit', [
        'enabled' => true,
        'public_key' => 'public_test_key',
        'private_key' => 'private_test_key',
        'url_endpoint' => 'https://ik.imagekit.io/testaccount',
        'folder' => 'aswanigroup',
    ]);

    $uploadCounter = 0;

    Http::fake([
        'https://api.imagekit.io/v1/folder' => Http::response([], 201),
        'https://upload.imagekit.io/api/v1/files/upload' => function () use (&$uploadCounter) {
            $uploadCounter++;

            return Http::response([
                'fileId' => 'ik_file_'.$uploadCounter,
                'name' => 'project-'.$uploadCounter.'.jpg',
                'url' => 'https://ik.imagekit.io/testaccount/aswanigroup/projects/project-'.$uploadCounter.'.jpg',
                'thumbnailUrl' => 'https://ik.imagekit.io/testaccount/tr:n-ik_ml_thumbnail/aswanigroup/projects/project-'.$uploadCounter.'.jpg',
                'filePath' => '/aswanigroup/projects/project-'.$uploadCounter.'.jpg',
                'size' => 1024 * $uploadCounter,
                'width' => 800,
                'height' => 600,
                'fileType' => 'image',
            ], 200);
        },
        'https://api.imagekit.io/v1/files/*' => Http::response([], 204),
    ]);

    $admin = User::factory()->admin()->create();
    $venture = Venture::query()->firstOrFail();

    $this->actingAs($admin)
        ->post(route('admin.projects.store'), [
            'venture_id' => $venture->id,
            'title' => 'ImageKit Multi Photo Project',
            'category_label' => 'Water',
            'location' => 'Patna, Bihar',
            'completion_year' => '2026',
            'image_files' => [
                UploadedFile::fake()->image('one.jpg', 800, 600),
                UploadedFile::fake()->image('two.jpg', 800, 600),
            ],
            'is_featured_hero' => true,
            'is_active' => true,
            'sort_order' => 1,
        ])
        ->assertRedirect();

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.imagekit.io/v1/folder'
        && $request['folderName'] === 'aswanigroup'
        && $request['parentFolderPath'] === '/');

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.imagekit.io/v1/folder'
        && $request['folderName'] === 'projects'
        && $request['parentFolderPath'] === '/aswanigroup');

    $project = Project::query()->where('title', 'ImageKit Multi Photo Project')->firstOrFail();

    expect($project->image)->toBeArray()->toHaveCount(2);

    $firstImage = Image::query()->findOrFail($project->image[0]);
    $secondImage = Image::query()->findOrFail($project->image[1]);

    expect($firstImage->file_id)->toBe('ik_file_1');
    expect($firstImage->folder)->toBe('aswanigroup/projects');
    expect($firstImage->url)->toBe('https://ik.imagekit.io/testaccount/aswanigroup/projects/project-1.jpg');
    expect($firstImage->size)->toBe(1024);
    expect($firstImage->width)->toBe(800);
    expect($firstImage->height)->toBe(600);

    $this->get(route('portfolio'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->where('projects.0.title', 'ImageKit Multi Photo Project')
            ->where('projects.0.image_path', $firstImage->url)
            ->where('projects.0.image_urls', [$firstImage->url, $secondImage->url])
        );

    // Edit project: remove first image ID and ensure ImageKit + DB record deletion
    $this->actingAs($admin)
        ->put(route('admin.projects.update', $project), [
            'venture_id' => $venture->id,
            'title' => 'ImageKit Multi Photo Project Updated',
            'category_label' => 'Water',
            'location' => 'Patna, Bihar',
            'remove_image_ids' => [$firstImage->id],
            'is_active' => true,
            'sort_order' => 1,
        ])
        ->assertRedirect();

    Http::assertSent(fn (Request $request): bool => $request->method() === 'DELETE'
        && $request->url() === 'https://api.imagekit.io/v1/files/ik_file_1');

    expect(Image::query()->find($firstImage->id))->toBeNull();
    expect($project->fresh()?->image)->toBe([$secondImage->id]);

    // Delete project: ensure second image is also cleaned from ImageKit and images table
    $this->actingAs($admin)
        ->delete(route('admin.projects.destroy', $project))
        ->assertRedirect();

    Http::assertSent(fn (Request $request): bool => $request->method() === 'DELETE'
        && $request->url() === 'https://api.imagekit.io/v1/files/ik_file_2');

    expect(Image::query()->find($secondImage->id))->toBeNull();
});

test('missing image ids fall back to demo image and local disk files delete cleanly', function (): void {
    Storage::fake('public');

    $project = Project::factory()->create([
        'title' => 'No Photo Fallback Project',
        'image' => [],
    ]);

    $imageService = app(ImageService::class);
    expect($imageService->resolveUrl($project->image))->toBe(Image::DEMO_URL);

    $this->get(route('portfolio'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->where('projects', function ($projects) {
                $match = collect($projects)->firstWhere('title', 'No Photo Fallback Project');

                return $match !== null && $match['image_path'] === Image::DEMO_URL;
            })
        );

    $uploaded = $imageService->upload(UploadedFile::fake()->image('local-test.jpg', 400, 300), 'projects');
    expect($uploaded->disk)->toBe('public');
    expect($uploaded->disk_path)->not->toBeNull();
    Storage::disk('public')->assertExists((string) $uploaded->disk_path);

    $imageService->delete($uploaded->id);
    Storage::disk('public')->assertMissing((string) $uploaded->disk_path);
    expect(Image::query()->find($uploaded->id))->toBeNull();
});

test('admin media library can upload and delete images and attach selected image ids to projects and page headers', function (): void {
    Storage::fake('public');

    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('admin.images.store'), [
            'folder' => 'projects',
            'files' => [
                UploadedFile::fake()->image('library-one.jpg', 600, 400),
            ],
        ])
        ->assertRedirect();

    $uploaded = Image::query()->where('original_name', 'library-one.jpg')->firstOrFail();

    $venture = Venture::query()->firstOrFail();

    $this->actingAs($admin)
        ->post(route('admin.projects.store'), [
            'venture_id' => $venture->id,
            'title' => 'Selected Library ID Project',
            'category_label' => 'Water',
            'location' => 'Patna, Bihar',
            'selected_image_ids' => [$uploaded->id],
            'is_active' => true,
            'sort_order' => 1,
        ])
        ->assertRedirect();

    $project = Project::query()->where('title', 'Selected Library ID Project')->firstOrFail();
    expect($project->image)->toBe([$uploaded->id]);

    $this->actingAs($admin)
        ->put(route('admin.settings.update'), [
            'company_name' => 'Ashwin Group',
            'company_full_name' => 'Ashwin Group of Companies',
            'est_year' => '1995',
            'page_header_files' => [
                'home' => UploadedFile::fake()->image('home-banner.jpg', 1200, 600),
            ],
        ])
        ->assertRedirect();

    $headerImage = Image::query()->where('original_name', 'home-banner.jpg')->firstOrFail();
    $setting = SiteSetting::current()->toPublicArray();
    expect($setting['page_headers']['home']['hero_image'])->toBe($headerImage->url);

    $this->actingAs($admin)
        ->delete(route('admin.images.destroy', $uploaded))
        ->assertRedirect();

    expect(Image::query()->find($uploaded->id))->toBeNull();
});
