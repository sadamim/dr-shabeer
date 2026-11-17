import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import { SPECIALITIES } from '@/lib/site';

export default function Specialities({ showViewAll = true }: { showViewAll?: boolean }) {
  return (
    <section className="ds-section ds-section--soft" id="specialities" aria-labelledby="spec-title">
      <div className="ds-container">
        <div className="ds-section__head ds-section__head--split" data-reveal>
          <div>
            <p className="ds-eyebrow">Specialities</p>
            <h2 id="spec-title" className="ds-h2">Specialist surgical care for the digestive system</h2>
            <p className="ds-lead">
              From gut care and gastroenterology to advanced laparoscopic, bariatric and robotic surgery.
            </p>
          </div>
          {showViewAll && (
            <Link href="/specialities" className="ds-btn ds-btn--ghost">
              View All Specialities <LuArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>

        <ul className="ds-grid ds-grid--3">
          {SPECIALITIES.map((item, i) => (
            <li key={item.href} data-reveal style={{ ['--ds-delay' as string]: `${(i % 3) * 80}ms` }}>
              <article className="ds-card ds-card--hover ds-spec">
                <span className="ds-spec__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="ds-icon-badge">
                  <Image src={item.icon} alt="" width={30} height={30} />
                </span>
                <h3>
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p>{item.description}</p>
                <span className="ds-link" aria-hidden="true">
                  Explore Treatment <LuArrowRight />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
