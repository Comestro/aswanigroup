import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
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
    const [activeSectorIndex, setActiveSectorIndex] = useState(0);
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

    const safeSlideIdx =
        showcaseSlides.length > 0 ? activeSlide % showcaseSlides.length : 0;
    const currentSlide = showcaseSlides[safeSlideIdx] || null;

    const safeSectorIdx =
        ventures.length > 0 ? activeSectorIndex % ventures.length : 0;
    const activeSector = ventures[safeSectorIdx] || null;

    return (
        <MainLayout>
            <Head
                title={`${settings.company_full_name || 'Ashwin Group of Companies'} | Parent Company & Ventures`}
            />

            {/* 01 / Asymmetric Editorial Hero Masthead */}
            <section className="border-b border-outline-variant bg-background pt-8 pb-12 sm:pt-12 sm:pb-16">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">
                        <span>
                            EST. {settings.est_year || '1995'} ·{' '}
                            {settings.company_full_name ||
                                'Ashwin Group of Companies'}
                        </span>
                        <span>
                            {settings.footer_regions ||
                                'Bihar · Jharkhand · West Bengal'}{' '}
                            · {ventures.length} Verticals
                        </span>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
                        <div className="flex flex-col justify-between lg:col-span-7">
                            <div>
                                <p className="mb-4 font-mono text-xs font-semibold tracking-widest text-secondary uppercase">
                                    {settings.tagline ||
                                        'Powering a Smart, Sustainable & Trusted Future'}
                                </p>

                                <h1 className="font-serif text-[clamp(2.35rem,5.2vw,4.35rem)] leading-[1.03] font-bold text-primary">
                                    {settings.company_name || 'Ashwin Group'}
                                    <span className="block text-secondary">
                                        of Companies.
                                    </span>
                                </h1>

                                <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
                                    {settings.hero_description}
                                </p>

                                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href={route('industries')}
                                        className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                                    >
                                        <span>Explore Operating Companies</span>
                                        <ArrowUpRight size={15} />
                                    </Link>
                                    <Link
                                        href={route('certifications')}
                                        className="inline-flex items-center justify-center gap-2 border border-outline bg-white px-6 py-3.5 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:border-primary"
                                    >
                                        <ShieldCheck
                                            size={15}
                                            className="text-secondary"
                                        />
                                        <span>Verified Credentials</span>
                                    </Link>
                                </div>
                            </div>

                            {stats.length > 0 && (
                                <div className="mt-10 grid grid-cols-1 border border-outline-variant bg-white sm:grid-cols-3 sm:divide-x sm:divide-outline-variant">
                                    {stats.map((stat, idx) => (
                                        <div
                                            key={stat.label}
                                            className="border-b border-outline-variant p-4 last:border-b-0 sm:border-b-0 sm:p-5"
                                        >
                                            <div className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                                                0{idx + 1} · Metric
                                            </div>
                                            <div className="mt-1 font-serif text-2xl font-bold text-primary">
                                                {stat.value}
                                            </div>
                                            <div className="mt-0.5 text-xs font-medium text-on-surface-variant">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {currentSlide && (
                            <div className="lg:col-span-5">
                                <div className="border border-outline-variant bg-white p-2.5">
                                    <div className="aspect-[16/11] w-full overflow-hidden bg-surface-container-low">
                                        <img
                                            src={
                                                currentSlide.image_path ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={currentSlide.title}
                                            onError={handleImageError}
                                            className="block h-full w-full object-cover transition-opacity duration-300"
                                        />
                                    </div>

                                    <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-outline-variant bg-background px-3.5 py-3">
                                        <div className="min-w-0">
                                            <div className="truncate font-mono text-[10px] font-semibold tracking-wider text-secondary uppercase">
                                                {currentSlide.category_label} ·{' '}
                                                {currentSlide.location}
                                            </div>
                                            <h2 className="mt-0.5 truncate font-serif text-base font-bold text-primary">
                                                {currentSlide.title}
                                            </h2>
                                        </div>

                                        {showcaseSlides.length > 1 && (
                                            <div className="flex shrink-0 items-center gap-1.5">
                                                <span className="mr-1 font-mono text-[11px] text-on-surface-variant">
                                                    0{safeSlideIdx + 1}/0
                                                    {showcaseSlides.length}
                                                </span>
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
                                                    className="inline-flex h-8 w-8 items-center justify-center border border-outline bg-white text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                                                >
                                                    <ArrowLeft size={14} />
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
                                                    className="inline-flex h-8 w-8 items-center justify-center border border-outline bg-white text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                                                >
                                                    <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 02 / Interactive Dark Obsidian Conglomerate 3D Architecture Matrix */}
            {ventures.length > 0 && (
                <section className="border-b border-outline bg-primary py-14 text-white md:py-20">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
                            <div>
                                <p className="font-mono text-xs tracking-widest text-secondary-container uppercase">
                                    01 · Group Architecture
                                </p>
                                <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                    Interactive Holding Ecosystem
                                </h2>
                            </div>
                            <p className="max-w-md text-xs leading-relaxed text-white/70 sm:text-sm">
                                Select a vertical to rotate the 3D conglomerate
                                structure and inspect operational scope.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 border border-white/15 lg:grid-cols-12">
                            <div className="divide-y divide-white/15 border-b border-white/15 lg:col-span-5 lg:border-r lg:border-b-0">
                                {ventures.map((venture, idx) => {
                                    const isActive = idx === safeSectorIdx;
                                    const IconComponent = getVentureIcon(
                                        venture.icon_name,
                                    );

                                    return (
                                        <button
                                            key={venture.id}
                                            type="button"
                                            onClick={() =>
                                                setActiveSectorIndex(idx)
                                            }
                                            className={`flex w-full items-start justify-between gap-4 p-4 text-left transition-colors sm:p-5 ${
                                                isActive
                                                    ? 'bg-secondary text-white'
                                                    : 'bg-transparent text-white/80 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase">
                                                    <span
                                                        className={
                                                            isActive
                                                                ? 'text-secondary-container'
                                                                : 'text-white/50'
                                                        }
                                                    >
                                                        0{idx + 1}
                                                    </span>
                                                    <IconComponent size={13} />
                                                    <span className="truncate">
                                                        {venture.badge ||
                                                            venture.short_label}
                                                    </span>
                                                </div>
                                                <div className="mt-1 font-serif text-lg font-bold">
                                                    {venture.name}
                                                </div>
                                                {venture.location_details && (
                                                    <div className="mt-1 truncate text-xs text-white/65">
                                                        {
                                                            venture.location_details
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                            <ChevronRight
                                                size={16}
                                                className={`mt-1 shrink-0 transition-transform ${
                                                    isActive
                                                        ? 'translate-x-0.5 text-secondary-container'
                                                        : 'text-white/40'
                                                }`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col justify-between bg-[#0b0d0e] lg:col-span-7">
                                <CorporateThreeCanvas
                                    activeIndex={safeSectorIdx}
                                    nodeCount={ventures.length}
                                    className="h-[260px] w-full sm:h-[320px] lg:h-[340px]"
                                />

                                {activeSector && (
                                    <div className="flex flex-col justify-between gap-4 border-t border-white/15 bg-primary p-5 sm:flex-row sm:items-center">
                                        <div className="min-w-0">
                                            <span className="font-mono text-[10px] tracking-widest text-secondary-container uppercase">
                                                ACTIVE NODE 0{safeSectorIdx + 1}
                                            </span>
                                            <p className="mt-1 line-clamp-2 text-sm text-white/85">
                                                {activeSector.summary}
                                            </p>
                                        </div>
                                        <Link
                                            href={route(
                                                'ventures.show',
                                                activeSector.slug,
                                            )}
                                            className="inline-flex shrink-0 items-center justify-center gap-2 border border-white/25 bg-white px-4 py-2.5 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:border-secondary-container hover:bg-secondary-container"
                                        >
                                            <span>Open Division</span>
                                            <ArrowUpRight size={14} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 03 / Blueprint Operating Companies Directory Matrix */}
            <section className="border-b border-outline-variant bg-white py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex flex-col justify-between gap-4 border-b border-outline-variant pb-6 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                02 ·{' '}
                                {homeHeaders.ventures_eyebrow ||
                                    'Operating Companies'}
                            </p>
                            <h2 className="mt-2 font-serif text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                                {homeHeaders.ventures_title ||
                                    'Our Ventures & Verticals'}
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant md:text-base">
                                {homeHeaders.ventures_subtitle ||
                                    'Independent operating divisions engineered for scale, compliance, and regional trust across Eastern India.'}
                            </p>
                        </div>
                        <Link
                            href={route('industries')}
                            className="inline-flex shrink-0 items-center gap-2 border border-outline bg-background px-4 py-2.5 font-mono text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:border-primary hover:bg-primary hover:text-white"
                        >
                            <span>Full Directory</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 border-t border-l border-outline-variant md:grid-cols-2">
                        {ventures.map((venture, idx) => {
                            const IconComponent = getVentureIcon(
                                venture.icon_name,
                            );
                            const highlights = Array.isArray(venture.highlights)
                                ? venture.highlights.slice(0, 2)
                                : [];

                            return (
                                <article
                                    key={venture.id}
                                    className="group flex h-full flex-col border-r border-b border-outline-variant bg-white p-5 transition-colors hover:bg-background sm:p-7"
                                >
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-secondary uppercase">
                                            <span>0{idx + 1}</span>
                                            <span>/</span>
                                            <IconComponent size={13} />
                                            <span>
                                                {venture.badge ||
                                                    venture.short_label ||
                                                    venture.name}
                                            </span>
                                        </span>
                                        {venture.location_details && (
                                            <span className="hidden items-center gap-1 font-mono text-[11px] text-on-surface-variant sm:inline-flex">
                                                <MapPin
                                                    size={12}
                                                    className="text-secondary"
                                                />
                                                {venture.location_details}
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        href={route(
                                            'ventures.show',
                                            venture.slug,
                                        )}
                                        className="mb-5 block aspect-[16/9] w-full overflow-hidden border border-outline-variant bg-surface-container-low"
                                    >
                                        <img
                                            src={
                                                venture.division_image ||
                                                venture.hero_image ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={venture.name}
                                            onError={handleImageError}
                                            className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    </Link>

                                    <Link
                                        href={route(
                                            'ventures.show',
                                            venture.slug,
                                        )}
                                    >
                                        <h3 className="font-serif text-xl font-bold text-primary transition-colors group-hover:text-secondary sm:text-2xl">
                                            {venture.name}
                                        </h3>
                                    </Link>

                                    {venture.location_details && (
                                        <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] text-on-surface-variant sm:hidden">
                                            <MapPin
                                                size={12}
                                                className="shrink-0 text-secondary"
                                            />
                                            {venture.location_details}
                                        </p>
                                    )}

                                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
                                        {venture.summary}
                                    </p>

                                    {highlights.length > 0 && (
                                        <ul className="mt-4 space-y-1.5 border-t border-outline-variant pt-4">
                                            {highlights.map((item, hIdx) => (
                                                <li
                                                    key={hIdx}
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
                                            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:text-secondary"
                                        >
                                            <span>Explore Venture</span>
                                            <ArrowRight size={14} />
                                        </Link>

                                        {venture.external_url && (
                                            <a
                                                href={venture.external_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-secondary uppercase hover:underline"
                                            >
                                                <span>
                                                    {venture.external_cta_label ||
                                                        'Official Site'}
                                                </span>
                                                <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 04 / Verified Credibility & Agreements Archival Ledger */}
            {certifications.length > 0 && (
                <section className="border-b border-outline-variant bg-background py-14 md:py-20">
                    <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                03 ·{' '}
                                {homeHeaders.certifications_eyebrow ||
                                    'Verified Credibility'}
                            </p>
                            <h2 className="mt-2 font-serif text-2xl font-bold text-primary sm:text-3xl">
                                {homeHeaders.certifications_title ||
                                    'Official Agreements & Compliance'}
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                                {homeHeaders.certifications_subtitle ||
                                    'Audited brand authorizations, quality certificates, and institutional partnership documentation.'}
                            </p>
                            <Link
                                href={route('certifications')}
                                className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                            >
                                <span>Inspect All Records</span>
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="divide-y divide-outline-variant border border-outline-variant bg-white">
                                {certifications.map((cert, idx) => (
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
                                                reference:
                                                    cert.reference_number,
                                                description: cert.description,
                                                documentUrl:
                                                    cert.document_path || null,
                                            })
                                        }
                                        className="group flex w-full flex-col gap-4 p-4 text-left transition-colors hover:bg-background sm:flex-row sm:items-center sm:p-5"
                                    >
                                        <div className="aspect-[16/10] w-full shrink-0 overflow-hidden border border-outline-variant bg-surface-container-low sm:w-36">
                                            <img
                                                src={
                                                    cert.image_path ||
                                                    DEMO_IMAGE_URL
                                                }
                                                alt={cert.title}
                                                onError={handleImageError}
                                                className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider text-secondary uppercase">
                                                <span>REC-0{idx + 1}</span>
                                                <span>·</span>
                                                <span>
                                                    {cert.type || 'Certificate'}
                                                </span>
                                                {cert.issued_date && (
                                                    <>
                                                        <span>·</span>
                                                        <span className="text-on-surface-variant">
                                                            {cert.issued_date}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <h3 className="mt-1 font-serif text-lg font-bold text-primary transition-colors group-hover:text-secondary">
                                                {cert.title}
                                            </h3>
                                            {cert.issuer && (
                                                <p className="mt-0.5 text-xs font-medium text-on-surface-variant">
                                                    Issued by {cert.issuer}
                                                </p>
                                            )}
                                        </div>

                                        <span className="inline-flex shrink-0 items-center gap-1.5 self-start border border-outline px-3 py-1.5 font-mono text-[11px] font-semibold text-primary uppercase transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:self-center">
                                            <span>Preview</span>
                                            <ArrowUpRight size={13} />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 05 / Media Spotlights & Technical Catalog Library */}
            {(promoVideos.length > 0 || catalogs.length > 0) && (
                <section className="border-b border-outline-variant bg-white py-14 md:py-20">
                    <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                        <div className="space-y-5 lg:col-span-7">
                            <div className="border-b border-outline-variant pb-4">
                                <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                    04 ·{' '}
                                    {homeHeaders.media_eyebrow ||
                                        'Visual Briefings'}
                                </p>
                                <h2 className="mt-1.5 font-serif text-2xl font-bold text-primary sm:text-3xl">
                                    {homeHeaders.media_title ||
                                        'Facility Films & Commercials'}
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
                            <div className="border-b border-outline-variant pb-4">
                                <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                    05 ·{' '}
                                    {homeHeaders.catalogs_eyebrow ||
                                        'Technical Dossiers'}
                                </p>
                                <h2 className="mt-1.5 font-serif text-2xl font-bold text-primary sm:text-3xl">
                                    {homeHeaders.catalogs_title ||
                                        'Downloadable Catalogs'}
                                </h2>
                            </div>
                            <div className="divide-y divide-outline-variant border border-outline-variant bg-background">
                                {catalogs.map((catalog) => (
                                    <a
                                        key={catalog.id}
                                        href={route(
                                            'catalogs.download',
                                            catalog.id,
                                        )}
                                        className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-white"
                                    >
                                        <div className="flex min-w-0 items-start gap-3">
                                            <div className="mt-0.5 border border-outline-variant bg-white p-2 text-secondary">
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
                                                <span className="mt-1 inline-block font-mono text-[10px] font-semibold tracking-wider text-secondary uppercase">
                                                    {catalog.file_size_label ||
                                                        'PDF Specification'}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="shrink-0 bg-primary p-2.5 text-white transition-colors group-hover:bg-secondary">
                                            <Download size={15} />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 06 / Corporate Partnership & Lead Desk Blueprint */}
            <section className="bg-surface-container-low py-14 md:py-20">
                <div className="mx-auto grid w-full max-w-container-max grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                    <div className="lg:col-span-5">
                        <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                            06 ·{' '}
                            {homeHeaders.cta_eyebrow ||
                                'Direct Acquisition Desk'}
                        </p>
                        <h2 className="mt-2 font-serif text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                            {homeHeaders.cta_title ||
                                `Partner with ${settings.company_name || 'Ashwin Group'}`}
                        </h2>
                        <p className="mt-3 mb-7 text-sm leading-relaxed text-on-surface-variant sm:text-base">
                            {homeHeaders.cta_subtitle ||
                                'Interested in Water Industries distributorship, Green Energy & Eco-Resort development, brand collaborations, or retail franchises? Submit once to notify our leadership desk.'}
                        </p>

                        <div className="divide-y divide-outline-variant border border-outline bg-white">
                            <div className="p-5">
                                <div className="font-mono text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase">
                                    Direct Hotline Desk
                                </div>
                                <div className="mt-1 font-serif text-xl font-bold text-primary sm:text-2xl">
                                    {settings.primary_phone}
                                    {settings.secondary_phone
                                        ? ` / ${settings.secondary_phone}`
                                        : ''}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 p-5">
                                <a
                                    href={`tel:${settings.primary_phone || '9507488833'}`}
                                    className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                                >
                                    <Phone size={14} />
                                    <span>Call Hotline</span>
                                </a>
                                <a
                                    href={`https://wa.me/${settings.whatsapp_number || '919507488833'}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 border border-outline bg-background px-5 py-2.5 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:border-secondary hover:bg-secondary hover:text-white"
                                >
                                    <MessageCircle size={14} />
                                    <span>WhatsApp Desk</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border border-outline bg-white p-5 sm:p-8 lg:col-span-7">
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
