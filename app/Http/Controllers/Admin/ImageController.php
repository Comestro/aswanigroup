<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreImageRequest;
use App\Models\Image;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ImageController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('Admin/Images', [
            'images' => Image::query()->latest('id')->get(),
        ]);
    }

    public function store(StoreImageRequest $request, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $subFolder = isset($validated['folder']) && is_string($validated['folder'])
            ? trim($validated['folder'], '/')
            : 'gallery';

        $files = $request->file('files');
        $uploadedIds = is_array($files) ? $images->uploadMany($files, $subFolder) : [];
        $count = count($uploadedIds);

        return back()->with('success', "{$count} image".($count === 1 ? '' : 's').' uploaded to ImageKit.');
    }

    public function destroy(Image $image, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $images->delete($image);

        return back()->with('success', 'Image deleted from ImageKit, disk, and database.');
    }
}
