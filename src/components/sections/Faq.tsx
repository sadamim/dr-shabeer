'use client';

import { useId, useRef, useState } from 'react';
import { LuCalendarCheck, LuPhone, LuPlus } from 'react-icons/lu';
import { SITE } from '@/lib/site';
import { HOME_FAQS, type FaqItem } from '@/lib/faqs';

type Props = { faqs?: FaqItem[]; title?: string };

export default function Faq({ faqs = HOME_FAQS, title = 'Frequently asked questions' }: Props) {
  const [open, setOpen] = useState(0);
  const baseId = useId();
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = faqs.length - 1;
    const map: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      btnRefs.current[map[e.key]]?.focus();
    }
  };

  return (
    <section className="ds-section ds-section--soft" aria-labelledby="faq-title" id="faq">
      <div className="ds-container ds-faq">
        <div className="ds-faq__aside-wrap" data-reveal>
          <p className="ds-eyebrow">FAQ</p>
          <h2 id="faq-title" className="ds-h2">{title}</h2>
          <p className="ds-lead" style={{ marginBottom: '1.5rem' }}>
            Answers to common questions about appointments and visiting the clinic.
          </p>
          <div className="ds-card ds-faq__aside">
            <h3 className="ds-h3" style={{ fontSize: '1.05rem' }}>Still have a question?</h3>
            <p className="ds-muted" style={{ fontSize: '0.92rem' }}>Speak to the clinic team directly.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              <a href={SITE.phoneHref} className="ds-btn ds-btn--primary ds-btn--sm">
                <LuPhone aria-hidden="true" /> Call
              </a>
              <a href={SITE.appointmentHref} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn--ghost ds-btn--sm">
                <LuCalendarCheck aria-hidden="true" /> Book online
              </a>
            </div>
          </div>
        </div>

        <div className="ds-faq__list">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q-${i}`;
            const panelId = `${baseId}-a-${i}`;
            return (
              <div key={item.question} className={`ds-card ds-faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3 className="ds-faq__q">
                  <button
                    ref={(el) => { btnRefs.current[i] = el; }}
                    id={btnId}
                    type="button"
                    className="ds-faq__btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    {item.question}
                    <span className="ds-faq__icon" aria-hidden="true"><LuPlus /></span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className="ds-faq__panel" inert={!isOpen}>
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
