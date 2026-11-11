<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\CatalogController as AdminCatalogController;
use App\Http\Controllers\Admin\CertificationController as AdminCertificationController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\InquiryController as AdminInquiryController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\PromoVideoController as AdminPromoVideoController;
use App\Http\Controllers\Admin\SiteSettingController as AdminSiteSettingController;
use App\Http\Controllers\Admin\VentureController as AdminVentureController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CatalogDownloadController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\VentureHubController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/about', AboutController::class)->name('about');
Route::get('/industries', [VentureHubController::class, 'index'])->name('industries');
Route::get('/ventures', [VentureHubController::class, 'index'])->name('ventures.index');
Route::get('/ventures/{venture:slug}', [VentureHubController::class, 'index'])->name('ventures.show');
Route::get('/portfolio', PortfolioController::class)->name('portfolio');
Route::get('/certifications', CertificationController::class)->name('certifications');

Route::get('/catalogs/{catalog}/download', CatalogDownloadController::class)->name('catalogs.download');
Route::get('/contact', ContactController::class)->name('contact');
Route::post('/inquiries', [InquiryController::class, 'store'])
    ->middleware('throttle:inquiries')
    ->name('inquiries.store');

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:login')
        ->name('login.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'can:access-admin'])
    ->group(function (): void {
        Route::get('/', AdminDashboardController::class)->name('dashboard');

        Route::get('/settings', [AdminSiteSettingController::class, 'edit'])->name('settings.edit');
        Route::put('/settings', [AdminSiteSettingController::class, 'update'])->name('settings.update');

        Route::get('/ventures', [AdminVentureController::class, 'index'])->name('ventures.index');
        Route::post('/ventures', [AdminVentureController::class, 'store'])->name('ventures.store');
        Route::put('/ventures/{venture}', [AdminVentureController::class, 'update'])->name('ventures.update');
        Route::delete('/ventures/{venture}', [AdminVentureController::class, 'destroy'])->name('ventures.destroy');

        Route::get('/projects', [AdminProjectController::class, 'index'])->name('projects.index');
        Route::post('/projects', [AdminProjectController::class, 'store'])->name('projects.store');
        Route::put('/projects/{project}', [AdminProjectController::class, 'update'])->name('projects.update');
        Route::delete('/projects/{project}', [AdminProjectController::class, 'destroy'])->name('projects.destroy');

        Route::get('/certifications', [AdminCertificationController::class, 'index'])->name('certifications.index');
        Route::post('/certifications', [AdminCertificationController::class, 'store'])->name('certifications.store');
        Route::put('/certifications/{certification}', [AdminCertificationController::class, 'update'])->name('certifications.update');
        Route::delete('/certifications/{certification}', [AdminCertificationController::class, 'destroy'])->name('certifications.destroy');

        Route::get('/catalogs', [AdminCatalogController::class, 'index'])->name('catalogs.index');
        Route::post('/catalogs', [AdminCatalogController::class, 'store'])->name('catalogs.store');
        Route::put('/catalogs/{catalog}', [AdminCatalogController::class, 'update'])->name('catalogs.update');
        Route::delete('/catalogs/{catalog}', [AdminCatalogController::class, 'destroy'])->name('catalogs.destroy');

        Route::get('/videos', [AdminPromoVideoController::class, 'index'])->name('videos.index');
        Route::post('/videos', [AdminPromoVideoController::class, 'store'])->name('videos.store');
        Route::put('/videos/{promoVideo}', [AdminPromoVideoController::class, 'update'])->name('videos.update');
        Route::delete('/videos/{promoVideo}', [AdminPromoVideoController::class, 'destroy'])->name('videos.destroy');

        Route::get('/inquiries', [AdminInquiryController::class, 'index'])->name('inquiries.index');
        Route::patch('/inquiries/{inquiry}', [AdminInquiryController::class, 'update'])->name('inquiries.update');
        Route::delete('/inquiries/{inquiry}', [AdminInquiryController::class, 'destroy'])->name('inquiries.destroy');
    });
