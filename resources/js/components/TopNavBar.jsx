import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Shield, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { DEMO_IMAGE_URL, handleImageError } from '../lib/utils';

export default function TopNavBar() {
    const { url, props } = usePage();
    const siteSettings = props.siteSettings || {};
    const authUser = props.auth?.user || null;
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { label: 'Home', href: route('home'), active: route().current('home') },
        {
            label: 'About',
            href: route('about'),
            active: route().current('about'),
        },
        {
            label: 'Ventures',
            href: route('industries'),
            active:
                route().current('industries') || route().current('ventures.*'),
        },
        {
            label: 'Portfolio',
            href: route('portfolio'),
            active: route().current('portfolio'),
        },
        {
            label: 'Certifications',
            href: route('certifications'),
            active: route().current('certifications'),
        },
        {
            label: 'Contact',
            href: route('contact'),
            active: route().current('contact'),
        },
    ];

    const navClass = scrolled
        ? 'bg-white shadow-sm border-b border-outline-variant text-primary'
        : 'bg-primary/90 backdrop-blur-md border-b border-white/10 text-white';

    const logoClass = scrolled ? 'text-primary' : 'text-white';
    const companyName = siteSettings.company_name || 'Ashwin Group';
    const logoPath = siteSettings.logo_path || DEMO_IMAGE_URL;

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navClass}`}
            >
                <div className="mx-auto flex h-20 max-w-container-max items-center justify-between gap-4 px-gutter">
                    <Link
                        href={route('home')}
                        onClick={() => setOpen(false)}
                        className={`group flex shrink-0 items-center gap-3 ${logoClass}`}
                    >
                        <img
                            src={logoPath}
                            alt={`${companyName} Logo`}
                            onError={handleImageError}
                            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
                        />
                        <span className="font-serif text-xl font-bold tracking-tight">
                            {companyName}
                        </span>
                    </Link>

                    <nav
                        aria-label="Primary"
                        className="hidden items-center gap-6 lg:flex"
                    >
                        {links.map(({ label, href, active }) => {
                            const linkColor = scrolled
                                ? active
                                    ? 'text-secondary after:bg-secondary'
                                    : 'text-on-surface-variant hover:text-primary after:bg-primary'
                                : active
                                  ? 'text-white after:bg-white'
                                  : 'text-white/80 hover:text-white after:bg-white';

                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`relative py-2 text-sm font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
                                        active
                                            ? 'after:w-full'
                                            : 'after:w-0 hover:after:w-full'
                                    } ${linkColor}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}

                        {authUser?.is_admin && (
                            <Link
                                href={route('admin.dashboard')}
                                className={`inline-flex items-center gap-1.5 rounded px-3 py-2 text-xs font-bold transition-colors ${
                                    scrolled
                                        ? 'bg-surface-container-high text-primary hover:bg-primary hover:text-white'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                            >
                                <Shield size={14} />
                                CMS
                            </Link>
                        )}

                        <Link
                            href={route('contact')}
                            className={`ml-1 rounded px-5 py-2.5 text-sm font-semibold shadow-sm transition-all ${
                                scrolled
                                    ? 'bg-primary text-white hover:bg-secondary'
                                    : 'bg-white text-primary hover:bg-white/90'
                            }`}
                        >
                            Enquire Now
                        </Link>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className={`rounded p-2 transition-colors lg:hidden ${
                            scrolled
                                ? 'text-primary hover:bg-surface-variant'
                                : 'text-white hover:bg-white/10'
                        }`}
                        aria-label="Open menu"
                        aria-expanded={open}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[90] bg-black/40 lg:hidden"
                    />
                )}
                {open && (
                    <motion.nav
                        key={`sidebar-${url}`}
                        aria-label="Mobile"
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-white text-primary lg:hidden"
                    >
                        <div className="flex items-center justify-between border-b border-outline-variant p-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={logoPath}
                                    alt={`${companyName} Logo`}
                                    onError={handleImageError}
                                    className="h-10 w-10 object-contain"
                                />
                                <span className="font-serif text-xl font-bold tracking-tight">
                                    {companyName}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded p-2 text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
                                aria-label="Close menu"
                            >
                                <X size={28} />
                            </button>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center space-y-5 px-4 py-6">
                            {links.map(({ label, href, active }) => {
                                return (
                                    <Link
                                        key={label}
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        className={`block font-serif text-2xl font-bold transition-colors ${
                                            active
                                                ? 'text-secondary'
                                                : 'text-primary hover:text-secondary'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                            {authUser?.is_admin && (
                                <Link
                                    href={route('admin.dashboard')}
                                    onClick={() => setOpen(false)}
                                    className="inline-flex items-center gap-2 rounded bg-surface-container-high px-4 py-2 text-sm font-bold text-primary"
                                >
                                    <Shield size={16} />
                                    Admin CMS
                                </Link>
                            )}
                        </div>
                        <div className="border-t border-outline-variant p-6 pb-10 text-center">
                            <Link
                                href={route('contact')}
                                onClick={() => setOpen(false)}
                                className="inline-block w-full max-w-xs rounded bg-primary px-6 py-4 text-center text-lg font-bold text-white shadow-sm transition-all hover:bg-secondary"
                            >
                                Enquire Now
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
