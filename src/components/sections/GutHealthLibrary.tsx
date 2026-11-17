'use client';

import { useId, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight, LuCalendar, LuClock, LuSearch } from 'react-icons/lu';
import type { LibraryPost } from '@/lib/getFeaturedPosts';

const FEATURED = 8;
const MAX_TABS = 5;

const formatDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export default function GutHealthLibrary({ posts }: { posts: LibraryPost[] }) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');
  const searchId = useId();

  // Most-used categories become tabs
  const tabs = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => p.category && counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return ['All', ...[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, MAX_TABS).map(([c]) => c)];
  }, [posts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => tab === 'All' || p.category === tab)
      .filter((p) => !q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q))
      .slice(0, FEATURED);
  }, [posts, query, tab]);

  return (
    <section className="ds-section ds-section--soft" id="library" aria-labelledby="library-title">
      <div className="ds-container">
        <div className="ds-section__head ds-section__head--split" data-reveal>
          <div>
            <p className="ds-eyebrow">Gut Health Library</p>
            <h2 id="library-title" className="ds-h2">Trusted reading on digestive health</h2>
            <p className="ds-lead">Articles from Dr. Shabeer Ahmed’s clinic to help you understand symptoms, conditions and treatment.</p>
          </div>
          <Link href="/blogs" className="ds-btn ds-btn--ghost">
            View All Articles <LuArrowRight aria-hidden="true" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="ds-empty">
            Articles are loading slowly right now. <Link href="/blogs" className="ds-link">Browse the full library</Link>
          </div>
        ) : (
          <>
            <div className="ds-explorer__bar ds-explorer__bar--tabs">
              <div className="ds-search">
                <label htmlFor={searchId} className="ds-sr-only">Search articles</label>
                <LuSearch aria-hidden="true" />
                <input
                  id={searchId}
                  type="search"
                  className="ds-input"
                  placeholder="Search articles…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            {tabs.length > 1 && (
              <div className="ds-tabs" role="group" aria-label="Filter articles by category" style={{ display: 'flex' }}>
                {tabs.map((t) => (
                  <button key={t} type="button" className="ds-tab" aria-pressed={tab === t} onClick={() => setTab(t)}>
                    {t}
                  </button>
                ))}
              </div>
            )}

            <p className="ds-sr-only" aria-live="polite">{visible.length} articles shown</p>

            {visible.length > 0 ? (
              <ul className="ds-grid ds-grid--4">
                {visible.map((post) => {
                  const isCloudinary = post.imageUrl.includes('res.cloudinary.com');
                  return (
                    <li key={post.id}>
                      <article className="ds-card ds-card--hover ds-article">
                        <div className="ds-article__img">
                          {post.imageUrl ? (
                            <Image
                              src={post.imageUrl}
                              alt=""
                              fill
                              sizes="(min-width: 992px) 290px, (min-width: 640px) 45vw, 92vw"
                              unoptimized={!isCloudinary}
                            />
                          ) : null}
                          {post.category && <span className="ds-chip">{post.category}</span>}
                        </div>
                        <div className="ds-article__body">
                          <div className="ds-article__meta">
                            {post.date && (
                              <span><LuCalendar aria-hidden="true" /> <time dateTime={post.date}>{formatDate(post.date)}</time></span>
                            )}
                            {post.readingMinutes && (
                              <span><LuClock aria-hidden="true" /> {post.readingMinutes} min read</span>
                            )}
                          </div>
                          <h3>
                            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                          </h3>
                          {post.excerpt && <p>{post.excerpt}</p>}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="ds-empty">
                No articles match “{query}”. <Link href="/blogs" className="ds-link">See all articles</Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
