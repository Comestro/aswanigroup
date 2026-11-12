import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Eye, Quote, Target, Trophy } from 'lucide-react';
import { route } from 'ziggy-js';
import PageHero from '@/components/PageHero';
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

export default function About({ venturesCount = 4, certificationsCount = 6 }) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';
    const headers = settings.page_headers?.about || {};
    const messageParagraphs = String(settings.chairman_message || '')
        .split(/\n\s*\n/)
        .filter(Boolean);
    const coreValues = settings.core_values || [];
    const timelineItems = settings.timeline_items || [];

    return (
        <MainLayout>
            <Head title={`About Us - ${companyName}`} />

            <PageHero
                badge={
                    headers.badge ||
                    `Est. ${settings.est_year || '1995'} · ${venturesCount} Ventures · ${certificationsCount} Verified Records`
                }
                title={headers.title || 'Our Legacy & Governance.'}
                subtitle={headers.subtitle || settings.hero_description}
                heroImage={headers.hero_image || DEMO_IMAGE_URL}
                imageAlt="Corporate Background"
            />

            {/* Chairman's Editorial Feature */}
            <section className="border-b border-outline-variant bg-background py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="border border-outline-variant bg-white">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant bg-surface-container-low px-5 py-3 font-mono text-[11px] tracking-widest uppercase">
                            <span className="font-semibold text-secondary">
                                01 · Chairman&apos;s Statement
                            </span>
                            <span className="text-on-surface-variant">
                                Executive Leadership
                            </span>
                        </div>

                        <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
                            <div className="border-b border-outline-variant bg-surface-container-low lg:col-span-5 lg:border-r lg:border-b-0">
                                <img
                                    src={
                                        settings.chairman_image ||
                                        DEMO_IMAGE_URL
                                    }
                                    alt={settings.founder_name || 'Chairman'}
                                    onError={handleImageError}
                                    className="block aspect-[4/3] h-full w-full object-cover lg:aspect-auto"
                                />
                            </div>

                            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-12">
                                <div>
                                    <Quote
                                        size={28}
                                        className="mb-4 text-secondary"
                                    />
                                    <h2 className="mb-5 font-serif text-xl leading-snug font-bold text-primary sm:text-2xl md:text-3xl">
                                        &ldquo;{settings.chairman_quote}&rdquo;
                                    </h2>
                                    <div className="space-y-4 text-sm leading-relaxed text-on-surface-variant sm:text-base">
                                        {messageParagraphs.map((para, idx) => (
                                            <p key={idx}>{para}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-outline-variant pt-5">
                                    <div>
                                        <div className="font-serif text-lg font-bold text-primary sm:text-xl">
                                            {settings.founder_name ||
                                                'Mr. R.K. Ashwin'}
                                        </div>
                                        <div className="mt-0.5 font-mono text-xs font-semibold tracking-widest text-secondary uppercase">
                                            {settings.founder_title ||
                                                'Founder & Chairman'}
                                        </div>
                                    </div>
                                    <Link
                                        href={route('certifications')}
                                        className="inline-flex items-center gap-1.5 border border-outline bg-background px-4 py-2 font-mono text-xs font-semibold text-primary uppercase transition-colors hover:border-primary hover:bg-primary hover:text-white"
                                    >
                                        <span>Verified Partnerships</span>
                                        <ArrowUpRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unified 3-Column Manifesto Matrix */}
            <section className="border-b border-outline-variant bg-white py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 border-b border-outline-variant pb-4">
                        <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                            02 · Purpose &amp; Guiding Principles
                        </p>
                        <h2 className="mt-1 font-serif text-2xl font-bold text-primary sm:text-3xl">
                            Vision, Mission &amp; Institutional Values
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 divide-y divide-outline-variant border border-outline-variant bg-background md:grid-cols-3 md:divide-x md:divide-y-0">
                        <div className="flex flex-col p-6 sm:p-8">
                            <div className="mb-5 flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-secondary">
                                    01 · VISION
                                </span>
                                <Eye size={20} className="text-secondary" />
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-primary">
                                Our Vision
                            </h3>
                            <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
                                {settings.vision_text}
                            </p>
                        </div>

                        <div className="flex flex-col p-6 sm:p-8">
                            <div className="mb-5 flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-secondary">
                                    02 · MISSION
                                </span>
                                <Target size={20} className="text-secondary" />
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-primary">
                                Our Mission
                            </h3>
                            <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
                                {settings.mission_text}
                            </p>
                        </div>

                        <div className="flex flex-col p-6 sm:p-8">
                            <div className="mb-5 flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-secondary">
                                    03 · VALUES
                                </span>
                                <Trophy size={20} className="text-secondary" />
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-primary">
                                Core Values
                            </h3>
                            <ul className="space-y-2.5 text-sm text-on-surface-variant sm:text-base">
                                {coreValues.map((item, idx) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5"
                                    >
                                        <span className="mt-0.5 font-mono text-xs font-semibold text-secondary">
                                            0{idx + 1}
                                        </span>
                                        <span className="leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architectural Year-Stamped Milestone Ledger */}
            {timelineItems.length > 0 && (
                <section className="bg-surface-container-low py-14 md:py-20">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-outline pb-5 sm:flex-row sm:items-end">
                            <div>
                                <p className="font-mono text-xs tracking-widest text-secondary uppercase">
                                    03 · Historical Ledger
                                </p>
                                <h2 className="mt-1 font-serif text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                                    Corporate Milestones
                                </h2>
                            </div>
                            <p className="max-w-md text-sm text-on-surface-variant">
                                Key expansion landmarks shaping {companyName}
                                &apos;s footprint since{' '}
                                {settings.est_year || '1995'}.
                            </p>
                        </div>

                        <div className="divide-y divide-outline-variant border border-outline bg-white">
                            {timelineItems.map((item, i) => (
                                <div
                                    key={`${item.year}-${item.title}`}
                                    className="grid grid-cols-1 transition-colors hover:bg-background md:grid-cols-12"
                                >
                                    <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-6 py-4 md:col-span-3 md:flex-col md:items-start md:justify-center md:border-r md:border-b-0 md:p-6">
                                        <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                                            Stage 0{i + 1}
                                        </span>
                                        <div className="font-serif text-2xl font-bold text-secondary sm:text-3xl">
                                            {item.year}
                                        </div>
                                    </div>
                                    <div className="p-6 md:col-span-9 md:p-7">
                                        <h3 className="font-serif text-lg font-bold text-primary sm:text-xl">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant sm:text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
