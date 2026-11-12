import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Lock } from 'lucide-react';
import { route } from 'ziggy-js';
import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

export default function Login() {
    const { props } = usePage();
    const settings = props.siteSettings || {};
    const companyName = settings.company_name || 'Ashwin Group';

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('login.store'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-container-low p-6">
            <Head title={`Admin Sign In - ${companyName}`} />

            <div className="w-full max-w-md rounded-lg border border-outline-variant bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                    <img
                        src={settings.logo_path || DEMO_IMAGE_URL}
                        alt={companyName}
                        onError={handleImageError}
                        className="h-10 w-10 object-contain"
                    />
                    <div>
                        <h1 className="font-serif text-xl font-bold text-primary">
                            {companyName} CMS
                        </h1>
                        <p className="text-xs text-on-surface-variant">
                            Sign in to manage dynamic content &amp; leads
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="login-email"
                            className="mb-1 block text-sm font-bold text-primary"
                        >
                            Email Address
                        </label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            autoComplete="username"
                            required
                            value={data.email}
                            onChange={(event) =>
                                setData('email', event.target.value)
                            }
                            className="w-full rounded border border-outline-variant bg-surface-container-low px-3.5 py-2.5 text-sm text-primary"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs font-semibold text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="login-password"
                            className="mb-1 block text-sm font-bold text-primary"
                        >
                            Password
                        </label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={data.password}
                            onChange={(event) =>
                                setData('password', event.target.value)
                            }
                            className="w-full rounded border border-outline-variant bg-surface-container-low px-3.5 py-2.5 text-sm text-primary"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs font-medium">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(event) =>
                                    setData('remember', event.target.checked)
                                }
                                className="rounded border-outline"
                            />
                            Remember me
                        </label>
                        <Link
                            href={route('home')}
                            className="text-xs font-semibold text-secondary hover:underline"
                        >
                            Back to Website
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-secondary disabled:opacity-50"
                    >
                        <Lock size={15} />
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
