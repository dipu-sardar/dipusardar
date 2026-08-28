import React, { useLayoutEffect, useEffect, useRef } from 'react';
import './ScrollFX.css';

/* ──────────────────────────────────────────────────────────────────────
   ScrollFX

   1. Reveal-on-scroll  — tags key text / layout blocks and fades + lifts
      them into view as the user scrolls, with a gentle per-group stagger.
   2. Smooth scroll      — lerp-eased wheel scrolling for a premium feel
      (mouse / fine-pointer only; skips modals, reduced-motion, touch).
   3. Progress bar       — thin bar at the very top tracking page progress.
   ────────────────────────────────────────────────────────────────────── */

type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'blur';

interface RevealGroup {
  /** Container(s) to look inside */
  container: string;
  /** Descendants to animate (comma list). Omit to animate the container itself. */
  items?: string;
  variant?: RevealVariant;
  /** ms of delay added per successive matched item within a container */
  stagger?: number;
}

const REVEAL_GROUPS: RevealGroup[] = [
  // ── Hero ──
  {
    container: '.hero-title-card-simple',
    items: '.hero-title-name, .hero-subtitle-simple, .hero-short-bio, .hero-buttons-group',
    variant: 'up',
    stagger: 90,
  },
  { container: '.hero-grid-simple', items: '.hero-image-card-simple', variant: 'scale' },

  // ── Projects ──
  {
    container: '.projects-intro',
    items: '.projects-eyebrow, .projects-heading, .projects-lede',
    variant: 'up',
    stagger: 100,
  },
  { container: '.proj-row', items: '.proj-copy, .proj-visual', variant: 'up', stagger: 130 },

  // ── Skills ──
  {
    container: '.skills-header-text',
    items: '.skills-badge, .skills-headline, .skills-desc',
    variant: 'up',
    stagger: 100,
  },
  { container: '.skills-grid', items: '.skill-card', variant: 'up', stagger: 55 },

  // ── Contact ──
  {
    container: '.contact-info-panel',
    items: '.contact-tag, .contact-display-title, .contact-info-desc, .contact-details-list, .contact-social-icons',
    variant: 'up',
    stagger: 85,
  },
  { container: '.contact-card-grid', items: '.contact-form-panel', variant: 'right' },

  // ── Footer ──
  { container: '.lime-footer-top', items: '.lime-footer-col', variant: 'up', stagger: 120 },
  { container: '.lime-footer-mid', variant: 'fade' },
  { container: '.lime-footer-banner', items: '.lime-footer-banner-text', variant: 'blur' },
];

const OVERLAY_SELECTOR =
  '.cart-drawer-backdrop, .contact-modal-backdrop, .resume-modal-backdrop, .search-modal-backdrop, .project-modal-backdrop, .mobile-nav-overlay, [data-native-scroll]';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ScrollFX: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  /* ── 1 + 2. Reveal system (layout effect → tag before first paint) ── */
  useLayoutEffect(() => {
    const rootEl = document.documentElement;
    rootEl.classList.add('scroll-fx-ready');

    const tagged: HTMLElement[] = [];

    REVEAL_GROUPS.forEach((group) => {
      document
        .querySelectorAll<HTMLElement>(group.container)
        .forEach((container) => {
          const targets: HTMLElement[] = group.items
            ? Array.from(container.querySelectorAll<HTMLElement>(group.items))
            : [container];

          targets.forEach((el, i) => {
            if (!el.dataset.sfx) {
              // First time we see this element — set variant + stagger delay.
              el.dataset.sfx = group.variant ?? 'up';
              if (group.stagger) {
                el.style.setProperty('--sfx-delay', `${i * group.stagger}ms`);
              }
            }
            // Still needs revealing? (guards against StrictMode double-invoke)
            if (!el.classList.contains('sfx-in')) tagged.push(el);
          });
        });
    });

    if (prefersReducedMotion()) {
      tagged.forEach((el) => el.classList.add('sfx-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('sfx-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    tagged.forEach((el) => observer.observe(el));

    // Safety net: never leave anything permanently hidden.
    const fallback = window.setTimeout(() => {
      tagged.forEach((el) => el.classList.add('sfx-in'));
    }, 2600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  /* ── 3. Smooth wheel scrolling ── */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // CSS `scroll-behavior: smooth` would fight our per-frame scrollTo — opt
    // this scroller out and let explicit behavior:'smooth' nav calls keep it.
    const rootStyle = document.documentElement.style;
    const prevScrollBehavior = rootStyle.scrollBehavior;
    rootStyle.scrollBehavior = 'auto';

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let running = false;
    const EASE = 0.115;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const hasScrollableAncestor = (node: EventTarget | null): boolean => {
      let el = node as HTMLElement | null;
      while (el && el !== document.body && el.nodeType === 1) {
        if (el.matches?.(OVERLAY_SELECTOR)) return true;
        const style = window.getComputedStyle(el);
        const oy = style.overflowY;
        if (
          (oy === 'auto' || oy === 'scroll') &&
          el.scrollHeight > el.clientHeight + 1
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const frame = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        running = false;
      }
      window.scrollTo(0, Math.round(current));
      if (running) raf = requestAnimationFrame(frame);
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom
      if (hasScrollableAncestor(e.target)) return; // let modals / inner scrollers behave natively

      e.preventDefault();
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.min(maxScroll(), Math.max(0, target + e.deltaY * unit));
      ensureRunning();
    };

    // Keep our target in sync when scrolling happens by other means
    // (keyboard, scrollbar drag, anchor jumps, programmatic scrollIntoView).
    const onExternalScroll = () => {
      if (!running) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onExternalScroll, { passive: true });
    window.addEventListener('resize', onExternalScroll);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onExternalScroll);
      window.removeEventListener('resize', onExternalScroll);
      cancelAnimationFrame(raf);
      rootStyle.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  /* ── 4. Progress bar ── */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progressRef.current?.style.setProperty('--scroll-progress', String(p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
};

export default ScrollFX;
