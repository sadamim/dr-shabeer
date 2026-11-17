'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  LuCalendarCheck,
  LuClipboardList,
  LuExternalLink,
  LuMessageCircle,
  LuPhone,
  LuX,
} from 'react-icons/lu';
import { SITE } from '@/lib/site';

/**
 * Replaces the old "For More Information" side panel with the same links:
 * - mobile: a sticky bottom appointment bar
 * - desktop: a floating quick-contact button
 */
export default function QuickContact() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  // Keep the admin area and login screen clean
  if (pathname?.startsWith('/admin') || pathname === '/login') return null;

  return (
    <>
      <nav className="ds-mobilebar" aria-label="Quick appointment actions">
        <a className="ds-btn ds-btn--ghost ds-btn--icon" href={SITE.phoneHref} aria-label={`Call ${SITE.phoneDisplay}`}>
          <LuPhone aria-hidden="true" />
        </a>
        <a className="ds-btn ds-btn--ghost ds-btn--icon" href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <LuMessageCircle aria-hidden="true" />
        </a>
        <a className="ds-btn ds-btn--primary" href={SITE.appointmentHref} target="_blank" rel="noopener noreferrer">
          <LuCalendarCheck aria-hidden="true" /> Book Appointment
        </a>
      </nav>

      <div ref={ref} className={`ds-quick ${open ? 'is-open' : ''}`}>
        <div className="ds-quick__panel" id="quick-contact-panel" role="region" aria-label="Contact options">
          <p>For more information</p>
          <ul>
            <li>
              <a href={SITE.appointmentHref} target="_blank" rel="noopener noreferrer">
                <LuCalendarCheck aria-hidden="true" /> Book Appointment in {SITE.appointmentHospital}
                <LuExternalLink className="ds-ext" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={SITE.requestAppointmentHref} target="_blank" rel="noopener noreferrer">
                <LuClipboardList aria-hidden="true" /> Request an Appointment
                <LuExternalLink className="ds-ext" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
                <LuMessageCircle aria-hidden="true" /> WhatsApp
                <LuExternalLink className="ds-ext" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref}>
                <LuPhone aria-hidden="true" /> Call {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          className="ds-quick__toggle"
          aria-expanded={open}
          aria-controls="quick-contact-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <LuX aria-hidden="true" /> : <LuCalendarCheck aria-hidden="true" />}
          {open ? 'Close' : 'Book / Contact'}
        </button>
      </div>
    </>
  );
}
