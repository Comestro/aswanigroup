import { router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function AdminCrudManager({
    title,
    subtitle,
    items = [],
    fields = [],
    columns = [],
    storeRoute,
    updateRoute,
    destroyRoute,
    defaultValues = {},
    libraryImages = [],
}) {
    const buildEmpty = () => {
        const obj = {
            remove_image_ids: [],
            selected_image_ids: [],
            ...defaultValues,
        };

        for (const field of fields) {
            if (obj[field.name] === undefined) {
                if (field.type === 'checkbox') {
                    obj[field.name] = field.defaultValue ?? true;
                } else if (field.type === 'number') {
                    obj[field.name] = field.defaultValue ?? 0;
                } else if (field.type === 'lines' || field.type === 'files') {
                    obj[field.name] = [];
                } else {
                    obj[field.name] = field.defaultValue ?? '';
                }
            }

            if (
                field.libraryIdField &&
                obj[field.libraryIdField] === undefined
            ) {
                obj[field.libraryIdField] = '';
            }
        }

        return obj;
    };

    const [editingItem, setEditingItem] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(buildEmpty);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const openCreate = () => {
        setEditingItem(null);
        setFormData(buildEmpty());
        setErrors({});
        setFormOpen(true);
    };

    const openEdit = (item) => {
        const next = buildEmpty();

        for (const field of fields) {
            if (field.type === 'file') {
                next[field.name] = null;
            } else if (field.type === 'files') {
                next[field.name] = [];
            } else if (field.type === 'lines') {
                next[field.name] = Array.isArray(item[field.name])
                    ? item[field.name]
                    : [];
            } else {
                next[field.name] = item[field.name] ?? next[field.name];
            }
        }

        next.remove_image_ids = [];
        next.selected_image_ids = [];
        setEditingItem(item);
        setFormData(next);
        setErrors({});
        setFormOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);
        setErrors({});

        const payload = { ...formData };

        for (const field of fields) {
            if (
                field.type === 'file' &&
                !(payload[field.name] instanceof File)
            ) {
                delete payload[field.name];
            } else if (field.type === 'files') {
                const fileList = Array.isArray(payload[field.name])
                    ? payload[field.name].filter((f) => f instanceof File)
                    : [];

                if (fileList.length === 0) {
                    delete payload[field.name];
                } else {
                    payload[field.name] = fileList;
                }
            }

            if (
                field.libraryIdField &&
                (payload[field.libraryIdField] === '' ||
                    payload[field.libraryIdField] === null)
            ) {
                delete payload[field.libraryIdField];
            }
        }

        if (
            !Array.isArray(payload.remove_image_ids) ||
            payload.remove_image_ids.length === 0
        ) {
            delete payload.remove_image_ids;
        }

        if (
            !Array.isArray(payload.selected_image_ids) ||
            payload.selected_image_ids.length === 0
        ) {
            delete payload.selected_image_ids;
        }

        const targetUrl = editingItem
            ? route(updateRoute, editingItem.id)
            : route(storeRoute);

        if (editingItem) {
            payload._method = 'put';
        }

        router.post(targetUrl, payload, {
            forceFormData: true,
            preserveScroll: true,
            onError: (err) => setErrors(err),
            onSuccess: () => {
                setFormOpen(false);
                setEditingItem(null);
            },
            onFinish: () => setProcessing(false),
        });
    };

    const handleDelete = (item) => {
        if (!window.confirm(`Delete "${item.title || item.name}"?`)) {
            return;
        }

        router.delete(route(destroyRoute, item.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="font-serif text-xl font-bold text-primary">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-on-surface-variant">
                            {subtitle}
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-secondary"
                >
                    <Plus size={16} />
                    Add New
                </button>
            </div>

            {formOpen && (
                <div className="rounded-lg border border-outline-variant bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between border-b border-outline-variant pb-3">
                        <h3 className="font-serif text-lg font-bold text-primary">
                            {editingItem
                                ? `Edit ${editingItem.title || editingItem.name}`
                                : `Create ${title}`}
                        </h3>
                        <button
                            type="button"
                            onClick={() => setFormOpen(false)}
                            className="rounded p-1 text-on-surface-variant hover:text-primary"
                            aria-label="Close form"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {fields.map((field) => {
                                if (field.type === 'checkbox') {
                                    return (
                                        <label
                                            key={field.name}
                                            className="flex items-center gap-2.5 pt-2 text-sm font-semibold"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={Boolean(
                                                    formData[field.name],
                                                )}
                                                onChange={(event) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        [field.name]:
                                                            event.target
                                                                .checked,
                                                    }))
                                                }
                                                className="rounded border-outline"
                                            />
                                            <span>{field.label}</span>
                                        </label>
                                    );
                                }

                                const fullWidth =
                                    field.fullWidth ||
                                    field.type === 'textarea' ||
                                    field.type === 'lines' ||
                                    field.type === 'files';

                                return (
                                    <div
                                        key={field.name}
                                        className={
                                            fullWidth ? 'md:col-span-2' : ''
                                        }
                                    >
                                        <label className="mb-1 block text-xs font-bold text-primary">
                                            {field.label}
                                            {field.required ? ' *' : ''}
                                        </label>

                                        {field.type === 'textarea' && (
                                            <textarea
                                                rows={3}
                                                required={field.required}
                                                value={
                                                    formData[field.name] ?? ''
                                                }
                                                onChange={(event) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        [field.name]:
                                                            event.target.value,
                                                    }))
                                                }
                                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                                            />
                                        )}

                                        {field.type === 'lines' && (
                                            <textarea
                                                rows={4}
                                                placeholder="One item per line"
                                                value={(
                                                    formData[field.name] || []
                                                ).join('\n')}
                                                onChange={(event) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        [field.name]:
                                                            event.target.value
                                                                .split('\n')
                                                                .map((line) =>
                                                                    line.trim(),
                                                                )
                                                                .filter(
                                                                    Boolean,
                                                                ),
                                                    }))
                                                }
                                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                                            />
                                        )}

                                        {field.type === 'select' && (
                                            <select
                                                required={field.required}
                                                value={
                                                    formData[field.name] ?? ''
                                                }
                                                onChange={(event) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        [field.name]:
                                                            event.target.value,
                                                    }))
                                                }
                                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                                            >
                                                {field.options.map((opt) => (
                                                    <option
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}

                                        {field.type === 'file' && (
                                            <div className="space-y-2">
                                                <input
                                                    type="file"
                                                    accept={field.accept}
                                                    onChange={(event) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            [field.name]:
                                                                event.target
                                                                    .files?.[0] ||
                                                                null,
                                                        }))
                                                    }
                                                    className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-1.5 text-xs"
                                                />
                                                {editingItem &&
                                                    field.existingKey &&
                                                    editingItem[
                                                        field.existingKey
                                                    ] && (
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={
                                                                    editingItem[
                                                                        field
                                                                            .existingKey
                                                                    ]
                                                                }
                                                                alt="Current preview"
                                                                className="h-12 w-16 rounded border border-outline-variant object-cover"
                                                            />
                                                            <span className="text-[11px] text-on-surface-variant">
                                                                Current image
                                                            </span>
                                                        </div>
                                                    )}
                                                {field.libraryIdField &&
                                                    libraryImages.length >
                                                        0 && (
                                                        <select
                                                            value={
                                                                formData[
                                                                    field
                                                                        .libraryIdField
                                                                ] ?? ''
                                                            }
                                                            onChange={(event) =>
                                                                setFormData(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [field.libraryIdField]:
                                                                            event
                                                                                .target
                                                                                .value,
                                                                    }),
                                                                )
                                                            }
                                                            className="w-full rounded border border-outline-variant bg-white px-2.5 py-1.5 text-xs"
                                                        >
                                                            <option value="">
                                                                Or pick existing
                                                                Media Library ID
                                                            </option>
                                                            {libraryImages.map(
                                                                (img) => (
                                                                    <option
                                                                        key={
                                                                            img.id
                                                                        }
                                                                        value={
                                                                            img.id
                                                                        }
                                                                    >
                                                                        #
                                                                        {img.id}{' '}
                                                                        —{' '}
                                                                        {
                                                                            img.original_name
                                                                        }{' '}
                                                                        (
                                                                        {
                                                                            img.folder
                                                                        }
                                                                        )
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    )}
                                            </div>
                                        )}

                                        {field.type === 'files' && (
                                            <div className="space-y-3">
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept={field.accept}
                                                    onChange={(event) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            [field.name]:
                                                                Array.from(
                                                                    event.target
                                                                        .files ||
                                                                        [],
                                                                ),
                                                        }))
                                                    }
                                                    className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-1.5 text-xs"
                                                />
                                                {editingItem &&
                                                    Array.isArray(
                                                        editingItem[
                                                            field.existingKey ||
                                                                'images_data'
                                                        ],
                                                    ) &&
                                                    editingItem[
                                                        field.existingKey ||
                                                            'images_data'
                                                    ].some(
                                                        (img) =>
                                                            img?.id !== null,
                                                    ) && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {editingItem[
                                                                field.existingKey ||
                                                                    'images_data'
                                                            ]
                                                                .filter(
                                                                    (img) =>
                                                                        img?.id !==
                                                                        null,
                                                                )
                                                                .map((img) => {
                                                                    const marked =
                                                                        (
                                                                            formData.remove_image_ids ||
                                                                            []
                                                                        ).includes(
                                                                            img.id,
                                                                        );

                                                                    return (
                                                                        <div
                                                                            key={
                                                                                img.id
                                                                            }
                                                                            className={`relative overflow-hidden rounded border p-1 ${
                                                                                marked
                                                                                    ? 'border-red-500 opacity-50'
                                                                                    : 'border-outline-variant'
                                                                            }`}
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    img.url
                                                                                }
                                                                                alt={
                                                                                    img.original_name ||
                                                                                    'Uploaded image'
                                                                                }
                                                                                className="h-14 w-20 rounded object-cover"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    setFormData(
                                                                                        (
                                                                                            prev,
                                                                                        ) => {
                                                                                            const current =
                                                                                                prev.remove_image_ids ||
                                                                                                [];
                                                                                            const next =
                                                                                                current.includes(
                                                                                                    img.id,
                                                                                                )
                                                                                                    ? current.filter(
                                                                                                          (
                                                                                                              id,
                                                                                                          ) =>
                                                                                                              id !==
                                                                                                              img.id,
                                                                                                      )
                                                                                                    : [
                                                                                                          ...current,
                                                                                                          img.id,
                                                                                                      ];

                                                                                            return {
                                                                                                ...prev,
                                                                                                remove_image_ids:
                                                                                                    next,
                                                                                            };
                                                                                        },
                                                                                    )
                                                                                }
                                                                                title={
                                                                                    marked
                                                                                        ? 'Keep image'
                                                                                        : 'Remove image on save'
                                                                                }
                                                                                className={`mt-1 w-full rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                                                                    marked
                                                                                        ? 'bg-red-600 text-white'
                                                                                        : 'bg-surface-container-high text-primary hover:bg-red-100 hover:text-red-700'
                                                                                }`}
                                                                            >
                                                                                {marked
                                                                                    ? 'Undo Remove'
                                                                                    : `Remove #${img.id}`}
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                })}
                                                        </div>
                                                    )}
                                                {field.librarySelectKey &&
                                                    libraryImages.length >
                                                        0 && (
                                                        <details className="rounded border border-outline-variant bg-surface-container-low p-2.5">
                                                            <summary className="cursor-pointer text-xs font-bold text-primary">
                                                                Or attach from
                                                                Media Library (
                                                                {
                                                                    (
                                                                        formData[
                                                                            field
                                                                                .librarySelectKey
                                                                        ] || []
                                                                    ).length
                                                                }{' '}
                                                                selected)
                                                            </summary>
                                                            <div className="mt-2 grid max-h-48 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-6">
                                                                {libraryImages.map(
                                                                    (img) => {
                                                                        const selected =
                                                                            (
                                                                                formData[
                                                                                    field
                                                                                        .librarySelectKey
                                                                                ] ||
                                                                                []
                                                                            ).includes(
                                                                                img.id,
                                                                            );

                                                                        return (
                                                                            <button
                                                                                key={
                                                                                    img.id
                                                                                }
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    setFormData(
                                                                                        (
                                                                                            prev,
                                                                                        ) => {
                                                                                            const cur =
                                                                                                prev[
                                                                                                    field
                                                                                                        .librarySelectKey
                                                                                                ] ||
                                                                                                [];
                                                                                            const next =
                                                                                                cur.includes(
                                                                                                    img.id,
                                                                                                )
                                                                                                    ? cur.filter(
                                                                                                          (
                                                                                                              id,
                                                                                                          ) =>
                                                                                                              id !==
                                                                                                              img.id,
                                                                                                      )
                                                                                                    : [
                                                                                                          ...cur,
                                                                                                          img.id,
                                                                                                      ];

                                                                                            return {
                                                                                                ...prev,
                                                                                                [field.librarySelectKey]:
                                                                                                    next,
                                                                                            };
                                                                                        },
                                                                                    )
                                                                                }
                                                                                className={`relative overflow-hidden rounded border-2 p-0.5 text-left transition ${
                                                                                    selected
                                                                                        ? 'border-secondary bg-secondary/10'
                                                                                        : 'border-outline-variant bg-white hover:border-primary'
                                                                                }`}
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        img.thumbnail_url ||
                                                                                        img.url
                                                                                    }
                                                                                    alt={
                                                                                        img.original_name ||
                                                                                        `#${img.id}`
                                                                                    }
                                                                                    className="h-12 w-full rounded object-cover"
                                                                                />
                                                                                <span className="mt-0.5 block truncate px-0.5 font-mono text-[10px] font-bold text-primary">
                                                                                    #
                                                                                    {
                                                                                        img.id
                                                                                    }
                                                                                </span>
                                                                            </button>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </details>
                                                    )}
                                            </div>
                                        )}

                                        {[
                                            'text',
                                            'number',
                                            'url',
                                            'email',
                                        ].includes(field.type) && (
                                            <input
                                                type={field.type}
                                                required={field.required}
                                                placeholder={
                                                    field.placeholder || ''
                                                }
                                                value={
                                                    formData[field.name] ?? ''
                                                }
                                                onChange={(event) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        [field.name]:
                                                            event.target.value,
                                                    }))
                                                }
                                                className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-sm"
                                            />
                                        )}

                                        {field.help && (
                                            <p className="mt-1 text-[11px] text-on-surface-variant">
                                                {field.help}
                                            </p>
                                        )}

                                        {errors[field.name] && (
                                            <p className="mt-1 text-xs font-semibold text-red-600">
                                                {errors[field.name]}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setFormOpen(false)}
                                className="rounded border border-outline-variant px-4 py-2 text-xs font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-secondary disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving...'
                                    : editingItem
                                      ? 'Update Item'
                                      : 'Save Item'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-outline-variant bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-outline-variant bg-surface-container-high text-xs text-primary uppercase">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.label}
                                    className="px-4 py-3 font-bold"
                                >
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-right font-bold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {items.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-surface-container-low"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.label}
                                        className="px-4 py-3 align-middle"
                                    >
                                        {col.render
                                            ? col.render(item)
                                            : item[col.key]}
                                    </td>
                                ))}
                                <td className="px-4 py-3 text-right align-middle whitespace-nowrap">
                                    <button
                                        type="button"
                                        onClick={() => openEdit(item)}
                                        className="mr-2 inline-flex items-center gap-1 rounded border px-2.5 py-1 text-xs font-semibold text-primary hover:bg-surface-container-high"
                                    >
                                        <Pencil size={12} />
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item)}
                                        className="inline-flex items-center gap-1 rounded border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 size={12} />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="px-4 py-8 text-center text-sm text-on-surface-variant"
                                >
                                    No records yet. Click &ldquo;Add New&rdquo;
                                    to create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
