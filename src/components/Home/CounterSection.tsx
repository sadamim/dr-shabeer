'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

const counters = [
    {
        icon: '/img/icons/count-02.svg',
        alt: 'stethoscope',
        count: '38 years',
        label: 'Experience',
    },
    {
        icon: '/img/icons/count-01.svg',
        alt: 'doctor-image',
        count: '15,000+',
        label: 'Laparoscopic Surgeries',
    },
    {
        icon: '/img/icons/count-03.svg',
        alt: 'smiley-icon',
        count: '50,000+',
        label: 'Happy Patients',
    },
    {
        icon: '/img/icons/count-04.svg',
        alt: 'award-icon',
        count: '50,000+',
        label: 'Successful Treatments',
    },
    {
        icon: '/img/icons/Nationion.svg',
        alt: 'nation-icon',
        count: '20+',
        label: 'Nations',
    },
    {
        icon: '/img/icons/research.svg',
        alt: 'research-icon',
        count: '20+',
        label: 'Research Analysts',
    },
];

function parseCounterCount(raw: string) {
  const normalized = raw.trim();
  const isYears = /years/i.test(normalized);
  const hasPlus = normalized.includes('+');

  const numberPart = normalized
    .replace(/years/gi, '')
    .replace(/\+/g, '')
    .replace(/,/g, '')
    .trim();

  const value = Number.parseInt(numberPart || '0', 10);

  return {
    target: Number.isFinite(value) ? value : 0,
    suffix: isYears ? ' years' : hasPlus ? '+' : '',
    isYears,
    hasPlus,
  };
}

function formatNumberWithCommas(n: number) {
  return n.toLocaleString('en-IN');
}

export default function CounterSection() {
    const parsed = useMemo(() => counters.map((c) => parseCounterCount(c.count)), []);
    const [animated, setAnimated] = useState<number[]>(() => parsed.map(() => 0));
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const el = sectionRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setShouldAnimate(true);
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!shouldAnimate) return;

      const durationMs = 1400;
      const tickMs = 25;
      const steps = Math.max(1, Math.floor(durationMs / tickMs));

      let step = 0;
      const id = window.setInterval(() => {
        step += 1;
        const progress = Math.min(1, step / steps);
        const eased = 1 - Math.pow(1 - progress, 3);

        setAnimated(parsed.map((p) => Math.round(p.target * eased)));

        if (progress >= 1) {
          window.clearInterval(id);
        }
      }, tickMs);

      return () => window.clearInterval(id);
    }, [parsed, shouldAnimate]);

    return (
        <section ref={sectionRef} className="counter-section position-relative">
            {/* Background Images */}
            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden z-n1">
                <Image
                    src="/img/bg/counter-bg.png"
                    alt="design-background"
                    layout="fill"
                    objectFit="cover"
                    className="bg-06"
                />
                <Image
                    src="/img/bg/counter-bg-01.png"
                    alt="eye-background"
                    layout="fill"
                    objectFit="contain"
                    className="bg-07 opacity-50"
                />
            </div>

            <div className="container-fluid px-3 px-lg-5 position-relative">
                <div className="text-center mb-4">
                    <h3 className="text-white">Driven by a Commitment to Excellence</h3>
                </div>

                <div className="text-center mb-5">
                    <h5 className="text-white">
                        I continually strive to improve the health and well-being of every patient, one successful treatment at a time
                    </h5>
                </div>

                <div className="counter-grid">
                  {counters.map((item, idx) => (
                    <div className="counter-grid-item" key={idx}>
                      <div className="count-box">
                        <div className="count-icon">
                          <Image src={item.icon} alt={item.alt} width={56} height={56} />
                        </div>
                        <div className="count-info">
                          <h3 className="mb-1">
                            {parsed[idx]?.isYears ? animated[idx] : formatNumberWithCommas(animated[idx])}
                            {parsed[idx]?.suffix}
                          </h3>
                          <p className="mb-0">{item.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </section>
    );
}
