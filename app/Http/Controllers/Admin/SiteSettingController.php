<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteSettingRequest;
use App\Models\SiteSetting;
use App\Services\FileUploadService;
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

    public function update(UpdateSiteSettingRequest $request, FileUploadService $uploads): RedirectResponse
    {
        Gate::authorize('access-admin');

        $validated = $request->validated();
        $setting = SiteSetting::query()->first() ?? new SiteSetting;

        if ($request->hasFile('logo_file')) {
            $uploads->deleteIfStored($setting->logo_path);
            $validated['logo_path'] = $uploads->storePublicFile($request->file('logo_file'), 'branding');
        }

        if ($request->hasFile('chairman_image_file')) {
            $uploads->deleteIfStored($setting->chairman_image);
            $validated['chairman_image'] = $uploads->storePublicFile($request->file('chairman_image_file'), 'branding');
        }

        unset($validated['logo_file'], $validated['chairman_image_file']);

        $setting->fill($validated);
        $setting->save();

        return back()->with('success', 'Site settings updated successfully.');
    }
}
