import { LuBookOpen, LuHeartHandshake, LuMicroscope, LuStethoscope, LuArrowRight } from 'react-icons/lu';
import Link from 'next/link';

const reasons = [
  {
    icon: LuStethoscope,
    title: 'Extensive surgical experience',
    text: 'Decades of practice in gastrointestinal and laparoscopic surgery, including consultant colorectal posts in Ireland and Scotland.',
  },
  {
    icon: LuMicroscope,
    title: 'Minimally invasive techniques',
    text: 'Advanced laparoscopic, laser and robotic approaches that use smaller incisions where they are clinically appropriate.',
  },
  {
    icon: LuHeartHandshake,
    title: 'Patient-centred approach',
    text: 'Each treatment plan is shaped around your diagnosis, your questions and your recovery — with clear communication throughout.',
  },
  {
    icon: LuBookOpen,
    title: 'Academic contributions',
    text: 'Recognised as a teacher and “Preceptor” by the Association of Laparoscopic Surgery (UK), training surgeons across the UK.',
  },
];

export default function WhyChoose() {
  return (
    <section className="ds-section" aria-labelledby="why-title">
      <div className="ds-container ds-why">
        <div className="ds-why__intro" data-reveal>
          <p className="ds-eyebrow">Why choose</p>
          <h2 id="why-title" className="ds-h2">Why patients choose Dr. Shabeer Ahmed</h2>
          <p>
            Experience gained across India, Ireland, Scotland and England, combined with a commitment to
            improving the health and well-being of every patient.
          </p>
          <Link href="/aboutus" className="ds-btn ds-btn--light">
            Meet the doctor <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="ds-why__cards" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="ds-card ds-card--hover ds-why__card" data-reveal style={{ ['--ds-delay' as string]: `${i * 80}ms` }}>
              <span className="ds-icon-badge"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
