export default function PageHero({
    badge,
    title,
    subtitle,
    heroImage,
    imageAlt = 'Corporate Header',
    children,
}) {
    const words = String(title || '')
        .trim()
        .split(/\s+/);
    const hasAccent = words.length > 1;
    const leadText = hasAccent ? words.slice(0, -1).join(' ') : title;
    const accentText = hasAccent ? words[words.length - 1] : '';

    return (
        <section className="relative overflow-hidden border-b border-outline-variant bg-primary px-gutter pt-32 pb-16 md:pt-40 md:pb-24">
            {heroImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt={imageAlt}
                        className="h-full w-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/75" />
                </div>
            )}

            <div className="relative z-10 mx-auto w-full max-w-container-max text-center md:text-left">
                <div className="max-w-3xl">
                    {badge && (
                        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded border border-secondary/40 bg-secondary/15 px-3 py-1 text-[10px] font-semibold tracking-wider text-secondary-container uppercase md:mx-0 md:text-xs">
                            {badge}
                        </div>
                    )}
                    <h1 className="mb-4 font-serif text-3xl leading-tight font-bold text-white sm:text-5xl md:text-6xl">
                        {leadText}
                        {hasAccent && (
                            <>
                                {' '}
                                <span className="text-secondary-container">
                                    {accentText}
                                </span>
                            </>
                        )}
                    </h1>
                    {subtitle && (
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 md:mx-0 md:text-xl">
                            {subtitle}
                        </p>
                    )}
                </div>

                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    );
}
