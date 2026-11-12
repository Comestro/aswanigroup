import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
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
import PageHero from '@/components/PageHero';
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

            <PageHero
                badge={venture.badge || venture.short_label || venture.name}
                title={venture.name}
                subtitle={venture.subtitle || venture.summary}
                heroImage={venture.hero_image || venture.division_image}
                imageAlt={venture.name}
            >
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href={route('industries')}
                        className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 text-xs font-semibold text-primary transition-colors hover:border-primary"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> All Ventures
                    </Link>

                    {venture.location_details && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
                            <MapPin className="h-3.5 w-3.5 text-secondary" />
                            {venture.location_details}
                        </span>
                    )}

                    <a
                        href="#venture-inquiry"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-secondary"
                    >
                        Inquire About {venture.short_label || venture.name}
                        <ArrowRight className="h-3.5 w-3.5" />
                    </a>

                    {venture.external_url && (
                        <a
                            href={venture.external_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant bg-white px-4 py-2 text-xs font-semibold text-primary transition-colors hover:border-primary"
                        >
                            {venture.external_cta_label ||
                                'Visit Venture Website'}
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}
                </div>
            </PageHero>

            <section className="mx-auto w-full max-w-container-max px-4 py-14 sm:px-6 md:py-20 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
                    <div className="space-y-5 lg:col-span-6">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low text-secondary">
                            <VentureIcon
                                name={venture.icon_name}
                                className="h-5 w-5"
                            />
                        </div>

                        <div>
                            <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                Venture Overview
                            </p>
                            <h2 className="mt-1 font-serif text-3xl font-bold text-primary">
                                {venture.short_label || venture.name}
                            </h2>
                        </div>

                        {venture.summary && (
                            <p className="text-base leading-relaxed font-semibold text-on-surface md:text-lg">
                                {venture.summary}
                            </p>
                        )}

                        {venture.description && (
                            <p className="text-sm leading-relaxed whitespace-pre-line text-on-surface-variant md:text-base">
                                {venture.description}
                            </p>
                        )}

                        {highlights.length > 0 && (
                            <ul className="grid gap-2.5 pt-2 sm:grid-cols-2">
                                {highlights.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2 rounded-lg border border-outline-variant bg-surface-container-low p-3 text-xs font-medium text-on-surface"
                                    >
                                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="lg:col-span-6">
                        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
                            <img
                                src={
                                    venture.division_image ||
                                    venture.hero_image ||
                                    DEMO_IMAGE_URL
                                }
                                alt={venture.name}
                                onError={handleImageError}
                                className="aspect-[16/10] w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {projects.length > 0 && (
                <section className="border-t border-outline-variant bg-surface-container-low py-14 md:py-20">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant pb-5">
                            <div>
                                <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                    Completed Projects
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary sm:text-3xl">
                                    {venture.short_label || venture.name}{' '}
                                    Gallery
                                </h2>
                            </div>
                            <Link
                                href={route('portfolio')}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
                            >
                                Full Corporate Portfolio{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => {
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
                                        className="group flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant bg-white text-left transition-colors hover:border-primary/40"
                                    >
                                        <div className="aspect-[16/10] w-full overflow-hidden border-b border-outline-variant bg-surface-container-high">
                                            <img
                                                src={
                                                    project.image_path ||
                                                    DEMO_IMAGE_URL
                                                }
                                                alt={project.title}
                                                onError={handleImageError}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col p-5">
                                            <div className="flex items-center justify-between gap-2 text-xs text-on-surface-variant">
                                                <span className="font-bold tracking-wider text-secondary uppercase">
                                                    {project.category_label ||
                                                        venture.short_label ||
                                                        venture.name}
                                                </span>
                                                <div className="flex items-center gap-2 font-medium">
                                                    {photoCount > 1 && (
                                                        <span className="inline-flex items-center gap-1 text-primary">
                                                            <Images size={12} />
                                                            {photoCount}
                                                        </span>
                                                    )}
                                                    {project.completion_year && (
                                                        <span>
                                                            {
                                                                project.completion_year
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <h3 className="mt-2 font-serif text-lg font-bold text-primary">
                                                {project.title}
                                            </h3>
                                            {project.location && (
                                                <p className="mt-1 flex items-center gap-1 text-xs text-on-surface-variant">
                                                    <MapPin className="h-3.5 w-3.5 text-secondary" />
                                                    {project.location}
                                                </p>
                                            )}
                                            {project.summary && (
                                                <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">
                                                    {project.summary}
                                                </p>
                                            )}
                                            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-primary group-hover:text-secondary">
                                                View Project
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {(catalogs.length > 0 || promoVideos.length > 0) && (
                <section className="mx-auto w-full max-w-container-max px-4 py-14 sm:px-6 md:py-16 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                        {catalogs.length > 0 && (
                            <div
                                className={
                                    promoVideos.length > 0
                                        ? 'lg:col-span-5'
                                        : 'lg:col-span-12'
                                }
                            >
                                <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                    Technical Brochures
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary">
                                    Downloadable Catalogs
                                </h2>

                                <div className="mt-6 space-y-3">
                                    {catalogs.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-start justify-between gap-4 rounded-xl border border-outline-variant bg-surface-container-low p-4"
                                        >
                                            <div className="flex min-w-0 items-start gap-3">
                                                <div className="rounded-lg border border-outline-variant bg-white p-2 text-secondary">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold text-primary">
                                                        {cat.title}
                                                    </h3>
                                                    {cat.description && (
                                                        <p className="mt-1 text-xs text-on-surface-variant">
                                                            {cat.description}
                                                        </p>
                                                    )}
                                                    {cat.file_size_label && (
                                                        <p className="mt-1 text-[11px] font-semibold text-secondary">
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
                                                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-secondary"
                                            >
                                                <Download className="h-3.5 w-3.5" />
                                                PDF
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
                                <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
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

            {certifications.length > 0 && (
                <section className="border-t border-outline-variant bg-surface-container-low py-14 md:py-16">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant pb-5">
                            <div>
                                <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                    Verified Credentials
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary">
                                    Related Certifications &amp; Agreements
                                </h2>
                            </div>
                            <Link
                                href={route('certifications')}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
                            >
                                View All Certifications{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                    className="flex h-full flex-col rounded-xl border border-outline-variant bg-white p-5 text-left transition-colors hover:border-primary/40"
                                >
                                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase">
                                        <ShieldCheck className="h-4 w-4" />
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

            <section
                id="venture-inquiry"
                className="mx-auto w-full max-w-container-max px-4 py-14 sm:px-6 md:py-20 lg:px-8"
            >
                <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                    <div className="space-y-4 lg:col-span-5">
                        <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
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

                    <div className="rounded-xl border border-outline-variant bg-white p-5 sm:p-6 md:p-8 lg:col-span-7">
                        <InquiryForm
                            defaultVentureId={String(venture.id)}
                            defaultDivision={venture.name}
                            defaultSubject={`Inquiry regarding ${venture.name}`}
                            sourcePage={`venture:${venture.slug}`}
                        />
                    </div>
                </div>
            </section>

            {otherVentures.length > 0 && (
                <section className="border-t border-outline-variant bg-primary py-14 text-white md:py-16">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
                            <div>
                                <p className="text-xs font-bold tracking-[0.16em] text-secondary-container uppercase">
                                    Explore More
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold">
                                    Other {companyName} Ventures
                                </h2>
                            </div>
                            <Link
                                href={route('industries')}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-container hover:text-white"
                            >
                                View All Ventures{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {otherVentures.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('ventures.show', item.slug)}
                                    className="group flex h-full flex-col rounded-xl border border-white/15 bg-white/5 p-6 transition-colors hover:border-white/35"
                                >
                                    <div className="flex items-center justify-between">
                                        <VentureIcon
                                            name={item.icon_name}
                                            className="h-5 w-5 text-secondary-container"
                                        />
                                        <ArrowRight className="h-4 w-4 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                                    </div>
                                    <h3 className="mt-4 font-serif text-xl font-bold text-white">
                                        {item.name}
                                    </h3>
                                    {item.location_details && (
                                        <p className="mt-2 line-clamp-2 text-xs text-white/65">
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
