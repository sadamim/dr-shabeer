import Image from 'next/image';
import { TRUST_STATS } from '@/lib/site';
import CountUp from './CountUp';

export default function TrustStrip() {
  return (
    <section className="ds-trust" aria-label="Experience at a glance">
      <div className="ds-container">
        <ul className="ds-trust__grid">
          {TRUST_STATS.map((stat, i) => (
            <li
              key={stat.label}
              className="ds-card ds-trust__item"
              data-reveal
              style={{ ['--ds-delay' as string]: `${i * 60}ms` }}
            >
              <span className="ds-icon-badge">
                <Image src={stat.icon} alt="" width={24} height={24} />
              </span>
              <span className="ds-trust__value">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="ds-trust__label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
