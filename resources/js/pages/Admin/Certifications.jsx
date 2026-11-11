import { Head } from '@inertiajs/react';
import AdminCrudManager from '../../components/AdminCrudManager';
import AdminLayout from '../../layouts/AdminLayout';

export default function Certifications({ certifications = [], ventures = [] }) {
    const ventureOptions = [
        { value: '', label: 'Group-wide' },
        ...ventures.map((v) => ({ value: v.id, label: v.short_label })),
    ];

    const fields = [
        {
            name: 'title',
            label: 'Document / Photo Title',
            type: 'text',
            required: true,
        },
        {
            name: 'type',
            label: 'Record Type',
            type: 'select',
            defaultValue: 'certificate',
            options: [
                {
                    value: 'agreement',
                    label: 'Official Agreement (e.g. First Copy)',
                },
                {
                    value: 'certificate',
                    label: 'Quality / Compliance Certificate',
                },
                { value: 'partnership_photo', label: 'Partnership Photo' },
            ],
        },
        {
            name: 'venture_id',
            label: 'Related Venture',
            type: 'select',
            options: ventureOptions,
        },
        { name: 'issuer', label: 'Issuing Authority / Partner', type: 'text' },
        {
            name: 'reference_number',
            label: 'Reference / Agreement No.',
            type: 'text',
        },
        { name: 'issued_date', label: 'Issued Date / Year', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        {
            name: 'image_file',
            label: 'Upload Preview Photo',
            type: 'file',
            accept: 'image/*',
        },
        {
            name: 'document_file',
            label: 'Upload Official Document Copy (PDF/Image)',
            type: 'file',
            accept: '.pdf,image/*',
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
            label: 'Title & Issuer',
            render: (item) => (
                <div>
                    <div className="font-bold text-primary">{item.title}</div>
                    <div className="text-xs text-on-surface-variant">
                        {item.issuer || 'Ashwin Group'}{' '}
                        {item.reference_number
                            ? `· ${item.reference_number}`
                            : ''}
                    </div>
                </div>
            ),
        },
        { label: 'Type', key: 'type' },
        { label: 'Date', key: 'issued_date' },
    ];

    return (
        <AdminLayout title="Certifications & Agreements">
            <Head title="Certifications - Ashwin Group CMS" />
            <AdminCrudManager
                title="Certifications, Agreements & Partnership Photos"
                subtitle="Upload certificates, partnership photos, and official agreement copies (such as the United Spirits First Copy)."
                items={certifications}
                fields={fields}
                columns={columns}
                storeRoute="admin.certifications.store"
                updateRoute="admin.certifications.update"
                destroyRoute="admin.certifications.destroy"
            />
        </AdminLayout>
    );
}
