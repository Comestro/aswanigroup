import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Download,
    ExternalLink,
    FileText,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import CorporateThreeCanvas from '@/components/CorporateThreeCanvas';
import InquiryForm from '@/components/InquiryForm';
import LightboxDialog from '@/components/LightboxDialog';
import MediaPlayerCard from '@/components/MediaPlayerCard';
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL, getVentureIcon, handleImageError } from '@/lib/utils';

export default function Home({
    ventures = [],
    heroProjects = [],
    certifications = [],
    catalogs = [],
    promoVideos = [],
}) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const homeHeaders = settings.page_headers?.home || {};
    const stats = settings.hero_stats || [];
    const [activeSlide, setActiveSlide] = useState(0);
    const [lightboxItem, setLightboxItem] = useState(null);

    const showcaseSlides =
        heroProjects.length > 0
            ? heroProjects
            : homeHeaders.hero_image
              ? [
                    {
                        id: 'hero-default',
                        title:
                            settings.company_full_name ||
                            'Ashwin Group of Companies',
                        category_label: 'Corporate',
                        location: settings.footer_regions || 'Eastern India',
                        image_path: homeHeaders.hero_image,
                    },
                ]
              : [];

    const safeIndex =
        showcaseSlides.length > 0 ? activeSlide % showcaseSlides.length : 0;
    const currentSlide = showcaseSlides[safeIndex] || null;

    const gridColumnsClass =
        ventures.length <= 4
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
        <MainLayout>
            <Head
                title={`${settings.company_full_name || 'Ashwin Group of Companies'} | Parent Company & Ventures`}
            />

            {/* Clean Architectural Hero */}
            <section className="border-b border-outline-variant bg-white pt-24 pb-12 sm:pt-28 md:pt-32 md:pb-20">
                <div className="mx-auto grid w-full max-w-container-max items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                    <div className="lg:col-span-6">
                        <p className="mb-3 text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                            {settings.tagline ||
                                'Powering a Smart, Sustainable & Trusted Future'}
                        </p>

                        <h1 className="mb-5 font-serif text-3xl leading-[1.08] font-bold tracking-tight text-primary sm:text-5xl lg:text-[52px]">
                            {settings.company_name || 'Ashwin Group'}
                            <br className="hidden sm:block" />
                            <span className="text-secondary">
                                {' '}
                                of Companies.
                            </span>
                        </h1>

                        <p className="mb-7 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg">
                            {settings.hero_description}
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={route('industries')}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary"
                            >
                                Explore Ventures
                                <ArrowRight size={16} />
                            </Link>
                            <Link
                                href={route('certifications')}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
                            >
                                <ShieldCheck
                                    size={16}
                                    className="text-secondary"
                                />
                                Verified Certifications
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-outline-variant pt-5 text-xs font-medium text-on-surface-variant">
                            <span>Est. {settings.est_year || '1995'}</span>
                            <span className="text-outline">•</span>
                            <span>
                                {settings.footer_regions ||
                                    'Bihar · Jharkhand · West Bengal'}
                            </span>
                            <span className="text-outline">•</span>
                            <span>{ventures.length} Operating Verticals</span>
                        </div>
                    </div>

                    {currentSlide && (
                        <div className="lg:col-span-6">
                            <div className="overflow-hidden rounded-xl border border-outline-variant bg-white">
                                <div className="aspect-[16/10] w-full overflow-hidden bg-surface-container-low">
                                    <img
                                        src={
                                            currentSlide.image_path ||
                                            DEMO_IMAGE_URL
                                        }
                                        alt={currentSlide.title}
                                        onError={handleImageError}
                                        className="h-full w-full object-cover transition-opacity duration-300"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-4 border-t border-outline-variant bg-surface-container-low px-4 py-3.5 sm:px-5">
                                    <div className="min-w-0">
                                        <p className="truncate text-[11px] font-bold tracking-wider text-secondary uppercase">
                                            {currentSlide.category_label} ·{' '}
                                            {currentSlide.location}
                                        </p>
                                        <h2 className="truncate font-serif text-base font-bold text-primary">
                                            {currentSlide.title}
                                        </h2>
                                    </div>

                                    {showcaseSlides.length > 1 && (
                                        <div className="flex shrink-0 items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveSlide(
                                                        (prev) =>
                                                            (prev -
                                                                1 +
                                                                showcaseSlides.length) %
                                                            showcaseSlides.length,
                                                    )
                                                }
                                                aria-label="Previous featured project"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant bg-white text-primary transition-colors hover:border-primary"
                                            >
                                                <ChevronLeft size={15} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveSlide(
                                                        (prev) =>
                                                            (prev + 1) %
                                                            showcaseSlides.length,
                                                    )
                                                }
                                                aria-label="Next featured project"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant bg-white text-primary transition-colors hover:border-primary"
                                            >
                                                <ChevronRight size={15} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Clean Structural KPI Strip */}
            {stats.length > 0 && (
                <section className="border-b border-outline-variant bg-surface-container-low">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 divide-y divide-outline-variant sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                            {stats.map((stat) => {
                                const Icon = getVentureIcon(stat.icon);

                                return (
                                    <div
                                        key={stat.label}
                                        className="flex items-center justify-between gap-4 py-5 sm:px-6 first:sm:pl-0 last:sm:pr-0"
                                    >
                                        <div>
                                            <div className="font-serif text-2xl font-bold text-primary">
                                                {stat.value}
                                            </div>
                                            <div className="mt-1 text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                                                {stat.label}
                                            </div>
                                        </div>
                                        <Icon
                                            size={22}
                                            strokeWidth={1.6}
                                            className="shrink-0 text-secondary"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Operating Ventures — Clean Editorial Cards */}
            <section className="bg-white py-16 md:py-22">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex flex-col justify-between gap-4 border-b border-outline-variant pb-6 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                {homeHeaders.ventures_eyebrow ||
                                    'Group Business Verticals'}
                            </p>
                            <h2 className="mt-2 font-serif text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                                {homeHeaders.ventures_title ||
                                    'Our Ventures & Operating Companies'}
                            </h2>
                            <p className="mt-2.5 text-sm leading-relaxed text-on-surface-variant md:text-base">
                                {homeHeaders.ventures_subtitle ||
                                    'Explore dedicated pages for each business vertical—complete with project galleries, regional coverage, downloadable catalogs, and direct inquiry desks.'}
                            </p>
                        </div>
                        <Link
                            href={route('industries')}
                            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                        >
                            All Business Ventures <ArrowRight size={15} />
                        </Link>
                    </div>

                    <div className={`grid gap-6 md:gap-8 ${gridColumnsClass}`}>
                        {ventures.map((venture) => {
                            const IconComponent = getVentureIcon(
                                venture.icon_name,
                            );
                            const highlights = Array.isArray(venture.highlights)
                                ? venture.highlights.slice(0, 2)
                                : [];

                            return (
                                <article
                                    key={venture.id}
                                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant bg-white transition-colors hover:border-primary/40"
                                >
                                    <Link
                                        href={route(
                                            'ventures.show',
                                            venture.slug,
                                        )}
                                        className="aspect-[16/9] w-full overflow-hidden border-b border-outline-variant bg-surface-container-low"
                                    >
                                        <img
                                            src={
                                                venture.division_image ||
                                                venture.hero_image ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={venture.name}
                                            onError={handleImageError}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    </Link>

                                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                                        <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-secondary uppercase">
                                            <IconComponent size={14} />
                                            <span>
                                                {venture.badge ||
                                                    venture.short_label ||
                                                    venture.name}
                                            </span>
                                        </div>

                                        <Link
                                            href={route(
                                                'ventures.show',
                                                venture.slug,
                                            )}
                                        >
                                            <h3 className="font-serif text-xl font-bold text-primary transition-colors group-hover:text-secondary md:text-2xl">
                                                {venture.name}
                                            </h3>
                                        </Link>

                                        {venture.location_details && (
                                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                                                <MapPin
                                                    size={13}
                                                    className="shrink-0 text-secondary"
                                                />
                                                {venture.location_details}
                                            </p>
                                        )}

                                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
                                            {venture.summary}
                                        </p>

                                        {highlights.length > 0 && (
                                            <ul className="mt-4 space-y-1.5 border-t border-outline-variant pt-4">
                                                {highlights.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-xs font-medium text-on-surface"
                                                    >
                                                        <Check
                                                            size={14}
                                                            className="mt-0.5 shrink-0 text-secondary"
                                                        />
                                                        <span className="line-clamp-1">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-4">
                                            <Link
                                                href={route(
                                                    'ventures.show',
                                                    venture.slug,
                                                )}
                                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                                            >
                                                Explore Venture{' '}
                                                <ArrowRight size={15} />
                                            </Link>

                                            {venture.external_url && (
                                                <a
                                                    href={venture.external_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                                                >
                                                    {venture.external_cta_label ||
                                                        'Official Site'}
                                                    <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Interactive Three.js Parent-Venture Architecture Band */}
            <section className="border-t border-outline-variant bg-surface-container-low py-16 md:py-20">
                <div className="mx-auto grid w-full max-w-container-max items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                    <div className="lg:col-span-6">
                        <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                            Parent-Company Structure
                        </p>
                        <h2 className="mt-2 font-serif text-2xl font-bold text-primary sm:text-3xl">
                            Unified Governance Across Diversified Sectors
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
                            {settings.company_name || 'Ashwin Group'} anchors
                            shared capital governance, regional distribution
                            infrastructure, and verified partner compliance
                            across each independent operating company.
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {ventures.slice(0, 4).map((venture) => {
                                const IconComponent = getVentureIcon(
                                    venture.icon_name,
                                );

                                return (
                                    <Link
                                        key={venture.id}
                                        href={route(
                                            'ventures.show',
                                            venture.slug,
                                        )}
                                        className="group flex items-center justify-between gap-3 rounded-lg border border-outline-variant bg-white px-4 py-3 transition-colors hover:border-primary"
                                    >
                                        <div className="flex min-w-0 items-center gap-2.5">
                                            <IconComponent
                                                size={16}
                                                className="shrink-0 text-secondary"
                                            />
                                            <span className="truncate text-sm font-semibold text-primary group-hover:text-secondary">
                                                {venture.short_label ||
                                                    venture.name}
                                            </span>
                                        </div>
                                        <ArrowRight
                                            size={14}
                                            className="shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-0.5 group-hover:text-secondary"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="overflow-hidden rounded-xl border border-outline-variant bg-primary">
                            <CorporateThreeCanvas
                                className="h-[280px] w-full sm:h-[340px] lg:h-[380px]"
                                primaryHex="#3b82f6"
                                secondaryHex="#93c5fd"
                                nodeHex="#ffffff"
                            />
                            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 px-4 py-3 text-xs text-white/75 sm:px-5">
                                <span className="font-semibold text-white">
                                    3D Group Ecosystem Lattice
                                </span>
                                <span>
                                    Central Holding Hub · {ventures.length}{' '}
                                    Connected Verticals
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flat Ink Verified Credibility Section */}
            {certifications.length > 0 && (
                <section className="border-t border-outline-variant bg-primary py-16 text-white md:py-20">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/15 pb-6 sm:flex-row sm:items-end">
                            <div className="max-w-2xl">
                                <p className="text-xs font-bold tracking-[0.16em] text-secondary-container uppercase">
                                    {homeHeaders.certifications_eyebrow ||
                                        'Verified Credibility'}
                                </p>
                                <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                    {homeHeaders.certifications_title ||
                                        'Official Agreements & Certifications'}
                                </h2>
                                <p className="mt-2 text-sm text-white/70 md:text-base">
                                    {homeHeaders.certifications_subtitle ||
                                        'Official partnership authorizations, quality compliance records, and milestone documentation.'}
                                </p>
                            </div>
                            <Link
                                href={route('certifications')}
                                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-secondary-container hover:text-white"
                            >
                                View All Records <ArrowRight size={15} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/15 bg-white/5 text-left transition-colors hover:border-white/35"
                                >
                                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-black/20">
                                        <img
                                            src={
                                                cert.image_path ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={cert.title}
                                            onError={handleImageError}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <span className="text-[11px] font-bold tracking-wider text-secondary-container uppercase">
                                            {cert.type || 'Certificate'}
                                        </span>
                                        <h3 className="mt-1.5 font-serif text-lg font-bold text-white">
                                            {cert.title}
                                        </h3>
                                        {cert.issuer && (
                                            <p className="mt-1 text-xs font-medium text-white/60">
                                                {cert.issuer}
                                            </p>
                                        )}
                                        {cert.description && (
                                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/75">
                                                {cert.description}
                                            </p>
                                        )}
                                        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-secondary-container group-hover:text-white">
                                            Inspect Record
                                            <ArrowRight size={13} />
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Media & Technical Catalogs */}
            {(promoVideos.length > 0 || catalogs.length > 0) && (
                <section className="border-b border-outline-variant bg-white py-16 md:py-20">
                    <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                        <div className="space-y-5 lg:col-span-7">
                            <div>
                                <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                    {homeHeaders.media_eyebrow ||
                                        'Media & Commercials'}
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary md:text-3xl">
                                    {homeHeaders.media_title ||
                                        'Promotional Films & YouTube Spotlights'}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {promoVideos.slice(0, 2).map((video) => (
                                    <MediaPlayerCard
                                        key={video.id}
                                        video={video}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-5 lg:col-span-5">
                            <div>
                                <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                    {homeHeaders.catalogs_eyebrow ||
                                        'Direct Sales Tools'}
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary md:text-3xl">
                                    {homeHeaders.catalogs_title ||
                                        'Downloadable Catalogs'}
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {catalogs.map((catalog) => (
                                    <a
                                        key={catalog.id}
                                        href={route(
                                            'catalogs.download',
                                            catalog.id,
                                        )}
                                        className="group flex items-center justify-between gap-4 rounded-xl border border-outline-variant bg-surface-container-low p-4 transition-colors hover:border-primary hover:bg-white"
                                    >
                                        <div className="flex min-w-0 items-start gap-3">
                                            <div className="mt-0.5 rounded-lg border border-outline-variant bg-white p-2 text-secondary">
                                                <FileText size={16} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="truncate font-serif text-base font-bold text-primary">
                                                    {catalog.title}
                                                </div>
                                                {catalog.description && (
                                                    <p className="mt-0.5 line-clamp-2 text-xs text-on-surface-variant">
                                                        {catalog.description}
                                                    </p>
                                                )}
                                                <span className="mt-1 inline-block text-[11px] font-semibold text-secondary">
                                                    {catalog.file_size_label ||
                                                        'PDF Download'}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="shrink-0 rounded-lg bg-primary p-2 text-white transition-colors group-hover:bg-secondary">
                                            <Download size={15} />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Clean Flat Partnership Desk */}
            <section className="bg-surface-container-low py-16 md:py-20">
                <div className="mx-auto grid w-full max-w-container-max grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                    <div className="lg:col-span-5">
                        <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                            {homeHeaders.cta_eyebrow || 'Instant Lead Desk'}
                        </p>
                        <h2 className="mt-2 mb-4 font-serif text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                            {homeHeaders.cta_title ||
                                `Partner with ${settings.company_name || 'Ashwin Group'}`}
                        </h2>
                        <p className="mb-8 text-sm leading-relaxed text-on-surface-variant md:text-base">
                            {homeHeaders.cta_subtitle ||
                                'Interested in Water Industries distributorship, Green Energy & Eco-Resort development, brand collaborations, or retail franchises? Submit once to notify our email desk and connect instantly on WhatsApp.'}
                        </p>

                        <div className="space-y-5 rounded-xl border border-outline-variant bg-white p-5 sm:p-6">
                            <div>
                                <div className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                                    Direct Hotline
                                </div>
                                <div className="mt-1 font-serif text-xl font-bold text-primary sm:text-2xl">
                                    {settings.primary_phone}
                                    {settings.secondary_phone
                                        ? ` / ${settings.secondary_phone}`
                                        : ''}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={`tel:${settings.primary_phone || '9507488833'}`}
                                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary"
                                >
                                    <Phone size={15} />
                                    Call Hotline
                                </a>
                                <a
                                    href={`https://wa.me/${settings.whatsapp_number || '919507488833'}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                                >
                                    <MessageCircle size={15} />
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-outline-variant bg-white p-5 sm:p-6 md:p-8 lg:col-span-7">
                        <InquiryForm sourcePage="home" />
                    </div>
                </div>
            </section>

            <LightboxDialog
                item={lightboxItem}
                onClose={() => setLightboxItem(null)}
            />
        </MainLayout>
    );
}
