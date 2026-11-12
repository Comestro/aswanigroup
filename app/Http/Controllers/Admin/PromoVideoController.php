<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SavePromoVideoRequest;
use App\Models\PromoVideo;
use App\Models\Venture;
use App\Services\FileUploadService;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PromoVideoController extends Controller
{
    public function index(ImageService $images): Response
    {
        Gate::authorize('access-admin');

        $videos = PromoVideo::query()->with('venture:id,short_label')->ordered()->get();
        $images->hydrateCollection($videos, 'poster_image', 'poster_path', 'poster_urls', 'poster_images_data');

        return Inertia::render('Admin/Videos', [
            'videos' => $videos,
            'ventures' => Venture::query()->ordered()->get(['id', 'short_label', 'name']),
        ]);
    }

    public function store(
        SavePromoVideoRequest $request,
        FileUploadService $uploads,
        ImageService $images,
    ): RedirectResponse {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $validated['youtube_id'] = $validated['source_type'] === 'youtube'
            ? PromoVideo::extractYoutubeId($validated['youtube_url'] ?? null)
            : null;

        if ($request->hasFile('video_file')) {
            $validated['video_path'] = $uploads->storePublicFile($request->file('video_file'), 'videos');
        }

        if ($request->hasFile('poster_file')) {
            $posterFile = $request->file('poster_file');

            if ($posterFile !== null) {
                $validated['poster_image'] = [$images->upload($posterFile, 'videos/posters')->id];
            }
        }

        unset($validated['video_file'], $validated['poster_file'], $validated['poster_path']);
        PromoVideo::query()->create($validated);

        return back()->with('success', 'Promo video added.');
    }

    public function update(
        SavePromoVideoRequest $request,
        PromoVideo $promoVideo,
        FileUploadService $uploads,
        ImageService $images,
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
            $posterFile = $request->file('poster_file');

            if ($posterFile !== null) {
                $images->delete($promoVideo->poster_image);
                $validated['poster_image'] = [$images->upload($posterFile, 'videos/posters')->id];
            }
        }

        unset($validated['video_file'], $validated['poster_file'], $validated['poster_path']);
        $promoVideo->update($validated);

        return back()->with('success', 'Promo video updated.');
    }

    public function destroy(
        PromoVideo $promoVideo,
        FileUploadService $uploads,
        ImageService $images,
    ): RedirectResponse {
        Gate::authorize('access-admin');

        $uploads->deleteIfStored($promoVideo->video_path);
        $images->delete($promoVideo->poster_image);
        $promoVideo->delete();

        return back()->with('success', 'Promo video deleted.');
    }
}
