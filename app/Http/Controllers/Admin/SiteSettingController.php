<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteSettingRequest;
use App\Models\SiteSetting;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function edit(): Response
    {
        Gate::authorize('access-admin');

        $setting = SiteSetting::query()->first() ?? SiteSetting::current();

        return Inertia::render('Admin/Settings', [
            'setting' => [
                ...$setting->toPublicArray(),
                'inquiry_recipient_email' => $setting->inquiry_recipient_email,
            ],
        ]);
    }

    public function update(UpdateSiteSettingRequest $request, ImageService $images): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $setting = SiteSetting::query()->first() ?? new SiteSetting;

        if ($request->hasFile('logo_file')) {
            $logoFile = $request->file('logo_file');

            if ($logoFile !== null) {
                $images->delete($setting->logo_images);
                $validated['logo_images'] = [$images->upload($logoFile, 'branding')->id];
            }
        }

        if ($request->hasFile('chairman_image_file')) {
            $chairmanFile = $request->file('chairman_image_file');

            if ($chairmanFile !== null) {
                $images->delete($setting->chairman_images);
                $validated['chairman_images'] = [$images->upload($chairmanFile, 'branding')->id];
            }
        }

        $headerFiles = $request->file('page_header_files');
        $headerImages = is_array($setting->page_header_images) ? $setting->page_header_images : [];

        if (is_array($headerFiles)) {
            foreach ($headerFiles as $page => $file) {
                $images->delete($headerImages[$page] ?? []);
                $uploadedHeader = $images->upload($file, 'headers');
                $headerImages[(string) $page] = [$uploadedHeader->id];

                if (isset($validated['page_headers']) && is_array($validated['page_headers'])) {
                    $validated['page_headers'][(string) $page]['hero_image'] = $uploadedHeader->url;
                }
            }
        }

        $validated['page_header_images'] = $headerImages;
        unset($validated['logo_file'], $validated['chairman_image_file'], $validated['page_header_files']);

        $setting->fill($validated);
        $setting->save();

        return back()->with('success', 'Site settings updated successfully.');
    }
}
