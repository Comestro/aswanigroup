<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CatalogDownloadController extends Controller
{
    public function __invoke(Catalog $catalog): BinaryFileResponse
    {
        abort_unless($catalog->is_active, 404);

        $filePath = $catalog->file_path;
        $resolvedPath = null;

        if (str_starts_with($filePath, '/storage/')) {
            $relative = substr($filePath, strlen('/storage/'));
            if ($relative !== '' && Storage::disk('public')->exists($relative)) {
                $resolvedPath = Storage::disk('public')->path($relative);
            }
        } else {
            $candidate = public_path(ltrim($filePath, '/'));
            if (is_file($candidate)) {
                $resolvedPath = $candidate;
            }
        }

        abort_if($resolvedPath === null, 404);

        $catalog->increment('download_count');

        $extension = pathinfo($resolvedPath, PATHINFO_EXTENSION) ?: 'pdf';
        $downloadName = str($catalog->title)->slug()->toString().'.'.$extension;

        return response()->download($resolvedPath, $downloadName);
    }
}
