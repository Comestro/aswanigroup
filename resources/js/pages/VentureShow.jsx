import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    Download,
    ExternalLink,
    FileText,
    Images,
    MapPin,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import InquiryForm from '@/components/InquiryForm';
import LightboxDialog from '@/components/LightboxDialog';
import MediaPlayerCard from '@/components/MediaPlayerCard';
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError, VentureIcon } from '@/lib/utils';

export default function VentureShow({ venture, otherVentures = [] }) {
    const { siteSettings } = usePage().props;
    const companyName = siteSettings?.company_name || 'Ashwin Group';
    const [lightboxItem, setLightboxItem] = useState(null);

    const projects = venture.projects || [];
    const catalogs = venture.catalogs || [];
    const certifications = venture.certifications || [];
    const promoVideos = venture.promo_videos || venture.promoVideos || [];
    const highlights = venture.highlights || [];

    return (
        <MainLayout>
            <Head title={`${venture.name} | ${companyName}`} />

            {/* Dedicated Venture Architectural Header */}
            <section className="border-b border-outline-variant bg-white pt-8 pb-12 sm:pt-12 sm:pb-16">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 font-mono text-[11px] uppercase">
                        <Link
                            href={route('industries')}
                            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-secondary"
                        >
                            <ArrowLeft size={13} />
                            <span>All Ventures</span>
                        </Link>
                        <span className="text-secondary">
                            {venture.badge ||
                                venture.short_label ||
                                venture.name}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <div className="mb-4 inline-flex items-center gap-2 border border-outline bg-background px-3 py-1.5 font-mono text-[11px] font-semibold text-secondary uppercase">
                                <VentureIcon
                                    name={venture.icon_name}
                                    className="h-3.5 w-3.5"
                                />
                                <span>Operating Division</span>
                            </div>
                            <h1 className="font-serif text-[clamp(2.1rem,4.5vw,3.75rem)] leading-[1.04] font-bold text-primary">
                                {venture.name}
                            </h1>
                            {(venture.subtitle || venture.summary) && (
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
                                    {venture.subtitle || venture.summary}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
                            <a
                                href="#venture-inquiry"
                                className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                            >
                                <span>Inquire Now</span>
                                <ArrowRight size={14} />
                            </a>
                            {venture.external_url && (
                                <a
                                    href={venture.external_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 border border-outline bg-background px-4 py-3 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:border-primary"
                                >
                                    <span>
                                        {venture.external_cta_label ||
                                            'Website'}
                                    </span>
                                    <ExternalLink size={13} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Full-Width 16:9 Architectural Hero Frame + Spec Ledger */}
                    <div className="mt-10 border border-outline-variant bg-background p-2">
                        <img
                            src={
                                venture.hero_image ||
                                venture.division_image ||
                                DEMO_IMAGE_URL
                            }
                            alt={venture.name}
                            onError={handleImageError}
                            className="block aspect-[16/9] max-h-[520px] w-full object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-1 border-x border-b border-outline-variant bg-white sm:grid-cols-3 sm:divide-x sm:divide-outline-variant">
                        <div className="border-b border-outline-variant p-4 sm:border-b-0 sm:p-5">
                            <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                                Location / Footprint
                            </span>
                            <div className="mt-1 flex items-center gap-1.5 font-serif text-sm font-bold text-primary">
                                <MapPin
                                    size={14}
                                    className="shrink-0 text-secondary"
                                />
                                <span>
                                    {venture.location_details ||
                                        'Eastern India Operations'}
                                </span>
                            </div>
                        </div>
                        <div className="border-b border-outline-variant p-4 sm:border-b-0 sm:p-5">
                            <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                                Delivered Projects
                            </span>
                            <div className="mt-1 font-serif text-sm font-bold text-primary">
                                {projects.length} Featured Installations
                            </div>
                        </div>
                        <div className="p-4 sm:p-5">
                            <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                                Documentation & Media
                            </span>
                            <div className="mt-1 font-serif text-sm font-bold text-primary">
                                {catalogs.length} Catalogs ·{' '}
                                {certifications.length} Verified Records
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Division Overview & Capabilities */}
            <section className="border-b border-outline-variant bg-background py-14 md:py-20">
                <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8">
                    <div className="space-y-5 lg:col-span-6">
                        <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                            01 · Division Overview
                        </p>
                        <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                            {venture.short_label || venture.name} Operations
                        </h2>

                        {venture.summary && (
                            <p className="text-base leading-relaxed font-semibold text-primary sm:text-lg">
                                {venture.summary}
                            </p>
                        )}

                        {venture.description && (
                            <p className="text-sm leading-relaxed whitespace-pre-line text-on-surface-variant sm:text-base">
                                {venture.description}
                            </p>
                        )}

                        {highlights.length > 0 && (
                            <ul className="grid gap-2.5 pt-2 sm:grid-cols-2">
                                {highlights.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2.5 border border-outline-variant bg-white p-3.5 text-xs font-medium text-on-surface"
                                    >
                                        <Check
                                            size={14}
                                            className="mt-0.5 shrink-0 text-secondary"
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="lg:col-span-6">
                        <div className="border border-outline-variant bg-white p-2">
                            <img
                                src={
                                    venture.division_image ||
                                    venture.hero_image ||
                                    DEMO_IMAGE_URL
                                }
                                alt={venture.name}
                                onError={handleImageError}
                                className="block aspect-[16/10] w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Completed Projects Showcase */}
            {projects.length > 0 && (
                <section className="border-b border-outline-variant bg-white py-14 md:py-20">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant pb-5">
                            <div>
                                <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                    02 · Completed Installations
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary sm:text-3xl">
                                    {venture.short_label || venture.name}{' '}
                                    Project Gallery
                                </h2>
                            </div>
                            <Link
                                href={route('portfolio')}
                                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-secondary uppercase hover:underline"
                            >
                                <span>Full Portfolio</span>
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 border-t border-l border-outline-variant sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, idx) => {
                                const photoCount = Array.isArray(
                                    project.image_urls,
                                )
                                    ? project.image_urls.length
                                    : 1;

                                return (
                                    <button
                                        key={project.id}
                                        type="button"
                                        onClick={() =>
                                            setLightboxItem({
                                                title: project.title,
                                                badge:
                                                    project.category_label ||
                                                    venture.name,
                                                image:
                                                    project.image_path ||
                                                    DEMO_IMAGE_URL,
                                                images: project.image_urls,
                                                location: project.location,
                                                date: project.completion_year,
                                                description: project.summary,
                                            })
                                        }
                                        className="group flex h-full flex-col border-r border-b border-outline-variant bg-white p-5 text-left transition-colors hover:bg-background"
                                    >
                                        <div className="mb-3 flex w-full items-center justify-between font-mono text-[10px] tracking-wider text-on-surface-variant uppercase">
                                            <span className="text-secondary">
                                                0{idx + 1} ·{' '}
                                                {project.category_label ||
                                                    venture.short_label ||
                                                    venture.name}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                {photoCount > 1 && (
                                                    <span className="inline-flex items-center gap-1 text-primary">
                                                        <Images size={11} />
                                                        {photoCount}
                                                    </span>
                                                )}
                                                {project.completion_year}
                                            </span>
                                        </div>

                                        <div className="mb-4 aspect-[16/10] w-full overflow-hidden border border-outline-variant bg-surface-container-low">
                                            <img
                                                src={
                                                    project.image_path ||
                                                    DEMO_IMAGE_URL
                                                }
                                                alt={project.title}
                                                onError={handleImageError}
                                                className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        </div>

                                        <h3 className="font-serif text-lg font-bold text-primary transition-colors group-hover:text-secondary">
                                            {project.title}
                                        </h3>

                                        {project.location && (
                                            <p className="mt-1 flex items-center gap-1 text-xs text-on-surface-variant">
                                                <MapPin
                                                    size={12}
                                                    className="text-secondary"
                                                />
                                                {project.location}
                                            </p>
                                        )}

                                        {project.summary && (
                                            <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">
                                                {project.summary}
                                            </p>
                                        )}

                                        <span className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-[11px] font-semibold text-primary uppercase group-hover:text-secondary">
                                            <span>Inspect Project</span>
                                            <ArrowUpRight size={13} />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Catalogs & Videos */}
            {(catalogs.length > 0 || promoVideos.length > 0) && (
                <section className="border-b border-outline-variant bg-background py-14 md:py-16">
                    <div className="mx-auto grid w-full max-w-container-max gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                        {catalogs.length > 0 && (
                            <div
                                className={
                                    promoVideos.length > 0
                                        ? 'lg:col-span-5'
                                        : 'lg:col-span-12'
                                }
                            >
                                <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                    Technical Brochures
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary">
                                    Downloadable Catalogs
                                </h2>

                                <div className="mt-6 divide-y divide-outline-variant border border-outline-variant bg-white">
                                    {catalogs.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-start justify-between gap-4 p-4"
                                        >
                                            <div className="flex min-w-0 items-start gap-3">
                                                <div className="border border-outline-variant bg-background p-2 text-secondary">
                                                    <FileText size={16} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-serif font-bold text-primary">
                                                        {cat.title}
                                                    </h3>
                                                    {cat.description && (
                                                        <p className="mt-1 text-xs text-on-surface-variant">
                                                            {cat.description}
                                                        </p>
                                                    )}
                                                    {cat.file_size_label && (
                                                        <p className="mt-1 font-mono text-[10px] font-semibold text-secondary uppercase">
                                                            {
                                                                cat.file_size_label
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <a
                                                href={route(
                                                    'catalogs.download',
                                                    cat.id,
                                                )}
                                                className="inline-flex shrink-0 items-center gap-1.5 bg-primary px-3.5 py-2 font-mono text-[11px] font-semibold text-white uppercase transition-colors hover:bg-secondary"
                                            >
                                                <Download size={13} />
                                                <span>PDF</span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {promoVideos.length > 0 && (
                            <div
                                className={
                                    catalogs.length > 0
                                        ? 'lg:col-span-7'
                                        : 'lg:col-span-12'
                                }
                            >
                                <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                    Video Showcase
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary">
                                    Operations &amp; Facility Film
                                </h2>

                                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                    {promoVideos.map((video) => (
                                        <MediaPlayerCard
                                            key={video.id}
                                            video={video}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Related Certifications */}
            {certifications.length > 0 && (
                <section className="border-b border-outline-variant bg-white py-14 md:py-16">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant pb-5">
                            <div>
                                <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                    Verified Credentials
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary">
                                    Certifications &amp; Agreements
                                </h2>
                            </div>
                            <Link
                                href={route('certifications')}
                                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-secondary uppercase hover:underline"
                            >
                                <span>All Certifications</span>
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>

                        <div className="mt-8 grid border-t border-l border-outline-variant sm:grid-cols-2 lg:grid-cols-3">
                            {certifications.map((cert) => (
                                <button
                                    key={cert.id}
                                    type="button"
                                    onClick={() =>
                                        setLightboxItem({
                                            title: cert.title,
                                            badge: cert.type,
                                            image:
                                                cert.image_path ||
                                                DEMO_IMAGE_URL,
                                            images: cert.image_urls,
                                            issuer: cert.issuer,
                                            date: cert.issued_date,
                                            reference: cert.reference_number,
                                            description: cert.description,
                                            documentUrl:
                                                cert.document_path || null,
                                        })
                                    }
                                    className="flex h-full flex-col border-r border-b border-outline-variant bg-white p-5 text-left transition-colors hover:bg-background"
                                >
                                    <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-secondary uppercase">
                                        <ShieldCheck size={14} />
                                        <span>
                                            {cert.type || 'Certification'}
                                        </span>
                                    </div>
                                    <h3 className="mt-2 font-serif text-lg font-bold text-primary">
                                        {cert.title}
                                    </h3>
                                    {cert.issuer && (
                                        <p className="mt-1 text-xs text-on-surface-variant">
                                            Issued by {cert.issuer}
                                        </p>
                                    )}
                                    {cert.description && (
                                        <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">
                                            {cert.description}
                                        </p>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Direct Venture Inquiry Desk */}
            <section
                id="venture-inquiry"
                className="bg-surface-container-low py-14 md:py-20"
            >
                <div className="mx-auto grid w-full max-w-container-max gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-start lg:px-8">
                    <div className="space-y-4 lg:col-span-5">
                        <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                            Direct Venture Desk
                        </p>
                        <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                            Discuss Your {venture.short_label || venture.name}{' '}
                            Requirements
                        </h2>
                        <p className="text-sm leading-relaxed text-on-surface-variant">
                            Submit a project inquiry, partnership proposal, or
                            technical catalog request directly to our leadership
                            email and WhatsApp desk.
                        </p>
                    </div>

                    <div className="border border-outline bg-white p-5 sm:p-8 lg:col-span-7">
                        <InquiryForm
                            defaultVentureId={String(venture.id)}
                            defaultDivision={venture.name}
                            defaultSubject={`Inquiry regarding ${venture.name}`}
                            sourcePage={`venture:${venture.slug}`}
                        />
                    </div>
                </div>
            </section>

            {/* Other Sister Ventures */}
            {otherVentures.length > 0 && (
                <section className="border-t border-outline bg-primary py-14 text-white md:py-16">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
                            <div>
                                <p className="font-mono text-xs tracking-widest text-secondary-container uppercase">
                                    Explore Sister Companies
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold">
                                    Other {companyName} Ventures
                                </h2>
                            </div>
                            <Link
                                href={route('industries')}
                                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-secondary-container uppercase hover:text-white"
                            >
                                <span>All Ventures</span>
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>

                        <div className="mt-8 grid border-t border-l border-white/15 sm:grid-cols-2 lg:grid-cols-3">
                            {otherVentures.map((item, idx) => (
                                <Link
                                    key={item.id}
                                    href={route('ventures.show', item.slug)}
                                    className="group flex h-full flex-col border-r border-b border-white/15 bg-white/5 p-6 transition-colors hover:bg-secondary"
                                >
                                    <div className="flex items-center justify-between font-mono text-xs text-secondary-container">
                                        <span>0{idx + 1}</span>
                                        <ArrowUpRight
                                            size={15}
                                            className="text-white/60 group-hover:text-white"
                                        />
                                    </div>
                                    <h3 className="mt-4 font-serif text-xl font-bold text-white">
                                        {item.name}
                                    </h3>
                                    {item.location_details && (
                                        <p className="mt-2 line-clamp-2 text-xs text-white/70">
                                            {item.location_details}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <LightboxDialog
                item={lightboxItem}
                onClose={() => setLightboxItem(null)}
            />
        </MainLayout>
    );
}
