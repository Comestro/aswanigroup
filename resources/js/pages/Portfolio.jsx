import { Head, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Download, Images, MapPin } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import LightboxDialog from '../components/LightboxDialog';
import MediaPlayerCard from '../components/MediaPlayerCard';
import PageHero from '../components/PageHero';
import MainLayout from '../layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError } from '../lib/utils';

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

            <PageHero
                badge={headers.badge || 'Completed Projects & Catalogs'}
                title={headers.title || 'Ventures & Portfolio.'}
                subtitle={
                    headers.subtitle ||
                    'Completed facilities, solar & hospitality projects, fine jewelry collections, and commercial retail operations across Eastern India.'
                }
                heroImage={headers.hero_image || DEMO_IMAGE_URL}
                imageAlt="Portfolio Hub"
            >
                <div className="flex flex-wrap gap-2.5">
                    {dynamicCategories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilter(cat)}
                            className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-colors md:text-sm ${
                                filter === cat
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-outline-variant bg-white text-primary hover:border-primary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {ventures.length > 0 && catalogs.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2.5">
                        {catalogs.slice(0, 2).map((catalog) => (
                            <a
                                key={catalog.id}
                                href={route('catalogs.download', catalog.id)}
                                className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 text-xs font-semibold text-primary transition-colors hover:border-primary"
                            >
                                <Download
                                    size={14}
                                    className="text-secondary"
                                />
                                {catalog.title}
                            </a>
                        ))}
                    </div>
                )}
            </PageHero>

            <section className="bg-white py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <motion.div
                        layout
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                                    transition={{ duration: 0.25 }}
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
                                    className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-white text-left transition-colors hover:border-primary/40"
                                >
                                    <div className="aspect-[16/10] w-full overflow-hidden border-b border-outline-variant bg-surface-container-low">
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
                                        <div className="mb-2 flex items-center justify-between gap-2 text-xs">
                                            <span className="font-bold tracking-wider text-secondary uppercase">
                                                {project.category_label}
                                            </span>
                                            {Array.isArray(
                                                project.image_urls,
                                            ) &&
                                                project.image_urls.length >
                                                    1 && (
                                                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
                                                        <Images size={12} />
                                                        {
                                                            project.image_urls
                                                                .length
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                        <h3 className="mb-2 font-serif text-lg leading-snug font-bold text-primary">
                                            {project.title}
                                        </h3>
                                        {project.summary && (
                                            <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-on-surface-variant">
                                                {project.summary}
                                            </p>
                                        )}
                                        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-outline-variant pt-3 text-xs font-medium text-on-surface-variant">
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
                <section className="border-t border-outline-variant bg-surface-container-low py-14 md:py-16">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
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
