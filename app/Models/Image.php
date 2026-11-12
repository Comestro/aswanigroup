<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $url
 * @property string|null $file_id
 * @property string|null $file_path
 * @property string|null $thumbnail_url
 * @property string $disk
 * @property string|null $disk_path
 * @property string $folder
 * @property string|null $original_name
 * @property string|null $mime_type
 * @property int|null $size
 * @property int|null $width
 * @property int|null $height
 * @property array<string, mixed>|null $metadata
 */
#[Fillable([
    'url',
    'file_id',
    'file_path',
    'thumbnail_url',
    'disk',
    'disk_path',
    'folder',
    'original_name',
    'mime_type',
    'size',
    'width',
    'height',
    'metadata',
])]
class Image extends Model
{
    public const string DEMO_URL = '/images/demo-image.svg';

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'disk' => 'imagekit',
        'folder' => 'aswanigroup',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'size' => 'integer',
            'width' => 'integer',
            'height' => 'integer',
            'metadata' => 'array',
        ];
    }
}
