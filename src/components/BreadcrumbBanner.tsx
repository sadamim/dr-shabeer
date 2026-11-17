import Image from 'next/image';
import Link from 'next/link';
import { LuCalendarCheck, LuPhone } from 'react-icons/lu';
import { SITE } from '@/lib/site';

interface BariatricBannerProps {
    title?: string;
    imageSrc?: string | { src: string };
    /** Show the Book / Call buttons. Defaults to true except on admin screens. */
    showActions?: boolean;
}

const NO_ACTION_TITLES = /^(admin|blog list|pages list|privacy policy|terms and conditions)/i;

/**
 * Shared inner-page hero. Kept under its original name/props so every existing
 * page picks up the new design without changes.
 */
export default function BariatricBanner({ title = 'Default Title', imageSrc, showActions }: BariatricBannerProps) {
    const src = typeof imageSrc === 'string' ? imageSrc : imageSrc && 'src' in imageSrc ? imageSrc.src : '';
    const isRemote = /^https?:\/\//i.test(src);
    const isCloudinary = src.includes('res.cloudinary.com');
    const hasImage = Boolean(src) && src !== '/fallback-image.jpg';
    const actions = showActions ?? !NO_ACTION_TITLES.test(title.trim());

    return (
        <section className="ds-pagehero" aria-labelledby="page-title">
            {hasImage && (
                <div className="ds-pagehero__bg" aria-hidden="true">
                    <Image
                        src={src}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        unoptimized={isRemote && !isCloudinary}
                    />
                </div>
            )}
            <div className="ds-container ds-pagehero__inner">
                <nav aria-label="Breadcrumb">
                    <ol className="ds-crumbs">
                        <li><Link href="/">Home</Link></li>
                        <li aria-current="page">{title}</li>
                    </ol>
                </nav>
                <h1 id="page-title">{title}</h1>
                {actions && (
                    <div className="ds-pagehero__actions">
                        <a href={SITE.appointmentHref} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn--teal">
                            <LuCalendarCheck aria-hidden="true" /> Book Appointment
                        </a>
                        <a href={SITE.phoneHref} className="ds-btn ds-btn--outline-light">
                            <LuPhone aria-hidden="true" /> {SITE.phoneDisplay}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
