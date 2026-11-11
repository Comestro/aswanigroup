<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateInquiryStatusRequest;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('Admin/Inquiries', [
            'inquiries' => Inquiry::query()->with('venture:id,short_label')->latest()->get(),
        ]);
    }

    public function update(UpdateInquiryStatusRequest $request, Inquiry $inquiry): RedirectResponse
    {
        Gate::authorize('access-admin');

        $inquiry->update($request->validated());

        return back()->with('success', 'Lead status updated.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        Gate::authorize('access-admin');

        $inquiry->delete();

        return back()->with('success', 'Lead deleted.');
    }
}
