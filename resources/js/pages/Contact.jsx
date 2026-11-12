import { Head, usePage } from '@inertiajs/react';
import { Building, Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';
import PageHero from '@/components/PageHero';
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL } from '@/lib/utils';

export default function Contact({ ventures = [] }) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';
    const headers = settings.page_headers?.contact || {};

    return (
        <MainLayout>
            <Head title={`Contact Us - ${companyName}`} />

            <PageHero
                badge={headers.badge || 'Acquisition & Partnership Desk'}
                title={headers.title || 'Connect With Us.'}
                subtitle={
                    headers.subtitle ||
                    'Interested in Water Industries distributorship, Green Energy & Eco-Resort projects, or group brand partnerships? Every inquiry forwards directly to our email & WhatsApp desk.'
                }
                heroImage={headers.hero_image || DEMO_IMAGE_URL}
                imageAlt="Corporate Office Workspace"
            />

            <section className="bg-background py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 border border-outline bg-white lg:grid-cols-12">
                        <div className="flex flex-col justify-between bg-primary p-6 text-white sm:p-8 md:p-10 lg:col-span-5">
                            <div>
                                <p className="font-mono text-[11px] tracking-widest text-secondary-container uppercase">
                                    Direct Directory
                                </p>
                                <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                                    {headers.sidebar_title ||
                                        'Corporate Office'}
                                </h2>
                                <p className="mt-2 mb-8 text-sm text-white/75 sm:text-base">
                                    {headers.sidebar_subtitle ||
                                        'Direct lines to our division managers.'}
                                </p>

                                <div className="divide-y divide-white/15 border-y border-white/15">
                                    <div className="flex gap-4 py-5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 bg-white/5">
                                            <Building
                                                className="text-secondary-container"
                                                size={18}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-mono text-[10px] font-semibold tracking-widest text-secondary-container uppercase">
                                                HQ Address
                                            </div>
                                            <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-white/85">
                                                {settings.hq_address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 py-5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 bg-white/5">
                                            <Phone
                                                className="text-secondary-container"
                                                size={18}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-mono text-[10px] font-semibold tracking-widest text-secondary-container uppercase">
                                                Distributor Hotlines
                                            </div>
                                            {settings.primary_phone && (
                                                <p className="mt-1 font-mono text-sm text-white/90">
                                                    {settings.primary_phone}
                                                </p>
                                            )}
                                            {settings.secondary_phone && (
                                                <p className="font-mono text-sm text-white/90">
                                                    {settings.secondary_phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 py-5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 bg-white/5">
                                            <Mail
                                                className="text-secondary-container"
                                                size={18}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-mono text-[10px] font-semibold tracking-widest text-secondary-container uppercase">
                                                Emails
                                            </div>
                                            {settings.distributor_email && (
                                                <p className="mt-1 truncate text-sm text-white/85">
                                                    {settings.distributor_email}
                                                </p>
                                            )}
                                            {settings.primary_email && (
                                                <p className="truncate text-sm text-white/85">
                                                    {settings.primary_email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 py-5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 bg-white/5">
                                            <Clock
                                                className="text-secondary-container"
                                                size={18}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-mono text-[10px] font-semibold tracking-widest text-secondary-container uppercase">
                                                Office Hours
                                            </div>
                                            <p className="mt-1 text-sm text-white/85">
                                                {settings.office_hours}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <a
                                    href={`https://wa.me/${settings.whatsapp_number || '919507488833'}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 bg-secondary px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary/90 sm:w-auto"
                                >
                                    <MessageCircle size={15} />
                                    <span>Message Directly on WhatsApp</span>
                                </a>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 md:p-10 lg:col-span-7">
                            <p className="font-mono text-[11px] tracking-widest text-secondary uppercase">
                                Lead Intake Form
                            </p>
                            <h2 className="mt-1.5 mb-2 font-serif text-2xl font-bold text-primary sm:text-3xl">
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
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
