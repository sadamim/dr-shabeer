'use client';

import { useId, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight, LuSearch } from 'react-icons/lu';
import { TREATMENTS, TREATMENT_CATEGORIES, type TreatmentCategory } from '@/lib/site';

type Filter = 'All' | TreatmentCategory;

type Props = {
  headingLevel?: 'h1' | 'h2';
  title?: string;
  intro?: string;
  /** Show only this many cards until the visitor searches, filters or expands. */
  initialLimit?: number;
};

export default function ConditionsExplorer({
  headingLevel = 'h2',
  title = 'Find your condition or treatment',
  intro = 'Search or browse by category to learn about the conditions Dr. Shabeer Ahmed treats.',
  initialLimit,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const searchId = useId();
  const selectId = useId();
  const Heading = headingLevel;

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['All', TREATMENTS.length]]);
    TREATMENT_CATEGORIES.forEach((c) => map.set(c, TREATMENTS.filter((t) => t.category === c).length));
    return map;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TREATMENTS.filter((t) => {
      if (filter !== 'All' && t.category !== filter) return false;
      if (!q) return true;
      return `${t.title} ${t.description} ${t.category}`.toLowerCase().includes(q);
    });
  }, [query, filter]);

  const filters: Filter[] = ['All', ...TREATMENT_CATEGORIES];
  const isLimited = Boolean(initialLimit) && !expanded && filter === 'All' && !query.trim();
  const visible = isLimited ? results.slice(0, initialLimit) : results;

  return (
    <section className="ds-section" id="conditions" aria-labelledby="conditions-title">
      <div className="ds-container">
        <div className="ds-section__head" data-reveal>
          <p className="ds-eyebrow">Conditions &amp; treatments</p>
          <Heading id="conditions-title" className="ds-h2">{title}</Heading>
          <p className="ds-lead">{intro}</p>
        </div>

        <div className="ds-explorer__bar">
          <div className="ds-search">
            <label htmlFor={searchId} className="ds-sr-only">Search conditions and treatments</label>
            <LuSearch aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              className="ds-input"
              placeholder="Search e.g. hernia, piles, reflux…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="ds-explorer__mobile-select">
            <label htmlFor={selectId} className="ds-sr-only">Filter by speciality</label>
            <select
              id={selectId}
              className="ds-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
            >
              {filters.map((f) => (
                <option key={f} value={f}>
                  {f === 'All' ? 'All specialities' : f} ({counts.get(f)})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="ds-tabs" role="group" aria-label="Filter by speciality">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className="ds-tab"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f === 'All' ? 'All' : f}
              <span className="ds-count">{counts.get(f)}</span>
            </button>
          ))}
        </div>

        <p className="ds-results-meta" aria-live="polite">
          Showing {visible.length} of {TREATMENTS.length} conditions &amp; treatments
        </p>

        {results.length > 0 ? (
          <ul className="ds-grid ds-grid--3">
            {visible.map((t) => (
              <li key={t.href}>
                <article className="ds-card ds-card--hover ds-treat">
                  <span className="ds-treat__img">
                    <Image src={t.img} alt="" width={64} height={64} />
                  </span>
                  <div className="ds-treat__body">
                    <span className="ds-treat__cat">{t.category}</span>
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    <Link href={t.href} className="ds-link">
                      Read More <span className="ds-sr-only">about {t.title}</span> <LuArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : null}

        {isLimited && results.length > visible.length && (
          <div className="ds-center-cta">
            <button type="button" className="ds-btn ds-btn--ghost" onClick={() => setExpanded(true)}>
              Show all {results.length} conditions &amp; treatments
            </button>
          </div>
        )}

        {results.length === 0 && (
          <div className="ds-empty">
            No matches for “{query}”. Try another term, or{' '}
            <button type="button" className="ds-link" style={{ background: 'none', border: 0, padding: 0 }} onClick={() => { setQuery(''); setFilter('All'); }}>
              clear the filters
            </button>
            .
          </div>
        )}
      </div>
    </section>
  );
}
