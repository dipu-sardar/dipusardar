import React, { useLayoutEffect, useEffect, useRef } from 'react';
import './ScrollFX.css';

/* ──────────────────────────────────────────────────────────────────────
   ScrollFX — the site's scroll-motion layer

   1. Reveal-on-scroll   fade / lift / clip blocks into view, staggered
   2. Word-mask headings  big headings rise word-by-word from behind a mask
   3. Scroll parallax     frames, stripes, images & the footer word drift
                          at their own depth; project photos slowly un-zoom
   4. Velocity skew       a whisper of skew while the page is moving fast
   5. Smooth wheel        lerp-eased wheel scrolling (fine-pointer only)
   6. Progress bar        thin bar pinned to the top

   Everything is gated on `prefers-reduced-motion` and degrades to plain
   content if the script never runs.
   ────────────────────────────────────────────────────────────────────── */

type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'blur' | 'clip';

interface RevealGroup {
  container: string;
  items?: string;
  variant?: RevealVariant | ((container: HTMLElement) => RevealVariant);
  stagger?: number;
}

const REVEAL_GROUPS: RevealGroup[] = [
  // ── Hero ──
  {
    container: '.hero-title-card-simple',
    items: '.hero-subtitle-simple, .hero-short-bio, .hero-buttons-group',
    variant: 'up',
    stagger: 90,
  },
  { container: '.hero-grid-simple', items: '.hero-image-card-simple', variant: 'clip' },

  // ── Projects ──
  { container: '.projects-intro', items: '.projects-eyebrow, .projects-lede', variant: 'up', stagger: 110 },
  { container: '.proj-row', items: '.proj-kicker, .proj-body, .proj-actions', variant: 'up', stagger: 90 },
  {
    container: '.proj-row',
    items: '.proj-visual',
    variant: (c) => (c.classList.contains('proj-row--flip') ? 'left' : 'right'),
  },

  // ── Skills ──
  { container: '.skills-header-text', items: '.skills-badge, .skills-desc', variant: 'up', stagger: 110 },
  { container: '.skills-grid', items: '.skill-card', variant: 'clip', stagger: 45 },

  // ── Contact ──
  {
    container: '.contact-info-panel',
    items: '.contact-tag, .contact-info-desc, .contact-details-list, .contact-social-icons',
    variant: 'up',
    stagger: 85,
  },
  { container: '.contact-card-grid', items: '.contact-form-panel', variant: 'right' },

  // ── Footer ──
  { container: '.lime-footer-top', items: '.lime-footer-col', variant: 'up', stagger: 120 },
  { container: '.lime-footer-mid', variant: 'fade' },
];

/* Big headings that reveal word-by-word from behind an overflow mask. */
const SPLIT_SELECTORS = [
  '.hero-title-name',
  '.projects-heading',
  '.proj-headline',
  '.skills-headline',
  '.contact-display-title',
  '.lime-footer-banner-text',
];

/* Scroll-linked parallax. `ty` / `tx` are px offsets at transit t=0 → t=1
   (t: 0 as the element enters from the bottom, 1 as it leaves past the top).
   `scale` drives a slow zoom. `wave` alternates the strength per element. */
interface PxSpec {
  selector: string;
  ty?: [number, number];
  tx?: [number, number];
  scale?: [number, number];
  wave?: [number, number];
}

const PARALLAX: PxSpec[] = [
  { selector: '.hero-image-card-simple', ty: [-26, 26] },
  { selector: '.proj-frame', ty: [46, -46] },
  { selector: '.proj-media', scale: [1.12, 1.0] },
  { selector: '.proj-stripes', ty: [-30, 30] },
  { selector: '.proj-badge', ty: [22, -22] },
  { selector: '.skill-card', ty: [22, -22], wave: [0.55, 1.6] },
  { selector: '.lime-footer-banner-text', tx: [58, -58] },
];

const OVERLAY_SELECTOR =
  '.cart-drawer-backdrop, .contact-modal-backdrop, .resume-modal-backdrop, .search-modal-backdrop, .project-modal-backdrop, .mobile-nav-overlay, [data-native-scroll]';

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* Wrap every word of `root` (recursively, keeping inner markup / <br>) in a
   masked span so it can slide up on reveal. */
function splitWords(root: HTMLElement) {
  let w = 0;
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? '';
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (part === '') return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const outer = document.createElement('span');
          outer.className = 'sfx-word';
          const inner = document.createElement('span');
          inner.className = 'sfx-word-i';
          inner.textContent = part;
          inner.style.setProperty('--w', String(w++));
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;
        if (el.tagName === 'BR' || el.classList.contains('sfx-word')) return;
        walk(el);
      }
    });
  };
  walk(root);
}

export const ScrollFX: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  /* ── Reveal + word-split + parallax loop ── */
  useLayoutEffect(() => {
    const rootEl = document.documentElement;
    rootEl.classList.add('scroll-fx-ready');
    const reduced = reduceMotion();

    /* -- tag reveal targets -- */
    const tagged: HTMLElement[] = [];
    REVEAL_GROUPS.forEach((group) => {
      document.querySelectorAll<HTMLElement>(group.container).forEach((container) => {
        const targets: HTMLElement[] = group.items
          ? Array.from(container.querySelectorAll<HTMLElement>(group.items))
          : [container];
        targets.forEach((el, i) => {
          if (!el.dataset.sfx) {
            const variant =
              typeof group.variant === 'function'
                ? group.variant(container)
                : group.variant ?? 'up';
            el.dataset.sfx = variant;
            if (group.stagger) el.style.setProperty('--sfx-delay', `${i * group.stagger}ms`);
          }
          if (!el.classList.contains('sfx-in')) tagged.push(el);
        });
      });
    });

    /* -- word-split headings (re-observe on re-mount / StrictMode) -- */
    const headings: HTMLElement[] = [];
    if (!reduced) {
      SPLIT_SELECTORS.forEach((sel) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((h) => {
          if (!h.dataset.sfxSplit) {
            try {
              splitWords(h);
              h.dataset.sfxSplit = '1';
            } catch {
              return; /* leave the heading as plain text */
            }
          }
          if (!h.classList.contains('sfx-words-in')) headings.push(h);
        });
      });
    }

    if (reduced) {
      tagged.forEach((el) => el.classList.add('sfx-in'));
      return;
    }

    /* -- reveal observer -- */
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('sfx-in');
          revealIO.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    tagged.forEach((el) => revealIO.observe(el));

    const wordsIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('sfx-words-in');
          wordsIO.unobserve(e.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    headings.forEach((h) => wordsIO.observe(h));

    const fallback = window.setTimeout(() => {
      tagged.forEach((el) => el.classList.add('sfx-in'));
      headings.forEach((h) => h.classList.add('sfx-words-in'));
    }, 2600);

    /* -- parallax + progress + velocity skew (one rAF, idle-parked) -- */
    let pxItems: { el: HTMLElement; s: PxSpec; wave: number }[] = [];
    const buildPx = () => {
      pxItems = [];
      if (reduced) return;
      PARALLAX.forEach((s) => {
        document.querySelectorAll<HTMLElement>(s.selector).forEach((el, i) => {
          const wave = s.wave ? (i % 2 === 0 ? s.wave[0] : s.wave[1]) : 1;
          pxItems.push({ el, s, wave });
        });
      });
    };
    buildPx();

    let raf = 0;
    let running = false;
    let lastY = window.scrollY;
    let skew = 0;
    let idle = 0;

    const tick = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const docMax = document.documentElement.scrollHeight - vh;

      progressRef.current?.style.setProperty(
        '--scroll-progress',
        String(docMax > 0 ? clamp(y / docMax, 0, 1) : 0)
      );

      const dv = y - lastY;
      lastY = y;
      const targetSkew = clamp(dv * 0.022, -1.25, 1.25);
      skew += (targetSkew - skew) * 0.08;
      if (Math.abs(skew) < 0.004) skew = 0;
      rootEl.style.setProperty('--sfx-skew', `${skew.toFixed(3)}deg`);

      for (const { el, s, wave } of pxItems) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -240 || r.top > vh + 240) continue;
        const t = clamp((vh - r.top) / (vh + r.height), 0, 1);
        let tf = '';
        if (s.ty) tf += `translate3d(0,${(lerp(s.ty[0], s.ty[1], t) * wave).toFixed(2)}px,0)`;
        if (s.tx) tf += `translate3d(${(lerp(s.tx[0], s.tx[1], t) * wave).toFixed(2)}px,0,0)`;
        if (s.scale) tf += ` scale(${lerp(s.scale[0], s.scale[1], t).toFixed(4)})`;
        el.style.setProperty('--sfx-tf', tf || 'translateY(0)');
      }

      if (Math.abs(dv) < 0.5 && skew === 0) idle += 1;
      else idle = 0;

      if (idle > 18) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (running || reduced) return;
      running = true;
      lastY = window.scrollY;
      idle = 0;
      raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      buildPx();
      kick();
    };

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', kick);
    kick();

    return () => {
      revealIO.disconnect();
      wordsIO.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Smooth wheel scrolling ── */
  useEffect(() => {
    if (reduceMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

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
        if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
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
      if (e.ctrlKey) return;
      if (hasScrollableAncestor(e.target)) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.min(maxScroll(), Math.max(0, target + e.deltaY * unit));
      ensureRunning();
    };
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

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
};

export default ScrollFX;
