import { Calendar, Download, MapPin, ShieldCheck, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

export default function LightboxDialog({ item, onClose }) {
    const dialogRef = useRef(null);
    const titleId = useId();
    const [activeIndex, setActiveIndex] = useState(0);

    const galleryImages = item
        ? Array.isArray(item.images) && item.images.length > 0
            ? item.images
            : [item.image || DEMO_IMAGE_URL]
        : [];
    const safeIndex = activeIndex < galleryImages.length ? activeIndex : 0;
    const currentImage = galleryImages[safeIndex] || DEMO_IMAGE_URL;

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return undefined;
        }

        if (item && !dialog.open) {
            dialog.showModal();
        }

        if (!item && dialog.open) {
            dialog.close();
        }

        return undefined;
    }, [item]);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return undefined;
        }

        const handleClose = () => {
            onClose();
        };

        let pressedOutside = false;

        const isOutside = (event) => {
            const rect = dialog.getBoundingClientRect();

            return (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            );
        };

        const handlePointerDown = (event) => {
            if (!('closedBy' in HTMLDialogElement.prototype)) {
                pressedOutside = isOutside(event);
            }
        };

        const handlePointerUp = (event) => {
            if (
                !('closedBy' in HTMLDialogElement.prototype) &&
                pressedOutside &&
                isOutside(event)
            ) {
                dialog.close();
            }

            pressedOutside = false;
        };

        dialog.addEventListener('close', handleClose);
        dialog.addEventListener('pointerdown', handlePointerDown);
        dialog.addEventListener('pointerup', handlePointerUp);

        return () => {
            dialog.removeEventListener('close', handleClose);
            dialog.removeEventListener('pointerdown', handlePointerDown);
            dialog.removeEventListener('pointerup', handlePointerUp);
        };
    }, [onClose]);

    return (
        <dialog
            ref={dialogRef}
            closedby="any"
            aria-labelledby={titleId}
            className="m-auto max-h-[90dvh] w-[min(94vw,800px)] overflow-hidden border border-outline bg-white p-0 shadow-2xl"
        >
            {item && (
                <div className="flex max-h-[90vh] flex-col">
                    <div className="flex items-center justify-between gap-4 border-b border-outline-variant px-5 py-4">
                        <div className="min-w-0">
                            {item.badge && (
                                <span className="mb-0.5 block text-[11px] font-bold tracking-wider text-secondary uppercase">
                                    {item.badge}
                                </span>
                            )}
                            <h2
                                id={titleId}
                                className="truncate font-serif text-lg font-bold text-primary md:text-xl"
                            >
                                {item.title}
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => dialogRef.current?.close()}
                            className="shrink-0 rounded p-2 text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
                            aria-label="Close modal"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <div className="overflow-y-auto p-5 md:p-6">
                        {galleryImages.length > 0 && (
                            <div className="mb-5 space-y-3">
                                <div className="overflow-hidden rounded border border-outline-variant bg-surface-container-high">
                                    <img
                                        src={currentImage}
                                        alt={item.title}
                                        onError={handleImageError}
                                        className="max-h-[420px] w-full object-contain"
                                    />
                                </div>

                                {galleryImages.length > 1 && (
                                    <div className="flex flex-wrap gap-2">
                                        {galleryImages.map((imgUrl, idx) => (
                                            <button
                                                key={`${imgUrl}-${idx}`}
                                                type="button"
                                                onClick={() =>
                                                    setActiveIndex(idx)
                                                }
                                                className={`overflow-hidden rounded border-2 transition ${
                                                    idx === safeIndex
                                                        ? 'border-secondary'
                                                        : 'border-outline-variant opacity-70 hover:opacity-100'
                                                }`}
                                            >
                                                <img
                                                    src={imgUrl}
                                                    alt={`${item.title} ${idx + 1}`}
                                                    onError={handleImageError}
                                                    className="h-14 w-20 object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mb-4 flex flex-wrap gap-4 text-sm font-medium text-on-surface-variant">
                            {item.location && (
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin
                                        size={15}
                                        className="text-secondary"
                                    />
                                    {item.location}
                                </span>
                            )}
                            {item.date && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Calendar
                                        size={15}
                                        className="text-secondary"
                                    />
                                    {item.date}
                                </span>
                            )}
                            {item.issuer && (
                                <span className="inline-flex items-center gap-1.5">
                                    <ShieldCheck
                                        size={15}
                                        className="text-secondary"
                                    />
                                    {item.issuer}
                                </span>
                            )}
                            {item.reference && (
                                <span className="rounded bg-surface-container-high px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                                    Ref: {item.reference}
                                </span>
                            )}
                        </div>

                        {item.description && (
                            <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
                                {item.description}
                            </p>
                        )}

                        {item.documentUrl && (
                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-4">
                                <span className="text-xs font-medium text-on-surface-variant">
                                    Official verification copy available
                                </span>
                                <a
                                    href={item.documentUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                    className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary"
                                >
                                    <Download size={16} />
                                    View / Download Document Copy
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </dialog>
    );
}
