import { Head, router } from '@inertiajs/react';
import { MessageCircle, Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';
import AdminLayout from '../../layouts/AdminLayout';

export default function Inquiries({ inquiries = [] }) {
    const updateStatus = (inquiryId, status) => {
        router.patch(
            route('admin.inquiries.update', inquiryId),
            { status },
            { preserveScroll: true },
        );
    };

    const handleDelete = (inquiry) => {
        if (!window.confirm(`Delete inquiry from "${inquiry.name}"?`)) {
            return;
        }

        router.delete(route('admin.inquiries.destroy', inquiry.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Leads & Inquiries">
            <Head title="Leads & Inquiries - Ashwin Group CMS" />

            <div className="overflow-x-auto rounded-lg border border-outline-variant bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-outline-variant bg-surface-container-high text-xs text-primary uppercase">
                        <tr>
                            <th className="px-4 py-3 font-bold">Lead</th>
                            <th className="px-4 py-3 font-bold">
                                Division &amp; Subject
                            </th>
                            <th className="px-4 py-3 font-bold">Message</th>
                            <th className="px-4 py-3 font-bold">Status</th>
                            <th className="px-4 py-3 text-right font-bold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {inquiries.map((item) => (
                            <tr key={item.id}>
                                <td className="px-4 py-3 align-top">
                                    <div className="font-bold text-primary">
                                        {item.name}
                                    </div>
                                    <div className="text-xs">{item.phone}</div>
                                    {item.email && (
                                        <div className="text-xs text-on-surface-variant">
                                            {item.email}
                                        </div>
                                    )}
                                    {item.city_region && (
                                        <div className="text-xs font-semibold text-secondary">
                                            {item.city_region}
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <div className="text-xs font-bold text-secondary uppercase">
                                        {item.interest_division}
                                    </div>
                                    <div className="font-semibold text-primary">
                                        {item.subject}
                                    </div>
                                    <div className="text-[11px] text-on-surface-variant">
                                        Source: {item.source_page}
                                    </div>
                                </td>
                                <td className="max-w-xs px-4 py-3 align-top text-xs text-on-surface-variant">
                                    {item.message}
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <select
                                        value={item.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                item.id,
                                                e.target.value,
                                            )
                                        }
                                        aria-label={`Status for ${item.name}`}
                                        className="rounded border border-outline-variant px-2 py-1 text-xs font-bold"
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">
                                            Contacted
                                        </option>
                                        <option value="qualified">
                                            Qualified
                                        </option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3 text-right align-top whitespace-nowrap">
                                    {item.whatsapp_url && (
                                        <a
                                            href={item.whatsapp_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mr-2 inline-flex items-center gap-1 rounded bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white"
                                        >
                                            <MessageCircle size={12} />
                                            WhatsApp
                                        </a>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item)}
                                        className="inline-flex items-center gap-1 rounded border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-700"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {inquiries.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-on-surface-variant"
                                >
                                    No leads received yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
