<?php

namespace App\Services;

use App\Models\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class ImageService
{
    /**
     * @var array<string, bool>
     */
    private array $ensuredFolders = [];

    public function __construct(private readonly FileUploadService $uploads) {}

    public function demoUrl(): string
    {
        return Image::DEMO_URL;
    }

    public function isImageKitConfigured(): bool
    {
        $enabled = (bool) config('services.imagekit.enabled', true);
        $privateKey = (string) config('services.imagekit.private_key', '');
        $urlEndpoint = (string) config('services.imagekit.url_endpoint', '');

        return $enabled && $privateKey !== '' && $urlEndpoint !== '';
    }

    /**
     * Build the full ImageKit folder path inside the root folder (default: aswanigroup).
     */
    public function fullFolderPath(string $subFolder = ''): string
    {
        $root = trim((string) config('services.imagekit.folder', 'aswanigroup'), '/');

        if ($root === '') {
            $root = 'aswanigroup';
        }

        $sub = trim($subFolder, '/');

        return $sub !== '' ? $root.'/'.$sub : $root;
    }

    /**
     * Create the target folder hierarchy in ImageKit if it does not already exist.
     */
    public function ensureFolder(string $subFolder = ''): string
    {
        $fullPath = $this->fullFolderPath($subFolder);

        if (! $this->isImageKitConfigured()) {
            return $fullPath;
        }

        $privateKey = (string) config('services.imagekit.private_key', '');
        $segments = array_values(array_filter(explode('/', $fullPath), static fn (string $seg): bool => $seg !== ''));
        $parent = '/';

        foreach ($segments as $segment) {
            $current = $parent === '/' ? '/'.$segment : $parent.'/'.$segment;

            if (isset($this->ensuredFolders[$current])) {
                $parent = $current;

                continue;
            }

            try {
                Http::withBasicAuth($privateKey, '')
                    ->timeout(15)
                    ->post('https://api.imagekit.io/v1/folder', [
                        'folderName' => $segment,
                        'parentFolderPath' => $parent,
                    ]);
            } catch (Throwable $exception) {
                Log::warning('ImageKit folder creation check failed', [
                    'folder' => $current,
                    'error' => $exception->getMessage(),
                ]);
            }

            $this->ensuredFolders[$current] = true;
            $parent = $current;
        }

        return $fullPath;
    }

    /**
     * Upload a single image (ImageKit first, local public disk fallback) and store its metadata in `images`.
     */
    public function upload(UploadedFile $file, string $subFolder = ''): Image
    {
        $folder = $this->fullFolderPath($subFolder);
        $dimensions = $this->extractDimensions($file);
        $originalName = $file->getClientOriginalName();
        $mimeType = $file->getMimeType() ?: $file->getClientMimeType();
        $size = $file->getSize() ?: null;

        if ($this->isImageKitConfigured()) {
            $uploaded = $this->uploadToImageKit($file, $subFolder, $folder);

            if ($uploaded !== null) {
                return Image::query()->create([
                    'url' => (string) $uploaded['url'],
                    'file_id' => isset($uploaded['fileId']) ? (string) $uploaded['fileId'] : null,
                    'file_path' => isset($uploaded['filePath']) ? (string) $uploaded['filePath'] : null,
                    'thumbnail_url' => isset($uploaded['thumbnailUrl']) ? (string) $uploaded['thumbnailUrl'] : null,
                    'disk' => 'imagekit',
                    'disk_path' => null,
                    'folder' => $folder,
                    'original_name' => $originalName,
                    'mime_type' => $mimeType,
                    'size' => isset($uploaded['size']) && is_numeric($uploaded['size']) ? (int) $uploaded['size'] : $size,
                    'width' => isset($uploaded['width']) && is_numeric($uploaded['width']) ? (int) $uploaded['width'] : $dimensions['width'],
                    'height' => isset($uploaded['height']) && is_numeric($uploaded['height']) ? (int) $uploaded['height'] : $dimensions['height'],
                    'metadata' => [
                        'name' => $uploaded['name'] ?? null,
                        'fileType' => $uploaded['fileType'] ?? null,
                    ],
                ]);
            }
        }

        $localDir = trim($subFolder, '/') !== '' ? trim($subFolder, '/') : $folder;
        $webPath = $this->uploads->storePublicFile($file, $localDir);
        $diskPath = str_starts_with($webPath, '/storage/')
            ? substr($webPath, strlen('/storage/'))
            : null;

        return Image::query()->create([
            'url' => $webPath,
            'file_id' => null,
            'file_path' => $webPath,
            'thumbnail_url' => $webPath,
            'disk' => 'public',
            'disk_path' => $diskPath,
            'folder' => $folder,
            'original_name' => $originalName,
            'mime_type' => $mimeType,
            'size' => $size,
            'width' => $dimensions['width'],
            'height' => $dimensions['height'],
            'metadata' => null,
        ]);
    }

    /**
     * Upload multiple image files and return an ordered list of created Image IDs.
     *
     * @param  array<int, UploadedFile|mixed>  $files
     * @return array<int, int>
     */
    public function uploadMany(array $files, string $subFolder = ''): array
    {
        $ids = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $ids[] = $this->upload($file, $subFolder)->id;
            }
        }

        return $ids;
    }

    /**
     * Register a pre-existing checked-in asset (e.g., seeded `/images/...` files) in the `images` table.
     */
    public function registerExistingAsset(string $path, string $subFolder = 'assets'): Image
    {
        $cleanPath = '/'.ltrim(trim($path), '/');
        $existing = Image::query()->where('url', $cleanPath)->first();

        if ($existing !== null) {
            return $existing;
        }

        $absolute = public_path(ltrim($cleanPath, '/'));
        $size = is_file($absolute) ? (filesize($absolute) ?: null) : null;
        $dimensions = is_file($absolute) ? $this->extractDimensionsFromPath($absolute) : ['width' => null, 'height' => null];

        return Image::query()->create([
            'url' => $cleanPath,
            'file_id' => null,
            'file_path' => $cleanPath,
            'thumbnail_url' => $cleanPath,
            'disk' => 'asset',
            'disk_path' => null,
            'folder' => $this->fullFolderPath($subFolder),
            'original_name' => basename($cleanPath),
            'mime_type' => is_file($absolute) ? (mime_content_type($absolute) ?: null) : null,
            'size' => $size,
            'width' => $dimensions['width'],
            'height' => $dimensions['height'],
            'metadata' => null,
        ]);
    }

    /**
     * Delete image(s) from ImageKit, local public disk, and the `images` table.
     *
     * @param  int|array<int, mixed>|Image|null  $idsOrModel
     */
    public function delete(int|array|Image|null $idsOrModel): void
    {
        if ($idsOrModel instanceof Image) {
            $images = collect([$idsOrModel]);
        } else {
            $ids = $this->normalizeIds($idsOrModel);

            if ($ids === []) {
                return;
            }

            $images = Image::query()->whereIn('id', $ids)->get();
        }

        $privateKey = (string) config('services.imagekit.private_key', '');

        foreach ($images as $image) {
            if ($image->file_id !== null && $image->file_id !== '' && $this->isImageKitConfigured()) {
                try {
                    Http::withBasicAuth($privateKey, '')
                        ->timeout(15)
                        ->delete('https://api.imagekit.io/v1/files/'.$image->file_id);
                } catch (Throwable $exception) {
                    Log::warning('Failed to delete image from ImageKit', [
                        'image_id' => $image->id,
                        'file_id' => $image->file_id,
                        'error' => $exception->getMessage(),
                    ]);
                }
            }

            if ($image->disk_path !== null && $image->disk_path !== '' && Storage::disk('public')->exists($image->disk_path)) {
                Storage::disk('public')->delete($image->disk_path);
            }

            if (str_starts_with($image->url, '/storage/')) {
                $this->uploads->deleteIfStored($image->url);
            }

            $image->delete();
        }
    }

    /**
     * Delete any stored local file path OR Image IDs during record edits/deletes.
     *
     * @param  int|array<int, mixed>|null  $imageIds
     */
    public function deleteIdsAndPath(int|array|null $imageIds, ?string $legacyPath = null): void
    {
        $this->delete($imageIds);
        $this->uploads->deleteIfStored($legacyPath);
    }

    /**
     * Resolve the primary image URL from image ID(s), falling back to legacy path or demo image.
     *
     * @param  int|array<int, mixed>|null  $imageIds
     * @param  Collection<int, Image>|null  $preloadedMap
     */
    public function resolveUrl(int|array|null $imageIds, ?string $legacyFallback = null, ?Collection $preloadedMap = null): string
    {
        $urls = $this->resolveUrls($imageIds, $legacyFallback, $preloadedMap, withDemoFallback: true);

        return $urls[0] ?? Image::DEMO_URL;
    }

    /**
     * Resolve all image URLs for an image ID array `[1, 6]` from the `images` table.
     *
     * @param  int|array<int, mixed>|null  $imageIds
     * @param  Collection<int, Image>|null  $preloadedMap
     * @return array<int, string>
     */
    public function resolveUrls(
        int|array|null $imageIds,
        ?string $legacyFallback = null,
        ?Collection $preloadedMap = null,
        bool $withDemoFallback = true,
    ): array {
        $ids = $this->normalizeIds($imageIds);
        $urls = [];

        if ($ids !== []) {
            $map = $preloadedMap ?? $this->loadMapForIds($ids);

            foreach ($ids as $id) {
                $img = $map->get($id);

                if ($img !== null && $img->url !== '') {
                    $urls[] = $img->url;
                }
            }
        }

        if ($urls === [] && $legacyFallback !== null && trim($legacyFallback) !== '') {
            $urls[] = trim($legacyFallback);
        }

        if ($urls === [] && $withDemoFallback) {
            $urls[] = Image::DEMO_URL;
        }

        return $urls;
    }

    /**
     * Resolve detailed image records (`id`, `url`, `thumbnail_url`, `original_name`, `size`) for `[1, 6]`.
     *
     * @param  int|array<int, mixed>|null  $imageIds
     * @param  Collection<int, Image>|null  $preloadedMap
     * @return array<int, array{id: int|null, url: string, thumbnail_url: string|null, original_name: string|null, size: int|null}>
     */
    public function resolveImagesData(
        int|array|null $imageIds,
        ?string $legacyFallback = null,
        ?Collection $preloadedMap = null,
    ): array {
        $ids = $this->normalizeIds($imageIds);
        $records = [];

        if ($ids !== []) {
            $map = $preloadedMap ?? $this->loadMapForIds($ids);

            foreach ($ids as $id) {
                $img = $map->get($id);

                if ($img !== null) {
                    $records[] = [
                        'id' => $img->id,
                        'url' => $img->url,
                        'thumbnail_url' => $img->thumbnail_url ?: $img->url,
                        'original_name' => $img->original_name,
                        'size' => $img->size,
                    ];
                }
            }
        }

        if ($records === []) {
            $fallbackUrl = ($legacyFallback !== null && trim($legacyFallback) !== '')
                ? trim($legacyFallback)
                : Image::DEMO_URL;

            $records[] = [
                'id' => null,
                'url' => $fallbackUrl,
                'thumbnail_url' => $fallbackUrl,
                'original_name' => basename($fallbackUrl),
                'size' => null,
            ];
        }

        return $records;
    }

    /**
     * Hydrate an iterable collection (or single model) with resolved URLs from the `images` table in one query.
     *
     * @param  iterable<int, Model>|Model  $models
     */
    public function hydrateCollection(
        iterable|Model $models,
        string $idColumn = 'image',
        string $primaryUrlAttr = 'image_path',
        string $urlsAttr = 'image_urls',
        string $dataAttr = 'images_data',
    ): void {
        $list = $models instanceof Model ? [$models] : [...$models];

        if ($list === []) {
            return;
        }

        $allIds = [];

        foreach ($list as $model) {
            $ids = $this->normalizeIds($model->getAttribute($idColumn));

            foreach ($ids as $id) {
                $allIds[$id] = $id;
            }
        }

        $map = $this->loadMapForIds(array_values($allIds));

        foreach ($list as $model) {
            $ids = $model->getAttribute($idColumn);
            $rawFallback = $model->getAttribute($primaryUrlAttr);
            $fallback = is_string($rawFallback) ? $rawFallback : null;

            $urls = $this->resolveUrls($ids, $fallback, $map, withDemoFallback: true);
            $data = $this->resolveImagesData($ids, $fallback, $map);

            $model->setAttribute($primaryUrlAttr, $urls[0] ?? Image::DEMO_URL);
            $model->setAttribute($urlsAttr, $urls);
            $model->setAttribute($dataAttr, $data);
        }
    }

    /**
     * Batch-load Image records keyed by ID.
     *
     * @param  array<int, int>  $ids
     * @return Collection<int, Image>
     */
    public function loadMapForIds(array $ids): Collection
    {
        $cleanIds = $this->normalizeIds($ids);

        if ($cleanIds === []) {
            /** @var Collection<int, Image> */
            return collect();
        }

        return Image::query()->whereIn('id', $cleanIds)->get()->keyBy('id');
    }

    /**
     * Normalize an ID, list of IDs, or JSON string into clean positive integer IDs.
     *
     * @return array<int, int>
     */
    public function normalizeIds(mixed $input): array
    {
        if (is_int($input)) {
            return $input > 0 ? [$input] : [];
        }

        if (is_string($input) && $input !== '') {
            $decoded = json_decode($input, true);

            if (is_array($decoded)) {
                $input = $decoded;
            } elseif (is_numeric($input)) {
                return (int) $input > 0 ? [(int) $input] : [];
            }
        }

        if (! is_array($input)) {
            return [];
        }

        $result = [];

        foreach ($input as $value) {
            if (is_numeric($value) && (int) $value > 0) {
                $intVal = (int) $value;
                $result[$intVal] = $intVal;
            }
        }

        return array_values($result);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function uploadToImageKit(UploadedFile $file, string $subFolder, string $folder): ?array
    {
        $this->ensureFolder($subFolder);

        $privateKey = (string) config('services.imagekit.private_key', '');
        $extension = strtolower($file->getClientOriginalExtension() ?: $file->extension() ?: 'jpg');
        $fileName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeBase = Str::slug($fileName !== '' ? $fileName : 'ashwin-asset');
        $finalName = $safeBase.'-'.Str::lower(Str::random(6)).'.'.$extension;
        $contents = file_get_contents($file->getRealPath());

        if ($contents === false) {
            return null;
        }

        try {
            $response = Http::withBasicAuth($privateKey, '')
                ->timeout(30)
                ->attach('file', $contents, $finalName)
                ->post('https://upload.imagekit.io/api/v1/files/upload', [
                    'fileName' => $finalName,
                    'folder' => '/'.$folder,
                    'useUniqueFileName' => 'true',
                ]);

            if ($response->successful()) {
                $json = $response->json();

                return is_array($json) ? $json : null;
            }

            Log::warning('ImageKit upload rejected request', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        } catch (Throwable $exception) {
            Log::warning('ImageKit upload exception, falling back to local disk', [
                'error' => $exception->getMessage(),
            ]);
        }

        return null;
    }

    /**
     * @return array{width: int|null, height: int|null}
     */
    private function extractDimensions(UploadedFile $file): array
    {
        $realPath = $file->getRealPath();

        if ($realPath === false) {
            return ['width' => null, 'height' => null];
        }

        return $this->extractDimensionsFromPath($realPath);
    }

    /**
     * @return array{width: int|null, height: int|null}
     */
    private function extractDimensionsFromPath(string $path): array
    {
        $info = @getimagesize($path);

        if (! is_array($info)) {
            return ['width' => null, 'height' => null];
        }

        return [
            'width' => (int) $info[0],
            'height' => (int) $info[1],
        ];
    }
}
