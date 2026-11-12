import { usePage } from '@inertiajs/react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import Footer from '../components/Footer';
import TopNavBar from '../components/TopNavBar';

export default function MainLayout({ children }) {
    const { props } = usePage();
    const flash = props.flash || {};

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip bg-white text-on-surface antialiased">
            <a
                href="#main-content"
                className="visually-hidden fixed top-3 left-3 z-[200] rounded bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg"
            >
                Skip to main content
            </a>

            <TopNavBar />

            {(flash.success || flash.error) && (
                <div
                    role="status"
                    aria-live="polite"
                    className={`border-b px-4 py-3 pt-24 text-sm sm:px-6 lg:px-8 ${
                        flash.error
                            ? 'border-red-200 bg-red-50 text-red-900'
                            : 'border-emerald-200 bg-emerald-50 text-emerald-950'
                    }`}
                >
                    <div className="mx-auto flex max-w-container-max flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 font-medium">
                            <CheckCircle2 size={18} className="shrink-0" />
                            <span>{flash.error || flash.success}</span>
                        </div>
                        {flash.whatsapp_url && (
                            <a
                                href={flash.whatsapp_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                            >
                                <MessageCircle size={14} />
                                Send on WhatsApp Now
                            </a>
                        )}
                    </div>
                </div>
            )}

            <main
                id="main-content"
                tabIndex={-1}
                className="flex-1 outline-none"
            >
                {children}
            </main>

            <Footer />
        </div>
    );
}
