import { Head } from '@inertiajs/react';
import AdminCrudManager from '../../components/AdminCrudManager';
import AdminLayout from '../../layouts/AdminLayout';

export default function Projects({ projects = [], ventures = [] }) {
    const ventureOptions = [
        { value: '', label: 'Unassigned' },
        ...ventures.map((v) => ({ value: v.id, label: v.short_label })),
    ];

    const fields = [
        { name: 'title', label: 'Project Title', type: 'text', required: true },
        {
            name: 'venture_id',
            label: 'Venture Tab',
            type: 'select',
            options: ventureOptions,
        },
        {
            name: 'category_label',
            label: 'Portfolio Category',
            type: 'text',
            required: true,
            defaultValue: 'Water',
        },
        {
            name: 'location',
            label: 'Project Location',
            type: 'text',
            required: true,
        },
        { name: 'completion_year', label: 'Year', type: 'text' },
        {
            name: 'sort_order',
            label: 'Sort Order',
            type: 'number',
            defaultValue: 0,
        },
        { name: 'summary', label: 'Project Summary', type: 'textarea' },
        {
            name: 'image_file',
            label: 'Upload Project Photo',
            type: 'file',
            accept: 'image/*',
        },
        { name: 'image_path', label: 'Or Image Path', type: 'text' },
        {
            name: 'is_featured_hero',
            label: 'Show in Home Hero Showcase',
            type: 'checkbox',
            defaultValue: false,
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
            label: 'Photo & Title',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <img
                        src={item.image_path}
                        alt={item.title}
                        className="h-12 w-16 rounded border object-cover"
                    />
                    <div>
                        <div className="font-bold text-primary">
                            {item.title}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                            {item.category_label} ·{' '}
                            {item.venture?.short_label || 'General'}
                        </div>
                    </div>
                </div>
            ),
        },
        { label: 'Location', key: 'location' },
        { label: 'Year', key: 'completion_year' },
    ];

    return (
        <AdminLayout title="Project Gallery">
            <Head title="Projects - Ashwin Group CMS" />
            <AdminCrudManager
                title="Completed Projects & Photos"
                subtitle="Upload project photos, customize location details, and feature highlights on the Home hero."
                items={projects}
                fields={fields}
                columns={columns}
                storeRoute="admin.projects.store"
                updateRoute="admin.projects.update"
                destroyRoute="admin.projects.destroy"
            />
        </AdminLayout>
    );
}
