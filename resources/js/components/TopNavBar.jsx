import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Shield, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';

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

    const navClass = scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-outline-variant text-primary'
        : 'bg-primary/90 backdrop-blur-md border-b border-white/10 text-white';

    const logoClass = scrolled ? 'text-primary' : 'text-white';
    const companyName = siteSettings.company_name || 'Ashwin Group';
    const logoPath = siteSettings.logo_path || '/images/demo-image.svg';

    const getLinkClasses = (active) => {
        const color = scrolled
            ? active
                ? 'text-secondary after:bg-secondary'
                : 'text-on-surface-variant hover:text-primary after:bg-primary'
            : active
              ? 'text-white after:bg-white'
              : 'text-white/80 hover:text-white after:bg-white';

        return `relative py-2 text-sm font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
            active ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        } ${color}`;
    };

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navClass}`}
            >
                <div className="mx-auto flex h-20 max-w-container-max items-center justify-between gap-4 px-gutter">
                    <Link
                        href={route('home')}
                        onClick={() => {
                            setOpen(false);
                            setVenturesOpen(false);
                        }}
                        className={`group flex shrink-0 items-center gap-3 ${logoClass}`}
                    >
                        <img
                            src={logoPath}
                            alt={`${companyName} Logo`}
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
                                    className={`transition-transform duration-200 ${
                                        venturesOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {venturesOpen && (
                                <div className="pt-2">
                                    <ul
                                        id="desktop-ventures-submenu"
                                        className="absolute top-full left-0 z-50 w-64 rounded-md border border-outline-variant bg-white py-2 text-left shadow-xl"
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
                                                className="block border-b border-slate-100 px-4 py-2.5 text-xs font-bold tracking-wider text-primary uppercase hover:bg-surface-container-high hover:text-secondary"
                                            >
                                                All Ventures Overview
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
                                                        className={`block px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-container-low ${
                                                            activeItem
                                                                ? 'bg-surface-container-low text-secondary'
                                                                : 'text-primary hover:text-secondary'
                                                        }`}
                                                    >
                                                        {venture.name}
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

                            <div className="w-full max-w-xs rounded-md border border-outline-variant bg-surface-container-low p-4">
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
                                                className="block text-sm font-semibold text-primary hover:text-secondary"
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
