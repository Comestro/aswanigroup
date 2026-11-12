import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Download,
    ExternalLink,
    FileText,
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
import { getVentureIcon, VentureIcon } from '@/lib/utils';

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
                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                        href={route('industries')}
                        className="inline-flex items-center gap-2 rounded border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> All Ventures
                    </Link>

                    {venture.location_details && (
                        <span className="inline-flex items-center gap-2 rounded border border-secondary/40 bg-secondary/15 px-4 py-2 text-xs font-semibold text-secondary-container">
                            <MapPin className="h-3.5 w-3.5" />{' '}
                            {venture.location_details}
                        </span>
                    )}

                    <a
                        href="#venture-inquiry"
                        className="inline-flex items-center gap-2 rounded bg-secondary px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition hover:bg-secondary/90"
                    >
                        Inquire About {venture.short_label || venture.name}
                        <ArrowRight className="h-3.5 w-3.5" />
                    </a>

                    {venture.external_url && (
                        <a
                            href={venture.external_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded border border-white/30 bg-black/20 px-5 py-2.5 text-xs font-semibold text-white transition hover:border-secondary hover:text-secondary-container"
                        >
                            {venture.external_cta_label ||
                                'Visit Venture Website'}
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}
                </div>
            </PageHero>

            <section className="mx-auto max-w-container-max px-gutter py-16">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                    <div className="space-y-6 lg:col-span-6">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/25">
                            <VentureIcon
                                name={venture.icon_name}
                                className="h-6 w-6"
                            />
                        </div>

                        <div>
                            <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">
                                Venture Overview
                            </p>
                            <h2 className="mt-2 font-serif text-3xl font-bold text-primary sm:text-4xl">
                                {venture.short_label || venture.name}
                            </h2>
                        </div>

                        {venture.summary && (
                            <p className="text-lg leading-relaxed font-medium text-on-surface">
                                {venture.summary}
                            </p>
                        )}

                        {venture.description && (
                            <p className="text-base leading-relaxed whitespace-pre-line text-on-surface-variant">
                                {venture.description}
                            </p>
                        )}

                        {highlights.length > 0 && (
                            <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                                {highlights.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2.5 rounded-lg border border-outline-variant bg-surface-container-low p-3 text-sm font-medium text-on-surface"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="lg:col-span-6">
                        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low shadow-lg">
                            {venture.division_image || venture.hero_image ? (
                                <img
                                    src={
                                        venture.division_image ||
                                        venture.hero_image
                                    }
                                    alt={venture.name}
                                    className="aspect-[16/10] w-full object-cover"
                                />
                            ) : (
                                <div className="flex aspect-[16/10] w-full flex-col items-center justify-center bg-primary p-8 text-center text-white">
                                    <VentureIcon
                                        name={venture.icon_name}
                                        className="mb-3 h-12 w-12 text-secondary-container"
                                    />
                                    <p className="font-serif text-2xl font-bold">
                                        {venture.name}
                                    </p>
                                    {venture.location_details && (
                                        <p className="mt-2 text-sm text-white/75">
                                            {venture.location_details}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {projects.length > 0 && (
                <section className="border-t border-outline-variant bg-surface-container-low py-16">
                    <div className="mx-auto max-w-container-max px-gutter">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">
                                    Completed Projects
                                </p>
                                <h2 className="mt-1 font-serif text-3xl font-bold text-primary">
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
                            {projects.map((project) => (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() =>
                                        setLightboxItem({
                                            title: project.title,
                                            badge:
                                                project.category_label ||
                                                venture.name,
                                            image: project.image_path,
                                            location: project.location,
                                            date: project.completion_year,
                                            description: project.summary,
                                        })
                                    }
                                    className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="aspect-[16/10] w-full overflow-hidden bg-surface-container-high">
                                        {project.image_path ? (
                                            <img
                                                src={project.image_path}
                                                alt={project.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs text-on-surface-variant">
                                                Project Visual
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="flex items-center justify-between gap-2 text-xs text-on-surface-variant">
                                            <span className="font-semibold text-secondary">
                                                {project.category_label ||
                                                    venture.short_label ||
                                                    venture.name}
                                            </span>
                                            {project.completion_year && (
                                                <span>
                                                    {project.completion_year}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="mt-2 font-serif text-lg font-bold text-primary">
                                            {project.title}
                                        </h3>
                                        {project.location && (
                                            <p className="mt-1 flex items-center gap-1 text-xs text-on-surface-variant">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {project.location}
                                            </p>
                                        )}
                                        {project.summary && (
                                            <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">
                                                {project.summary}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {(catalogs.length > 0 || promoVideos.length > 0) && (
                <section className="mx-auto max-w-container-max px-gutter py-16">
                    <div className="grid gap-12 lg:grid-cols-12">
                        {catalogs.length > 0 && (
                            <div
                                className={
                                    promoVideos.length > 0
                                        ? 'lg:col-span-5'
                                        : 'lg:col-span-12'
                                }
                            >
                                <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">
                                    Technical Brochures
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary">
                                    Downloadable Catalogs
                                </h2>

                                <div className="mt-6 space-y-4">
                                    {catalogs.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-start justify-between gap-4 rounded-xl border border-outline-variant bg-white p-5 shadow-sm"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-lg bg-secondary/10 p-2.5 text-secondary">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-primary">
                                                        {cat.title}
                                                    </h3>
                                                    {cat.description && (
                                                        <p className="mt-1 text-xs text-on-surface-variant">
                                                            {cat.description}
                                                        </p>
                                                    )}
                                                    {cat.file_size_label && (
                                                        <p className="mt-1 text-[11px] font-medium text-on-surface-variant/75">
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
                                                className="inline-flex shrink-0 items-center gap-1.5 rounded bg-primary px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-secondary"
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
                                <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">
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
                <section className="border-t border-outline-variant bg-surface-container-low py-16">
                    <div className="mx-auto max-w-container-max px-gutter">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">
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
                                            image: cert.image_path,
                                            issuer: cert.issuer,
                                            date: cert.issued_date,
                                            reference: cert.reference_number,
                                            description: cert.description,
                                            documentUrl:
                                                cert.document_path || null,
                                        })
                                    }
                                    className="flex flex-col rounded-xl border border-outline-variant bg-white p-5 text-left shadow-sm transition hover:border-secondary hover:shadow-md"
                                >
                                    <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase">
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
                className="mx-auto max-w-container-max px-gutter py-16"
            >
                <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                    <div className="space-y-4 lg:col-span-5">
                        <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">
                            Direct Venture Desk
                        </p>
                        <h2 className="font-serif text-3xl font-bold text-primary">
                            Discuss Your {venture.short_label || venture.name}{' '}
                            Requirements
                        </h2>
                        <p className="text-sm leading-relaxed text-on-surface-variant">
                            Submit a project inquiry, partnership proposal, or
                            technical catalog request directly to our leadership
                            email and WhatsApp desk.
                        </p>
                    </div>

                    <div className="lg:col-span-7">
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
                <section className="border-t border-outline-variant bg-primary py-16 text-white">
                    <div className="mx-auto max-w-container-max px-gutter">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-secondary-container uppercase">
                                    Explore More
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold">
                                    Other {companyName} Ventures
                                </h2>
                            </div>
                            <Link
                                href={route('industries')}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-container hover:underline"
                            >
                                View All Ventures{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {otherVentures.map((item) => {
                                const OtherIcon = getVentureIcon(
                                    item.icon_name,
                                );

                                return (
                                    <Link
                                        key={item.id}
                                        href={route('ventures.show', item.slug)}
                                        className="group rounded-xl border border-white/15 bg-white/5 p-6 transition hover:border-secondary-container/60"
                                    >
                                        <div className="flex items-center justify-between">
                                            <OtherIcon className="h-6 w-6 text-secondary-container" />
                                            <ArrowRight className="h-4 w-4 text-white/50 transition group-hover:translate-x-1 group-hover:text-secondary-container" />
                                        </div>
                                        <h3 className="mt-4 font-serif text-xl font-bold text-white">
                                            {item.name}
                                        </h3>
                                        {item.summary && (
                                            <p className="mt-2 line-clamp-2 text-sm text-white/75">
                                                {item.summary}
                                            </p>
                                        )}
                                    </Link>
                                );
                            })}
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
