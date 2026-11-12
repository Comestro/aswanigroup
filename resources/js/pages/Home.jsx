import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Download,
    ExternalLink,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import InquiryForm from '@/components/InquiryForm';
import LightboxDialog from '@/components/LightboxDialog';
import MediaPlayerCard from '@/components/MediaPlayerCard';
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL, getVentureIcon, handleImageError } from '@/lib/utils';

const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.08 } },
};

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
    const marqueeProjects =
        heroProjects.length > 0 ? [...heroProjects, ...heroProjects] : [];
    const [lightboxItem, setLightboxItem] = useState(null);

    return (
        <MainLayout>
            <Head
                title={`${settings.company_full_name || 'Ashwin Group of Companies'} | Parent Company & Ventures`}
            />

            <section className="relative flex items-center overflow-hidden bg-primary px-gutter pt-32 pb-16 md:pt-40 md:pb-24">
                {homeHeaders.hero_image && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={homeHeaders.hero_image}
                            alt={settings.company_name || 'Ashwin Group'}
                            onError={handleImageError}
                            className="h-full w-full object-cover opacity-15"
                        />
                        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                    </div>
                )}
                <div className="relative z-10 mx-auto grid w-full max-w-container-max items-center gap-10 md:grid-cols-2">
                    <motion.div
                        className="max-w-2xl"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.div
                            variants={fadeIn}
                            className="mb-5 inline-flex items-center gap-2 rounded border border-secondary/30 bg-secondary/10 px-3 py-1 text-center text-[10px] font-semibold tracking-wider text-secondary-container uppercase md:text-xs"
                        >
                            {settings.tagline ||
                                'Powering a Smart, Sustainable & Trusted Future'}
                        </motion.div>

                        <motion.h1
                            variants={fadeIn}
                            className="mb-4 text-center font-serif text-3xl leading-tight font-bold text-white sm:text-5xl md:text-left md:text-6xl"
                        >
                            {settings.company_name || 'Ashwin Group'}
                            <br className="hidden md:block" />
                            <span className="text-secondary-container">
                                {' '}
                                of Companies.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeIn}
                            className="mx-auto mb-8 max-w-xl text-center text-base leading-relaxed text-white/80 md:mx-0 md:text-left md:text-lg"
                        >
                            {settings.hero_description}
                        </motion.p>

                        <motion.div
                            variants={fadeIn}
                            className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
                        >
                            <Link
                                href={route('industries')}
                                className="inline-flex w-full items-center justify-center gap-2 rounded bg-secondary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary/90 sm:w-auto"
                            >
                                Explore Ventures
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href={route('certifications')}
                                className="inline-flex w-full items-center justify-center rounded border-2 border-white/25 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 sm:w-auto"
                            >
                                Certifications &amp; Agreements
                            </Link>
                        </motion.div>
                    </motion.div>

                    {marqueeProjects.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative hidden h-[400px] w-full overflow-hidden rounded border border-white/10 bg-black/20 shadow-lg md:block"
                        >
                            <div className="animate-vertical-scroll absolute top-0 left-0 flex w-full flex-col">
                                {marqueeProjects.map((project, idx) => (
                                    <div
                                        key={`${project.id}-${idx}`}
                                        className="relative h-[400px] w-full shrink-0"
                                    >
                                        <img
                                            src={
                                                project.image_path ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={project.title}
                                            onError={handleImageError}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/85 via-primary/25 to-transparent p-6">
                                            <span className="mb-1 text-[10px] font-bold tracking-wider text-secondary-container uppercase">
                                                {project.category_label} ·{' '}
                                                {project.location}
                                            </span>
                                            <h3 className="font-serif text-lg font-bold text-white">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {stats.length > 0 && (
                <section className="border-b border-outline-variant bg-white px-gutter py-8">
                    <div className="mx-auto max-w-container-max">
                        <div className="grid grid-cols-1 divide-y divide-outline-variant sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                            {stats.map((stat) => {
                                const Icon = getVentureIcon(stat.icon);

                                return (
                                    <div
                                        key={stat.label}
                                        className="flex items-center justify-between p-4 md:p-6"
                                    >
                                        <div>
                                            <div className="font-serif text-2xl font-bold text-primary md:text-3xl">
                                                {stat.value}
                                            </div>
                                            <div className="mt-1 text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
                                                {stat.label}
                                            </div>
                                        </div>
                                        <Icon
                                            size={28}
                                            strokeWidth={1.5}
                                            className="shrink-0 text-secondary opacity-80"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-b border-outline-variant bg-surface-container-high px-gutter py-16 md:py-20">
                <div className="mx-auto max-w-container-max">
                    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                {homeHeaders.ventures_eyebrow ||
                                    'Group Business Verticals'}
                            </span>
                            <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl">
                                {homeHeaders.ventures_title ||
                                    'Our Ventures & Operating Companies'}
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm text-on-surface-variant md:text-base">
                                {homeHeaders.ventures_subtitle ||
                                    'Explore dedicated pages for each business vertical—complete with project galleries, regional coverage, downloadable catalogs, and direct inquiry desks.'}
                            </p>
                        </div>
                        <Link
                            href={route('industries')}
                            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-secondary hover:underline"
                        >
                            All Business Ventures <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {ventures.map((venture) => {
                            const IconComponent = getVentureIcon(
                                venture.icon_name,
                            );

                            return (
                                <article
                                    key={venture.id}
                                    className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
                                >
                                    <Link
                                        href={route(
                                            'ventures.show',
                                            venture.slug,
                                        )}
                                        className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-low"
                                    >
                                        <img
                                            src={
                                                venture.division_image ||
                                                venture.hero_image ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={venture.name}
                                            onError={handleImageError}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded bg-primary/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-secondary-container uppercase backdrop-blur-sm">
                                            <IconComponent size={12} />
                                            {venture.badge ||
                                                venture.short_label ||
                                                venture.name}
                                        </span>
                                    </Link>

                                    <div className="flex flex-1 flex-col p-6">
                                        <Link
                                            href={route(
                                                'ventures.show',
                                                venture.slug,
                                            )}
                                        >
                                            <h3 className="font-serif text-xl font-bold text-primary transition-colors group-hover:text-secondary">
                                                {venture.name}
                                            </h3>
                                        </Link>

                                        {venture.location_details && (
                                            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                                                <MapPin
                                                    size={13}
                                                    className="shrink-0 text-secondary"
                                                />
                                                {venture.location_details}
                                            </p>
                                        )}

                                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
                                            {venture.summary}
                                        </p>

                                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-4">
                                            <Link
                                                href={route(
                                                    'ventures.show',
                                                    venture.slug,
                                                )}
                                                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase transition-colors hover:text-secondary"
                                            >
                                                View Venture Page{' '}
                                                <ArrowRight size={14} />
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

            {certifications.length > 0 && (
                <section className="border-b border-outline-variant bg-surface-container-low px-gutter py-16">
                    <div className="mx-auto max-w-container-max">
                        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                    {homeHeaders.certifications_eyebrow ||
                                        'Verified Credibility'}
                                </span>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary md:text-3xl">
                                    {homeHeaders.certifications_title ||
                                        'Official Agreements & Certifications'}
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
                                    {homeHeaders.certifications_subtitle ||
                                        'Official partnership authorizations, quality compliance records, and milestone documentation.'}
                                </p>
                            </div>
                            <Link
                                href={route('certifications')}
                                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-secondary hover:underline"
                            >
                                All Certifications &amp; Agreements{' '}
                                <ArrowRight size={16} />
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
                                            image: cert.image_path,
                                            issuer: cert.issuer,
                                            date: cert.issued_date,
                                            reference: cert.reference_number,
                                            description: cert.description,
                                            documentUrl:
                                                cert.document_path || null,
                                        })
                                    }
                                    className="flex flex-col rounded-xl border border-outline-variant bg-white p-6 text-left shadow-sm transition hover:border-secondary hover:shadow-md"
                                >
                                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-secondary uppercase">
                                        <ShieldCheck size={15} />
                                        <span>
                                            {cert.type || 'Certificate'}
                                        </span>
                                    </div>
                                    <h3 className="mt-3 font-serif text-lg font-bold text-primary">
                                        {cert.title}
                                    </h3>
                                    {cert.issuer && (
                                        <p className="mt-1 text-xs font-medium text-on-surface-variant">
                                            {cert.issuer}
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

            {(promoVideos.length > 0 || catalogs.length > 0) && (
                <section className="border-b border-outline-variant bg-white px-gutter py-16">
                    <div className="mx-auto grid max-w-container-max grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="space-y-4 lg:col-span-7">
                            <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                {homeHeaders.media_eyebrow ||
                                    'Media & Commercials'}
                            </span>
                            <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl">
                                {homeHeaders.media_title ||
                                    'Promotional Films & YouTube Spotlights'}
                            </h2>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {promoVideos.slice(0, 2).map((video) => (
                                    <MediaPlayerCard
                                        key={video.id}
                                        video={video}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 lg:col-span-5">
                            <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                {homeHeaders.catalogs_eyebrow ||
                                    'Direct Sales Tools'}
                            </span>
                            <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl">
                                {homeHeaders.catalogs_title ||
                                    'Downloadable Catalogs'}
                            </h2>
                            <div className="space-y-3">
                                {catalogs.map((catalog) => (
                                    <a
                                        key={catalog.id}
                                        href={route(
                                            'catalogs.download',
                                            catalog.id,
                                        )}
                                        className="flex items-center justify-between gap-4 rounded border border-outline-variant bg-surface-container-low p-4 transition-colors hover:border-primary"
                                    >
                                        <div className="min-w-0">
                                            <div className="truncate font-serif text-base font-bold text-primary">
                                                {catalog.title}
                                            </div>
                                            {catalog.description && (
                                                <p className="mt-0.5 line-clamp-2 text-xs text-on-surface-variant">
                                                    {catalog.description}
                                                </p>
                                            )}
                                            <span className="mt-1 inline-block text-[11px] font-bold text-secondary">
                                                {catalog.file_size_label ||
                                                    'PDF Download'}
                                            </span>
                                        </div>
                                        <span className="shrink-0 rounded bg-primary p-2.5 text-white">
                                            <Download size={16} />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-surface-container-high px-gutter py-16 md:py-20">
                <div className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                            {homeHeaders.cta_eyebrow || 'Instant Lead Desk'}
                        </span>
                        <h2 className="mt-2 mb-4 font-serif text-3xl font-bold text-primary md:text-4xl">
                            {homeHeaders.cta_title ||
                                `Partner with ${settings.company_name || 'Ashwin Group'}`}
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-on-surface-variant md:text-base">
                            {homeHeaders.cta_subtitle ||
                                'Interested in Water Industries distributorship, Green Energy & Eco-Resort development, brand collaborations, or retail franchises? Submit once to notify our email desk and connect instantly on WhatsApp.'}
                        </p>

                        <div className="space-y-4 rounded border border-outline-variant bg-white p-6 shadow-sm">
                            <div>
                                <div className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">
                                    Direct Hotline
                                </div>
                                <div className="mt-1 font-serif text-2xl font-bold text-primary">
                                    {settings.primary_phone}
                                    {settings.secondary_phone
                                        ? ` / ${settings.secondary_phone}`
                                        : ''}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={`tel:${settings.primary_phone || '9507488833'}`}
                                    className="inline-flex items-center gap-2 rounded bg-secondary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-secondary/90"
                                >
                                    <Phone size={15} />
                                    Call Hotline
                                </a>
                                <a
                                    href={`https://wa.me/${settings.whatsapp_number || '919507488833'}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                                >
                                    <MessageCircle size={15} />
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="rounded border border-outline-variant bg-white p-6 shadow-sm md:p-8 lg:col-span-7">
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
