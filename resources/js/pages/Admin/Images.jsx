import { Head, router } from '@inertiajs/react';
import { Check, Copy, FolderOpen, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import AdminLayout from '../../layouts/AdminLayout';
import { DEMO_IMAGE_URL, handleImageError } from '../../lib/utils';

const FOLDER_OPTIONS = [
    { value: 'projects', label: '/aswanigroup/projects' },
    { value: 'ventures', label: '/aswanigroup/ventures' },
    { value: 'ventures/heroes', label: '/aswanigroup/ventures/heroes' },
    { value: 'headers', label: '/aswanigroup/headers' },
    { value: 'branding', label: '/aswanigroup/branding' },
    {
        value: 'certifications/images',
        label: '/aswanigroup/certifications/images',
    },
    { value: 'videos/posters', label: '/aswanigroup/videos/posters' },
    { value: 'gallery', label: '/aswanigroup/gallery' },
];

function formatBytes(bytes) {
    if (!bytes || bytes <= 0) {
        return '—';
    }

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function Images({ images = [] }) {
    const [folder, setFolder] = useState('projects');
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});
    const [filterFolder, setFilterFolder] = useState('all');
    const [copiedId, setCopiedId] = useState(null);

    const folders = [
        'all',
        ...Array.from(new Set(images.map((img) => img.folder).filter(Boolean))),
    ];

    const filtered = images.filter(
        (img) => filterFolder === 'all' || img.folder === filterFolder,
    );

    const handleUpload = (event) => {
        event.preventDefault();

        if (files.length === 0) {
            return;
        }

        setUploading(true);
        setErrors({});

        router.post(
            route('admin.images.store'),
            { folder, files },
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setFiles([]);
                },
                onError: (err) => setErrors(err),
                onFinish: () => setUploading(false),
            },
        );
    };

    const handleDelete = (img) => {
        if (
            !window.confirm(
                `Delete Image #${img.id} (${img.original_name || 'asset'}) from ImageKit, disk, and database?`,
            )
        ) {
            return;
        }

        router.delete(route('admin.images.destroy', img.id), {
            preserveScroll: true,
        });
    };

    const handleCopyUrl = async (img) => {
        try {
            await navigator.clipboard.writeText(img.url);
            setCopiedId(img.id);
            setTimeout(() => setCopiedId(null), 1800);
        } catch {
            // Clipboard access may be blocked in insecure contexts
        }
    };

    return (
        <AdminLayout title="Media Library (ImageKit)">
            <Head title="Media Library - Ashwin Group CMS" />

            <div className="space-y-6">
                <section className="rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <h2 className="font-serif text-lg font-bold text-primary">
                        Upload Images to ImageKit (/aswanigroup)
                    </h2>
                    <p className="mt-1 text-xs text-on-surface-variant">
                        Every uploaded file is organized inside your ImageKit
                        root folder, saved in the <code>images</code> table with
                        its <code>file_id</code>, dimensions, and size, and can
                        be referenced across Projects, Ventures, and Settings by
                        Image ID.
                    </p>

                    <form
                        onSubmit={handleUpload}
                        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end"
                    >
                        <div className="md:col-span-4">
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Target Folder
                            </label>
                            <select
                                value={folder}
                                onChange={(e) => setFolder(e.target.value)}
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            >
                                {FOLDER_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-5">
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Select Images (Multiple allowed)
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                    setFiles(Array.from(e.target.files || []))
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-1.5 text-xs"
                            />
                        </div>

                        <div className="md:col-span-3">
                            <button
                                type="submit"
                                disabled={uploading || files.length === 0}
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-secondary disabled:opacity-50"
                            >
                                <Upload size={15} />
                                {uploading
                                    ? 'Uploading...'
                                    : `Upload ${files.length > 0 ? `(${files.length})` : ''}`}
                            </button>
                        </div>
                    </form>

                    {Object.keys(errors).length > 0 && (
                        <div className="mt-3 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                            {Object.values(errors).map((err, idx) => (
                                <p key={idx}>{err}</p>
                            ))}
                        </div>
                    )}
                </section>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {folders.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setFilterFolder(item)}
                                className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-bold transition-colors ${
                                    filterFolder === item
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-outline-variant bg-white text-primary hover:bg-surface-container-low'
                                }`}
                            >
                                <FolderOpen size={13} />
                                {item === 'all' ? 'All Folders' : item}
                            </button>
                        ))}
                    </div>
                    <span className="text-xs font-semibold text-on-surface-variant">
                        Showing {filtered.length} of {images.length} images
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((img) => (
                        <article
                            key={img.id}
                            className="flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-white shadow-sm"
                        >
                            <div className="relative aspect-[16/10] bg-surface-container-low">
                                <img
                                    src={
                                        img.thumbnail_url ||
                                        img.url ||
                                        DEMO_IMAGE_URL
                                    }
                                    alt={
                                        img.original_name || `Image #${img.id}`
                                    }
                                    onError={handleImageError}
                                    className="h-full w-full object-cover"
                                />
                                <span className="absolute top-2 left-2 rounded bg-primary/90 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                                    ID #{img.id}
                                </span>
                                <span className="absolute top-2 right-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-primary uppercase">
                                    {img.disk}
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col justify-between p-4">
                                <div>
                                    <h3 className="truncate text-sm font-bold text-primary">
                                        {img.original_name ||
                                            `Image #${img.id}`}
                                    </h3>
                                    <p className="mt-0.5 truncate text-[11px] text-secondary">
                                        {img.folder}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-on-surface-variant">
                                        <span>{formatBytes(img.size)}</span>
                                        {img.width && img.height && (
                                            <span>
                                                · {img.width}×{img.height}
                                            </span>
                                        )}
                                    </div>
                                    {img.file_id && (
                                        <p className="mt-1 truncate font-mono text-[10px] text-on-surface-variant/80">
                                            File ID: {img.file_id}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center gap-2 border-t border-outline-variant pt-3">
                                    <button
                                        type="button"
                                        onClick={() => handleCopyUrl(img)}
                                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded border border-outline-variant px-2.5 py-1.5 text-xs font-bold text-primary hover:bg-surface-container-low"
                                    >
                                        {copiedId === img.id ? (
                                            <>
                                                <Check size={13} /> Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={13} /> Copy URL
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(img)}
                                        aria-label={`Delete image ${img.id}`}
                                        className="inline-flex items-center justify-center rounded border border-red-200 px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
