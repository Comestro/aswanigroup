import { Head } from '@inertiajs/react';
import AdminCrudManager from '../../components/AdminCrudManager';
import AdminLayout from '../../layouts/AdminLayout';
import { DEMO_IMAGE_URL, handleImageError } from '../../lib/utils';

export default function Videos({ videos = [], ventures = [] }) {
    const ventureOptions = [
        { value: '', label: 'General' },
        ...ventures.map((v) => ({ value: v.id, label: v.short_label })),
    ];

    const fields = [
        { name: 'title', label: 'Video Title', type: 'text', required: true },
        {
            name: 'source_type',
            label: 'Video Source',
            type: 'select',
            defaultValue: 'youtube',
            options: [
                { value: 'youtube', label: 'YouTube Promo Video' },
                { value: 'local', label: 'Uploaded / Local MP4' },
            ],
        },
        {
            name: 'venture_id',
            label: 'Venture',
            type: 'select',
            options: ventureOptions,
        },
        {
            name: 'youtube_url',
            label: 'YouTube URL or Video ID',
            type: 'text',
            placeholder: 'https://www.youtube.com/watch?v=...',
            help: 'Supports watch?v=, youtu.be/, shorts/, or 11-char ID.',
        },
        { name: 'description', label: 'Description', type: 'textarea' },
        {
            name: 'video_file',
            label: 'Upload MP4/WebM (for Local source)',
            type: 'file',
            accept: 'video/*',
        },
        {
            name: 'poster_file',
            label: 'Poster Image',
            type: 'file',
            accept: 'image/*',
            existingKey: 'poster_path',
        },
        {
            name: 'sort_order',
            label: 'Sort Order',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'is_featured',
            label: 'Featured',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'is_active',
            label: 'Active',
            type: 'checkbox',
            defaultValue: true,
        },
    ];

    const columns = [
        {
            label: 'Video',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <img
                        src={item.poster_path || DEMO_IMAGE_URL}
                        alt={item.title}
                        onError={handleImageError}
                        className="h-12 w-16 shrink-0 rounded border object-cover"
                    />
                    <div>
                        <div className="font-bold text-primary">
                            {item.title}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                            {item.source_type === 'youtube'
                                ? `YouTube ID: ${item.youtube_id}`
                                : item.video_path}
                            {Array.isArray(item.poster_image) &&
                            item.poster_image.length > 0
                                ? ` · Poster #${item.poster_image.join(', #')}`
                                : ''}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            label: 'Venture',
            render: (item) => item.venture?.short_label || 'General',
        },
    ];

    return (
        <AdminLayout title="Promo Videos & YouTube">
            <Head title="Promo Videos - Ashwin Group CMS" />
            <AdminCrudManager
                title="YouTube & Commercial Videos"
                subtitle="Paste any YouTube promo link to embed directly on the website."
                items={videos}
                fields={fields}
                columns={columns}
                storeRoute="admin.videos.store"
                updateRoute="admin.videos.update"
                destroyRoute="admin.videos.destroy"
            />
        </AdminLayout>
    );
}
