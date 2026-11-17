import Link from 'next/link';
import Image from 'next/image';
import { LuCalendarCheck, LuMail, LuMapPin, LuMessageCircle, LuPhone } from 'react-icons/lu';
import { SITE, SPECIALITIES } from '@/lib/site';

const quickLinks = [
  { label: 'About Dr. Shabeer Ahmed', href: '/aboutus' },
  { label: 'United Gut Health Care', href: '/united-gut-healthcare' },
  { label: 'Conditions & Treatments', href: '/providers' },
  { label: 'All Specialities', href: '/specialities' },
  { label: 'News & Events', href: '/news-updates' },
  { label: 'Contact Us', href: '/contact' },
];

const resources = [
  { label: 'Blogs', href: '/blogs' },
  { label: 'Videos, Reels, Testimonial', href: '/videos-reels-testimonial' },
  { label: 'Symptomatic Checker', href: '/symtomatic-checker' },
  { label: 'Quizzes', href: '/quizes' },
  { label: 'Dr. Meghnad G. Joshi', href: '/dr-meghnad' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ds-footer">
      <div className="ds-container">
        <div className="ds-footer__top">
          <div>
            <Link href="/" className="ds-footer__brand">
              <Image src={SITE.logo} alt="" width={52} height={52} loading="lazy" />
              <span>
                <strong>{SITE.name}</strong>
                <span>United Gut Health Care</span>
              </span>
            </Link>
            <p>
              Gastrointestinal, Bariatric, Laparoscopic, General &amp; Colorectal Surgeon in Bangalore,
              offering advanced minimally invasive procedures with compassionate patient care.
            </p>
            <ul className="ds-footer__contact" aria-label="Contact details">
              <li>
                <LuMapPin aria-hidden="true" />
                <address style={{ margin: 0, fontStyle: 'normal' }}>{SITE.address}</address>
              </li>
              <li>
                <LuPhone aria-hidden="true" />
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <LuMail aria-hidden="true" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <LuMessageCircle aria-hidden="true" />
                <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </li>
            </ul>
          </div>

          <nav aria-labelledby="footer-quick">
            <h2 id="footer-quick">Quick Links</h2>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-spec">
            <h2 id="footer-spec">Specialities</h2>
            <ul>
              {SPECIALITIES.map((s) => (
                <li key={s.href}><Link href={s.href}>{s.title}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-res">
            <h2 id="footer-res">Patient Resources</h2>
            <ul>
              {resources.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>Appointments</h2>
            <div className="ds-footer__cta">
              <p>Book a specialist consultation with Dr. Shabeer Ahmed at {SITE.appointmentHospital}.</p>
              <a href={SITE.appointmentHref} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn--teal">
                <LuCalendarCheck aria-hidden="true" /> Book Appointment
              </a>
              <a href={SITE.phoneHref} className="ds-btn ds-btn--outline-light">
                <LuPhone aria-hidden="true" /> Call Now
              </a>
            </div>
            <p className="ds-footer__disclaimer">
              Information on this website is for general education and does not replace a consultation
              with a qualified doctor.
            </p>
          </div>
        </div>

        <div className="ds-footer__bottom">
          <p style={{ margin: 0 }}>© {year} {SITE.name}. All Rights Reserved.</p>
          <ul aria-label="Legal">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
            <li><Link href="/login">Admin Login</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
