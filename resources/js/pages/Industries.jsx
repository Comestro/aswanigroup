import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import VentureTabsHub from '../components/VentureTabsHub';
import MainLayout from '../layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError } from '../lib/utils';

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Industries({
    ventures = [],
    certifications = [],
    catalogs = [],
    promoVideos = [],
    initialTab = '',
}) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';
    const headers = settings.page_headers?.industries || {};

    return (
        <MainLayout>
            <Head title={`Ventures & Certifications Hub - ${companyName}`} />

            <section className="relative flex items-center border-b border-outline-variant bg-primary px-gutter pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src={headers.hero_image || DEMO_IMAGE_URL}
                        alt="Ventures Hub"
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
                            Parent Company Showcase Hub
                        </motion.div>
                        <motion.h1
                            variants={fadeIn}
                            className="mb-4 font-serif text-3xl leading-tight font-bold text-white sm:text-5xl md:text-6xl"
                        >
                            Our Business{' '}
                            <span className="text-secondary-container">
                                Ventures &amp; Proof.
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={fadeIn}
                            className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 md:mx-0 md:text-xl"
                        >
                            Explore Water Industries, Green Energy &amp;
                            Eco-Resort, Enaure Fine Jewelry, Traders, and
                            official Certifications from one unified hub.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="bg-surface-container-low px-gutter py-12 md:py-16">
                <div className="mx-auto max-w-container-max">
                    <VentureTabsHub
                        ventures={ventures}
                        certifications={certifications}
                        catalogs={catalogs}
                        promoVideos={promoVideos}
                        initialTab={initialTab}
                    />
                </div>
            </section>

            <section className="border-t border-outline-variant bg-white px-gutter py-14">
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded border border-outline-variant bg-surface-container-low p-8 text-center shadow-sm md:p-12">
                    <div className="absolute top-0 left-0 h-1 w-full bg-secondary" />
                    <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                        Direct Partnership Desk
                    </span>
                    <h2 className="mt-3 mb-4 font-serif text-2xl font-bold text-primary md:text-3xl">
                        Need Territory Pricing, Catalogs, or Custom Quotes?
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-sm text-on-surface-variant md:text-base">
                        Reach our acquisition desk directly via hotline, email,
                        or WhatsApp.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href={`tel:${settings.primary_phone || '9507488833'}`}
                            className="flex items-center gap-3 rounded border border-outline-variant bg-white px-5 py-3 shadow-sm"
                        >
                            <Phone size={20} className="text-secondary" />
                            <span className="font-serif font-bold text-primary">
                                {settings.primary_phone}
                                {settings.secondary_phone
                                    ? ` / ${settings.secondary_phone}`
                                    : ''}
                            </span>
                        </a>
                        <a
                            href={`mailto:${settings.distributor_email || settings.primary_email || 'distributors@ashwingroup.com'}`}
                            className="flex items-center gap-3 rounded border border-outline-variant bg-white px-5 py-3 shadow-sm"
                        >
                            <Mail size={20} className="text-secondary" />
                            <span className="font-serif font-bold text-primary">
                                {settings.distributor_email ||
                                    settings.primary_email ||
                                    'distributors@ashwingroup.com'}
                            </span>
                        </a>
                        <a
                            href={`https://wa.me/${settings.whatsapp_number || '919507488833'}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                        >
                            <MessageCircle size={18} />
                            WhatsApp Desk
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
