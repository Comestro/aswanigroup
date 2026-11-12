import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Download,
    ExternalLink,
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

            <section className="bg-surface-container-low px-gutter py-16">
                <div className="mx-auto max-w-container-max space-y-12">
                    {ventures.map((venture, index) => {
                        const IconComponent = getVentureIcon(venture.icon_name);
                        const isReversed = index % 2 === 1;
                        const highlights = venture.highlights || [];

                        return (
                            <article
                                key={venture.id}
                                className="overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm"
                            >
                                <div className="grid items-stretch lg:grid-cols-12">
                                    <div
                                        className={`relative min-h-[260px] bg-surface-container-high lg:col-span-5 ${
                                            isReversed ? 'lg:order-2' : ''
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
                                        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded bg-primary/90 px-3 py-1 text-[10px] font-bold tracking-wider text-secondary-container uppercase backdrop-blur-sm">
                                            <IconComponent size={13} />
                                            {venture.badge ||
                                                venture.short_label ||
                                                venture.name}
                                        </span>
                                    </div>

                                    <div
                                        className={`flex flex-col justify-between p-7 sm:p-10 lg:col-span-7 ${
                                            isReversed ? 'lg:order-1' : ''
                                        }`}
                                    >
                                        <div>
                                            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                                                {venture.name}
                                            </h2>

                                            {venture.subtitle && (
                                                <p className="mt-1 text-sm font-semibold text-secondary">
                                                    {venture.subtitle}
                                                </p>
                                            )}

                                            {venture.location_details && (
                                                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1 text-xs font-medium text-on-surface-variant">
                                                    <MapPin
                                                        size={13}
                                                        className="text-secondary"
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
                                                                className="flex items-start gap-2 text-xs font-medium text-on-surface sm:text-sm"
                                                            >
                                                                <CheckCircle2
                                                                    size={15}
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

                                        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-outline-variant pt-5">
                                            <Link
                                                href={route(
                                                    'ventures.show',
                                                    venture.slug,
                                                )}
                                                className="inline-flex items-center gap-2 rounded bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-secondary"
                                            >
                                                Explore{' '}
                                                {venture.short_label ||
                                                    venture.name}
                                                <ArrowRight size={16} />
                                            </Link>

                                            {venture.external_url && (
                                                <a
                                                    href={venture.external_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 rounded border border-outline-variant px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-secondary hover:text-secondary"
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
                <section className="border-t border-outline-variant bg-surface-container-high px-gutter py-14">
                    <div className="mx-auto max-w-container-max">
                        <div className="mb-6">
                            <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                                Group Documentation
                            </span>
                            <h2 className="mt-1 font-serif text-2xl font-bold text-primary md:text-3xl">
                                Downloadable Venture Catalogs
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {catalogs.map((catalog) => (
                                <a
                                    key={catalog.id}
                                    href={route(
                                        'catalogs.download',
                                        catalog.id,
                                    )}
                                    className="flex items-center justify-between gap-4 rounded-xl border border-outline-variant bg-white p-5 shadow-sm transition hover:border-secondary"
                                >
                                    <div className="min-w-0">
                                        <div className="truncate font-serif text-base font-bold text-primary">
                                            {catalog.title}
                                        </div>
                                        {catalog.description && (
                                            <p className="mt-1 line-clamp-2 text-xs text-on-surface-variant">
                                                {catalog.description}
                                            </p>
                                        )}
                                        <span className="mt-2 inline-block text-[11px] font-bold text-secondary">
                                            {catalog.file_size_label ||
                                                'PDF Brochure'}
                                        </span>
                                    </div>
                                    <span className="shrink-0 rounded bg-primary p-2.5 text-white">
                                        <Download size={16} />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-t border-outline-variant bg-white px-gutter py-14">
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded border border-outline-variant bg-surface-container-low p-8 text-center shadow-sm md:p-12">
                    <div className="absolute top-0 left-0 h-1 w-full bg-secondary" />
                    <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                        {headers.cta_eyebrow || 'Direct Partnership Desk'}
                    </span>
                    <h2 className="mt-3 mb-4 font-serif text-2xl font-bold text-primary md:text-3xl">
                        {headers.cta_title ||
                            'Need Territory Pricing, Catalogs, or Custom Quotes?'}
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-sm text-on-surface-variant md:text-base">
                        {headers.cta_subtitle ||
                            'Reach our acquisition desk directly via hotline, email, or WhatsApp.'}
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
