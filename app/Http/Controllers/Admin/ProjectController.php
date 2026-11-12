<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveProjectRequest;
use App\Models\Image;
use App\Models\Project;
use App\Models\Venture;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(ImageService $images): Response
    {
        Gate::authorize('access-admin');

        $projects = Project::query()->with('venture:id,short_label')->ordered()->get();
        $images->hydrateCollection($projects, 'image', 'image_path', 'image_urls', 'images_data');

        return Inertia::render('Admin/Projects', [
            'projects' => $projects,
            'ventures' => Venture::query()->ordered()->get(['id', 'short_label', 'name']),
            'libraryImages' => Image::query()->latest('id')->get(['id', 'url', 'thumbnail_url', 'original_name', 'folder']),
        ]);
    }

    public function store(SaveProjectRequest $request, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $uploadedIds = $images->normalizeIds($validated['selected_image_ids'] ?? []);

        if ($request->hasFile('image_files')) {
            $files = $request->file('image_files');

            if (is_array($files)) {
                $uploadedIds = [...$uploadedIds, ...$images->uploadMany($files, 'projects')];
            }
        }

        if ($request->hasFile('image_file')) {
            $singleFile = $request->file('image_file');

            if ($singleFile !== null) {
                $uploadedIds[] = $images->upload($singleFile, 'projects')->id;
            }
        }

        $validated['image'] = array_values(array_unique($uploadedIds));

        unset($validated['image_file'], $validated['image_files'], $validated['selected_image_ids'], $validated['remove_image_ids'], $validated['image_path']);
        Project::query()->create($validated);

        return back()->with('success', 'Project photo added to gallery.');
    }

    public function update(SaveProjectRequest $request, Project $project, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $currentIds = $images->normalizeIds($project->image);
        $selectedIds = $images->normalizeIds($validated['selected_image_ids'] ?? []);
        $removeIds = $images->normalizeIds($validated['remove_image_ids'] ?? []);

        if ($selectedIds !== []) {
            $currentIds = array_values(array_unique([...$currentIds, ...$selectedIds]));
        }

        if ($removeIds !== []) {
            $idsToDelete = array_values(array_intersect($currentIds, $removeIds));

            if ($idsToDelete !== []) {
                $images->delete($idsToDelete);
            }

            $currentIds = array_values(array_diff($currentIds, $removeIds));
        }

        if ($request->hasFile('image_files')) {
            $files = $request->file('image_files');

            if (is_array($files)) {
                $newIds = $images->uploadMany($files, 'projects');
                $currentIds = array_values(array_unique([...$currentIds, ...$newIds]));
            }
        }

        if ($request->hasFile('image_file')) {
            $singleFile = $request->file('image_file');

            if ($singleFile !== null) {
                $images->delete($currentIds);
                $currentIds = [$images->upload($singleFile, 'projects')->id];
            }
        }

        $validated['image'] = $currentIds;

        unset($validated['image_file'], $validated['image_files'], $validated['selected_image_ids'], $validated['remove_image_ids'], $validated['image_path']);
        $project->update($validated);

        return back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $images->delete($project->image);
        $project->delete();

        return back()->with('success', 'Project deleted.');
    }
}
