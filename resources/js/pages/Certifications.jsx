import { Head, usePage } from '@inertiajs/react';
import { ArrowUpRight, Award, FileText } from 'lucide-react';
import { useState } from 'react';
import LightboxDialog from '@/components/LightboxDialog';
import PageHero from '@/components/PageHero';
import MainLayout from '@/layouts/MainLayout';
import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

export default function Certifications({ certifications = [] }) {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';
    const headers = settings.page_headers?.certifications || {};

    const [filter, setFilter] = useState('all');
    const [lightboxItem, setLightboxItem] = useState(null);

    const typeLabels = {
        agreement: 'Official Agreement',
        certificate: 'Certification',
        partnership_photo: 'Partnership Photo',
    };

    const filtered = certifications.filter(
        (item) => filter === 'all' || item.type === filter,
    );

    return (
        <MainLayout>
            <Head title={`Certifications & Agreements - ${companyName}`} />

            <PageHero
                badge={headers.badge || 'Verified Credibility'}
                title={headers.title || 'Certifications & Agreements.'}
                subtitle={
                    headers.subtitle ||
                    'Official documentation, partnership photos, BIS/FSSAI standards, and verification copies of our flagship brand agreements.'
                }
                heroImage={headers.hero_image || DEMO_IMAGE_URL}
                imageAlt="Certifications & Agreements"
            >
                <div className="flex flex-wrap gap-2">
                    {[
                        { key: 'all', label: 'All Records' },
                        { key: 'agreement', label: 'Official Agreements' },
                        { key: 'certificate', label: 'Certificates' },
                        {
                            key: 'partnership_photo',
                            label: 'Partnership Photos',
                        },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setFilter(tab.key)}
                            className={`border px-3.5 py-2 font-mono text-xs font-semibold uppercase transition-colors ${
                                filter === tab.key
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-outline bg-background text-primary hover:border-primary'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </PageHero>

            <section className="bg-background py-14 md:py-20">
                <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between border-b border-outline-variant pb-3 font-mono text-xs text-on-surface-variant uppercase">
                        <span>Archive Ledger</span>
                        <span>{filtered.length} Records</span>
                    </div>

                    <div className="grid grid-cols-1 border-t border-l border-outline-variant md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((item, idx) => (
                            <article
                                key={item.id}
                                className="group flex h-full flex-col justify-between border-r border-b border-outline-variant bg-white p-5 transition-colors hover:bg-surface-container-low"
                            >
                                <div>
                                    <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[10px] tracking-wider uppercase">
                                        <span className="inline-flex items-center gap-1.5 font-semibold text-secondary">
                                            <Award size={12} />
                                            <span>
                                                REC-0{idx + 1} ·{' '}
                                                {typeLabels[item.type] ||
                                                    item.type}
                                            </span>
                                        </span>
                                        {item.issued_date && (
                                            <span className="text-on-surface-variant">
                                                {item.issued_date}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setLightboxItem({
                                                title: item.title,
                                                badge:
                                                    typeLabels[item.type] ||
                                                    item.type,
                                                image:
                                                    item.image_path ||
                                                    DEMO_IMAGE_URL,
                                                images: item.image_urls,
                                                issuer: item.issuer,
                                                reference:
                                                    item.reference_number,
                                                date: item.issued_date,
                                                description: item.description,
                                                documentUrl: item.document_path,
                                            })
                                        }
                                        className="mb-4 block aspect-[16/10] w-full overflow-hidden border border-outline-variant bg-surface-container-low"
                                    >
                                        <img
                                            src={
                                                item.image_path ||
                                                DEMO_IMAGE_URL
                                            }
                                            alt={item.title}
                                            onError={handleImageError}
                                            className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </button>

                                    <h2 className="font-serif text-lg font-bold text-primary">
                                        {item.title}
                                    </h2>

                                    {item.issuer && (
                                        <p className="mt-1 text-xs font-semibold text-secondary">
                                            {item.issuer}
                                        </p>
                                    )}

                                    {item.reference_number && (
                                        <p className="mt-1 font-mono text-[11px] text-on-surface-variant">
                                            Ref: {item.reference_number}
                                        </p>
                                    )}

                                    {item.description && (
                                        <p className="mt-2.5 text-sm leading-relaxed text-on-surface-variant">
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-5 flex items-center justify-between gap-2 border-t border-outline-variant pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setLightboxItem({
                                                title: item.title,
                                                badge:
                                                    typeLabels[item.type] ||
                                                    item.type,
                                                image:
                                                    item.image_path ||
                                                    DEMO_IMAGE_URL,
                                                images: item.image_urls,
                                                issuer: item.issuer,
                                                reference:
                                                    item.reference_number,
                                                date: item.issued_date,
                                                description: item.description,
                                                documentUrl: item.document_path,
                                            })
                                        }
                                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary uppercase hover:text-secondary"
                                    >
                                        <span>Inspect Record</span>
                                        <ArrowUpRight size={13} />
                                    </button>
                                    {item.document_path && (
                                        <a
                                            href={item.document_path}
                                            download
                                            className="inline-flex items-center gap-1.5 bg-primary px-3 py-1.5 font-mono text-[11px] font-semibold text-white uppercase transition-colors hover:bg-secondary"
                                        >
                                            <FileText size={12} />
                                            <span>Copy</span>
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <LightboxDialog
                item={lightboxItem}
                onClose={() => setLightboxItem(null)}
            />
        </MainLayout>
    );
}
