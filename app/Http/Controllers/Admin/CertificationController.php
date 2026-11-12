<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveCertificationRequest;
use App\Models\Certification;
use App\Models\Venture;
use App\Services\FileUploadService;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    public function index(ImageService $images): Response
    {
        Gate::authorize('access-admin');

        $certifications = Certification::query()->with('venture:id,short_label')->ordered()->get();
        $images->hydrateCollection($certifications, 'image', 'image_path', 'image_urls', 'images_data');

        return Inertia::render('Admin/Certifications', [
            'certifications' => $certifications,
            'ventures' => Venture::query()->ordered()->get(['id', 'short_label', 'name']),
        ]);
    }

    public function store(
        SaveCertificationRequest $request,
        FileUploadService $uploads,
        ImageService $images,
    ): RedirectResponse {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('image_file')) {
            $imageFile = $request->file('image_file');

            if ($imageFile !== null) {
                $validated['image'] = [$images->upload($imageFile, 'certifications/images')->id];
            }
        }

        if ($request->hasFile('document_file')) {
            $validated['document_path'] = $uploads->storePublicFile($request->file('document_file'), 'certifications/docs');
        }

        unset($validated['image_file'], $validated['document_file'], $validated['image_path']);
        Certification::query()->create($validated);

        return back()->with('success', 'Certification / agreement saved.');
    }

    public function update(
        SaveCertificationRequest $request,
        Certification $certification,
        FileUploadService $uploads,
        ImageService $images,
    ): RedirectResponse {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('image_file')) {
            $imageFile = $request->file('image_file');

            if ($imageFile !== null) {
                $images->delete($certification->image);
                $validated['image'] = [$images->upload($imageFile, 'certifications/images')->id];
            }
        }

        if ($request->hasFile('document_file')) {
            $uploads->deleteIfStored($certification->document_path);
            $validated['document_path'] = $uploads->storePublicFile($request->file('document_file'), 'certifications/docs');
        }

        unset($validated['image_file'], $validated['document_file'], $validated['image_path']);
        $certification->update($validated);

        return back()->with('success', 'Certification updated.');
    }

    public function destroy(
        Certification $certification,
        FileUploadService $uploads,
        ImageService $images,
    ): RedirectResponse {
        Gate::authorize('access-admin');

        $images->delete($certification->image);
        $uploads->deleteIfStored($certification->document_path);
        $certification->delete();

        return back()->with('success', 'Certification deleted.');
    }
}
