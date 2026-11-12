import { Head, usePage } from '@inertiajs/react';
import { ArrowUpRight, Calendar, Download, Images, MapPin } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import LightboxDialog from '@/components/LightboxDialog';
import MediaPlayerCard from '@/components/MediaPlayerCard';
import PageHero from '@/components/PageHero';
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

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
                title={headers.title || 'Project Portfolio Archive.'}
                subtitle={
                    headers.subtitle ||
                    'Completed facilities, solar & hospitality installations, fine jewelry collections, and commercial retail operations across Eastern India.'
                }
                heroImage={headers.hero_image || DEMO_IMAGE_URL}
                imageAlt="Portfolio Hub"
            >
                <div className="flex flex-wrap gap-2">
                    {dynamicCategories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilter(cat)}
                            className={`border px-3.5 py-2 font-mono text-xs font-semibold uppercase transition-colors ${
                                filter === cat
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-outline bg-background text-primary hover:border-primary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {ventures.length > 0 && catalogs.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {catalogs.slice(0, 2).map((catalog) => (
                            <a
                                key={catalog.id}
                                href={route('catalogs.download', catalog.id)}
                                className="inline-flex items-center gap-2 border border-outline bg-white px-3.5 py-2 font-mono text-[11px] font-semibold text-primary uppercase transition-colors hover:border-primary"
                            >
                                <Download
                                    size={13}
                                    className="text-secondary"
                                />
                                <span>{catalog.title}</span>
                            </a>
                        ))}
                    </div>
                )}
            </PageHero>

            <section className="bg-background py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between border-b border-outline-variant pb-3 font-mono text-xs text-on-surface-variant uppercase">
                        <span>Showing: {filter}</span>
                        <span>{filtered.length} Projects</span>
                    </div>

                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 border-t border-l border-outline-variant sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((project, idx) => {
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
                                        className="group flex h-full flex-col border-r border-b border-outline-variant bg-white p-5 text-left transition-colors hover:bg-surface-container-low"
                                    >
                                        <div className="mb-3 flex w-full items-center justify-between gap-2 font-mono text-[10px] tracking-wider uppercase">
                                            <span className="font-semibold text-secondary">
                                                0{idx + 1} ·{' '}
                                                {project.category_label}
                                            </span>
                                            {photoCount > 1 && (
                                                <span className="inline-flex items-center gap-1 font-semibold text-primary">
                                                    <Images size={11} />
                                                    <span>{photoCount}</span>
                                                </span>
                                            )}
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

                                        <h2 className="font-serif text-lg leading-snug font-bold text-primary transition-colors group-hover:text-secondary">
                                            {project.title}
                                        </h2>

                                        {project.summary && (
                                            <p className="mt-2 mb-4 line-clamp-2 text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                                                {project.summary}
                                            </p>
                                        )}

                                        <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-3 font-mono text-[11px] text-on-surface-variant">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="inline-flex items-center gap-1">
                                                    <MapPin
                                                        size={13}
                                                        className="text-secondary"
                                                    />
                                                    {project.location}
                                                </span>
                                                {project.completion_year && (
                                                    <span className="inline-flex items-center gap-1">
                                                        <Calendar
                                                            size={13}
                                                            className="text-secondary"
                                                        />
                                                        {
                                                            project.completion_year
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                            <ArrowUpRight
                                                size={14}
                                                className="text-primary group-hover:text-secondary"
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="border border-outline-variant bg-white py-20 text-center font-serif text-lg text-on-surface-variant">
                            No projects found for this category.
                        </div>
                    )}
                </div>
            </section>

            {promoVideos.length > 0 && (
                <section className="border-t border-outline-variant bg-white py-14 md:py-16">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="mb-6 border-b border-outline-variant pb-4">
                            <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                Video Briefings
                            </p>
                            <h2 className="mt-1 font-serif text-2xl font-bold text-primary md:text-3xl">
                                Video Gallery &amp; Commercials
                            </h2>
                        </div>
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
