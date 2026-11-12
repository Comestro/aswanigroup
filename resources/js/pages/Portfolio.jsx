import { Head, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Download, MapPin } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import LightboxDialog from '../components/LightboxDialog';
import MediaPlayerCard from '../components/MediaPlayerCard';
import MainLayout from '../layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError } from '../lib/utils';

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Portfolio({
    projects = [],
    ventures = [],
    catalogs = [],
    promoVideos = [],
}) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';
    const headers = settings.page_headers?.portfolio || {};

    const dynamicCategories = [
        'All',
        ...Array.from(new Set(projects.map((p) => p.category_label))).filter(
            Boolean,
        ),
    ];

    const [filter, setFilter] = useState('All');
    const [lightboxItem, setLightboxItem] = useState(null);

    const filtered = projects.filter(
        (p) => filter === 'All' || p.category_label === filter,
    );

    return (
        <MainLayout>
            <Head title={`Portfolio & Project Gallery - ${companyName}`} />

            <section className="relative flex items-center border-b border-outline-variant bg-primary px-gutter pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src={headers.hero_image || DEMO_IMAGE_URL}
                        alt="Portfolio Hub"
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
                            Completed Projects &amp; Catalogs
                        </motion.div>
                        <motion.h1
                            variants={fadeIn}
                            className="mb-4 font-serif text-3xl leading-tight font-bold text-white sm:text-5xl md:text-6xl"
                        >
                            Ventures &amp;{' '}
                            <span className="text-secondary-container">
                                Portfolio.
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={fadeIn}
                            className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/80 md:mx-0 md:text-xl"
                        >
                            Completed facilities, solar &amp; hospitality
                            projects, fine jewelry collections, and commercial
                            retail operations across Eastern India.
                        </motion.p>
                    </motion.div>

                    <div className="mb-6 flex flex-wrap justify-center gap-3 md:justify-start">
                        {dynamicCategories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter(cat)}
                                className={`rounded border px-5 py-2.5 text-sm font-bold tracking-wide transition-all ${
                                    filter === cat
                                        ? 'border-secondary bg-secondary text-white'
                                        : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {ventures.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                            {catalogs.slice(0, 2).map((catalog) => (
                                <a
                                    key={catalog.id}
                                    href={route(
                                        'catalogs.download',
                                        catalog.id,
                                    )}
                                    className="inline-flex items-center gap-2 rounded border border-outline-variant bg-white px-5 py-2.5 text-xs font-bold text-primary transition-colors hover:bg-surface-variant md:text-sm"
                                >
                                    <Download size={16} />
                                    {catalog.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-surface-container-low px-gutter py-12 md:py-16">
                <div className="mx-auto max-w-container-max">
                    <motion.div
                        layout
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project) => (
                                <motion.button
                                    layout
                                    key={project.id}
                                    type="button"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
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
                                    className="group rounded border border-outline-variant bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded border border-outline-variant bg-outline-variant">
                                        <img
                                            src={
                                                project.image_path ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={project.title}
                                            onError={handleImageError}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="rounded bg-primary px-3 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
                                                {project.category_label}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-1 pb-1">
                                        <h3 className="mb-2 font-serif text-xl leading-tight font-bold text-primary">
                                            {project.title}
                                        </h3>
                                        {project.summary && (
                                            <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-on-surface-variant">
                                                {project.summary}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-on-surface-variant">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin
                                                    size={15}
                                                    className="text-secondary"
                                                />
                                                {project.location}
                                            </span>
                                            {project.completion_year && (
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar
                                                        size={15}
                                                        className="text-secondary"
                                                    />
                                                    {project.completion_year}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filtered.length === 0 && (
                        <div className="py-20 text-center font-serif text-lg text-on-surface-variant">
                            No projects found for this category.
                        </div>
                    )}
                </div>
            </section>

            {promoVideos.length > 0 && (
                <section className="border-t border-outline-variant bg-white px-gutter py-14">
                    <div className="mx-auto max-w-container-max">
                        <h2 className="mb-6 font-serif text-2xl font-bold text-primary md:text-3xl">
                            Video Gallery &amp; Commercials
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {promoVideos.map((video) => (
                                <MediaPlayerCard key={video.id} video={video} />
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
