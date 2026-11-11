import { Link, usePage } from '@inertiajs/react';
import {
    Award,
    Building2,
    CheckCircle2,
    ExternalLink,
    FileText,
    FolderKanban,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    Settings,
    Video,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function AdminLayout({ title = 'Admin CMS', children }) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const flash = props.flash || {};
    const user = props.auth?.user || {};
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        {
            label: 'Dashboard',
            href: route('admin.dashboard'),
            active: route().current('admin.dashboard'),
            icon: LayoutDashboard,
        },
        {
            label: 'Site Settings',
            href: route('admin.settings.edit'),
            active: route().current('admin.settings.*'),
            icon: Settings,
        },
        {
            label: 'Ventures / Tabs',
            href: route('admin.ventures.index'),
            active: route().current('admin.ventures.*'),
            icon: Building2,
        },
        {
            label: 'Project Gallery',
            href: route('admin.projects.index'),
            active: route().current('admin.projects.*'),
            icon: FolderKanban,
        },
        {
            label: 'Certifications',
            href: route('admin.certifications.index'),
            active: route().current('admin.certifications.*'),
            icon: Award,
        },
        {
            label: 'Catalogs (PDF)',
            href: route('admin.catalogs.index'),
            active: route().current('admin.catalogs.*'),
            icon: FileText,
        },
        {
            label: 'Promo Videos',
            href: route('admin.videos.index'),
            active: route().current('admin.videos.*'),
            icon: Video,
        },
        {
            label: 'Leads & Inquiries',
            href: route('admin.inquiries.index'),
            active: route().current('admin.inquiries.*'),
            icon: Mail,
        },
    ];

    return (
        <div className="flex min-h-screen bg-surface-container-low text-on-surface">
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary text-white transition-transform lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                    <Link
                        href={route('admin.dashboard')}
                        className="flex items-center gap-2.5"
                    >
                        <img
                            src={settings.logo_path || '/images/logo.png'}
                            alt={settings.company_name || 'Ashwin Group'}
                            className="h-8 w-8 object-contain"
                        />
                        <span className="font-serif text-base font-bold">
                            {settings.company_name || 'Ashwin'} CMS
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded p-1 text-white/70 hover:text-white lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav
                    aria-label="Admin"
                    className="flex-1 space-y-1 overflow-y-auto p-3"
                >
                    {navItems.map(({ label, href, active, icon: Icon }) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors ${
                                active
                                    ? 'bg-secondary text-white'
                                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <Icon size={17} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="space-y-2 border-t border-white/10 p-4">
                    <Link
                        href={route('home')}
                        className="flex w-full items-center justify-center gap-2 rounded border border-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        <ExternalLink size={14} />
                        View Live Website
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center justify-center gap-2 rounded bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                    >
                        <LogOut size={14} />
                        Sign Out ({user.name})
                    </Link>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-outline-variant bg-white px-4 md:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="rounded p-2 text-primary hover:bg-surface-variant lg:hidden"
                            aria-label="Open admin menu"
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="font-serif text-lg font-bold text-primary md:text-xl">
                            {title}
                        </h1>
                    </div>
                    <span className="hidden text-xs font-medium text-on-surface-variant sm:inline">
                        Signed in as {user.email}
                    </span>
                </header>

                {(flash.success || flash.error) && (
                    <div
                        role="status"
                        aria-live="polite"
                        className={`border-b px-4 py-3 text-sm md:px-8 ${
                            flash.error
                                ? 'border-red-200 bg-red-50 text-red-900'
                                : 'border-emerald-200 bg-emerald-50 text-emerald-950'
                        }`}
                    >
                        <div className="flex items-center gap-2 font-medium">
                            <CheckCircle2 size={16} />
                            <span>{flash.error || flash.success}</span>
                        </div>
                    </div>
                )}

                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </div>
    );
}
