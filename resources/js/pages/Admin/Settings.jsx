import { Head, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import AdminLayout from '../../layouts/AdminLayout';
import { DEMO_IMAGE_URL, handleImageError } from '../../lib/utils';

const PAGE_HEADER_SECTIONS = [
    {
        page: 'home',
        title: 'Home Page Section Copy & Hero Background',
        fields: [
            { key: 'ventures_eyebrow', label: 'Ventures Eyebrow' },
            { key: 'ventures_title', label: 'Ventures Section Title' },
            {
                key: 'ventures_subtitle',
                label: 'Ventures Section Subtitle',
                textarea: true,
            },
            { key: 'certifications_eyebrow', label: 'Certifications Eyebrow' },
            {
                key: 'certifications_title',
                label: 'Certifications Section Title',
            },
            {
                key: 'certifications_subtitle',
                label: 'Certifications Subtitle',
                textarea: true,
            },
            { key: 'media_eyebrow', label: 'Media Eyebrow' },
            { key: 'media_title', label: 'Media Section Title' },
            { key: 'catalogs_eyebrow', label: 'Catalogs Eyebrow' },
            { key: 'catalogs_title', label: 'Catalogs Section Title' },
            { key: 'cta_eyebrow', label: 'Partner CTA Eyebrow' },
            { key: 'cta_title', label: 'Partner CTA Title' },
            {
                key: 'cta_subtitle',
                label: 'Partner CTA Subtitle',
                textarea: true,
            },
        ],
    },
    {
        page: 'about',
        title: 'About Us Page Header',
        fields: [
            { key: 'badge', label: 'Hero Badge' },
            { key: 'title', label: 'Hero Heading' },
            { key: 'subtitle', label: 'Hero Subtitle', textarea: true },
        ],
    },
    {
        page: 'industries',
        title: 'All Ventures (/industries) Page Header & CTA',
        fields: [
            { key: 'badge', label: 'Hero Badge' },
            { key: 'title', label: 'Hero Heading' },
            { key: 'subtitle', label: 'Hero Subtitle', textarea: true },
            { key: 'cta_eyebrow', label: 'Bottom CTA Eyebrow' },
            { key: 'cta_title', label: 'Bottom CTA Heading' },
            {
                key: 'cta_subtitle',
                label: 'Bottom CTA Subtitle',
                textarea: true,
            },
        ],
    },
    {
        page: 'portfolio',
        title: 'Portfolio Page Header',
        fields: [
            { key: 'badge', label: 'Hero Badge' },
            { key: 'title', label: 'Hero Heading' },
            { key: 'subtitle', label: 'Hero Subtitle', textarea: true },
        ],
    },
    {
        page: 'certifications',
        title: 'Certifications Page Header',
        fields: [
            { key: 'badge', label: 'Hero Badge' },
            { key: 'title', label: 'Hero Heading' },
            { key: 'subtitle', label: 'Hero Subtitle', textarea: true },
        ],
    },
    {
        page: 'contact',
        title: 'Contact Page Header & Panels',
        fields: [
            { key: 'badge', label: 'Hero Badge' },
            { key: 'title', label: 'Hero Heading' },
            { key: 'subtitle', label: 'Hero Subtitle', textarea: true },
            { key: 'sidebar_title', label: 'Sidebar Title' },
            { key: 'sidebar_subtitle', label: 'Sidebar Subtitle' },
            { key: 'form_title', label: 'Form Heading' },
            { key: 'form_subtitle', label: 'Form Subtitle', textarea: true },
        ],
    },
];

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
        page_headers: setting.page_headers || {},
        logo_file: null,
        chairman_image_file: null,
        page_header_files: {},
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const updatePageHeader = (page, field, value) => {
        setForm((prev) => ({
            ...prev,
            page_headers: {
                ...prev.page_headers,
                [page]: {
                    ...(prev.page_headers?.[page] || {}),
                    [field]: value,
                },
            },
        }));
    };

    const updateSocialLink = (network, value) => {
        setForm((prev) => ({
            ...prev,
            social_links: {
                ...prev.social_links,
                [network]: value,
            },
        }));
    };

    const updateArrayItem = (key, index, field, value) => {
        setForm((prev) => {
            const list = [...(prev[key] || [])];
            list[index] =
                field === null
                    ? value
                    : { ...(list[index] || {}), [field]: value };

            return { ...prev, [key]: list };
        });
    };

    const addArrayItem = (key, template) => {
        setForm((prev) => ({
            ...prev,
            [key]: [...(prev[key] || []), template],
        }));
    };

    const removeArrayItem = (key, index) => {
        setForm((prev) => ({
            ...prev,
            [key]: (prev[key] || []).filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);
        setErrors({});

        const payload = {
            ...form,
            core_values: (form.core_values || []).filter(
                (v) => String(v || '').trim() !== '',
            ),
            _method: 'put',
        };

        if (!(payload.logo_file instanceof File)) {
            delete payload.logo_file;
        }

        if (!(payload.chairman_image_file instanceof File)) {
            delete payload.chairman_image_file;
        }

        const headerFiles = {};

        for (const [page, file] of Object.entries(
            payload.page_header_files || {},
        )) {
            if (file instanceof File) {
                headerFiles[page] = file;
            }
        }

        if (Object.keys(headerFiles).length > 0) {
            payload.page_header_files = headerFiles;
        } else {
            delete payload.page_header_files;
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
                            <div className="mb-2 flex items-center gap-3">
                                <img
                                    src={setting.logo_path || DEMO_IMAGE_URL}
                                    alt="Current brand logo"
                                    onError={handleImageError}
                                    className="h-10 w-10 rounded border border-outline-variant bg-surface-container-low object-contain p-1"
                                />
                                <span className="text-[11px] text-on-surface-variant">
                                    {Array.isArray(setting.logo_images) &&
                                    setting.logo_images.length > 0
                                        ? `ImageKit ID #${setting.logo_images.join(', #')}`
                                        : 'Demo fallback'}
                                </span>
                            </div>
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
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Chairman Portrait Photo (JPG/PNG/WebP)
                            </label>
                            <div className="mb-2 flex items-center gap-3">
                                <img
                                    src={
                                        setting.chairman_image || DEMO_IMAGE_URL
                                    }
                                    alt="Current chairman portrait"
                                    onError={handleImageError}
                                    className="h-12 w-12 rounded border border-outline-variant bg-surface-container-low object-cover"
                                />
                                <span className="text-[11px] text-on-surface-variant">
                                    {Array.isArray(setting.chairman_images) &&
                                    setting.chairman_images.length > 0
                                        ? `ImageKit ID #${setting.chairman_images.join(', #')}`
                                        : 'Demo fallback'}
                                </span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        chairman_image_file:
                                            e.target.files?.[0] || null,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-1.5 text-xs"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-bold text-primary">
                                Footer Brand Summary
                            </label>
                            <textarea
                                rows={2}
                                value={form.footer_summary}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        footer_summary: e.target.value,
                                    })
                                }
                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-4 rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="font-serif text-lg font-bold text-primary">
                            Homepage Stats Strip
                        </h2>
                        <button
                            type="button"
                            onClick={() =>
                                addArrayItem('hero_stats', {
                                    value: '',
                                    label: '',
                                    icon: 'Building2',
                                })
                            }
                            className="inline-flex items-center gap-1 rounded border border-outline-variant px-3 py-1.5 text-xs font-bold text-primary hover:bg-surface-container-low"
                        >
                            <Plus size={14} /> Add Stat
                        </button>
                    </div>
                    <div className="space-y-3">
                        {(form.hero_stats || []).map((stat, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-1 gap-3 rounded border border-outline-variant bg-surface-container-low p-3 sm:grid-cols-12"
                            >
                                <input
                                    type="text"
                                    placeholder="Value (e.g. 25+ Yrs)"
                                    value={stat.value || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            'hero_stats',
                                            idx,
                                            'value',
                                            e.target.value,
                                        )
                                    }
                                    className="rounded border border-outline-variant bg-white px-3 py-1.5 text-sm sm:col-span-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Label"
                                    value={stat.label || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            'hero_stats',
                                            idx,
                                            'label',
                                            e.target.value,
                                        )
                                    }
                                    className="rounded border border-outline-variant bg-white px-3 py-1.5 text-sm sm:col-span-5"
                                />
                                <input
                                    type="text"
                                    placeholder="Icon Name (e.g. Droplets)"
                                    value={stat.icon || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            'hero_stats',
                                            idx,
                                            'icon',
                                            e.target.value,
                                        )
                                    }
                                    className="rounded border border-outline-variant bg-white px-3 py-1.5 text-sm sm:col-span-3"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeArrayItem('hero_stats', idx)
                                    }
                                    aria-label="Remove stat"
                                    className="inline-flex items-center justify-center rounded border border-red-200 bg-white p-1.5 text-red-600 hover:bg-red-50 sm:col-span-1"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-4 rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="font-serif text-lg font-bold text-primary">
                            Core Values &amp; Corporate Timeline
                        </h2>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => addArrayItem('core_values', '')}
                                className="inline-flex items-center gap-1 rounded border border-outline-variant px-3 py-1.5 text-xs font-bold text-primary hover:bg-surface-container-low"
                            >
                                <Plus size={14} /> Add Value
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    addArrayItem('timeline_items', {
                                        year: '',
                                        title: '',
                                        description: '',
                                    })
                                }
                                className="inline-flex items-center gap-1 rounded border border-outline-variant px-3 py-1.5 text-xs font-bold text-primary hover:bg-surface-container-low"
                            >
                                <Plus size={14} /> Add Milestone
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {(form.core_values || []).map((val, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Core value statement"
                                    value={val || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            'core_values',
                                            idx,
                                            null,
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeArrayItem('core_values', idx)
                                    }
                                    aria-label="Remove core value"
                                    className="rounded border border-red-200 bg-white p-2 text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-2">
                        {(form.timeline_items || []).map((item, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-1 gap-3 rounded border border-outline-variant bg-surface-container-low p-3 sm:grid-cols-12"
                            >
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={item.year || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            'timeline_items',
                                            idx,
                                            'year',
                                            e.target.value,
                                        )
                                    }
                                    className="rounded border border-outline-variant bg-white px-3 py-1.5 text-sm sm:col-span-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Milestone Title"
                                    value={item.title || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            'timeline_items',
                                            idx,
                                            'title',
                                            e.target.value,
                                        )
                                    }
                                    className="rounded border border-outline-variant bg-white px-3 py-1.5 text-sm sm:col-span-4"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={item.description || ''}
                                    onChange={(e) =>
                                        updateArrayItem(
                                            'timeline_items',
                                            idx,
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className="rounded border border-outline-variant bg-white px-3 py-1.5 text-sm sm:col-span-5"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeArrayItem('timeline_items', idx)
                                    }
                                    aria-label="Remove milestone"
                                    className="inline-flex items-center justify-center rounded border border-red-200 bg-white p-1.5 text-red-600 hover:bg-red-50 sm:col-span-1"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-4 rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <h2 className="font-serif text-lg font-bold text-primary">
                        Social Links
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {['linkedin', 'instagram', 'youtube'].map((network) => (
                            <div key={network}>
                                <label className="mb-1 block text-xs font-bold text-primary capitalize">
                                    {network} URL
                                </label>
                                <input
                                    type="url"
                                    placeholder={`https://${network}.com/...`}
                                    value={form.social_links?.[network] || ''}
                                    onChange={(e) =>
                                        updateSocialLink(
                                            network,
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-6 rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <div>
                        <h2 className="font-serif text-lg font-bold text-primary">
                            Dynamic Page Headers &amp; Section Copy
                        </h2>
                        <p className="mt-1 text-xs text-on-surface-variant">
                            Customize hero banners, headings, subtitles, and CTA
                            text across every public page without touching code.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {PAGE_HEADER_SECTIONS.map((section) => (
                            <div
                                key={section.page}
                                className="space-y-3 rounded border border-outline-variant bg-surface-container-low p-4"
                            >
                                <h3 className="font-serif text-sm font-bold text-primary">
                                    {section.title}
                                </h3>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div className="flex flex-wrap items-center gap-4 rounded border border-outline-variant bg-white p-3 md:col-span-2">
                                        <img
                                            src={
                                                form.page_headers?.[
                                                    section.page
                                                ]?.hero_image || DEMO_IMAGE_URL
                                            }
                                            alt={`${section.title} banner`}
                                            onError={handleImageError}
                                            className="h-14 w-24 shrink-0 rounded border border-outline-variant object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <label className="mb-1 block text-[11px] font-bold text-primary">
                                                Upload Hero Background Image
                                                (ImageKit){' '}
                                                {Array.isArray(
                                                    setting
                                                        .page_header_images?.[
                                                        section.page
                                                    ],
                                                ) &&
                                                setting.page_header_images[
                                                    section.page
                                                ].length > 0
                                                    ? `· Current ID #${setting.page_header_images[section.page].join(', #')}`
                                                    : ''}
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0] ||
                                                        null;
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        page_header_files: {
                                                            ...(prev.page_header_files ||
                                                                {}),
                                                            [section.page]:
                                                                file,
                                                        },
                                                    }));
                                                }}
                                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-1.5 text-xs"
                                            />
                                        </div>
                                    </div>
                                    {section.fields.map((field) => {
                                        const val =
                                            form.page_headers?.[section.page]?.[
                                                field.key
                                            ] || '';

                                        return (
                                            <div
                                                key={field.key}
                                                className={
                                                    field.textarea
                                                        ? 'md:col-span-2'
                                                        : ''
                                                }
                                            >
                                                <label className="mb-1 block text-[11px] font-bold text-primary">
                                                    {field.label}
                                                </label>
                                                {field.textarea ? (
                                                    <textarea
                                                        rows={2}
                                                        value={val}
                                                        onChange={(e) =>
                                                            updatePageHeader(
                                                                section.page,
                                                                field.key,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded border border-outline-variant bg-white px-3 py-1.5 text-sm"
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={val}
                                                        onChange={(e) =>
                                                            updatePageHeader(
                                                                section.page,
                                                                field.key,
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded border border-outline-variant bg-white px-3 py-1.5 text-sm"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {Object.keys(errors).length > 0 && (
                    <div className="rounded border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                        {Object.values(errors).map((err, i) => (
                            <p key={i}>
                                {Array.isArray(err) ? err.join(', ') : err}
                            </p>
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
