import { Head } from '@inertiajs/react';
import AdminCrudManager from '../../components/AdminCrudManager';
import AdminLayout from '../../layouts/AdminLayout';

export default function Ventures({ ventures = [] }) {
    const fields = [
        { name: 'name', label: 'Venture Name', type: 'text', required: true },
        { name: 'slug', label: 'URL Slug', type: 'text', required: true },
        {
            name: 'short_label',
            label: 'Tab Label',
            type: 'text',
            required: true,
        },
        { name: 'subtitle', label: 'Subtitle', type: 'text' },
        { name: 'badge', label: 'Badge', type: 'text' },
        {
            name: 'icon_name',
            label: 'Icon',
            type: 'select',
            defaultValue: 'Building2',
            options: [
                { value: 'Droplets', label: 'Droplets (Water)' },
                { value: 'Bolt', label: 'Bolt (Energy)' },
                { value: 'Gem', label: 'Gem (Jewelry)' },
                { value: 'Truck', label: 'Truck (Traders)' },
                { value: 'Building2', label: 'Building2 (Corporate)' },
            ],
        },
        {
            name: 'location_details',
            label: 'Customized Location Details',
            type: 'text',
            fullWidth: true,
        },
        {
            name: 'external_url',
            label: 'External Venture Website URL (optional)',
            type: 'url',
            placeholder: 'https://example.com',
        },
        {
            name: 'external_cta_label',
            label: 'External Link Button Label',
            type: 'text',
            placeholder: 'Visit Venture Website',
        },
        {
            name: 'summary',
            label: 'Short Summary',
            type: 'textarea',
            required: true,
        },
        {
            name: 'description',
            label: 'Detailed Description',
            type: 'textarea',
        },
        {
            name: 'highlights',
            label: 'Highlights (one per line)',
            type: 'lines',
        },
        {
            name: 'division_image_file',
            label: 'Upload Venture Card Image',
            type: 'file',
            accept: 'image/*',
        },
        {
            name: 'hero_image_file',
            label: 'Upload Venture Page Hero Banner',
            type: 'file',
            accept: 'image/*',
        },
        {
            name: 'hero_image',
            label: 'Hero Banner Image Path / URL (optional)',
            type: 'text',
            placeholder: '/images/industries-hero-bg.png',
        },
        {
            name: 'sort_order',
            label: 'Sort Order',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'is_active',
            label: 'Active (Visible on site)',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'is_featured',
            label: 'Featured on Home',
            type: 'checkbox',
            defaultValue: true,
        },
    ];

    const columns = [
        {
            label: 'Venture',
            render: (item) => (
                <div>
                    <div className="font-bold text-primary">{item.name}</div>
                    <div className="text-xs text-on-surface-variant">
                        Tab: {item.short_label} · /{item.slug}
                    </div>
                </div>
            ),
        },
        { label: 'Location', key: 'location_details' },
        {
            label: 'External Website',
            render: (item) =>
                item.external_url ? (
                    <a
                        href={item.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-secondary underline"
                    >
                        {item.external_url}
                    </a>
                ) : (
                    <span className="text-xs text-on-surface-variant">—</span>
                ),
        },
    ];

    return (
        <AdminLayout title="Ventures & Tabs">
            <Head title="Ventures - Ashwin Group CMS" />
            <AdminCrudManager
                title="Business Ventures / Tabs"
                subtitle="Configure each tabbed section, custom location text, external venture URLs, highlights, and images."
                items={ventures}
                fields={fields}
                columns={columns}
                storeRoute="admin.ventures.store"
                updateRoute="admin.ventures.update"
                destroyRoute="admin.ventures.destroy"
            />
        </AdminLayout>
    );
}
