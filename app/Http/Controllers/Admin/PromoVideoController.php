<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SavePromoVideoRequest;
use App\Models\PromoVideo;
use App\Models\Venture;
use App\Services\FileUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PromoVideoController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('Admin/Videos', [
            'videos' => PromoVideo::query()->with('venture:id,short_label')->ordered()->get(),
            'ventures' => Venture::query()->ordered()->get(['id', 'short_label', 'name']),
        ]);
    }

    public function store(SavePromoVideoRequest $request, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $validated['youtube_id'] = $validated['source_type'] === 'youtube'
            ? PromoVideo::extractYoutubeId($validated['youtube_url'] ?? null)
            : null;

        if ($request->hasFile('video_file')) {
            $validated['video_path'] = $uploads->storePublicFile($request->file('video_file'), 'videos');
        }

        if ($request->hasFile('poster_file')) {
            $validated['poster_path'] = $uploads->storePublicFile($request->file('poster_file'), 'videos/posters');
        }

        unset($validated['video_file'], $validated['poster_file']);
        PromoVideo::query()->create($validated);

        return back()->with('success', 'Promo video added.');
    }

    public function update(
        SavePromoVideoRequest $request,
        PromoVideo $promoVideo,
        FileUploadService $uploads,
    ): RedirectResponse {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $validated['youtube_id'] = $validated['source_type'] === 'youtube'
            ? PromoVideo::extractYoutubeId($validated['youtube_url'] ?? null)
            : null;

        if ($request->hasFile('video_file')) {
            $uploads->deleteIfStored($promoVideo->video_path);
            $validated['video_path'] = $uploads->storePublicFile($request->file('video_file'), 'videos');
        }

        if ($request->hasFile('poster_file')) {
            $uploads->deleteIfStored($promoVideo->poster_path);
            $validated['poster_path'] = $uploads->storePublicFile($request->file('poster_file'), 'videos/posters');
        }

        unset($validated['video_file'], $validated['poster_file']);
        $promoVideo->update($validated);

        return back()->with('success', 'Promo video updated.');
    }

    public function destroy(PromoVideo $promoVideo, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $uploads->deleteIfStored($promoVideo->video_path);
        $uploads->deleteIfStored($promoVideo->poster_path);
        $promoVideo->delete();

        return back()->with('success', 'Promo video deleted.');
    }
}
