import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight, LuAward, LuBadgeCheck, LuCalendarCheck, LuGraduationCap, LuHospital, LuMapPin } from 'react-icons/lu';
import { SITE } from '@/lib/site';

export default function Hero() {
  return (
    <section className="ds-hero" aria-labelledby="hero-title">
      <div className="ds-container ds-hero__grid">
        <div className="ds-hero__copy">
          <p className="ds-hero__badge">
            <span><LuBadgeCheck aria-hidden="true" /></span>
            Gastrointestinal &amp; Laparoscopic Surgeon · Bangalore
          </p>
          <h1 id="hero-title" className="ds-h1 ds-hero__title">
            Advanced Surgical Expertise. <em>Compassionate Patient Care.</em>
          </h1>
          <p className="ds-lead">
            Meet Dr. Shabeer Ahmed, an experienced gastrointestinal, laparoscopic, bariatric and colorectal
            surgeon dedicated to advanced surgical care and patient well-being.
          </p>
          <div className="ds-hero__actions">
            <a href={SITE.appointmentHref} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn--primary">
              <LuCalendarCheck aria-hidden="true" /> Book an Appointment
              <span className="ds-sr-only">(opens {SITE.appointmentHospital} website in a new tab)</span>
            </a>
            <Link href="#specialities" className="ds-btn ds-btn--ghost">
              Explore Specialities <LuArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="ds-hero__meta">
            <li><LuGraduationCap aria-hidden="true" /> FRCS (England)</li>
            <li><LuAward aria-hidden="true" /> ALS (UK) teacher &amp; mentor</li>
            <li><LuMapPin aria-hidden="true" /> Koramangala, Bangalore</li>
          </ul>
        </div>

        <div className="ds-hero__visual">
          <span className="ds-hero__blob" aria-hidden="true" />
          <div className="ds-hero__frame">
            <span className="ds-hero__ring ds-hero__ring--a" aria-hidden="true" />
            <Image
              src={SITE.portrait}
              alt="Dr. Shabeer Ahmed, gastrointestinal and laparoscopic surgeon, in a white coat"
              fill
              priority
              sizes="(min-width: 1200px) 560px, (min-width: 992px) 45vw, 92vw"
            />
          </div>

          <div className="ds-float ds-float--a">
            <span className="ds-icon-badge"><LuAward aria-hidden="true" /></span>
            <span>
              <strong>38 years</strong>
              <small>of surgical experience</small>
            </span>
          </div>

          <div className="ds-float ds-float--b">
            <span className="ds-icon-badge"><LuHospital aria-hidden="true" /></span>
            <span>
              <strong>15,000+</strong>
              <small>laparoscopic surgeries</small>
            </span>
          </div>

          <div className="ds-float ds-float--c" aria-label="Areas of expertise">
            <span className="ds-chip">Laparoscopic</span>
            <span className="ds-chip">Bariatric</span>
            <span className="ds-chip">Colorectal</span>
          </div>
        </div>
      </div>
    </section>
  );
}
