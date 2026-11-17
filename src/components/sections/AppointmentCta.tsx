import { LuCalendarCheck, LuMapPin, LuMessageCircle, LuPhone } from 'react-icons/lu';
import { SITE } from '@/lib/site';

export default function AppointmentCta() {
  return (
    <section className="ds-section" aria-labelledby="cta-title" style={{ paddingBlock: 'clamp(3rem, 2rem + 3vw, 5rem)' }}>
      <div className="ds-container">
        <div className="ds-cta" data-reveal>
          <div>
            <h2 id="cta-title" className="ds-h2">Take the Next Step Towards Better Health.</h2>
            <p>Connect with Dr. Shabeer Ahmed for specialist consultation and personalized care.</p>
            <div className="ds-cta__info">
              <span><LuMapPin aria-hidden="true" /> {SITE.address}</span>
              <span><LuMessageCircle aria-hidden="true" /> <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>WhatsApp the clinic</a></span>
            </div>
          </div>
          <div className="ds-cta__actions">
            <a href={SITE.appointmentHref} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn--light">
              <LuCalendarCheck aria-hidden="true" /> Book Appointment
              <span className="ds-sr-only">(opens {SITE.appointmentHospital} website in a new tab)</span>
            </a>
            <a href={SITE.phoneHref} className="ds-btn ds-btn--outline-light">
              <LuPhone aria-hidden="true" /> Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
