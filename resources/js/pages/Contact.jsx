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
                heroImage={headers.hero_image || '/images/demo-image.svg'}
                imageAlt="Office Workspace"
            />

            <section className="bg-white py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-outline-variant bg-white lg:grid-cols-12">
                        <motion.div
                            {...fadeUp}
                            className="bg-primary p-6 text-white sm:p-8 md:p-10 lg:col-span-5"
                        >
                            <div>
                                <h2 className="mb-2.5 font-serif text-2xl font-bold sm:text-3xl">
                                    {headers.sidebar_title ||
                                        'Corporate Office'}
                                </h2>
                                <p className="mb-8 text-sm text-white/75 sm:text-base">
                                    {headers.sidebar_subtitle ||
                                        'Direct lines to our division managers.'}
                                </p>

                                <div className="space-y-6 sm:space-y-7">
                                    <div className="flex gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                                            <Building
                                                className="text-secondary-container"
                                                size={20}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="mb-1 text-xs font-bold tracking-widest text-secondary-container uppercase">
                                                HQ Address
                                            </div>
                                            <p className="text-sm leading-relaxed whitespace-pre-line text-white/85 sm:text-base">
                                                {settings.hq_address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                                            <Phone
                                                className="text-secondary-container"
                                                size={20}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="mb-1 text-xs font-bold tracking-widest text-secondary-container uppercase">
                                                Distributor Hotlines
                                            </div>
                                            {settings.primary_phone && (
                                                <p className="font-serif text-sm text-white/85 sm:text-base">
                                                    {settings.primary_phone}
                                                </p>
                                            )}
                                            {settings.secondary_phone && (
                                                <p className="font-serif text-sm text-white/85 sm:text-base">
                                                    {settings.secondary_phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                                            <Mail
                                                className="text-secondary-container"
                                                size={20}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="mb-1 text-xs font-bold tracking-widest text-secondary-container uppercase">
                                                Emails
                                            </div>
                                            {settings.distributor_email && (
                                                <p className="truncate text-sm text-white/85 sm:text-base">
                                                    {settings.distributor_email}
                                                </p>
                                            )}
                                            {settings.primary_email && (
                                                <p className="truncate text-sm text-white/85 sm:text-base">
                                                    {settings.primary_email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                                            <Clock
                                                className="text-secondary-container"
                                                size={20}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="mb-1 text-xs font-bold tracking-widest text-secondary-container uppercase">
                                                Office Hours
                                            </div>
                                            <p className="text-sm text-white/85 sm:text-base">
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
                                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                                    >
                                        <MessageCircle size={17} />
                                        Message Directly on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            {...fadeUp}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="p-6 sm:p-8 md:p-10 lg:col-span-7"
                        >
                            <h2 className="mb-2 font-serif text-2xl font-bold text-primary sm:text-3xl">
                                {headers.form_title || 'Send us a Message'}
                            </h2>
                            <p className="mb-7 text-sm text-on-surface-variant sm:text-base">
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
