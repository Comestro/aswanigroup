<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveCatalogRequest;
use App\Models\Catalog;
use App\Models\Venture;
use App\Services\FileUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('Admin/Catalogs', [
            'catalogs' => Catalog::query()->with('venture:id,short_label')->ordered()->get(),
            'ventures' => Venture::query()->ordered()->get(['id', 'short_label', 'name']),
        ]);
    }

    public function store(SaveCatalogRequest $request, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('file_upload')) {
            $file = $request->file('file_upload');
            $validated['file_path'] = $uploads->storePublicFile($file, 'catalogs');
            if (empty($validated['file_size_label'])) {
                $mb = max(0.1, round(($file->getSize() ?: 0) / 1048576, 1));
                $validated['file_size_label'] = $mb.' MB PDF';
            }
        }

        unset($validated['file_upload']);
        Catalog::query()->create($validated);

        return back()->with('success', 'Downloadable catalog added.');
    }

    public function update(SaveCatalogRequest $request, Catalog $catalog, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('file_upload')) {
            $uploads->deleteIfStored($catalog->file_path);
            $file = $request->file('file_upload');
            $validated['file_path'] = $uploads->storePublicFile($file, 'catalogs');
            if (empty($validated['file_size_label'])) {
                $mb = max(0.1, round(($file->getSize() ?: 0) / 1048576, 1));
                $validated['file_size_label'] = $mb.' MB PDF';
            }
        } elseif (empty($validated['file_path'] ?? null)) {
            $validated['file_path'] = $catalog->file_path;
        }

        unset($validated['file_upload']);
        $catalog->update($validated);

        return back()->with('success', 'Catalog updated.');
    }

    public function destroy(Catalog $catalog, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $uploads->deleteIfStored($catalog->file_path);
        $catalog->delete();

        return back()->with('success', 'Catalog deleted.');
    }
}
