import { Calendar, Download, MapPin, ShieldCheck, X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';

export default function LightboxDialog({ item, onClose }) {
    const dialogRef = useRef(null);
    const titleId = useId();

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
            className="m-auto max-h-[90vh] w-[min(92vw,760px)] overflow-hidden rounded-lg border border-outline-variant bg-white p-0 shadow-2xl"
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
                        {item.image && (
                            <div className="mb-5 overflow-hidden rounded border border-outline-variant bg-surface-container-high">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-h-[420px] w-full object-contain"
                                />
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
