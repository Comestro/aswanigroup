<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveVentureRequest;
use App\Models\Venture;
use App\Services\FileUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class VentureController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('Admin/Ventures', [
            'ventures' => Venture::query()
                ->withCount(['projects', 'catalogs', 'certifications', 'promoVideos'])
                ->ordered()
                ->get(),
        ]);
    }

    public function store(SaveVentureRequest $request, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('division_image_file')) {
            $validated['division_image'] = $uploads->storePublicFile($request->file('division_image_file'), 'ventures');
        }

        if ($request->hasFile('hero_image_file')) {
            $validated['hero_image'] = $uploads->storePublicFile($request->file('hero_image_file'), 'ventures/heroes');
        }

        unset($validated['division_image_file'], $validated['hero_image_file']);
        Venture::query()->create($validated);

        return back()->with('success', 'Venture created successfully.');
    }

    public function update(SaveVentureRequest $request, Venture $venture, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('division_image_file')) {
            $uploads->deleteIfStored($venture->division_image);
            $validated['division_image'] = $uploads->storePublicFile($request->file('division_image_file'), 'ventures');
        }

        if ($request->hasFile('hero_image_file')) {
            $uploads->deleteIfStored($venture->hero_image);
            $validated['hero_image'] = $uploads->storePublicFile($request->file('hero_image_file'), 'ventures/heroes');
        }

        unset($validated['division_image_file'], $validated['hero_image_file']);
        $venture->update($validated);

        return back()->with('success', 'Venture updated successfully.');
    }

    public function destroy(Venture $venture, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $uploads->deleteIfStored($venture->division_image);
        $uploads->deleteIfStored($venture->hero_image);
        $venture->delete();

        return back()->with('success', 'Venture deleted.');
    }
}
