import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Check,
    Download,
    ExternalLink,
    FileText,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from 'lucide-react';
import { route } from 'ziggy-js';
import PageHero from '@/components/PageHero';
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL, getVentureIcon, handleImageError } from '@/lib/utils';

export default function Industries({ ventures = [], catalogs = [] }) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';
    const headers = settings.page_headers?.industries || {};

    return (
        <MainLayout>
            <Head title={`Business Ventures | ${companyName}`} />

            <PageHero
                badge={headers.badge || 'Group Portfolio'}
                title={headers.title || 'Our Business Ventures.'}
                subtitle={
                    headers.subtitle ||
                    'Dedicated operating companies across packaged drinking water, green energy & hospitality, fine jewelry, and commercial distribution.'
                }
                heroImage={headers.hero_image || DEMO_IMAGE_URL}
                imageAlt={headers.title || 'Ashwin Group Ventures'}
            />

            <section className="bg-white py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max space-y-8 px-4 sm:px-6 md:space-y-10 lg:px-8">
                    {ventures.map((venture, index) => {
                        const IconComponent = getVentureIcon(venture.icon_name);
                        const isReversed = index % 2 === 1;
                        const highlights = venture.highlights || [];

                        return (
                            <article
                                key={venture.id}
                                className="overflow-hidden rounded-xl border border-outline-variant bg-white transition-colors hover:border-primary/40"
                            >
                                <div className="grid items-stretch lg:grid-cols-12">
                                    <div
                                        className={`aspect-[16/10] overflow-hidden border-b border-outline-variant bg-surface-container-low lg:col-span-5 lg:aspect-auto lg:min-h-[300px] lg:border-b-0 ${
                                            isReversed
                                                ? 'lg:order-2 lg:border-l lg:border-outline-variant'
                                                : 'lg:border-r lg:border-outline-variant'
                                        }`}
                                    >
                                        <img
                                            src={
                                                venture.division_image ||
                                                venture.hero_image ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={venture.name}
                                            onError={handleImageError}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div
                                        className={`flex flex-col justify-between p-5 sm:p-8 lg:col-span-7 lg:p-10 ${
                                            isReversed ? 'lg:order-1' : ''
                                        }`}
                                    >
                                        <div>
                                            <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-secondary uppercase">
                                                <IconComponent size={14} />
                                                <span>
                                                    {venture.badge ||
                                                        venture.short_label}
                                                </span>
                                            </div>

                                            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                                                {venture.name}
                                            </h2>

                                            {venture.location_details && (
                                                <p className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                                                    <MapPin
                                                        size={13}
                                                        className="shrink-0 text-secondary"
                                                    />
                                                    {venture.location_details}
                                                </p>
                                            )}

                                            <p className="mt-4 text-sm leading-relaxed text-on-surface-variant sm:text-base">
                                                {venture.summary}
                                            </p>

                                            {highlights.length > 0 && (
                                                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                                                    {highlights
                                                        .slice(0, 4)
                                                        .map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-2 rounded-lg border border-outline-variant bg-surface-container-low p-2.5 text-xs font-medium text-on-surface"
                                                            >
                                                                <Check
                                                                    size={14}
                                                                    className="mt-0.5 shrink-0 text-secondary"
                                                                />
                                                                <span>
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div className="mt-6 flex flex-col gap-3 border-t border-outline-variant pt-5 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
                                            <Link
                                                href={route(
                                                    'ventures.show',
                                                    venture.slug,
                                                )}
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary"
                                            >
                                                Explore{' '}
                                                {venture.short_label ||
                                                    venture.name}
                                                <ArrowRight size={15} />
                                            </Link>

                                            {venture.external_url && (
                                                <a
                                                    href={venture.external_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-outline-variant bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary"
                                                >
                                                    {venture.external_cta_label ||
                                                        'Visit Website'}
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {catalogs.length > 0 && (
                <section className="border-t border-outline-variant bg-surface-container-low py-14 md:py-16">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <p className="text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                                Group Documentation
                            </p>
                            <h2 className="mt-1 font-serif text-2xl font-bold text-primary md:text-3xl">
                                Downloadable Venture Catalogs
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {catalogs.map((catalog) => (
                                <a
                                    key={catalog.id}
                                    href={route(
                                        'catalogs.download',
                                        catalog.id,
                                    )}
                                    className="group flex items-center justify-between gap-4 rounded-xl border border-outline-variant bg-white p-5 transition-colors hover:border-primary"
                                >
                                    <div className="flex min-w-0 items-start gap-3">
                                        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-2.5 text-secondary">
                                            <FileText size={17} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="truncate font-serif text-base font-bold text-primary">
                                                {catalog.title}
                                            </div>
                                            {catalog.description && (
                                                <p className="mt-1 line-clamp-2 text-xs text-on-surface-variant">
                                                    {catalog.description}
                                                </p>
                                            )}
                                            <span className="mt-1.5 inline-block text-[11px] font-semibold text-secondary">
                                                {catalog.file_size_label ||
                                                    'PDF Brochure'}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="shrink-0 rounded-lg bg-primary p-2.5 text-white transition-colors group-hover:bg-secondary">
                                        <Download size={15} />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-t border-outline-variant bg-primary py-14 text-white md:py-16">
                <div className="mx-auto w-full max-w-container-max px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-xs font-bold tracking-[0.16em] text-secondary-container uppercase">
                        {headers.cta_eyebrow || 'Direct Partnership Desk'}
                    </p>
                    <h2 className="mt-3 mb-4 font-serif text-2xl font-bold text-white md:text-3xl">
                        {headers.cta_title ||
                            'Need Territory Pricing, Catalogs, or Custom Quotes?'}
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-sm text-white/75 md:text-base">
                        {headers.cta_subtitle ||
                            'Reach our acquisition desk directly via hotline, email, or WhatsApp.'}
                    </p>
                    <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
                        <a
                            href={`tel:${settings.primary_phone || '9507488833'}`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                        >
                            <Phone size={15} />
                            <span>
                                {settings.primary_phone}
                                {settings.secondary_phone
                                    ? ` / ${settings.secondary_phone}`
                                    : ''}
                            </span>
                        </a>
                        <a
                            href={`mailto:${settings.distributor_email || settings.primary_email || 'distributors@ashwingroup.com'}`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                        >
                            <Mail size={15} />
                            <span>
                                {settings.distributor_email ||
                                    settings.primary_email ||
                                    'distributors@ashwingroup.com'}
                            </span>
                        </a>
                        <a
                            href={`https://wa.me/${settings.whatsapp_number || '919507488833'}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                        >
                            <MessageCircle size={15} />
                            WhatsApp Desk
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
