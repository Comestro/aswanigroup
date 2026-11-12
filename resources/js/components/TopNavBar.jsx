import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, Shield, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';
import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

export default function TopNavBar() {
    const { url, props } = usePage();
    const siteSettings = props.siteSettings || {};
    const authUser = props.auth?.user || null;
    const ventures = props.navVentures || [];

    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [venturesOpen, setVenturesOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setVenturesOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setVenturesOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const venturesActive =
        route().current('industries') || route().current('ventures.*');

    const links = [
        { label: 'Home', href: route('home'), active: route().current('home') },
        {
            label: 'About',
            href: route('about'),
            active: route().current('about'),
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

    const companyName = siteSettings.company_name || 'Ashwin Group';
    const logoPath = siteSettings.logo_path || DEMO_IMAGE_URL;

    const getLinkClasses = (active) =>
        `relative py-2 text-sm font-medium transition-colors ${
            active
                ? 'font-semibold text-secondary'
                : 'text-on-surface-variant hover:text-primary'
        }`;

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-white/95 text-primary backdrop-blur-sm transition-shadow duration-200 ${
                    scrolled ? 'shadow-sm' : ''
                }`}
            >
                <div className="mx-auto flex h-16 max-w-container-max items-center justify-between gap-4 px-4 sm:px-6 md:h-18 lg:px-8">
                    <Link
                        href={route('home')}
                        onClick={() => {
                            setOpen(false);
                            setVenturesOpen(false);
                        }}
                        className="group flex shrink-0 items-center gap-3 text-primary"
                    >
                        <img
                            src={logoPath}
                            alt={`${companyName} Logo`}
                            onError={handleImageError}
                            className="h-9 w-9 rounded object-contain"
                        />
                        <div>
                            <span className="block font-serif text-lg leading-none font-bold tracking-tight">
                                {companyName}
                            </span>
                            <span className="mt-0.5 block text-[10px] font-medium tracking-widest text-on-surface-variant uppercase">
                                Est. {siteSettings.est_year || '1995'}
                            </span>
                        </div>
                    </Link>

                    <nav
                        aria-label="Primary"
                        className="hidden items-center gap-7 lg:flex"
                    >
                        <Link
                            href={links[0].href}
                            aria-current={links[0].active ? 'page' : undefined}
                            className={getLinkClasses(links[0].active)}
                        >
                            {links[0].label}
                        </Link>
                        <Link
                            href={links[1].href}
                            aria-current={links[1].active ? 'page' : undefined}
                            className={getLinkClasses(links[1].active)}
                        >
                            {links[1].label}
                        </Link>

                        {/* Dynamic Ventures Dropdown */}
                        <div
                            ref={dropdownRef}
                            className="relative"
                            onMouseEnter={() => setVenturesOpen(true)}
                            onMouseLeave={() => setVenturesOpen(false)}
                        >
                            <button
                                type="button"
                                aria-expanded={venturesOpen}
                                aria-controls="desktop-ventures-submenu"
                                onClick={() => setVenturesOpen((prev) => !prev)}
                                className={`inline-flex items-center gap-1 ${getLinkClasses(venturesActive)}`}
                            >
                                <span>Ventures</span>
                                <ChevronDown
                                    size={14}
                                    aria-hidden="true"
                                    className={`transition-transform duration-150 ${
                                        venturesOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {venturesOpen && (
                                <div className="pt-2">
                                    <ul
                                        id="desktop-ventures-submenu"
                                        className="absolute top-full left-0 z-50 w-72 overflow-hidden rounded-lg border border-outline-variant bg-white py-1.5 text-left shadow-lg"
                                    >
                                        <li>
                                            <Link
                                                href={route('industries')}
                                                onClick={() =>
                                                    setVenturesOpen(false)
                                                }
                                                aria-current={
                                                    route().current(
                                                        'industries',
                                                    ) ||
                                                    route().current(
                                                        'ventures.index',
                                                    )
                                                        ? 'page'
                                                        : undefined
                                                }
                                                className="flex items-center justify-between border-b border-outline-variant px-4 py-2.5 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:bg-surface-container-low hover:text-secondary"
                                            >
                                                <span>
                                                    All Ventures Overview
                                                </span>
                                                <ArrowRight size={13} />
                                            </Link>
                                        </li>
                                        {ventures.map((venture) => {
                                            const activeItem = url.includes(
                                                `/ventures/${venture.slug}`,
                                            );

                                            return (
                                                <li key={venture.id}>
                                                    <Link
                                                        href={route(
                                                            'ventures.show',
                                                            venture.slug,
                                                        )}
                                                        onClick={() =>
                                                            setVenturesOpen(
                                                                false,
                                                            )
                                                        }
                                                        aria-current={
                                                            activeItem
                                                                ? 'page'
                                                                : undefined
                                                        }
                                                        className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-container-low ${
                                                            activeItem
                                                                ? 'bg-surface-container-low font-semibold text-secondary'
                                                                : 'text-on-surface hover:text-primary'
                                                        }`}
                                                    >
                                                        <span>
                                                            {venture.name}
                                                        </span>
                                                        <ArrowRight
                                                            size={13}
                                                            className="opacity-40"
                                                        />
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {links.slice(2).map(({ label, href, active }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-current={active ? 'page' : undefined}
                                className={getLinkClasses(active)}
                            >
                                {label}
                            </Link>
                        ))}

                        {authUser?.is_admin && (
                            <Link
                                href={route('admin.dashboard')}
                                className="inline-flex items-center gap-1.5 rounded-md border border-outline-variant bg-surface-container-low px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary"
                            >
                                <Shield size={13} />
                                CMS
                            </Link>
                        )}

                        <Link
                            href={route('contact')}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary"
                        >
                            Enquire Now
                        </Link>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="rounded-md p-2 text-primary transition-colors hover:bg-surface-variant lg:hidden"
                        aria-label="Open menu"
                        aria-expanded={open}
                    >
                        <Menu size={22} />
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
                            damping: 26,
                            stiffness: 220,
                        }}
                        className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-white text-primary lg:hidden"
                    >
                        <div className="flex items-center justify-between border-b border-outline-variant p-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={logoPath}
                                    alt={`${companyName} Logo`}
                                    onError={handleImageError}
                                    className="h-9 w-9 object-contain"
                                />
                                <span className="font-serif text-lg font-bold tracking-tight">
                                    {companyName}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-md p-2 text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center space-y-4 px-6 py-6 text-center">
                            {links
                                .slice(0, 2)
                                .map(({ label, href, active }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        className={`block font-serif text-2xl font-bold transition-colors ${
                                            active
                                                ? 'text-secondary'
                                                : 'text-primary hover:text-secondary'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                ))}

                            <div className="w-full max-w-xs rounded-lg border border-outline-variant bg-surface-container-low p-4">
                                <Link
                                    href={route('industries')}
                                    onClick={() => setOpen(false)}
                                    className="mb-2 block text-xs font-bold tracking-widest text-secondary uppercase"
                                >
                                    All Ventures
                                </Link>
                                <ul className="space-y-2">
                                    {ventures.map((venture) => (
                                        <li key={venture.id}>
                                            <Link
                                                href={route(
                                                    'ventures.show',
                                                    venture.slug,
                                                )}
                                                onClick={() => setOpen(false)}
                                                className="block text-sm font-medium text-primary hover:text-secondary"
                                            >
                                                {venture.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {links.slice(2).map(({ label, href, active }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    aria-current={active ? 'page' : undefined}
                                    className={`block font-serif text-2xl font-bold transition-colors ${
                                        active
                                            ? 'text-secondary'
                                            : 'text-primary hover:text-secondary'
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}

                            {authUser?.is_admin && (
                                <Link
                                    href={route('admin.dashboard')}
                                    onClick={() => setOpen(false)}
                                    className="inline-flex items-center gap-2 rounded-md border border-outline-variant bg-surface-container-low px-4 py-2 text-sm font-semibold text-primary"
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
                                className="inline-block w-full max-w-xs rounded-md bg-primary px-6 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-secondary"
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
