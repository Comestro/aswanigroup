import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Quote, Target, Trophy } from 'lucide-react';
import { route } from 'ziggy-js';
import PageHero from '../components/PageHero';
import MainLayout from '../layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError } from '../lib/utils';

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
                heroImage={headers.hero_image || DEMO_IMAGE_URL}
                imageAlt="Corporate Background"
            />

            {/* Chairman's Message */}
            <section className="bg-white py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl border border-outline-variant bg-white">
                        <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-12">
                            <motion.div
                                {...fadeUp}
                                className="h-full lg:col-span-5"
                            >
                                <div className="aspect-[4/3] h-full w-full border-b border-outline-variant bg-surface-container-low sm:aspect-[16/10] lg:aspect-auto lg:border-r lg:border-b-0">
                                    <img
                                        src={
                                            settings.chairman_image ||
                                            DEMO_IMAGE_URL
                                        }
                                        alt={
                                            settings.founder_name || 'Chairman'
                                        }
                                        onError={handleImageError}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                {...fadeUp}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="relative flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-12"
                            >
                                <div>
                                    <div className="mb-3 flex items-center justify-between gap-4">
                                        <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                            Chairman&apos;s Message
                                        </p>
                                        <Quote
                                            size={28}
                                            className="shrink-0 text-outline-variant"
                                        />
                                    </div>
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
                                        <div className="mt-0.5 text-xs font-semibold tracking-widest text-secondary uppercase">
                                            {settings.founder_title ||
                                                'Founder & Chairman'}
                                        </div>
                                    </div>
                                    <Link
                                        href={route('certifications')}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
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
            <section className="border-y border-outline-variant bg-surface-container-low py-14 md:py-20">
                <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
                    <motion.div
                        {...fadeUp}
                        className="flex h-full flex-col rounded-xl border border-outline-variant bg-white p-6 transition-colors hover:border-primary/40 sm:p-7"
                    >
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low text-secondary">
                            <Eye size={22} />
                        </div>
                        <h3 className="mb-2.5 font-serif text-xl font-bold text-primary">
                            Our Vision
                        </h3>
                        <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
                            {settings.vision_text}
                        </p>
                    </motion.div>

                    <motion.div
                        {...fadeUp}
                        className="flex h-full flex-col rounded-xl border border-outline-variant bg-white p-6 transition-colors hover:border-primary/40 sm:p-7"
                    >
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low text-secondary">
                            <Target size={22} />
                        </div>
                        <h3 className="mb-2.5 font-serif text-xl font-bold text-primary">
                            Our Mission
                        </h3>
                        <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
                            {settings.mission_text}
                        </p>
                    </motion.div>

                    <motion.div
                        {...fadeUp}
                        className="flex h-full flex-col rounded-xl border border-outline-variant bg-white p-6 transition-colors hover:border-primary/40 sm:p-7"
                    >
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low text-secondary">
                            <Trophy size={22} />
                        </div>
                        <h3 className="mb-2.5 font-serif text-xl font-bold text-primary">
                            Core Values
                        </h3>
                        <ul className="mt-1 space-y-2.5 text-sm text-on-surface-variant sm:text-base">
                            {coreValues.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-2.5"
                                >
                                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                                    <span className="leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            {timelineItems.length > 0 && (
                <section className="border-b border-outline-variant bg-white py-14 md:py-20">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="mx-auto mb-12 max-w-3xl text-center"
                        >
                            <motion.h2
                                variants={fadeIn}
                                className="mb-3 font-serif text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl"
                            >
                                Our Journey
                            </motion.h2>
                            <motion.p
                                variants={fadeIn}
                                className="text-sm text-on-surface-variant sm:text-base"
                            >
                                Key milestones that have shaped {companyName}
                                &apos;s corporate legacy since{' '}
                                {settings.est_year || '1995'}.
                            </motion.p>
                        </motion.div>

                        <div className="relative mx-auto max-w-4xl">
                            <div className="absolute top-0 bottom-0 left-3.5 w-px bg-outline-variant md:left-1/2 md:-translate-x-px" />

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
                                    className={`relative mb-8 flex items-start last:mb-0 ${
                                        i % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    <div className="hidden w-5/12 md:block" />
                                    <div className="absolute left-3.5 z-10 mt-6 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-3 border-secondary bg-white md:left-1/2" />
                                    <div
                                        className={`w-full pl-10 md:w-5/12 md:pl-0 ${
                                            i % 2 === 0
                                                ? 'md:pr-10 md:text-right'
                                                : 'md:pl-10'
                                        }`}
                                    >
                                        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-5 transition-colors hover:border-primary/40 sm:p-6">
                                            <div className="mb-1 font-serif text-xl font-bold text-secondary sm:text-2xl">
                                                {item.year}
                                            </div>
                                            <div className="text-base font-bold text-primary sm:text-lg">
                                                {item.title}
                                            </div>
                                            <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
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
