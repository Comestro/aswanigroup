import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { useId } from 'react';
import { route } from 'ziggy-js';

export default function InquiryForm({
    defaultVentureId = '',
    defaultDivision = 'Water Industries',
    defaultSubject = '',
    sourcePage = 'contact',
    compact = false,
}) {
    const { props } = usePage();
    const ventures = props.navVentures || [];
    const flash = props.flash || {};
    const idPrefix = useId();

    const divisionOptions = [
        ...ventures.map((venture) => ({
            id: venture.id,
            label: venture.name,
        })),
        { id: '', label: 'General & Corporate Inquiries' },
    ];

    const { data, setData, post, processing, errors, wasSuccessful, reset } =
        useForm({
            venture_id: defaultVentureId,
            name: '',
            phone: '',
            email: '',
            city_region: '',
            interest_division: defaultDivision,
            subject: defaultSubject,
            message: '',
            source_page: sourcePage,
            website: '',
        });

    const handleDivisionChange = (event) => {
        const selectedLabel = event.target.value;
        const matched = ventures.find(
            (venture) => venture.name === selectedLabel,
        );
        setData((prev) => ({
            ...prev,
            interest_division: selectedLabel,
            venture_id: matched ? matched.id : '',
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('inquiries.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(
                    'name',
                    'phone',
                    'email',
                    'city_region',
                    'subject',
                    'message',
                );
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <input
                type="text"
                name="website"
                value={data.website}
                onChange={(event) => setData('website', event.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                className="hidden"
            />

            {wasSuccessful && flash.whatsapp_url && (
                <div
                    role="status"
                    aria-live="polite"
                    className="rounded border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950"
                >
                    <div className="mb-2 flex items-center gap-2 font-bold">
                        <CheckCircle2 size={18} className="text-emerald-700" />
                        <span>Lead captured & emailed to our desk!</span>
                    </div>
                    <p className="mb-3 text-xs text-emerald-900">
                        You can also open WhatsApp right now to send this
                        inquiry directly to our team:
                    </p>
                    <a
                        href={flash.whatsapp_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                    >
                        <MessageCircle size={15} />
                        Continue on WhatsApp
                    </a>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor={`${idPrefix}-name`}
                        className="mb-1.5 block font-mono text-xs font-semibold tracking-wider text-primary uppercase"
                    >
                        Full Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                        id={`${idPrefix}-name`}
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={data.name}
                        onChange={(event) =>
                            setData('name', event.target.value)
                        }
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                            errors.name ? `${idPrefix}-name-err` : undefined
                        }
                        placeholder="Rajesh Kumar"
                        className="w-full border border-outline bg-background px-3.5 py-2.5 text-sm text-primary focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary"
                    />
                    {errors.name && (
                        <p
                            id={`${idPrefix}-name-err`}
                            className="mt-1 text-xs font-semibold text-red-600"
                        >
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor={`${idPrefix}-phone`}
                        className="mb-1.5 block font-mono text-xs font-semibold tracking-wider text-primary uppercase"
                    >
                        Phone / WhatsApp Number{' '}
                        <span aria-hidden="true">*</span>
                    </label>
                    <input
                        id={`${idPrefix}-phone`}
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        value={data.phone}
                        onChange={(event) =>
                            setData('phone', event.target.value)
                        }
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                            errors.phone ? `${idPrefix}-phone-err` : undefined
                        }
                        placeholder="9507488833"
                        className="w-full border border-outline bg-background px-3.5 py-2.5 text-sm text-primary focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary"
                    />
                    {errors.phone && (
                        <p
                            id={`${idPrefix}-phone-err`}
                            className="mt-1 text-xs font-semibold text-red-600"
                        >
                            {errors.phone}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor={`${idPrefix}-email`}
                        className="mb-1.5 block font-mono text-xs font-semibold tracking-wider text-primary uppercase"
                    >
                        Email Address
                    </label>
                    <input
                        id={`${idPrefix}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(event) =>
                            setData('email', event.target.value)
                        }
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                            errors.email ? `${idPrefix}-email-err` : undefined
                        }
                        placeholder="partner@company.com"
                        className="w-full border border-outline bg-background px-3.5 py-2.5 text-sm text-primary focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary"
                    />
                    {errors.email && (
                        <p
                            id={`${idPrefix}-email-err`}
                            className="mt-1 text-xs font-semibold text-red-600"
                        >
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor={`${idPrefix}-city`}
                        className="mb-1.5 block font-mono text-xs font-semibold tracking-wider text-primary uppercase"
                    >
                        City / District & State
                    </label>
                    <input
                        id={`${idPrefix}-city`}
                        name="city_region"
                        type="text"
                        autoComplete="address-level2"
                        value={data.city_region}
                        onChange={(event) =>
                            setData('city_region', event.target.value)
                        }
                        placeholder="Patna, Bihar"
                        className="w-full border border-outline bg-background px-3.5 py-2.5 text-sm text-primary focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor={`${idPrefix}-division`}
                        className="mb-1.5 block font-mono text-xs font-semibold tracking-wider text-primary uppercase"
                    >
                        Venture / Division <span aria-hidden="true">*</span>
                    </label>
                    <select
                        id={`${idPrefix}-division`}
                        name="interest_division"
                        required
                        value={data.interest_division}
                        onChange={handleDivisionChange}
                        className="w-full border border-outline bg-background px-3.5 py-2.5 text-sm text-primary focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary"
                    >
                        {divisionOptions.map((option) => (
                            <option key={option.label} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor={`${idPrefix}-subject`}
                        className="mb-1.5 block font-mono text-xs font-semibold tracking-wider text-primary uppercase"
                    >
                        Subject <span aria-hidden="true">*</span>
                    </label>
                    <input
                        id={`${idPrefix}-subject`}
                        name="subject"
                        type="text"
                        required
                        value={data.subject}
                        onChange={(event) =>
                            setData('subject', event.target.value)
                        }
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={
                            errors.subject
                                ? `${idPrefix}-subject-err`
                                : undefined
                        }
                        placeholder="Distributor / Business Inquiry"
                        className="w-full border border-outline bg-background px-3.5 py-2.5 text-sm text-primary focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary"
                    />
                    {errors.subject && (
                        <p
                            id={`${idPrefix}-subject-err`}
                            className="mt-1 text-xs font-semibold text-red-600"
                        >
                            {errors.subject}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label
                    htmlFor={`${idPrefix}-message`}
                    className="mb-1.5 block font-mono text-xs font-semibold tracking-wider text-primary uppercase"
                >
                    Inquiry Details <span aria-hidden="true">*</span>
                </label>
                <textarea
                    id={`${idPrefix}-message`}
                    name="message"
                    required
                    rows={compact ? 3 : 4}
                    value={data.message}
                    onChange={(event) => setData('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                        errors.message ? `${idPrefix}-msg-err` : undefined
                    }
                    placeholder="Share your territory, investment interest, product inquiry, or partnership query..."
                    className="w-full border border-outline bg-background px-3.5 py-2.5 text-sm text-primary focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary"
                />
                {errors.message && (
                    <p
                        id={`${idPrefix}-msg-err`}
                        className="mt-1 text-xs font-semibold text-red-600"
                    >
                        {errors.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary disabled:opacity-60 sm:w-auto"
            >
                <Send size={16} />
                <span>
                    {processing
                        ? 'Submitting...'
                        : 'Submit to Email & WhatsApp'}
                </span>
            </button>
        </form>
    );
}
