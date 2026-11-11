import { Head } from '@inertiajs/react';
import AdminCrudManager from '../../components/AdminCrudManager';
import AdminLayout from '../../layouts/AdminLayout';

export default function Catalogs({ catalogs = [], ventures = [] }) {
    const ventureOptions = [
        { value: '', label: 'General' },
        ...ventures.map((v) => ({ value: v.id, label: v.short_label })),
    ];

    const fields = [
        { name: 'title', label: 'Catalog Title', type: 'text', required: true },
        {
            name: 'venture_id',
            label: 'Venture',
            type: 'select',
            options: ventureOptions,
        },
        { name: 'description', label: 'Description', type: 'textarea' },
        {
            name: 'file_upload',
            label: 'Upload PDF Catalog',
            type: 'file',
            accept: '.pdf',
        },
        { name: 'file_path', label: 'Or Existing File Path', type: 'text' },
        {
            name: 'file_size_label',
            label: 'Size Label (optional)',
            type: 'text',
        },
        {
            name: 'sort_order',
            label: 'Sort Order',
            type: 'number',
            defaultValue: 0,
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
            label: 'Catalog',
            render: (item) => (
                <div>
                    <div className="font-bold text-primary">{item.title}</div>
                    <div className="text-xs text-on-surface-variant">
                        {item.venture?.short_label || 'General'} ·{' '}
                        {item.file_size_label || 'PDF'}
                    </div>
                </div>
            ),
        },
        { label: 'Downloads', key: 'download_count' },
    ];

    return (
        <AdminLayout title="Downloadable Catalogs">
            <Head title="Catalogs - Ashwin Group CMS" />
            <AdminCrudManager
                title="Downloadable Catalogs & Brand Decks"
                subtitle="Upload PDF brochures and track how many times leads download them."
                items={catalogs}
                fields={fields}
                columns={columns}
                storeRoute="admin.catalogs.store"
                updateRoute="admin.catalogs.update"
                destroyRoute="admin.catalogs.destroy"
            />
        </AdminLayout>
    );
}
