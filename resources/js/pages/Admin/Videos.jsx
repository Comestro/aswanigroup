import { Head } from '@inertiajs/react';
import AdminCrudManager from '../../components/AdminCrudManager';
import AdminLayout from '../../layouts/AdminLayout';

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
                <div>
                    <div className="font-bold text-primary">{item.title}</div>
                    <div className="text-xs text-on-surface-variant">
                        {item.source_type === 'youtube'
                            ? `YouTube ID: ${item.youtube_id}`
                            : item.video_path}
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
