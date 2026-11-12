import { Link, usePage } from '@inertiajs/react';
import {
    ArrowUpRight,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
} from 'lucide-react';
import { route } from 'ziggy-js';
import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

export default function Footer() {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const ventures = props.navVentures || [];
    const social = settings.social_links || {};

    const companyName = settings.company_name || 'Ashwin Group';
    const logoPath = settings.logo_path || DEMO_IMAGE_URL;
    const whatsappNumber = settings.whatsapp_number || '919507488833';
    const phoneDisplay = settings.secondary_phone
        ? `${settings.primary_phone} / ${settings.secondary_phone}`
        : settings.primary_phone || '9507488833';
    const emailDisplay = settings.primary_email || 'info@ashwingroup.com';

    return (
        <footer className="w-full border-t border-outline-variant bg-primary text-white">
            <div className="mx-auto max-w-container-max px-4 pt-14 pb-10 sm:px-6 lg:px-8">
                {/* Architectural Statement Header */}
                <div className="mb-12 grid grid-cols-1 items-end gap-8 border-b border-white/15 pb-10 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <div className="mb-4 flex items-center gap-3">
                            <img
                                src={logoPath}
                                alt={`${companyName} Logo`}
                                onError={handleImageError}
                                className="h-9 w-9 border border-white/20 bg-white object-contain p-1"
                            />
                            <span className="font-mono text-xs tracking-widest text-secondary-container uppercase">
                                EST. {settings.est_year || '1995'} ·{' '}
                                {settings.footer_regions ||
                                    'Bihar · Jharkhand · West Bengal'}
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl leading-[1.08] font-bold text-white sm:text-4xl">
                            {settings.company_full_name ||
                                `${companyName} of Companies`}
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
                            {settings.footer_summary ||
                                'Powering a smart, sustainable, and trusted future across packaged water, energy, jewelry, and trade.'}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center gap-2 bg-secondary px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary/90"
                        >
                            <span>Partnership Desk</span>
                            <ArrowUpRight size={14} />
                        </Link>
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-white hover:bg-white hover:text-primary"
                        >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>

                {/* Hairline Directory Grid */}
                <div className="grid grid-cols-1 gap-8 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                        <h3 className="mb-4 font-mono text-[11px] font-semibold tracking-widest text-white/50 uppercase">
                            01 · Navigation
                        </h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Home Overview', href: route('home') },
                                {
                                    label: 'About & Legacy',
                                    href: route('about'),
                                },
                                {
                                    label: 'Ventures Directory',
                                    href: route('industries'),
                                },
                                {
                                    label: 'Project Portfolio',
                                    href: route('portfolio'),
                                },
                                {
                                    label: 'Verified Credentials',
                                    href: route('certifications'),
                                },
                                {
                                    label: 'Contact Desk',
                                    href: route('contact'),
                                },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/80 transition-colors hover:text-secondary-container"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-5">
                        <h3 className="mb-4 font-mono text-[11px] font-semibold tracking-widest text-white/50 uppercase">
                            02 · Operating Companies
                        </h3>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {ventures.map((venture, idx) => (
                                <Link
                                    key={venture.id}
                                    href={route('ventures.show', venture.slug)}
                                    className="group flex items-center justify-between border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white/85 transition-colors hover:border-secondary-container hover:text-white"
                                >
                                    <span className="truncate">
                                        <span className="mr-2 font-mono text-xs text-secondary-container">
                                            0{idx + 1}
                                        </span>
                                        {venture.short_label || venture.name}
                                    </span>
                                    <ArrowUpRight
                                        size={13}
                                        className="shrink-0 opacity-60 group-hover:opacity-100"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <h3 className="mb-4 font-mono text-[11px] font-semibold tracking-widest text-white/50 uppercase">
                            03 · Direct Channels
                        </h3>
                        <div className="space-y-3 text-sm">
                            <a
                                href={`tel:${settings.primary_phone || '9507488833'}`}
                                className="flex items-center gap-2.5 text-white/85 transition-colors hover:text-secondary-container"
                            >
                                <Phone
                                    size={15}
                                    className="shrink-0 text-secondary-container"
                                />
                                <span className="font-mono">
                                    {phoneDisplay}
                                </span>
                            </a>
                            <a
                                href={`mailto:${emailDisplay}`}
                                className="flex items-center gap-2.5 text-white/85 transition-colors hover:text-secondary-container"
                            >
                                <Mail
                                    size={15}
                                    className="shrink-0 text-secondary-container"
                                />
                                <span>{emailDisplay}</span>
                            </a>
                            <div className="flex items-start gap-2.5 text-white/70">
                                <MapPin
                                    size={15}
                                    className="mt-0.5 shrink-0 text-secondary-container"
                                />
                                <span>
                                    {settings.hq_address ||
                                        settings.footer_regions ||
                                        'Bihar · Jharkhand · West Bengal'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal & Social Row */}
                <div className="flex flex-col items-start justify-between gap-4 pt-6 font-mono text-xs text-white/60 sm:flex-row sm:items-center">
                    <span>
                        © {new Date().getFullYear()}{' '}
                        {settings.company_full_name || companyName}. All rights
                        reserved.
                    </span>
                    <div className="flex flex-wrap items-center gap-5">
                        {social.linkedin && (
                            <a
                                href={social.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-white"
                            >
                                LinkedIn
                            </a>
                        )}
                        {social.instagram && (
                            <a
                                href={social.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-white"
                            >
                                Instagram
                            </a>
                        )}
                        {social.youtube && (
                            <a
                                href={social.youtube}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-white"
                            >
                                YouTube
                            </a>
                        )}
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-1.5 text-white/75 transition-colors hover:text-secondary-container"
                        >
                            <ShieldCheck size={12} />
                            Admin CMS
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
