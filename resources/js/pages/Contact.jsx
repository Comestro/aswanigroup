import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Building, Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import InquiryForm from '../components/InquiryForm';
import PageHero from '../components/PageHero';
import MainLayout from '../layouts/MainLayout';

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5 },
};

export default function Contact({ ventures = [] }) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';
    const headers = settings.page_headers?.contact || {};

    return (
        <MainLayout>
            <Head title={`Contact Us - ${companyName}`} />

            <PageHero
                badge={headers.badge || 'Get In Touch'}
                title={headers.title || 'Connect With Us.'}
                subtitle={
                    headers.subtitle ||
                    'Interested in Water Industries distributorship, Green Energy & Eco-Resort projects, or group brand partnerships? Every inquiry forwards to our email & WhatsApp desk.'
                }
                heroImage={headers.hero_image || '/images/contact-hero-bg.png'}
                imageAlt="Office Workspace"
            />

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
                                    {headers.sidebar_title ||
                                        'Corporate Office'}
                                </h2>
                                <p className="mb-10 text-base text-white/80">
                                    {headers.sidebar_subtitle ||
                                        'Direct lines to our division managers.'}
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
                                {headers.form_title || 'Send us a Message'}
                            </h2>
                            <p className="mb-8 text-base text-on-surface-variant">
                                {headers.form_subtitle ||
                                    'Captured directly in our lead tracker, emailed to our division heads, and ready for instant WhatsApp handoff.'}
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
