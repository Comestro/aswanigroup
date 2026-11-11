<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveCertificationRequest;
use App\Models\Certification;
use App\Models\Venture;
use App\Services\FileUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('Admin/Certifications', [
            'certifications' => Certification::query()->with('venture:id,short_label')->ordered()->get(),
            'ventures' => Venture::query()->ordered()->get(['id', 'short_label', 'name']),
        ]);
    }

    public function store(SaveCertificationRequest $request, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('image_file')) {
            $validated['image_path'] = $uploads->storePublicFile($request->file('image_file'), 'certifications/images');
        }

        if ($request->hasFile('document_file')) {
            $validated['document_path'] = $uploads->storePublicFile($request->file('document_file'), 'certifications/docs');
        }

        unset($validated['image_file'], $validated['document_file']);
        Certification::query()->create($validated);

        return back()->with('success', 'Certification / agreement saved.');
    }

    public function update(
        SaveCertificationRequest $request,
        Certification $certification,
        FileUploadService $uploads,
    ): RedirectResponse {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('image_file')) {
            $uploads->deleteIfStored($certification->image_path);
            $validated['image_path'] = $uploads->storePublicFile($request->file('image_file'), 'certifications/images');
        }

        if ($request->hasFile('document_file')) {
            $uploads->deleteIfStored($certification->document_path);
            $validated['document_path'] = $uploads->storePublicFile($request->file('document_file'), 'certifications/docs');
        }

        unset($validated['image_file'], $validated['document_file']);
        $certification->update($validated);

        return back()->with('success', 'Certification updated.');
    }

    public function destroy(Certification $certification, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $uploads->deleteIfStored($certification->image_path);
        $uploads->deleteIfStored($certification->document_path);
        $certification->delete();

        return back()->with('success', 'Certification deleted.');
    }
}
