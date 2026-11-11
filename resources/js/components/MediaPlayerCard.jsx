import { PlayCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MediaPlayerCard({ video, autoPlayPreferred = false }) {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        setPrefersReducedMotion(mediaQuery.matches);

        const onChange = (event) => setPrefersReducedMotion(event.matches);
        mediaQuery.addEventListener('change', onChange);

        return () => mediaQuery.removeEventListener('change', onChange);
    }, []);

    if (!video) {
        return null;
    }

    const isYoutube = video.source_type === 'youtube' && video.youtube_id;

    return (
        <div className="overflow-hidden rounded border border-outline-variant bg-white shadow-sm">
            <div className="relative aspect-video w-full bg-black">
                {isYoutube ? (
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.youtube_id}?rel=0`}
                        title={video.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full border-0"
                    />
                ) : (
                    <video
                        src={video.video_path}
                        poster={video.poster_path || undefined}
                        controls
                        muted={autoPlayPreferred}
                        autoPlay={autoPlayPreferred && !prefersReducedMotion}
                        loop={autoPlayPreferred}
                        playsInline
                        preload="metadata"
                        loading="lazy"
                        width="800"
                        height="450"
                        className="h-full w-full object-contain"
                    />
                )}
            </div>
            <div className="p-4">
                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-secondary uppercase">
                    <PlayCircle size={13} />
                    <span>
                        {isYoutube ? 'YouTube Showcase' : 'Commercial Film'}
                    </span>
                </div>
                <h4 className="font-serif text-base font-bold text-primary">
                    {video.title}
                </h4>
                {video.description && (
                    <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                        {video.description}
                    </p>
                )}
            </div>
        </div>
    );
}
