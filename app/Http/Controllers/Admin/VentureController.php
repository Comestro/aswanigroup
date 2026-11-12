<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveVentureRequest;
use App\Models\Image;
use App\Models\Venture;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class VentureController extends Controller
{
    public function index(ImageService $images): Response
    {
        Gate::authorize('access-admin');

        $ventures = Venture::query()
            ->withCount(['projects', 'catalogs', 'certifications', 'promoVideos'])
            ->ordered()
            ->get();

        $images->hydrateCollection($ventures, 'image', 'division_image', 'division_image_urls', 'division_images_data');
        $images->hydrateCollection($ventures, 'hero_images', 'hero_image', 'hero_image_urls', 'hero_images_data');

        return Inertia::render('Admin/Ventures', [
            'ventures' => $ventures,
            'libraryImages' => Image::query()->latest('id')->get(['id', 'url', 'thumbnail_url', 'original_name', 'folder']),
        ]);
    }

    public function store(SaveVentureRequest $request, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if (! empty($validated['division_image_id'])) {
            $validated['image'] = [(int) $validated['division_image_id']];
        }

        if ($request->hasFile('division_image_file')) {
            $file = $request->file('division_image_file');

            if ($file !== null) {
                $validated['image'] = [$images->upload($file, 'ventures')->id];
            }
        }

        if (! empty($validated['hero_image_id'])) {
            $validated['hero_images'] = [(int) $validated['hero_image_id']];
        }

        if ($request->hasFile('hero_image_file')) {
            $heroFile = $request->file('hero_image_file');

            if ($heroFile !== null) {
                $validated['hero_images'] = [$images->upload($heroFile, 'ventures/heroes')->id];
            }
        }

        unset(
            $validated['division_image_file'],
            $validated['hero_image_file'],
            $validated['division_image_id'],
            $validated['hero_image_id'],
            $validated['division_image'],
            $validated['hero_image'],
        );

        Venture::query()->create($validated);

        return back()->with('success', 'Venture created successfully.');
    }

    public function update(SaveVentureRequest $request, Venture $venture, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if (! empty($validated['division_image_id'])) {
            $validated['image'] = [(int) $validated['division_image_id']];
        }

        if ($request->hasFile('division_image_file')) {
            $file = $request->file('division_image_file');

            if ($file !== null) {
                $images->delete($venture->image);
                $validated['image'] = [$images->upload($file, 'ventures')->id];
            }
        }

        if (! empty($validated['hero_image_id'])) {
            $validated['hero_images'] = [(int) $validated['hero_image_id']];
        }

        if ($request->hasFile('hero_image_file')) {
            $heroFile = $request->file('hero_image_file');

            if ($heroFile !== null) {
                $images->delete($venture->hero_images);
                $validated['hero_images'] = [$images->upload($heroFile, 'ventures/heroes')->id];
            }
        }

        unset(
            $validated['division_image_file'],
            $validated['hero_image_file'],
            $validated['division_image_id'],
            $validated['hero_image_id'],
            $validated['division_image'],
            $validated['hero_image'],
        );

        $venture->update($validated);

        return back()->with('success', 'Venture updated successfully.');
    }

    public function destroy(Venture $venture, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $images->delete($venture->image);
        $images->delete($venture->hero_images);
        $venture->delete();

        return back()->with('success', 'Venture deleted.');
    }
}
