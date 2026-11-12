import { DEMO_IMAGE_URL, handleImageError } from '@/lib/utils';

export default function PageHero({
    badge,
    title,
    subtitle,
    heroImage,
    imageAlt = 'Corporate Header',
    children,
}) {
    return (
        <section className="border-b border-outline-variant bg-surface-container-low pt-24 pb-12 sm:pt-28 md:pt-32 md:pb-16">
            <div className="mx-auto grid w-full max-w-container-max items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
                <div className="text-left lg:col-span-7">
                    {badge && (
                        <p className="mb-3 text-xs font-bold tracking-[0.16em] text-secondary uppercase">
                            {badge}
                        </p>
                    )}
                    <h1 className="mb-4 font-serif text-3xl leading-[1.1] font-bold text-primary sm:text-5xl">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
                            {subtitle}
                        </p>
                    )}

                    {children && <div className="mt-7">{children}</div>}
                </div>

                <div className="lg:col-span-5">
                    <div className="overflow-hidden rounded-xl border border-outline-variant bg-white p-1.5 shadow-xs">
                        <img
                            src={heroImage || DEMO_IMAGE_URL}
                            alt={imageAlt}
                            onError={handleImageError}
                            className="aspect-[16/10] w-full rounded-lg object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
