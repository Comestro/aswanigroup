import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Building, Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import InquiryForm from '../components/InquiryForm';
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

export default function Contact({ ventures = [] }) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';

    return (
        <MainLayout>
            <Head title={`Contact Us - ${companyName}`} />

            <section className="relative flex items-center border-b border-outline-variant bg-primary px-gutter pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/contact-hero-bg.png"
                        alt="Office Workspace"
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
                            Get In Touch
                        </motion.div>
                        <motion.h1
                            variants={fadeIn}
                            className="mb-4 font-serif text-3xl leading-tight font-bold text-white sm:text-5xl md:text-6xl"
                        >
                            Connect With{' '}
                            <span className="text-secondary-container">
                                Us.
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={fadeIn}
                            className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 md:mx-0 md:text-xl"
                        >
                            Interested in Water Industries distributorship,
                            Green Energy &amp; Eco-Resort projects, or group
                            brand partnerships? Every inquiry forwards to our
                            email &amp; WhatsApp desk.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="bg-surface-container-low px-gutter py-12 md:py-16">
                <div className="mx-auto max-w-container-max">
                    <div className="grid grid-cols-1 overflow-hidden rounded border border-outline-variant bg-white shadow-sm lg:grid-cols-12">
                        <motion.div
                            {...fadeUp}
                            className="relative overflow-hidden bg-primary p-8 text-white md:p-12 lg:col-span-5"
                        >
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10" />
                            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-secondary/5" />

                            <div className="relative z-10">
                                <h2 className="mb-3 font-serif text-3xl font-bold">
                                    Corporate Office
                                </h2>
                                <p className="mb-10 text-base text-white/80">
                                    Direct lines to our division managers.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5">
                                            <Building
                                                className="text-secondary-container"
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-1.5 text-sm font-bold tracking-widest text-secondary-container uppercase">
                                                HQ Address
                                            </div>
                                            <p className="text-base leading-relaxed whitespace-pre-line text-white/85">
                                                {settings.hq_address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5">
                                            <Phone
                                                className="text-secondary-container"
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-1.5 text-sm font-bold tracking-widest text-secondary-container uppercase">
                                                Distributor Hotlines
                                            </div>
                                            {settings.primary_phone && (
                                                <p className="font-serif text-base text-white/85">
                                                    {settings.primary_phone}
                                                </p>
                                            )}
                                            {settings.secondary_phone && (
                                                <p className="font-serif text-base text-white/85">
                                                    {settings.secondary_phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5">
                                            <Mail
                                                className="text-secondary-container"
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-1.5 text-sm font-bold tracking-widest text-secondary-container uppercase">
                                                Emails
                                            </div>
                                            {settings.distributor_email && (
                                                <p className="text-base text-white/85">
                                                    {settings.distributor_email}
                                                </p>
                                            )}
                                            {settings.primary_email && (
                                                <p className="text-base text-white/85">
                                                    {settings.primary_email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5">
                                            <Clock
                                                className="text-secondary-container"
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-1.5 text-sm font-bold tracking-widest text-secondary-container uppercase">
                                                Office Hours
                                            </div>
                                            <p className="text-base text-white/85">
                                                {settings.office_hours}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-white/15 pt-6">
                                    <a
                                        href={`https://wa.me/${settings.whatsapp_number || '919507488833'}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                                    >
                                        <MessageCircle size={18} />
                                        Message Directly on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            {...fadeUp}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="p-8 md:p-12 lg:col-span-7"
                        >
                            <h2 className="mb-2 font-serif text-3xl font-bold text-primary">
                                Send us a Message
                            </h2>
                            <p className="mb-8 text-base text-on-surface-variant">
                                Captured directly in our lead tracker, emailed
                                to our division heads, and ready for instant
                                WhatsApp handoff.
                            </p>

                            <InquiryForm
                                defaultVentureId={ventures[0]?.id || ''}
                                defaultDivision={
                                    ventures[0]?.name ||
                                    'Ashwin Water Industries'
                                }
                                sourcePage="contact"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
