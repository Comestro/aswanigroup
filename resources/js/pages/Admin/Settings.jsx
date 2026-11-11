import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import AdminLayout from '../../layouts/AdminLayout';

export default function Settings({ setting = {} }) {
    const [form, setForm] = useState({
        company_name: setting.company_name || '',
        company_full_name: setting.company_full_name || '',
        tagline: setting.tagline || '',
        hero_description: setting.hero_description || '',
        est_year: setting.est_year || '1995',
        founder_name: setting.founder_name || '',
        founder_title: setting.founder_title || '',
        chairman_quote: setting.chairman_quote || '',
        chairman_message: setting.chairman_message || '',
        vision_text: setting.vision_text || '',
        mission_text: setting.mission_text || '',
        core_values: setting.core_values || [],
        timeline_items: setting.timeline_items || [],
        hero_stats: setting.hero_stats || [],
        hq_address: setting.hq_address || '',
        office_hours: setting.office_hours || '',
        primary_phone: setting.primary_phone || '',
        secondary_phone: setting.secondary_phone || '',
        whatsapp_number: setting.whatsapp_number || '',
        primary_email: setting.primary_email || '',
        distributor_email: setting.distributor_email || '',
        inquiry_recipient_email: setting.inquiry_recipient_email || '',
        footer_regions: setting.footer_regions || '',
        footer_summary: setting.footer_summary || '',
        social_links: setting.social_links || {},
        logo_file: null,
        chairman_image_file: null,
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);
        setErrors({});

        const payload = { ...form, _method: 'put' };

        if (!(payload.logo_file instanceof File)) {
            delete payload.logo_file;
        }

        if (!(payload.chairman_image_file instanceof File)) {
            delete payload.chairman_image_file;
        }

        router.post(route('admin.settings.update'), payload, {
            forceFormData: true,
            preserveScroll: true,
            onError: (err) => setErrors(err),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <AdminLayout title="Site Settings">
            <Head title="Site Settings - Ashwin Group CMS" />

            <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
                <section className="space-y-4 rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <h2 className="font-serif text-lg font-bold text-primary">
                        Brand &amp; Homepage Content
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Short Brand Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={form.company_name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_name: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Full Corporate Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={form.company_full_name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_full_name: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={form.tagline}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        tagline: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Established Year *
                            </label>
                            <input
                                type="text"
                                required
                                value={form.est_year}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        est_year: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Hero Summary
                            </label>
                            <textarea
                                rows={2}
                                value={form.hero_description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        hero_description: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Replace Logo (PNG/SVG/WebP)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        logo_file: e.target.files?.[0] || null,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-1.5 text-xs"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-4 rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <h2 className="font-serif text-lg font-bold text-primary">
                        Contact, Email &amp; WhatsApp Lead Routing
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Primary Hotline
                            </label>
                            <input
                                type="text"
                                value={form.primary_phone}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        primary_phone: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Secondary Hotline
                            </label>
                            <input
                                type="text"
                                value={form.secondary_phone}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        secondary_phone: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                WhatsApp Number (with country code, e.g.
                                919507488833)
                            </label>
                            <input
                                type="text"
                                value={form.whatsapp_number}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        whatsapp_number: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Lead Notification Email
                            </label>
                            <input
                                type="email"
                                value={form.inquiry_recipient_email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        inquiry_recipient_email: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Public Contact Email
                            </label>
                            <input
                                type="email"
                                value={form.primary_email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        primary_email: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Distributor Desk Email
                            </label>
                            <input
                                type="email"
                                value={form.distributor_email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        distributor_email: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Office Hours
                            </label>
                            <input
                                type="text"
                                value={form.office_hours}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        office_hours: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Operating Regions
                            </label>
                            <input
                                type="text"
                                value={form.footer_regions}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        footer_regions: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-primary">
                                HQ Address
                            </label>
                            <textarea
                                rows={3}
                                value={form.hq_address}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        hq_address: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-4 rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <h2 className="font-serif text-lg font-bold text-primary">
                        About Us &amp; Chairman Section
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Founder Name
                            </label>
                            <input
                                type="text"
                                value={form.founder_name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        founder_name: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Founder Title
                            </label>
                            <input
                                type="text"
                                value={form.founder_title}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        founder_title: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Chairman Quote
                            </label>
                            <textarea
                                rows={2}
                                value={form.chairman_quote}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        chairman_quote: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Chairman Message
                            </label>
                            <textarea
                                rows={4}
                                value={form.chairman_message}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        chairman_message: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Vision Statement
                            </label>
                            <textarea
                                rows={2}
                                value={form.vision_text}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        vision_text: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Mission Statement
                            </label>
                            <textarea
                                rows={2}
                                value={form.mission_text}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        mission_text: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                </section>

                {Object.keys(errors).length > 0 && (
                    <div className="rounded border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                        {Object.values(errors).map((err, i) => (
                            <p key={i}>{err}</p>
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-secondary disabled:opacity-50"
                >
                    {processing ? 'Saving Settings...' : 'Save Site Settings'}
                </button>
            </form>
        </AdminLayout>
    );
}
