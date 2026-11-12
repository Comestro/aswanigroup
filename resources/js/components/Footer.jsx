import { Link, usePage } from '@inertiajs/react';
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
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
            <div className="mx-auto max-w-container-max px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <div className="mb-4 flex items-center gap-3">
                            <img
                                src={logoPath}
                                alt={`${companyName} Logo`}
                                onError={handleImageError}
                                className="h-9 w-9 rounded bg-white object-contain p-1"
                            />
                            <div>
                                <span className="block font-serif text-lg font-bold tracking-tight">
                                    {companyName}
                                </span>
                                <span className="block text-[10px] font-medium tracking-widest text-white/60 uppercase">
                                    Est. {settings.est_year || '1995'}
                                </span>
                            </div>
                        </div>
                        <p className="mb-5 max-w-xs text-sm leading-relaxed text-white/70">
                            {settings.footer_summary ||
                                'Powering a smart, sustainable, and trusted future across packaged water, energy, jewelry, and trade.'}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                            <MapPin
                                size={14}
                                className="shrink-0 text-secondary-container"
                            />
                            <span>
                                {settings.footer_regions ||
                                    'Bihar · Jharkhand · West Bengal'}
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="mb-4 text-xs font-semibold tracking-widest text-white/50 uppercase">
                            Company
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'About Us', href: route('about') },
                                {
                                    label: 'Ventures Hub',
                                    href: route('industries'),
                                },
                                {
                                    label: 'Portfolio',
                                    href: route('portfolio'),
                                },
                                {
                                    label: 'Certifications',
                                    href: route('certifications'),
                                },
                                { label: 'Contact', href: route('contact') },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/75 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="mb-4 text-xs font-semibold tracking-widest text-white/50 uppercase">
                            Ventures
                        </h4>
                        <ul className="space-y-2.5">
                            {ventures.map((venture) => (
                                <li key={venture.id}>
                                    <Link
                                        href={route(
                                            'ventures.show',
                                            venture.slug,
                                        )}
                                        className="text-sm text-white/75 transition-colors hover:text-white"
                                    >
                                        {venture.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="mb-4 text-xs font-semibold tracking-widest text-white/50 uppercase">
                            Corporate Desk
                        </h4>
                        <div className="space-y-3">
                            <a
                                href={`tel:${settings.primary_phone || '9507488833'}`}
                                className="flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-white"
                            >
                                <Phone
                                    size={15}
                                    className="shrink-0 text-secondary-container"
                                />
                                <span>{phoneDisplay}</span>
                            </a>
                            <a
                                href={`mailto:${emailDisplay}`}
                                className="flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-white"
                            >
                                <Mail
                                    size={15}
                                    className="shrink-0 text-secondary-container"
                                />
                                <span>{emailDisplay}</span>
                            </a>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2.5">
                            <Link
                                href={route('contact')}
                                className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-secondary/90"
                            >
                                Partner With Us
                            </Link>
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                <MessageCircle size={14} />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
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
                            className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
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
