'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LuArrowLeft, LuArrowRight, LuQuote } from 'react-icons/lu';
import { TESTIMONIALS } from '@/lib/site';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

export default function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(1);
  const pages = Math.max(1, TESTIMONIALS.length - perView + 1);

  // Track which slide is in view (scroll-snap does the actual sliding)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const slide = track.children[0] as HTMLElement | undefined;
      if (!slide) return;
      const width = slide.offsetWidth;
      setPerView(Math.max(1, Math.round(track.clientWidth / width)));
      setActive(Math.round(track.scrollLeft / (width + 20)));
    };
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (track && slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }, []);

  return (
    <section className="ds-section" aria-labelledby="testi-title">
      <div className="ds-container ds-testi">
        <div className="ds-section__head ds-section__head--split" data-reveal>
          <div>
            <p className="ds-eyebrow">Patient stories</p>
            <h2 id="testi-title" className="ds-h2">What our patients say</h2>
            <p className="ds-lead">Experiences shared by patients and their families, in their own words.</p>
          </div>
          <div className="ds-testi__nav">
            <button type="button" className="ds-icon-btn" onClick={() => goTo(Math.max(0, active - 1))} disabled={active <= 0} aria-label="Previous testimonial">
              <LuArrowLeft aria-hidden="true" />
            </button>
            <button type="button" className="ds-icon-btn" onClick={() => goTo(Math.min(pages - 1, active + 1))} disabled={active >= pages - 1} aria-label="Next testimonial">
              <LuArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="ds-testi__track"
          aria-label="Patient testimonials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.min(pages - 1, active + 1)); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.max(0, active - 1)); }
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <li key={t.name} className="ds-testi__slide" aria-label={`${i + 1} of ${TESTIMONIALS.length}`}>
              <figure className="ds-card ds-quote">
                <LuQuote className="ds-quote__mark" aria-hidden="true" />
                <blockquote>
                  <p style={{ margin: 0 }}>{t.content}</p>
                </blockquote>
                <figcaption>
                  <span className="ds-avatar" aria-hidden="true">{initials(t.name)}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <span>Patient / family member</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {pages > 1 && (
          <div className="ds-dots" role="group" aria-label="Choose testimonial">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className="ds-dot"
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={active === i ? 'true' : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
