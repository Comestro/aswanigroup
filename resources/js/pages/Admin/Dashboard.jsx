import { Head, Link } from '@inertiajs/react';
import {
    Award,
    Building2,
    Download,
    FolderKanban,
    Mail,
    Settings,
    Video,
} from 'lucide-react';
import { route } from 'ziggy-js';
import AdminLayout from '../../layouts/AdminLayout';

export default function Dashboard({ metrics = {}, recentInquiries = [] }) {
    const cards = [
        {
            label: 'Active Ventures',
            value: metrics.ventures ?? 0,
            href: route('admin.ventures.index'),
            icon: Building2,
        },
        {
            label: 'Project Photos',
            value: metrics.projects ?? 0,
            href: route('admin.projects.index'),
            icon: FolderKanban,
        },
        {
            label: 'Certifications & Agreements',
            value: metrics.certifications ?? 0,
            href: route('admin.certifications.index'),
            icon: Award,
        },
        {
            label: 'Catalog Downloads',
            value: metrics.catalog_downloads ?? 0,
            href: route('admin.catalogs.index'),
            icon: Download,
        },
        {
            label: 'Promo Videos',
            value: metrics.videos ?? 0,
            href: route('admin.videos.index'),
            icon: Video,
        },
        {
            label: 'New Leads',
            value: metrics.inquiries_new ?? 0,
            href: route('admin.inquiries.index'),
            icon: Mail,
        },
        {
            label: 'Total Leads',
            value: metrics.inquiries_total ?? 0,
            href: route('admin.inquiries.index'),
            icon: Mail,
        },
        {
            label: 'Site Configuration',
            value: 'Live',
            href: route('admin.settings.edit'),
            icon: Settings,
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard - Ashwin Group" />

            <div className="space-y-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map(({ label, value, href, icon: Icon }) => (
                        <Link
                            key={label}
                            href={href}
                            className="flex items-center justify-between rounded-lg border border-outline-variant bg-white p-5 shadow-sm transition-colors hover:border-primary"
                        >
                            <div>
                                <div className="text-xs font-semibold text-on-surface-variant uppercase">
                                    {label}
                                </div>
                                <div className="mt-1 font-serif text-3xl font-bold text-primary">
                                    {value}
                                </div>
                            </div>
                            <Icon
                                size={24}
                                className="shrink-0 text-secondary"
                            />
                        </Link>
                    ))}
                </div>

                <div className="rounded-lg border border-outline-variant bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-serif text-lg font-bold text-primary">
                            Recent Inquiries &amp; Leads
                        </h2>
                        <Link
                            href={route('admin.inquiries.index')}
                            className="text-xs font-bold text-secondary hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-outline-variant">
                        {recentInquiries.map((inq) => (
                            <div
                                key={inq.id}
                                className="flex items-center justify-between gap-3 py-3 text-sm"
                            >
                                <div className="min-w-0">
                                    <div className="truncate font-bold text-primary">
                                        {inq.name} — {inq.interest_division}
                                    </div>
                                    <div className="truncate text-xs text-on-surface-variant">
                                        {inq.subject} ({inq.phone})
                                    </div>
                                </div>
                                <span className="rounded bg-surface-container-high px-2 py-0.5 text-[10px] font-bold text-primary uppercase">
                                    {inq.status}
                                </span>
                            </div>
                        ))}
                        {recentInquiries.length === 0 && (
                            <p className="py-6 text-center text-xs text-on-surface-variant">
                                No leads captured yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
