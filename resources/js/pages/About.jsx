import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Quote, Target, Trophy } from 'lucide-react';
import { route } from 'ziggy-js';
import PageHero from '../components/PageHero';
import MainLayout from '../layouts/MainLayout';

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5 },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
                title={headers.title || 'Our Legacy.'}
                subtitle={headers.subtitle || settings.hero_description}
                heroImage={headers.hero_image || '/images/about-hero-bg.png'}
                imageAlt="Corporate Background"
            />

            {/* Chairman's Message */}
            <section className="bg-white px-gutter py-16 md:py-20">
                <div className="mx-auto max-w-container-max">
                    <div className="relative overflow-hidden rounded border border-outline-variant bg-white shadow-sm">
                        <div className="relative z-10 grid grid-cols-1 items-center gap-0 lg:grid-cols-12">
                            <motion.div
                                {...fadeUp}
                                className="h-full lg:col-span-5"
                            >
                                <div className="aspect-square h-full w-full border-b border-outline-variant bg-surface-container-low lg:aspect-auto lg:border-r lg:border-b-0">
                                    <img
                                        src={
                                            settings.chairman_image ||
                                            '/images/chairman-portrait.png'
                                        }
                                        alt={
                                            settings.founder_name || 'Chairman'
                                        }
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                {...fadeUp}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="relative p-8 lg:col-span-7 lg:p-12"
                            >
                                <div className="absolute top-8 right-10 text-outline-variant/30">
                                    <Quote size={80} />
                                </div>
                                <p className="mb-4 text-sm font-bold tracking-widest text-secondary uppercase">
                                    Chairman&apos;s Message
                                </p>
                                <h2 className="mb-6 font-serif text-2xl leading-tight font-bold text-primary md:text-3xl">
                                    &ldquo;{settings.chairman_quote}&rdquo;
                                </h2>
                                <div className="space-y-4 text-base leading-relaxed text-on-surface-variant">
                                    {messageParagraphs.map((para, idx) => (
                                        <p key={idx}>{para}</p>
                                    ))}
                                </div>
                                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-outline-variant pt-6">
                                    <div>
                                        <div className="font-serif text-xl font-bold text-primary">
                                            {settings.founder_name ||
                                                'Mr. R.K. Ashwin'}
                                        </div>
                                        <div className="mt-1 text-sm font-semibold tracking-widest text-secondary uppercase">
                                            {settings.founder_title ||
                                                'Founder & Chairman'}
                                        </div>
                                    </div>
                                    <Link
                                        href={route('certifications')}
                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:underline"
                                    >
                                        View Verified Partnerships{' '}
                                        <ArrowRight size={15} />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision, Mission, Core Values */}
            <section className="border-y border-outline-variant bg-surface-variant px-gutter py-12 md:py-16">
                <div className="mx-auto grid max-w-container-max grid-cols-1 gap-5 md:grid-cols-3">
                    <motion.div
                        {...fadeUp}
                        className="flex flex-col justify-between border-outline-variant bg-white p-6 shadow-sm"
                    >
                        <div>
                            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-outline-variant bg-surface-container-low text-primary">
                                <Eye size={24} />
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-primary">
                                Our Vision
                            </h3>
                            <p className="text-base leading-relaxed text-on-surface-variant">
                                {settings.vision_text}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        {...fadeUp}
                        className="flex flex-col justify-between border-outline-variant bg-white p-6 shadow-sm"
                    >
                        <div>
                            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-outline-variant bg-surface-container-low text-primary">
                                <Target size={24} />
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-primary">
                                Our Mission
                            </h3>
                            <p className="text-base leading-relaxed text-on-surface-variant">
                                {settings.mission_text}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        {...fadeUp}
                        className="flex flex-col justify-between border-outline-variant bg-white p-6 shadow-sm"
                    >
                        <div>
                            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-outline-variant bg-surface-container-low text-primary">
                                <Trophy size={24} />
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-primary">
                                Core Values
                            </h3>
                            <ul className="mt-2 space-y-3 text-base text-on-surface-variant">
                                {coreValues.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-2 h-1.5 w-1.5 shrink-0 bg-secondary" />
                                        <span className="leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            {timelineItems.length > 0 && (
                <section className="border-b border-outline-variant bg-surface-container-low px-gutter py-16 md:py-24">
                    <div className="mx-auto max-w-container-max">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="mx-auto mb-12 max-w-3xl text-center"
                        >
                            <motion.h2
                                variants={fadeIn}
                                className="mb-4 font-serif text-2xl font-bold tracking-tight text-primary md:text-4xl lg:text-5xl"
                            >
                                Our Journey
                            </motion.h2>
                            <motion.p
                                variants={fadeIn}
                                className="text-sm text-on-surface-variant md:text-lg"
                            >
                                Key milestones that have shaped {companyName}
                                &apos;s corporate legacy since{' '}
                                {settings.est_year || '1995'}.
                            </motion.p>
                        </motion.div>

                        <div className="relative mx-auto max-w-4xl">
                            <div className="absolute top-0 bottom-0 left-4 w-px bg-outline-variant md:left-1/2 md:-translate-x-px" />

                            {timelineItems.map((item, i) => (
                                <motion.div
                                    key={`${item.year}-${item.title}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.08,
                                    }}
                                    className={`relative mb-10 flex items-start ${
                                        i % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    <div className="hidden w-5/12 md:block" />
                                    <div className="absolute left-4 z-10 mt-1 h-4 w-4 -translate-x-[0.45rem] rounded-full border-4 border-secondary bg-white md:left-1/2 md:-translate-x-1/2" />
                                    <div
                                        className={`w-full pl-12 md:w-5/12 md:pl-0 ${
                                            i % 2 === 0
                                                ? 'md:pr-12 md:text-right'
                                                : 'md:pl-12'
                                        }`}
                                    >
                                        <div className="relative border border-outline-variant bg-white p-6 shadow-sm">
                                            <div className="mb-1 font-serif text-2xl font-bold text-secondary">
                                                {item.year}
                                            </div>
                                            <div className="text-lg font-bold text-primary">
                                                {item.title}
                                            </div>
                                            <p className="mt-2 text-base leading-relaxed text-on-surface-variant">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
