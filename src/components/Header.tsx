'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LuCalendarCheck, LuChevronDown, LuMenu, LuPhone, LuX, LuArrowRight } from 'react-icons/lu';
import { NAV_GROUPS, PRIMARY_NAV, SITE } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSpecOpen, setDrawerSpecOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const megaBtnRef = useRef<HTMLButtonElement>(null);
  const hoverOpenedAt = useRef(0);

  // Admin session indicator (kept from the previous header)
  useEffect(() => {
    setIsAuthenticated(document.cookie.split('; ').some((row) => row.trim().startsWith('adminAuth=')));
  }, [pathname]);

  // Shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape / outside click for the desktop dropdown
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        megaBtnRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [megaOpen]);

  // Lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'GET' });
      document.cookie = 'adminAuth=; Path=/admin; Max-Age=0;';
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));
  const [home, ...restNav] = PRIMARY_NAV;

  return (
    <>
      <header className={`ds-header ${scrolled || drawerOpen ? 'is-scrolled' : ''}`}>
        <div className="ds-container ds-header__inner">
          <Link href="/" className="ds-brand" aria-label={`${SITE.name} — home`}>
            <Image src={SITE.logo} alt="" width={46} height={46} priority />
            <span className="ds-brand__text">
              <span className="ds-brand__name">{SITE.name}</span>
              <span className="ds-brand__tag">United Gut Health Care</span>
            </span>
          </Link>

          <nav className="ds-nav" aria-label="Main">
            <ul className="ds-nav__list">
              <li>
                <Link href={home.href} className="ds-nav__link" aria-current={isActive(home.href) ? 'page' : undefined}>
                  {home.label}
                </Link>
              </li>
              <li>
                <Link href="/aboutus" className="ds-nav__link" aria-current={isActive('/aboutus') ? 'page' : undefined}>
                  About
                </Link>
              </li>
              <li
                className="ds-dropdown"
                ref={dropdownRef}
                onMouseEnter={() => {
                  if (!megaOpen) hoverOpenedAt.current = Date.now();
                  setMegaOpen(true);
                }}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  ref={megaBtnRef}
                  type="button"
                  className="ds-nav__link"
                  aria-expanded={megaOpen}
                  aria-controls="ds-mega-menu"
                  onClick={() => {
                    // A click right after hover-open should not immediately close the menu
                    if (Date.now() - hoverOpenedAt.current < 400) return;
                    setMegaOpen((v) => !v);
                  }}
                >
                  Specialities <LuChevronDown aria-hidden="true" />
                </button>
                <div id="ds-mega-menu" className={`ds-mega ${megaOpen ? 'is-open' : ''}`}>
                  {NAV_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="ds-mega__title">{group.label}</p>
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} tabIndex={megaOpen ? 0 : -1}>
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="ds-mega__foot">
                    <span className="ds-muted" style={{ fontSize: '0.88rem' }}>
                      Not sure where to start? Browse every condition we treat.
                    </span>
                    <Link href="/specialities" className="ds-link" tabIndex={megaOpen ? 0 : -1}>
                      View all specialities <LuArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>
              {restNav.filter((n) => n.href !== '/aboutus').map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="ds-nav__link" aria-current={isActive(item.href) ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <>
                  <li>
                    <Link href="/admin/dashboard" className="ds-nav__link">Admin</Link>
                  </li>
                  <li>
                    <a href="/api/auth/logout" onClick={handleLogout} className="ds-nav__link">Logout</a>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="ds-header__actions">
            <a href={SITE.phoneHref} className="ds-header__phone" aria-label={`Call ${SITE.phoneDisplay}`}>
              <span className="ds-icon-circle"><LuPhone aria-hidden="true" /></span>
              {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.appointmentHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-btn ds-btn--primary ds-btn--sm ds-header__cta"
            >
              <LuCalendarCheck aria-hidden="true" /> Book Appointment
            </a>
            <button
              type="button"
              className="ds-burger"
              aria-expanded={drawerOpen}
              aria-controls="ds-drawer"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              {drawerOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div id="ds-drawer" className={`ds-drawer ${drawerOpen ? 'is-open' : ''}`} aria-hidden={!drawerOpen} inert={!drawerOpen}>
        <nav aria-label="Mobile">
          <ul className="ds-drawer__list">
            <li><Link href="/" className="ds-drawer__link">Home</Link></li>
            <li><Link href="/aboutus" className="ds-drawer__link">About Dr. Shabeer Ahmed</Link></li>
            <li>
              <button
                type="button"
                className="ds-drawer__link"
                aria-expanded={drawerSpecOpen}
                aria-controls="ds-drawer-spec"
                onClick={() => setDrawerSpecOpen((v) => !v)}
              >
                Specialities <LuChevronDown aria-hidden="true" />
              </button>
              <div id="ds-drawer-spec" className="ds-drawer__group" hidden={!drawerSpecOpen}>
                {NAV_GROUPS.map((group) => (
                  <div key={group.label}>
                    <h3>{group.label}</h3>
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href}>{link.title}</Link>
                    ))}
                  </div>
                ))}
                <h3>More</h3>
                <Link href="/specialities">All specialities</Link>
              </div>
            </li>
            <li><Link href="/providers" className="ds-drawer__link">Conditions &amp; Treatments</Link></li>
            <li><Link href="/blogs" className="ds-drawer__link">Blogs</Link></li>
            <li><Link href="/news-updates" className="ds-drawer__link">News &amp; Updates</Link></li>
            <li><Link href="/contact" className="ds-drawer__link">Contact</Link></li>
            <li>
              {isAuthenticated ? (
                <a href="/api/auth/logout" onClick={handleLogout} className="ds-drawer__link">Logout</a>
              ) : (
                <Link href="/login" className="ds-drawer__link">Login</Link>
              )}
            </li>
          </ul>
          <div className="ds-drawer__cta">
            <a href={SITE.appointmentHref} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn--primary">
              <LuCalendarCheck aria-hidden="true" /> Book Appointment
            </a>
            <a href={SITE.phoneHref} className="ds-btn ds-btn--ghost">
              <LuPhone aria-hidden="true" /> Call {SITE.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
