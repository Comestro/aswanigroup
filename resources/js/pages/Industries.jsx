import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowUpRight,
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
                badge={headers.badge || 'Operating Directory'}
                title={headers.title || 'Our Business Ventures.'}
                subtitle={
                    headers.subtitle ||
                    'Dedicated operating companies across packaged drinking water, green energy & hospitality, fine jewelry, and commercial distribution.'
                }
                heroImage={headers.hero_image || DEMO_IMAGE_URL}
                imageAlt={headers.title || 'Ashwin Group Ventures'}
            >
                {ventures.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {ventures.map((v, idx) => (
                            <a
                                key={v.id}
                                href={`#venture-${v.slug}`}
                                className="inline-flex items-center gap-1.5 border border-outline bg-background px-3 py-1.5 font-mono text-[11px] font-semibold text-primary uppercase transition-colors hover:border-primary hover:bg-primary hover:text-white"
                            >
                                <span className="text-secondary">
                                    0{idx + 1}
                                </span>
                                <span>{v.short_label || v.name}</span>
                            </a>
                        ))}
                    </div>
                )}
            </PageHero>

            {/* Full-Width Architectural Venture Dossiers */}
            <section className="bg-background py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max space-y-10 px-4 sm:px-6 lg:px-8">
                    {ventures.map((venture, index) => {
                        const IconComponent = getVentureIcon(venture.icon_name);
                        const isReversed = index % 2 === 1;
                        const highlights = venture.highlights || [];

                        return (
                            <article
                                id={`venture-${venture.slug}`}
                                key={venture.id}
                                className="border border-outline-variant bg-white"
                            >
                                {/* Top Dossier Rail */}
                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-low px-5 py-3 font-mono text-[11px] uppercase">
                                    <div className="flex items-center gap-2 font-semibold text-secondary">
                                        <span>DIVISION 0{index + 1}</span>
                                        <span>·</span>
                                        <IconComponent size={13} />
                                        <span>
                                            {venture.badge ||
                                                venture.short_label}
                                        </span>
                                    </div>
                                    {venture.location_details && (
                                        <span className="inline-flex items-center gap-1 text-on-surface-variant">
                                            <MapPin
                                                size={12}
                                                className="text-secondary"
                                            />
                                            {venture.location_details}
                                        </span>
                                    )}
                                </div>

                                <div className="grid items-stretch lg:grid-cols-12">
                                    <div
                                        className={`aspect-[16/10] overflow-hidden border-b border-outline-variant bg-surface-container-low lg:col-span-5 lg:aspect-auto lg:min-h-[320px] lg:border-b-0 ${
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
                                            className="block h-full w-full object-cover"
                                        />
                                    </div>

                                    <div
                                        className={`flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10 ${
                                            isReversed ? 'lg:order-1' : ''
                                        }`}
                                    >
                                        <div>
                                            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                                                {venture.name}
                                            </h2>

                                            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant sm:text-base">
                                                {venture.summary}
                                            </p>

                                            {highlights.length > 0 && (
                                                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                                                    {highlights
                                                        .slice(0, 4)
                                                        .map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-2 border border-outline-variant bg-background p-3 text-xs font-medium text-on-surface"
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

                                        <div className="mt-7 flex flex-col gap-3 border-t border-outline-variant pt-5 sm:flex-row sm:flex-wrap sm:items-center">
                                            <Link
                                                href={route(
                                                    'ventures.show',
                                                    venture.slug,
                                                )}
                                                className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                                            >
                                                <span>
                                                    Open{' '}
                                                    {venture.short_label ||
                                                        venture.name}{' '}
                                                    Page
                                                </span>
                                                <ArrowUpRight size={14} />
                                            </Link>

                                            {venture.external_url && (
                                                <a
                                                    href={venture.external_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center justify-center gap-1.5 border border-outline bg-white px-4 py-3 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:border-primary"
                                                >
                                                    <span>
                                                        {venture.external_cta_label ||
                                                            'Official Website'}
                                                    </span>
                                                    <ExternalLink size={13} />
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
                <section className="border-t border-outline-variant bg-white py-14 md:py-16">
                    <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 border-b border-outline-variant pb-4">
                            <p className="font-mono text-xs tracking-widest text-secondary uppercase">
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
                                    className="group flex items-center justify-between gap-4 border border-outline-variant bg-background p-5 transition-colors hover:border-primary hover:bg-white"
                                >
                                    <div className="flex min-w-0 items-start gap-3">
                                        <div className="border border-outline-variant bg-white p-2.5 text-secondary">
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
                                            <span className="mt-1.5 inline-block font-mono text-[10px] font-semibold tracking-wider text-secondary uppercase">
                                                {catalog.file_size_label ||
                                                    'PDF Brochure'}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="shrink-0 bg-primary p-2.5 text-white transition-colors group-hover:bg-secondary">
                                        <Download size={15} />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-t border-outline bg-primary py-14 text-white md:py-16">
                <div className="mx-auto flex w-full max-w-container-max flex-col justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
                    <div className="max-w-2xl">
                        <p className="font-mono text-xs tracking-widest text-secondary-container uppercase">
                            {headers.cta_eyebrow || 'Direct Partnership Desk'}
                        </p>
                        <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
                            {headers.cta_title ||
                                'Need Territory Pricing, Catalogs, or Custom Quotes?'}
                        </h2>
                        <p className="mt-2 text-sm text-white/75 md:text-base">
                            {headers.cta_subtitle ||
                                'Reach our acquisition desk directly via hotline, email, or WhatsApp.'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a
                            href={`tel:${settings.primary_phone || '9507488833'}`}
                            className="inline-flex items-center justify-center gap-2 border border-white/25 px-5 py-3 font-mono text-xs font-semibold text-white uppercase transition-colors hover:bg-white hover:text-primary"
                        >
                            <Phone size={14} />
                            <span>
                                {settings.primary_phone}
                                {settings.secondary_phone
                                    ? ` / ${settings.secondary_phone}`
                                    : ''}
                            </span>
                        </a>
                        <a
                            href={`mailto:${settings.distributor_email || settings.primary_email || 'distributors@ashwingroup.com'}`}
                            className="inline-flex items-center justify-center gap-2 border border-white/25 px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                        >
                            <Mail size={14} />
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
                            className="inline-flex items-center justify-center gap-2 bg-secondary px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary/90"
                        >
                            <MessageCircle size={14} />
                            <span>WhatsApp Desk</span>
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
