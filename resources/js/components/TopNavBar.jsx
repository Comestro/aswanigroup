import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, ChevronDown, Menu, Shield, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';
import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

export default function TopNavBar() {
    const { url, props } = usePage();
    const siteSettings = props.siteSettings || {};
    const authUser = props.auth?.user || null;
    const ventures = props.navVentures || [];

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [venturesOpen, setVenturesOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
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
                setMobileOpen(false);
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
        {
            label: 'Overview',
            href: route('home'),
            active: route().current('home'),
        },
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
            label: 'Credentials',
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

    const getNavItemClass = (active) =>
        `relative py-1 text-xs font-semibold tracking-wider uppercase transition-colors ${
            active
                ? 'text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-secondary'
                : 'text-on-surface-variant hover:text-primary'
        }`;

    return (
        <header
            className={`sticky top-0 z-50 border-b border-outline-variant bg-background/95 backdrop-blur-sm transition-shadow duration-200 ${
                scrolled ? 'shadow-xs' : ''
            }`}
        >
            <div className="mx-auto flex h-16 max-w-container-max items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                <Link
                    href={route('home')}
                    onClick={() => {
                        setMobileOpen(false);
                        setVenturesOpen(false);
                    }}
                    className="flex shrink-0 items-center gap-3"
                >
                    <div className="flex h-9 w-9 items-center justify-center border border-outline-variant bg-white p-1">
                        <img
                            src={logoPath}
                            alt={`${companyName} Logo`}
                            onError={handleImageError}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <div className="border-l border-outline-variant pl-3">
                        <span className="block font-serif text-base leading-none font-bold tracking-tight text-primary uppercase">
                            {companyName}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                            EST. {siteSettings.est_year || '1995'}
                        </span>
                    </div>
                </Link>

                <nav aria-label="Primary" className="flex items-center gap-4">
                    <div className="hidden items-center gap-7 lg:flex">
                        {links.slice(0, 2).map(({ label, href, active }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-current={active ? 'page' : undefined}
                                className={getNavItemClass(active)}
                            >
                                {label}
                            </Link>
                        ))}

                        <div
                            ref={dropdownRef}
                            className="relative"
                            onMouseEnter={() => setVenturesOpen(true)}
                            onMouseLeave={() => setVenturesOpen(false)}
                        >
                            <button
                                type="button"
                                aria-expanded={venturesOpen}
                                aria-controls="desktop-ventures-menu"
                                onClick={() => setVenturesOpen((prev) => !prev)}
                                className={`inline-flex items-center gap-1 ${getNavItemClass(venturesActive)}`}
                            >
                                <span>Ventures</span>
                                <ChevronDown
                                    size={13}
                                    aria-hidden="true"
                                    className={`transition-transform duration-150 ${
                                        venturesOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {venturesOpen && (
                                <div className="pt-3">
                                    <ul
                                        id="desktop-ventures-menu"
                                        className="absolute top-full left-0 z-50 w-72 border border-outline bg-white shadow-sm"
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
                                                className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-4 py-3 font-mono text-[11px] font-semibold tracking-wider text-primary uppercase transition-colors hover:bg-secondary hover:text-white"
                                            >
                                                <span>
                                                    All Operating Companies
                                                </span>
                                                <ArrowUpRight size={13} />
                                            </Link>
                                        </li>
                                        {ventures.map((venture, idx) => {
                                            const activeItem = url.includes(
                                                `/ventures/${venture.slug}`,
                                            );

                                            return (
                                                <li
                                                    key={venture.id}
                                                    className="border-b border-outline-variant last:border-b-0"
                                                >
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
                                                        className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-container-low ${
                                                            activeItem
                                                                ? 'bg-surface-container-low font-semibold text-secondary'
                                                                : 'text-primary'
                                                        }`}
                                                    >
                                                        <span className="truncate">
                                                            <span className="mr-2 font-mono text-[11px] text-on-surface-variant">
                                                                0{idx + 1}
                                                            </span>
                                                            {venture.name}
                                                        </span>
                                                        <ArrowUpRight
                                                            size={13}
                                                            className="shrink-0 opacity-50"
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
                                className={getNavItemClass(active)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden items-center gap-2.5 lg:flex">
                        {authUser?.is_admin && (
                            <Link
                                href={route('admin.dashboard')}
                                className="inline-flex items-center gap-1.5 border border-outline bg-white px-3 py-2 font-mono text-[11px] font-semibold text-primary uppercase transition-colors hover:border-primary"
                            >
                                <Shield size={12} />
                                CMS
                            </Link>
                        )}
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                        >
                            <span>Connect</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="inline-flex items-center gap-2 border border-outline bg-white px-3 py-2 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:border-primary lg:hidden"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-site-menu"
                    >
                        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                        <span>{mobileOpen ? 'Close' : 'Menu'}</span>
                    </button>
                </nav>
            </div>

            {mobileOpen && (
                <div
                    id="mobile-site-menu"
                    className="border-t border-outline-variant bg-white px-4 py-5 sm:px-6 lg:hidden"
                >
                    <ul className="divide-y divide-outline-variant border border-outline-variant bg-background">
                        {links.map(({ label, href, active }) => (
                            <li key={label}>
                                <Link
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    aria-current={active ? 'page' : undefined}
                                    className={`flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase ${
                                        active
                                            ? 'bg-primary text-white'
                                            : 'text-primary hover:bg-surface-container-low'
                                    }`}
                                >
                                    <span>{label}</span>
                                    <ArrowUpRight size={15} />
                                </Link>
                            </li>
                        ))}
                        <li>
                            <div className="border-t border-outline-variant bg-white p-4">
                                <Link
                                    href={route('industries')}
                                    onClick={() => setMobileOpen(false)}
                                    className="mb-2.5 flex items-center justify-between font-mono text-xs font-semibold tracking-wider text-secondary uppercase"
                                >
                                    <span>Operating Ventures</span>
                                    <ArrowUpRight size={13} />
                                </Link>
                                <div className="space-y-1.5">
                                    {ventures.map((venture, idx) => (
                                        <Link
                                            key={venture.id}
                                            href={route(
                                                'ventures.show',
                                                venture.slug,
                                            )}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-between border border-outline-variant bg-background px-3 py-2 text-xs font-medium text-primary hover:border-primary"
                                        >
                                            <span>
                                                <span className="mr-2 font-mono text-on-surface-variant">
                                                    0{idx + 1}
                                                </span>
                                                {venture.name}
                                            </span>
                                            <ArrowUpRight size={13} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        {authUser?.is_admin && (
                            <Link
                                href={route('admin.dashboard')}
                                onClick={() => setMobileOpen(false)}
                                className="inline-flex items-center justify-center gap-2 border border-outline bg-surface-container-low px-4 py-2.5 font-mono text-xs font-semibold text-primary uppercase"
                            >
                                <Shield size={14} />
                                Admin CMS
                            </Link>
                        )}
                        <Link
                            href={route('contact')}
                            onClick={() => setMobileOpen(false)}
                            className="inline-flex flex-1 items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-semibold tracking-wider text-white uppercase"
                        >
                            <span>Direct Inquiry Desk</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
