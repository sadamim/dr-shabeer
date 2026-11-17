import { LuCalendarCheck, LuClipboardList, LuHeartPulse, LuStethoscope } from 'react-icons/lu';

const steps = [
  {
    icon: LuCalendarCheck,
    title: 'Book Appointment',
    text: 'Book online through Fortis Hospital, request an appointment, or call / WhatsApp the clinic.',
  },
  {
    icon: LuStethoscope,
    title: 'Specialist Consultation',
    text: 'Meet Dr. Shabeer Ahmed to discuss your symptoms, history and any previous reports.',
  },
  {
    icon: LuClipboardList,
    title: 'Personalized Treatment Planning',
    text: 'Understand your diagnosis and the treatment options suited to your condition.',
  },
  {
    icon: LuHeartPulse,
    title: 'Follow-Up & Recovery Guidance',
    text: 'Receive follow-up care and guidance on diet, activity and recovery after treatment.',
  },
];

export default function PatientJourney() {
  return (
    <section className="ds-section ds-section--soft" aria-labelledby="journey-title">
      <div className="ds-container">
        <div className="ds-section__head ds-section__head--center" data-reveal>
          <p className="ds-eyebrow">Your care journey</p>
          <h2 id="journey-title" className="ds-h2">What to expect, step by step</h2>
          <p className="ds-lead">A clear path from your first appointment to recovery.</p>
        </div>
        <ol className="ds-journey">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="ds-journey__step" data-reveal style={{ ['--ds-delay' as string]: `${i * 100}ms` }}>
              <span className="ds-journey__icon"><Icon aria-hidden="true" /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
