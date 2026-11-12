import { Head, usePage } from '@inertiajs/react';
import { Award, ExternalLink, FileText } from 'lucide-react';
import { useState } from 'react';
import LightboxDialog from '../components/LightboxDialog';
import PageHero from '../components/PageHero';
import MainLayout from '../layouts/MainLayout';

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
                    'Official documentation, partnership photos, BIS/FSSAI standards, and the first-copy verification of our flagship brand agreements.'
                }
                heroImage={headers.hero_image || '/images/about-hero-bg.png'}
                imageAlt="Certifications & Agreements"
            />

            <section className="bg-surface-container-low px-gutter py-12 md:py-16">
                <div className="mx-auto max-w-container-max">
                    <div className="mb-8 flex flex-wrap gap-2">
                        {[
                            { key: 'all', label: 'All Credibility Records' },
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
                                className={`rounded border px-4 py-2 text-xs font-bold transition-colors md:text-sm ${
                                    filter === tab.key
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-outline-variant bg-white text-primary hover:bg-surface-variant'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col justify-between rounded border border-outline-variant bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div>
                                    {item.image_path && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setLightboxItem({
                                                    title: item.title,
                                                    badge:
                                                        typeLabels[item.type] ||
                                                        item.type,
                                                    image: item.image_path,
                                                    issuer: item.issuer,
                                                    reference:
                                                        item.reference_number,
                                                    date: item.issued_date,
                                                    description:
                                                        item.description,
                                                    documentUrl:
                                                        item.document_path,
                                                })
                                            }
                                            className="mb-4 block aspect-[16/10] w-full overflow-hidden rounded border border-outline-variant bg-slate-100"
                                        >
                                            <img
                                                src={item.image_path}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </button>
                                    )}

                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1 rounded bg-secondary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-secondary uppercase">
                                            <Award size={12} />
                                            {typeLabels[item.type] || item.type}
                                        </span>
                                        {item.issued_date && (
                                            <span className="text-xs font-semibold text-on-surface-variant">
                                                {item.issued_date}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="mb-1 font-serif text-lg font-bold text-primary">
                                        {item.title}
                                    </h2>
                                    {item.issuer && (
                                        <div className="mb-2 text-xs font-semibold text-secondary">
                                            {item.issuer}
                                        </div>
                                    )}
                                    {item.reference_number && (
                                        <div className="mb-2 font-mono text-xs text-on-surface-variant">
                                            Ref: {item.reference_number}
                                        </div>
                                    )}
                                    {item.description && (
                                        <p className="text-sm leading-relaxed text-on-surface-variant">
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-2 border-t border-outline-variant pt-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setLightboxItem({
                                                title: item.title,
                                                badge:
                                                    typeLabels[item.type] ||
                                                    item.type,
                                                image: item.image_path,
                                                issuer: item.issuer,
                                                reference:
                                                    item.reference_number,
                                                date: item.issued_date,
                                                description: item.description,
                                                documentUrl: item.document_path,
                                            })
                                        }
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary"
                                    >
                                        <ExternalLink size={14} />
                                        View Preview
                                    </button>
                                    {item.document_path && (
                                        <a
                                            href={item.document_path}
                                            download
                                            className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-secondary"
                                        >
                                            <FileText size={13} />
                                            Download Copy
                                        </a>
                                    )}
                                </div>
                            </div>
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
