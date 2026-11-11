<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Store an uploaded file on the public disk and return its web-accessible path.
     */
    public function storePublicFile(UploadedFile $file, string $directory): string
    {
        $extension = strtolower($file->getClientOriginalExtension() ?: $file->extension() ?: 'bin');
        $filename = Str::uuid()->toString().'.'.$extension;
        $storedPath = $file->storeAs($directory, $filename, 'public');

        return '/storage/'.ltrim((string) $storedPath, '/');
    }

    /**
     * Delete a previously uploaded file if it resides in public storage.
     */
    public function deleteIfStored(?string $webPath): void
    {
        if ($webPath === null || ! str_starts_with($webPath, '/storage/')) {
            return;
        }

        $relativePath = substr($webPath, strlen('/storage/'));

        if ($relativePath !== '' && Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
    }
}
