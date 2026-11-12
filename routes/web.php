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



Route::prefix('artisan')->group(function () {
    Route::get('/', function () {
        $html = <<<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Xpert - Artisan Tools</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px 20px; margin: 0; }
        .container { max-width: 680px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 24px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        h1 { margin-top: 0; font-size: 20px; color: #38bdf8; display: flex; align-items: center; gap: 8px; }
        p { color: #94a3b8; font-size: 14px; line-height: 1.5; }
        .btn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
        a.btn { display: flex; align-items: center; justify-content: center; text-align: center; background: #2563eb; color: white; padding: 14px 12px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px; transition: 0.2s; border: 1px solid rgba(255,255,255,0.1); }
        a.btn:hover { background: #1d4ed8; transform: translateY(-1px); }
        a.btn-danger { background: #dc2626; }
        a.btn-danger:hover { background: #b91c1c; }
        a.btn-warning { background: #d97706; color: #ffffff; }
        a.btn-warning:hover { background: #b45309; }
        a.btn-success { background: #059669; }
        a.btn-success:hover { background: #047857; }
        .footer { margin-top: 24px; text-align: center; color: #64748b; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛠️ Aswaani Group - Artisan Utilities</h1>
        <p>Click any action below to safely execute the Artisan command directly from the browser.</p>
        <div class="btn-grid">
            <a href="/artisan/migrate" class="btn">🚀 php artisan migrate</a>
            <a href="/artisan/migrate-fresh-seed" class="btn btn-danger" onclick="return confirm('WARNING: This will drop ALL database tables and re-seed everything. Are you sure you want to proceed?')">⚠️ migrate:fresh --seed</a>
            <a href="/artisan/optimize-clear" class="btn btn-warning">🧹 optimize:clear</a>
            <a href="/artisan/cache-clear" class="btn btn-warning">⚡ cache:clear</a>
            <a href="/artisan/route-clear" class="btn">🛣️ route:clear</a>
            <a href="/artisan/config-clear" class="btn">⚙️ config:clear</a>
            <a href="/artisan/storage-link" class="btn btn-success">🔗 storage:link</a>
        </div>
        <div class="footer">Mobile Xpert Development Environment</div>
    </div>
</body>
</html>
HTML;

        return response($html)->header('Content-Type', 'text/html');
    });

    Route::get('/migrate', function () {
        Artisan::call('migrate', ['--force' => true]);
        $output = Artisan::output();

        return response('<div style="background:#0f172a;color:#f8fafc;padding:30px;min-height:100vh;font-family:system-ui;"><div style="max-width:700px;margin:0 auto;"><h2 style="color:#38bdf8;">🚀 php artisan migrate Output:</h2><pre style="background:#1e293b;color:#4ade80;padding:16px;border-radius:8px;border:1px solid #334155;font-family:monospace;white-space:pre-wrap;">' . e($output ?: 'Migrations ran successfully. Nothing to migrate.') . '</pre><br><a href="/artisan" style="color:#38bdf8;text-decoration:none;font-weight:bold;">← Back to Artisan Tools</a></div></div>');
    });

    Route::get('/migrate-fresh-seed', function () {
        Artisan::call('migrate:fresh', ['--seed' => true, '--force' => true]);
        $output = Artisan::output();

        return response('<div style="background:#0f172a;color:#f8fafc;padding:30px;min-height:100vh;font-family:system-ui;"><div style="max-width:700px;margin:0 auto;"><h2 style="color:#ef4444;">⚠️ php artisan migrate:fresh --seed Output:</h2><pre style="background:#1e293b;color:#4ade80;padding:16px;border-radius:8px;border:1px solid #334155;font-family:monospace;white-space:pre-wrap;">' . e($output ?: 'Database refreshed and seeded successfully.') . '</pre><br><a href="/artisan" style="color:#38bdf8;text-decoration:none;font-weight:bold;">← Back to Artisan Tools</a></div></div>');
    });

    Route::get('/optimize-clear', function () {
        Artisan::call('optimize:clear');
        $output = Artisan::output();

        return response('<div style="background:#0f172a;color:#f8fafc;padding:30px;min-height:100vh;font-family:system-ui;"><div style="max-width:700px;margin:0 auto;"><h2 style="color:#f59e0b;">🧹 php artisan optimize:clear Output:</h2><pre style="background:#1e293b;color:#4ade80;padding:16px;border-radius:8px;border:1px solid #334155;font-family:monospace;white-space:pre-wrap;">' . e($output ?: 'All caches cleared successfully.') . '</pre><br><a href="/artisan" style="color:#38bdf8;text-decoration:none;font-weight:bold;">← Back to Artisan Tools</a></div></div>');
    });

    Route::get('/cache-clear', function () {
        Artisan::call('cache:clear');
        $output = Artisan::output();

        return response('<div style="background:#0f172a;color:#f8fafc;padding:30px;min-height:100vh;font-family:system-ui;"><div style="max-width:700px;margin:0 auto;"><h2 style="color:#f59e0b;">⚡ php artisan cache:clear Output:</h2><pre style="background:#1e293b;color:#4ade80;padding:16px;border-radius:8px;border:1px solid #334155;font-family:monospace;white-space:pre-wrap;">' . e($output ?: 'Cache cleared successfully.') . '</pre><br><a href="/artisan" style="color:#38bdf8;text-decoration:none;font-weight:bold;">← Back to Artisan Tools</a></div></div>');
    });

    Route::get('/route-clear', function () {
        Artisan::call('route:clear');
        $output = Artisan::output();

        return response('<div style="background:#0f172a;color:#f8fafc;padding:30px;min-height:100vh;font-family:system-ui;"><div style="max-width:700px;margin:0 auto;"><h2 style="color:#38bdf8;">🛣️ php artisan route:clear Output:</h2><pre style="background:#1e293b;color:#4ade80;padding:16px;border-radius:8px;border:1px solid #334155;font-family:monospace;white-space:pre-wrap;">' . e($output ?: 'Route cache cleared successfully.') . '</pre><br><a href="/artisan" style="color:#38bdf8;text-decoration:none;font-weight:bold;">← Back to Artisan Tools</a></div></div>');
    });

    Route::get('/config-clear', function () {
        Artisan::call('config:clear');
        $output = Artisan::output();

        return response('<div style="background:#0f172a;color:#f8fafc;padding:30px;min-height:100vh;font-family:system-ui;"><div style="max-width:700px;margin:0 auto;"><h2 style="color:#38bdf8;">⚙️ php artisan config:clear Output:</h2><pre style="background:#1e293b;color:#4ade80;padding:16px;border-radius:8px;border:1px solid #334155;font-family:monospace;white-space:pre-wrap;">' . e($output ?: 'Config cache cleared successfully.') . '</pre><br><a href="/artisan" style="color:#38bdf8;text-decoration:none;font-weight:bold;">← Back to Artisan Tools</a></div></div>');
    });

    Route::get('/storage-link', function () {
        Artisan::call('storage:link');
        $output = Artisan::output();

        return response('<div style="background:#0f172a;color:#f8fafc;padding:30px;min-height:100vh;font-family:system-ui;"><div style="max-width:700px;margin:0 auto;"><h2 style="color:#10b981;">🔗 php artisan storage:link Output:</h2><pre style="background:#1e293b;color:#4ade80;padding:16px;border-radius:8px;border:1px solid #334155;font-family:monospace;white-space:pre-wrap;">' . e($output ?: 'Storage link created successfully.') . '</pre><br><a href="/artisan" style="color:#38bdf8;text-decoration:none;font-weight:bold;">← Back to Artisan Tools</a></div></div>');
    });
});