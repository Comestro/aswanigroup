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
        <section className="border-b border-outline-variant bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
            <div className="mx-auto w-full max-w-container-max px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant pb-3 font-mono text-[11px] tracking-widest text-on-surface-variant uppercase">
                    <span className="text-secondary">
                        {badge || 'Corporate Overview'}
                    </span>
                    <span>Ashwin Group Archive</span>
                </div>

                <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                        <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.06] font-bold text-primary">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
                                {subtitle}
                            </p>
                        )}

                        {children && <div className="mt-7">{children}</div>}
                    </div>

                    <div className="lg:col-span-5">
                        <div className="border border-outline-variant bg-background p-2">
                            <img
                                src={heroImage || DEMO_IMAGE_URL}
                                alt={imageAlt}
                                onError={handleImageError}
                                className="block aspect-[16/10] w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
