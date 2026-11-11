<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveProjectRequest;
use App\Models\Project;
use App\Models\Venture;
use App\Services\FileUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('Admin/Projects', [
            'projects' => Project::query()->with('venture:id,short_label')->ordered()->get(),
            'ventures' => Venture::query()->ordered()->get(['id', 'short_label', 'name']),
        ]);
    }

    public function store(SaveProjectRequest $request, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $validated['image_path'] = $request->hasFile('image_file')
            ? $uploads->storePublicFile($request->file('image_file'), 'projects')
            : (($validated['image_path'] ?? null) ?: '/images/portfolio-water-1.png');

        unset($validated['image_file']);
        Project::query()->create($validated);

        return back()->with('success', 'Project photo added to gallery.');
    }

    public function update(SaveProjectRequest $request, Project $project, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();

        if ($request->hasFile('image_file')) {
            $uploads->deleteIfStored($project->image_path);
            $validated['image_path'] = $uploads->storePublicFile($request->file('image_file'), 'projects');
        } elseif (empty($validated['image_path'])) {
            $validated['image_path'] = $project->image_path;
        }

        unset($validated['image_file']);
        $project->update($validated);

        return back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $uploads->deleteIfStored($project->image_path);
        $project->delete();

        return back()->with('success', 'Project deleted.');
    }
}
