import {
    Award,
    Calendar,
    Check,
    Download,
    ExternalLink,
    FileText,
    MapPin,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { DEMO_IMAGE_URL, getVentureIcon, handleImageError } from '../lib/utils';
import InquiryForm from './InquiryForm';
import LightboxDialog from './LightboxDialog';
import MediaPlayerCard from './MediaPlayerCard';

export default function VentureTabsHub({
    ventures = [],
    certifications = [],
    catalogs = [],
    promoVideos = [],
    initialTab = '',
}) {
    const tabs = [
        ...ventures.map((venture) => ({
            key: venture.slug,
            label: venture.short_label,
            icon: getVentureIcon(venture.icon_name),
            type: 'venture',
            venture,
        })),
        {
            key: 'certifications',
            label: 'Certifications & Agreements',
            icon: Award,
            type: 'certifications',
        },
    ];

    const resolvedInitial = tabs.some((tab) => tab.key === initialTab)
        ? initialTab
        : tabs[0]?.key || 'certifications';

    const [activeKey, setActiveKey] = useState(resolvedInitial);
    const [certFilter, setCertFilter] = useState('all');
    const [lightboxItem, setLightboxItem] = useState(null);

    const activeTabObj = tabs.find((tab) => tab.key === activeKey) || tabs[0];

    const handleTabKeyDown = (event, currentIndex) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
            return;
        }

        event.preventDefault();
        const delta = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + delta + tabs.length) % tabs.length;
        const nextTab = tabs[nextIndex];
        setActiveKey(nextTab.key);
        const button = document.getElementById(`hub-tab-${nextTab.key}`);
        button?.focus();
    };

    const filteredCertifications = certifications.filter(
        (item) => certFilter === 'all' || item.type === certFilter,
    );

    const renderVenturePanel = (venture) => {
        const ventureProjects = venture.projects || [];
        const ventureCatalogs =
            venture.catalogs && venture.catalogs.length > 0
                ? venture.catalogs
                : catalogs.filter((cat) => cat.venture_id === venture.id);
        const ventureVideos =
            venture.promo_videos && venture.promo_videos.length > 0
                ? venture.promo_videos
                : promoVideos.filter(
                      (video) => video.venture_id === venture.id,
                  );

        return (
            <div className="space-y-10">
                <div className="grid grid-cols-1 gap-8 rounded border border-outline-variant bg-white p-6 shadow-sm md:p-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <div className="relative aspect-[4/3] overflow-hidden rounded border border-outline-variant bg-surface-container-high">
                            <img
                                src={
                                    venture.division_image ||
                                    venture.hero_image ||
                                    DEMO_IMAGE_URL
                                }
                                alt={venture.name}
                                onError={handleImageError}
                                className="h-full w-full object-contain p-3"
                            />
                            {venture.badge && (
                                <span className="absolute top-3 left-3 rounded bg-secondary px-3 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-sm">
                                    {venture.badge}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between lg:col-span-7">
                        <div>
                            <div className="mb-1 text-xs font-bold tracking-widest text-secondary uppercase">
                                {venture.subtitle}
                            </div>
                            <h3 className="mb-3 font-serif text-2xl font-bold text-primary md:text-3xl">
                                {venture.name}
                            </h3>

                            {venture.location_details && (
                                <div className="mb-4 inline-flex items-center gap-2 rounded border border-outline-variant bg-surface-container-low px-3.5 py-2 text-xs font-semibold text-primary md:text-sm">
                                    <MapPin
                                        size={16}
                                        className="shrink-0 text-secondary"
                                    />
                                    <span>{venture.location_details}</span>
                                </div>
                            )}

                            <p className="mb-5 text-sm leading-relaxed text-on-surface-variant md:text-base">
                                {venture.description || venture.summary}
                            </p>

                            {Array.isArray(venture.highlights) &&
                                venture.highlights.length > 0 && (
                                    <ul className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                        {venture.highlights.map((highlight) => (
                                            <li
                                                key={highlight}
                                                className="flex items-start gap-2.5 text-sm text-on-surface"
                                            >
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-secondary/10 text-secondary">
                                                    <Check size={13} />
                                                </span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 border-t border-outline-variant pt-4">
                            {venture.external_url && (
                                <a
                                    href={venture.external_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded bg-secondary px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-secondary/90 md:text-sm"
                                >
                                    <span>
                                        {venture.external_cta_label ||
                                            `Visit ${venture.short_label} Website`}
                                    </span>
                                    <ExternalLink size={15} />
                                </a>
                            )}

                            {ventureCatalogs.map((catalog) => (
                                <a
                                    key={catalog.id}
                                    href={route(
                                        'catalogs.download',
                                        catalog.id,
                                    )}
                                    className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-secondary md:text-sm"
                                >
                                    <Download size={15} />
                                    <span>
                                        {catalog.title}
                                        {catalog.file_size_label
                                            ? ` (${catalog.file_size_label})`
                                            : ''}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {ventureProjects.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <h4 className="font-serif text-xl font-bold text-primary md:text-2xl">
                                Showcase Gallery &amp; Installations
                            </h4>
                            <p className="text-sm text-on-surface-variant">
                                Click any photograph to inspect project details
                                and location.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {ventureProjects.map((project) => (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() =>
                                        setLightboxItem({
                                            title: project.title,
                                            badge: project.category_label,
                                            image:
                                                project.image_path ||
                                                DEMO_IMAGE_URL,
                                            images: project.image_urls,
                                            location: project.location,
                                            date: project.completion_year,
                                            description: project.summary,
                                        })
                                    }
                                    className="group rounded border border-outline-variant bg-white p-3 text-left shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="mb-3 aspect-[4/3] overflow-hidden rounded border border-outline-variant bg-slate-100">
                                        <img
                                            src={
                                                project.image_path ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={project.title}
                                            onError={handleImageError}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h5 className="font-serif text-base font-bold text-primary">
                                        {project.title}
                                    </h5>
                                    <div className="mt-2 flex flex-wrap gap-3 text-xs font-medium text-on-surface-variant">
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin
                                                size={13}
                                                className="text-secondary"
                                            />
                                            {project.location}
                                        </span>
                                        {project.completion_year && (
                                            <span className="inline-flex items-center gap-1">
                                                <Calendar
                                                    size={13}
                                                    className="text-secondary"
                                                />
                                                {project.completion_year}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {ventureVideos.length > 0 && (
                        <div className="space-y-4 lg:col-span-6">
                            <h4 className="font-serif text-xl font-bold text-primary">
                                Video Showcase
                            </h4>
                            <div className="space-y-4">
                                {ventureVideos.map((video) => (
                                    <MediaPlayerCard
                                        key={video.id}
                                        video={video}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div
                        className={`rounded border border-outline-variant bg-white p-6 shadow-sm ${
                            ventureVideos.length > 0
                                ? 'lg:col-span-6'
                                : 'lg:col-span-12'
                        }`}
                    >
                        <div className="mb-4">
                            <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                Direct Lead Capture
                            </span>
                            <h4 className="mt-1 font-serif text-xl font-bold text-primary">
                                Enquire About {venture.short_label}
                            </h4>
                            <p className="text-sm text-on-surface-variant">
                                Sends directly to Ashwin Group&apos;s email desk
                                and generates an instant WhatsApp message.
                            </p>
                        </div>
                        <InquiryForm
                            key={venture.id}
                            defaultVentureId={venture.id}
                            defaultDivision={venture.name}
                            defaultSubject={`${venture.short_label} Inquiry`}
                            sourcePage={`venture-tab-${venture.slug}`}
                            compact
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderCertificationsPanel = () => (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 rounded border border-outline-variant bg-white p-6 shadow-sm md:flex-row md:items-center">
                <div>
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold tracking-widest text-secondary uppercase">
                        <ShieldCheck size={15} />
                        <span>
                            Verified Credibility &amp; Official Documentation
                        </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-primary">
                        Certifications, Partnership Photos &amp; Agreements
                    </h3>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        Inspect official franchise authorizations (including the
                        United Spirits / Diageo Group partnership agreement
                        copy), quality certificates, and trade partnership
                        milestones.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {[
                        { key: 'all', label: 'All Documents' },
                        { key: 'agreement', label: 'Official Agreements' },
                        { key: 'certificate', label: 'Certificates' },
                        {
                            key: 'partnership_photo',
                            label: 'Partnership Photos',
                        },
                    ].map((chip) => (
                        <button
                            key={chip.key}
                            type="button"
                            onClick={() => setCertFilter(chip.key)}
                            className={`rounded border px-3.5 py-2 text-xs font-bold transition-colors ${
                                certFilter === chip.key
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-outline-variant bg-white text-primary hover:bg-surface-variant'
                            }`}
                        >
                            {chip.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCertifications.map((item) => {
                    const typeLabels = {
                        agreement: 'Official Agreement',
                        certificate: 'Quality Certificate',
                        partnership_photo: 'Partnership Photo',
                    };

                    return (
                        <div
                            key={item.id}
                            className="flex flex-col justify-between rounded border border-outline-variant bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div>
                                {item.image_path && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setLightboxItem({
                                                title: item.title,
                                                badge:
                                                    typeLabels[item.type] ||
                                                    'Document',
                                                image:
                                                    item.image_path ||
                                                    DEMO_IMAGE_URL,
                                                images: item.image_urls,
                                                issuer: item.issuer,
                                                reference:
                                                    item.reference_number,
                                                date: item.issued_date,
                                                description: item.description,
                                                documentUrl: item.document_path,
                                            })
                                        }
                                        className="mb-4 block aspect-[16/10] w-full overflow-hidden rounded border border-outline-variant bg-slate-100"
                                    >
                                        <img
                                            src={
                                                item.image_path ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={item.title}
                                            onError={handleImageError}
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </button>
                                )}

                                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                    <span className="rounded bg-secondary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-secondary uppercase">
                                        {typeLabels[item.type] || item.type}
                                    </span>
                                    {item.issued_date && (
                                        <span className="text-xs font-semibold text-on-surface-variant">
                                            {item.issued_date}
                                        </span>
                                    )}
                                </div>

                                <h4 className="mb-1 font-serif text-lg leading-snug font-bold text-primary">
                                    {item.title}
                                </h4>
                                {item.issuer && (
                                    <div className="mb-2 text-xs font-semibold text-secondary">
                                        {item.issuer}
                                    </div>
                                )}
                                {item.description && (
                                    <p className="text-sm leading-relaxed text-on-surface-variant">
                                        {item.description}
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant pt-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setLightboxItem({
                                            title: item.title,
                                            badge:
                                                typeLabels[item.type] ||
                                                'Document',
                                            image:
                                                item.image_path ||
                                                DEMO_IMAGE_URL,
                                            images: item.image_urls,
                                            issuer: item.issuer,
                                            reference: item.reference_number,
                                            date: item.issued_date,
                                            description: item.description,
                                            documentUrl: item.document_path,
                                        })
                                    }
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary"
                                >
                                    <ExternalLink size={14} />
                                    Inspect Details
                                </button>

                                {item.document_path && (
                                    <a
                                        href={item.document_path}
                                        download
                                        className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-secondary"
                                    >
                                        <FileText size={13} />
                                        Download Copy
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div>
            <div
                role="tablist"
                aria-label="Ashwin Group Ventures and Certifications"
                className="mb-8 flex gap-2 overflow-x-auto border-b border-outline-variant pb-1"
            >
                {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    const selected = tab.key === activeTabObj?.key;

                    return (
                        <button
                            key={tab.key}
                            id={`hub-tab-${tab.key}`}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActiveKey(tab.key)}
                            onKeyDown={(event) =>
                                handleTabKeyDown(event, index)
                            }
                            className={`relative flex shrink-0 items-center gap-2 rounded-t px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                                selected
                                    ? 'text-secondary after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-secondary'
                                    : 'text-on-surface-variant hover:text-primary'
                            }`}
                        >
                            <Icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            <div
                role="tabpanel"
                aria-labelledby={`hub-tab-${activeTabObj?.key}`}
                tabIndex={0}
                className="outline-none"
            >
                {activeTabObj?.type === 'certifications'
                    ? renderCertificationsPanel()
                    : activeTabObj?.venture
                      ? renderVenturePanel(activeTabObj.venture)
                      : null}
            </div>

            <LightboxDialog
                item={lightboxItem}
                onClose={() => setLightboxItem(null)}
            />
        </div>
    );
}
