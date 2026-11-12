import { Head } from '@inertiajs/react';
import AdminCrudManager from '../../components/AdminCrudManager';
import AdminLayout from '../../layouts/AdminLayout';
import { DEMO_IMAGE_URL, handleImageError } from '../../lib/utils';

export default function Ventures({ ventures = [], libraryImages = [] }) {
    const fields = [
        { name: 'name', label: 'Venture Name', type: 'text', required: true },
        { name: 'slug', label: 'URL Slug', type: 'text', required: true },
        {
            name: 'short_label',
            label: 'Short Label',
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
            existingKey: 'division_image',
            libraryIdField: 'division_image_id',
        },
        {
            name: 'hero_image_file',
            label: 'Upload Venture Page Hero Banner',
            type: 'file',
            accept: 'image/*',
            existingKey: 'hero_image',
            libraryIdField: 'hero_image_id',
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
                <div className="flex items-center gap-3">
                    <img
                        src={item.division_image || DEMO_IMAGE_URL}
                        alt={item.name}
                        onError={handleImageError}
                        className="h-12 w-16 shrink-0 rounded border object-cover"
                    />
                    <div>
                        <div className="font-bold text-primary">
                            {item.name}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                            /{item.slug} · Card{' '}
                            {Array.isArray(item.image) && item.image.length > 0
                                ? `#${item.image.join(', #')}`
                                : 'Demo'}{' '}
                            · Hero{' '}
                            {Array.isArray(item.hero_images) &&
                            item.hero_images.length > 0
                                ? `#${item.hero_images.join(', #')}`
                                : 'Demo'}
                        </div>
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
        <AdminLayout title="Business Ventures">
            <Head title="Business Ventures - Ashwin Group CMS" />
            <AdminCrudManager
                title="Business Ventures"
                subtitle="Configure each venture page, location details, external website links, highlights, and ImageKit visuals."
                items={ventures}
                fields={fields}
                columns={columns}
                libraryImages={libraryImages}
                storeRoute="admin.ventures.store"
                updateRoute="admin.ventures.update"
                destroyRoute="admin.ventures.destroy"
            />
        </AdminLayout>
    );
}
