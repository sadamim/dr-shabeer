'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { value: number; suffix?: string; duration?: number };

const format = (n: number) => n.toLocaleString('en-IN');

/**
 * Server-renders the final number (so it is visible without JS and to crawlers).
 * After hydration, if the counter is still below the fold it resets to 0 and
 * counts up once it scrolls into view. Skipped for reduced-motion users.
 */
export default function CountUp({ value, suffix = '', duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already on screen

    setDisplay(0);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {format(display)}
        {suffix}
      </span>
      <span className="ds-sr-only">{`${format(value)}${suffix}`}</span>
    </span>
  );
}
