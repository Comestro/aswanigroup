import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageCircle, Phone } from 'lucide-react';
import { route } from 'ziggy-js';
import InquiryForm from '../components/InquiryForm';
import MediaPlayerCard from '../components/MediaPlayerCard';
import VentureTabsHub from '../components/VentureTabsHub';
import MainLayout from '../layouts/MainLayout';
import { getVentureIcon } from '../lib/utils';

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
    initialTab = '',
}) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const stats = settings.hero_stats || [];
    const marqueeProjects =
        heroProjects.length > 0 ? [...heroProjects, ...heroProjects] : [];

    return (
        <MainLayout>
            <Head
                title={`${settings.company_full_name || 'Ashwin Group of Companies'} | Parent Company & Ventures`}
            />

            <section className="relative flex items-center bg-primary px-gutter pt-32 pb-16 md:pt-40 md:pb-24">
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
                                            src={project.image_path}
                                            alt={project.title}
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
                                Centralized Group Showcase
                            </span>
                            <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl">
                                Ventures, Showcases &amp; Official
                                Certifications
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm text-on-surface-variant md:text-base">
                                Switch between tabs to explore our business
                                verticals, customized project locations,
                                downloadable catalogs, YouTube promos, and
                                verified agreements.
                            </p>
                        </div>
                        <Link
                            href={route('portfolio')}
                            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-secondary hover:underline"
                        >
                            Full Project Gallery <ArrowRight size={16} />
                        </Link>
                    </div>

                    <VentureTabsHub
                        ventures={ventures}
                        certifications={certifications}
                        catalogs={catalogs}
                        promoVideos={promoVideos}
                        initialTab={initialTab}
                    />
                </div>
            </section>

            {(promoVideos.length > 0 || catalogs.length > 0) && (
                <section className="border-b border-outline-variant bg-white px-gutter py-16">
                    <div className="mx-auto grid max-w-container-max grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="space-y-4 lg:col-span-7">
                            <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                Media &amp; Commercials
                            </span>
                            <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl">
                                Promotional Films &amp; YouTube Spotlights
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
                                Direct Sales Tools
                            </span>
                            <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl">
                                Downloadable Catalogs
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
                            Instant Lead Desk
                        </span>
                        <h2 className="mt-2 mb-4 font-serif text-3xl font-bold text-primary md:text-4xl">
                            Partner with{' '}
                            {settings.company_name || 'Ashwin Group'}
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-on-surface-variant md:text-base">
                            Interested in Signature &amp; Royal Challenge Water
                            distributorship, green energy &amp; Eco-Resort
                            development, brand collaborations, or retail
                            franchises? Submit once to notify our email desk and
                            connect instantly on WhatsApp.
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
        </MainLayout>
    );
}
