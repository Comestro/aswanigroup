import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Check,
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
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError, VentureIcon } from '@/lib/utils';

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

            <section className="relative flex items-center border-b border-outline-variant bg-primary px-gutter pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src={
                            venture.hero_image ||
                            venture.division_image ||
                            DEMO_IMAGE_URL
                        }
                        alt={venture.name}
                        onError={handleImageError}
                        className="h-full w-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-container-max text-center md:text-left">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                        className="max-w-3xl"
                    >
                        <motion.div
                            variants={fadeIn}
                            className="mx-auto mb-5 inline-flex items-center gap-2 rounded border border-secondary/30 bg-secondary/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-secondary-container uppercase md:mx-0 md:text-xs"
                        >
                            <VentureIcon
                                name={venture.icon_name}
                                className="h-3.5 w-3.5"
                            />
                            <span>
                                {venture.badge ||
                                    venture.short_label ||
                                    venture.name}
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeIn}
                            className="mb-4 font-serif text-3xl leading-tight font-bold text-white sm:text-5xl md:text-6xl"
                        >
                            {venture.name}
                        </motion.h1>

                        {(venture.subtitle || venture.summary) && (
                            <motion.p
                                variants={fadeIn}
                                className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/80 md:mx-0 md:text-xl"
                            >
                                {venture.subtitle || venture.summary}
                            </motion.p>
                        )}
                    </motion.div>

                    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <Link
                            href={route('industries')}
                            className="inline-flex items-center gap-2 rounded border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>All Ventures</span>
                        </Link>

                        <a
                            href="#venture-inquiry"
                            className="inline-flex items-center gap-2 rounded bg-secondary px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-secondary/90"
                        >
                            <span>
                                Enquire About{' '}
                                {venture.short_label || venture.name}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </a>

                        {venture.external_url && (
                            <a
                                href={venture.external_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded border border-white/25 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/10"
                            >
                                <span>
                                    {venture.external_cta_label ||
                                        'Visit Website'}
                                </span>
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Division Overview */}
            <section className="border-b border-outline-variant bg-white px-gutter py-14 md:py-20">
                <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <div className="relative aspect-[4/3] overflow-hidden rounded border border-outline-variant bg-surface-container-high shadow-sm">
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
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                            Venture Overview
                        </span>
                        <h2 className="mt-1 mb-3 font-serif text-2xl font-bold text-primary md:text-3xl">
                            {venture.short_label || venture.name}
                        </h2>

                        {venture.location_details && (
                            <div className="mb-4 inline-flex items-center gap-2 rounded border border-outline-variant bg-surface-container-low px-3.5 py-2 text-xs font-semibold text-primary md:text-sm">
                                <MapPin
                                    size={15}
                                    className="shrink-0 text-secondary"
                                />
                                <span>{venture.location_details}</span>
                            </div>
                        )}

                        <p className="mb-5 text-sm leading-relaxed whitespace-pre-line text-on-surface-variant md:text-base">
                            {venture.description || venture.summary}
                        </p>

                        {highlights.length > 0 && (
                            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                {highlights.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2.5 text-sm text-on-surface"
                                    >
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-secondary/10 text-secondary">
                                            <Check size={13} />
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>

            {/* Completed Projects Showcase */}
            {projects.length > 0 && (
                <section className="border-b border-outline-variant bg-surface-container-low px-gutter py-14 md:py-16">
                    <div className="mx-auto max-w-container-max">
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                    Completed Projects
                                </span>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary md:text-3xl">
                                    {venture.short_label || venture.name}{' '}
                                    Gallery
                                </h2>
                            </div>
                            <Link
                                href={route('portfolio')}
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:underline"
                            >
                                Full Corporate Portfolio{' '}
                                <ArrowRight size={15} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                    <h3 className="font-serif text-base font-bold text-primary">
                                        {project.title}
                                    </h3>
                                    {project.location && (
                                        <p className="mt-1.5 flex items-center gap-1 text-xs text-on-surface-variant">
                                            <MapPin
                                                size={13}
                                                className="text-secondary"
                                            />
                                            {project.location}
                                        </p>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Catalogs & Videos */}
            {(catalogs.length > 0 || promoVideos.length > 0) && (
                <section className="border-b border-outline-variant bg-white px-gutter py-14">
                    <div className="mx-auto grid max-w-container-max grid-cols-1 gap-10 lg:grid-cols-12">
                        {catalogs.length > 0 && (
                            <div
                                className={
                                    promoVideos.length > 0
                                        ? 'lg:col-span-5'
                                        : 'lg:col-span-12'
                                }
                            >
                                <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                    Technical Brochures
                                </span>
                                <h2 className="mt-1 mb-5 font-serif text-2xl font-bold text-primary">
                                    Downloadable Catalogs
                                </h2>
                                <div className="space-y-3">
                                    {catalogs.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-start justify-between gap-4 rounded border border-outline-variant bg-surface-container-low p-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <FileText
                                                    size={18}
                                                    className="mt-0.5 shrink-0 text-secondary"
                                                />
                                                <div>
                                                    <div className="font-serif text-sm font-bold text-primary">
                                                        {cat.title}
                                                    </div>
                                                    {cat.file_size_label && (
                                                        <div className="mt-1 text-xs font-semibold text-secondary">
                                                            {
                                                                cat.file_size_label
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <a
                                                href={route(
                                                    'catalogs.download',
                                                    cat.id,
                                                )}
                                                className="inline-flex shrink-0 items-center gap-1.5 rounded bg-primary px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-secondary"
                                            >
                                                <Download size={14} />
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
                                <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                    Video Showcase
                                </span>
                                <h2 className="mt-1 mb-5 font-serif text-2xl font-bold text-primary">
                                    Operations &amp; Facility Film
                                </h2>
                                <div className="grid gap-5 sm:grid-cols-2">
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
                <section className="border-b border-outline-variant bg-surface-container-low px-gutter py-14">
                    <div className="mx-auto max-w-container-max">
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                    Verified Credentials
                                </span>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary">
                                    Related Certifications &amp; Agreements
                                </h2>
                            </div>
                            <Link
                                href={route('certifications')}
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:underline"
                            >
                                View All Certifications <ArrowRight size={15} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                    className="flex flex-col rounded border border-outline-variant bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase">
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
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Direct Venture Inquiry Desk */}
            <section
                id="venture-inquiry"
                className="bg-surface-container-high px-gutter py-16"
            >
                <div className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-10 lg:grid-cols-12">
                    <div className="space-y-4 lg:col-span-5">
                        <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                            Direct Lead Capture
                        </span>
                        <h2 className="font-serif text-3xl font-bold text-primary">
                            Discuss Your {venture.short_label || venture.name}{' '}
                            Requirements
                        </h2>
                        <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
                            Submit a project inquiry, partnership proposal, or
                            technical catalog request directly to our leadership
                            email and WhatsApp desk.
                        </p>
                    </div>

                    <div className="rounded border border-outline-variant bg-white p-6 shadow-sm md:p-8 lg:col-span-7">
                        <InquiryForm
                            defaultVentureId={String(venture.id)}
                            defaultDivision={venture.name}
                            defaultSubject={`Inquiry regarding ${venture.name}`}
                            sourcePage={`venture:${venture.slug}`}
                        />
                    </div>
                </div>
            </section>

            {/* Other Ventures */}
            {otherVentures.length > 0 && (
                <section className="border-t border-outline-variant bg-white px-gutter py-14">
                    <div className="mx-auto max-w-container-max">
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                    Explore More
                                </span>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary">
                                    Other {companyName} Ventures
                                </h2>
                            </div>
                            <Link
                                href={route('industries')}
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:underline"
                            >
                                View All Ventures <ArrowRight size={15} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {otherVentures.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('ventures.show', item.slug)}
                                    className="group rounded border border-outline-variant bg-surface-container-low p-6 transition-shadow hover:bg-white hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <VentureIcon
                                            name={item.icon_name}
                                            className="h-5 w-5 text-secondary"
                                        />
                                        <ArrowRight
                                            size={16}
                                            className="text-on-surface-variant transition-transform group-hover:translate-x-1 group-hover:text-secondary"
                                        />
                                    </div>
                                    <h3 className="mt-4 font-serif text-lg font-bold text-primary">
                                        {item.name}
                                    </h3>
                                    {item.location_details && (
                                        <p className="mt-2 line-clamp-2 text-xs text-on-surface-variant">
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
