'use client';

import React, { useEffect, useId, useMemo, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { LuArrowRight, LuCalendar, LuClock, LuSearch } from 'react-icons/lu';
import BariatricBanner from '@/components/BreadcrumbBanner';
import { normalizeSlug } from '@/lib/utils/slug';

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  date?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  readingMinutes?: number | null;
};

type BlogPageProps = {
  initialPosts?: BlogPost[];
};

const PAGE_SIZE = 12;
const MAX_TABS = 6;

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

const excerptOf = (post: BlogPost) =>
  post.excerpt ||
  post.content?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 160) ||
  'Read our latest health article';

function PostImage({ post, sizes, priority }: { post: BlogPost; sizes: string; priority?: boolean }) {
  if (!post.imageUrl) return null;
  const isCloudinary = post.imageUrl.includes('res.cloudinary.com');
  return (
    <Image
      src={post.imageUrl}
      alt=""
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!isCloudinary}
    />
  );
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="ds-article__meta">
      {post.date && (
        <span>
          <LuCalendar aria-hidden="true" /> <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
      )}
      {post.readingMinutes ? (
        <span>
          <LuClock aria-hidden="true" /> {post.readingMinutes} min read
        </span>
      ) : null}
    </div>
  );
}

export default function BlogPage({ initialPosts = [] }: BlogPageProps) {
  const hasInitialPosts = initialPosts.length > 0;
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(!hasInitialPosts);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const searchId = useId();

  // Fallback when the server could not load posts
  useEffect(() => {
    if (hasInitialPosts) return;

    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');

        const blogData = Array.isArray(res.data)
          ? res.data
          : res.data.posts || res.data.data || [];

        setPosts(blogData);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [hasInitialPosts]);

  const tabs = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => {
      const c = p.category?.trim();
      if (c) counts.set(c, (counts.get(c) || 0) + 1);
    });
    return ['All', ...[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, MAX_TABS).map(([c]) => c)];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => tab === 'All' || p.category?.trim() === tab)
      .filter((p) => !q || `${p.title} ${excerptOf(p)} ${p.category || ''}`.toLowerCase().includes(q));
  }, [posts, query, tab]);

  useEffect(() => setVisibleCount(PAGE_SIZE), [query, tab]);

  // Large featured card only on the unfiltered first view
  const showFeatured = tab === 'All' && !query.trim() && filtered.length > 1;
  const featured = showFeatured ? filtered[0] : null;
  const rest = (showFeatured ? filtered.slice(1) : filtered).slice(0, visibleCount);
  const remaining = (showFeatured ? filtered.length - 1 : filtered.length) - rest.length;

  return (
    <>
      <BariatricBanner
        title="Latest Blogs"
        imageSrc="/img/bannerslider/Diarrhea BANNER.webp"
      />

      <section className="ds-section ds-section--soft ds-blogs" aria-label="Blog articles">
        <div className="ds-container">
          {loading ? (
            <div className="ds-empty" role="status">Loading articles…</div>
          ) : posts.length === 0 ? (
            <div className="ds-empty">
              <strong>No blog posts found.</strong>
              <br />
              We couldn&apos;t find any blog posts at the moment. Please check back later.
            </div>
          ) : (
            <>
              <div className="ds-blogs__toolbar">
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
                {tabs.length > 1 && (
                  <div className="ds-tabs" role="group" aria-label="Filter articles by category" style={{ display: 'flex', marginBottom: 0 }}>
                    {tabs.map((t) => (
                      <button key={t} type="button" className="ds-tab" aria-pressed={tab === t} onClick={() => setTab(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="ds-results-meta" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                {query.trim() ? ` matching “${query.trim()}”` : ''}
              </p>

              {featured && (
                <article className="ds-card ds-card--hover ds-article ds-article--featured">
                  <div className="ds-article__img">
                    <PostImage post={featured} sizes="(min-width: 992px) 640px, 92vw" priority />
                    {featured.category && <span className="ds-chip">{featured.category}</span>}
                  </div>
                  <div className="ds-article__body">
                    <span className="ds-eyebrow" style={{ marginBottom: 0 }}>Latest article</span>
                    <h2>
                      <Link href={`/blogs/${normalizeSlug(featured.slug)}`}>{featured.title}</Link>
                    </h2>
                    <p>{excerptOf(featured)}</p>
                    <Meta post={featured} />
                    <span className="ds-link" aria-hidden="true">
                      Read article <LuArrowRight />
                    </span>
                  </div>
                </article>
              )}

              {rest.length > 0 ? (
                <ul className="ds-grid ds-grid--3">
                  {rest.map((post, i) => (
                    <li key={post._id || post.slug}>
                      <article className="ds-card ds-card--hover ds-article">
                        <div className="ds-article__img">
                          <PostImage
                            post={post}
                            sizes="(min-width: 992px) 380px, (min-width: 640px) 45vw, 92vw"
                            priority={!showFeatured && i < 3}
                          />
                          {post.category && <span className="ds-chip">{post.category}</span>}
                        </div>
                        <div className="ds-article__body">
                          <Meta post={post} />
                          <h3>
                            <Link href={`/blogs/${normalizeSlug(post.slug)}`}>{post.title}</Link>
                          </h3>
                          <p>{excerptOf(post)}</p>
                          <span className="ds-link ds-article__more" aria-hidden="true">
                            Read more <LuArrowRight />
                          </span>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              ) : !featured ? (
                <div className="ds-empty">
                  No articles match your search.{' '}
                  <button
                    type="button"
                    className="ds-link"
                    style={{ background: 'none', border: 0, padding: 0 }}
                    onClick={() => { setQuery(''); setTab('All'); }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : null}

              {remaining > 0 && (
                <div className="ds-center-cta">
                  <button type="button" className="ds-btn ds-btn--ghost" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
                    Load more articles ({remaining})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
