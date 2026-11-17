import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight, LuBriefcaseMedical, LuGraduationCap } from 'react-icons/lu';
import { SITE } from '@/lib/site';

// All facts below come from the existing About content on the site.
export const QUALIFICATIONS = [
  { title: 'Doctor of Medicine (Honours)', meta: 'Madras University, 1986' },
  { title: 'MS', meta: 'Mysore University, 1989' },
  { title: 'FRCS', meta: 'England, 1995' },
  { title: 'MMAS', meta: 'Dundee University, 2002' },
  { title: 'Ph.D. (pursuing)', meta: 'Stem Cell Regenerative and Tissue Engineering' },
];

export const EXPERIENCE = [
  { title: 'Further surgical training', meta: 'Republic of Ireland, 1989–1996' },
  { title: 'Consultant Colorectal Surgeon', meta: 'Ireland, 1998–2001' },
  { title: 'Consultant Colorectal Surgeon', meta: 'Scotland, 2002–2006' },
  { title: 'Established a laparoscopic centre', meta: 'Queen Elizabeth Hospital, Birmingham' },
  { title: '“Preceptor”, Association of Laparoscopic Surgery', meta: 'Trained surgeons across the UK' },
];

export const EXPERTISE = [
  'Advanced laparoscopic GI cancer surgery',
  'Video-Assisted Thoracic Surgery (VATS)',
  'Bariatric Surgery',
  'Metabolic Surgery',
  'Robotic Surgery',
  'Stem Cell Therapy',
];

type Props = { headingLevel?: 'h1' | 'h2'; showCta?: boolean };

export default function AboutDoctor({ headingLevel = 'h2', showCta = true }: Props) {
  const Heading = headingLevel;
  return (
    <section className="ds-section" aria-labelledby="about-title" id="about">
      <div className="ds-container ds-about__grid">
        <div className="ds-about__media" data-reveal>
          <span className="ds-about__pattern" aria-hidden="true" />
          <div className="ds-about__photo">
            <Image
              src={SITE.portrait}
              alt="Portrait of Dr. Shabeer Ahmed"
              fill
              sizes="(min-width: 992px) 440px, 92vw"
            />
          </div>
          <div className="ds-about__badge">
            <strong>38+</strong>
            <span>years of experience in GI &amp; laparoscopic surgery</span>
          </div>
        </div>

        <div data-reveal>
          <p className="ds-eyebrow">About the doctor</p>
          <Heading id="about-title" className="ds-h2">Dr. Shabeer Ahmed</Heading>
          <p className="ds-about__sub">
            Gastrointestinal, Bariatric, Laparoscopic, General &amp; Colorectal Surgeon
          </p>
          <p className="ds-about__bio">
            An eminent senior consultant Gastrointestinal &amp; Laparoscopic and Bariatric Surgeon with over 38 years
            of extensive surgical experience. He is also an acknowledged teacher and mentor by Association of
            Laparoscopic Surgery (ALS), UK. His special expertise lies in advanced laparoscopic surgery especially for
            gastro-intestinal cancer. He has his passion for Video Assisted Thoracic Surgery (VATS), Bariatric Surgery
            and Metabolic Surgery.
          </p>
          <p className="ds-about__bio">
            He further established a laparoscopic centre at Queen Elizabeth Hospital, Birmingham, where he performed
            around 240 cases of colorectal cancer laparoscopically. His work was recognised by the Association of
            Laparoscopic Surgery (ALS), and he became a “Preceptor” who trained surgeons across the UK.
          </p>

          <div className="ds-about__cols">
            <div className="ds-card ds-about__panel">
              <h3><LuGraduationCap aria-hidden="true" /> Qualifications</h3>
              <ul className="ds-checklist">
                {QUALIFICATIONS.map((q) => (
                  <li key={q.title}>
                    {q.title}
                    <small>{q.meta}</small>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ds-card ds-about__panel">
              <h3><LuBriefcaseMedical aria-hidden="true" /> Experience &amp; affiliations</h3>
              <ul className="ds-checklist">
                {EXPERIENCE.map((e) => (
                  <li key={e.title + e.meta}>
                    {e.title}
                    <small>{e.meta}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="ds-h3" style={{ fontSize: '1.05rem' }}>Areas of expertise</h3>
          <ul className="ds-tags">
            {EXPERTISE.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          {showCta && (
            <Link href="/aboutus" className="ds-btn ds-btn--primary">
              Read Full Profile <LuArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
