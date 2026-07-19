import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';


/* ── Framer Motion helper ── */
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/* ── Data ── */
const STATS = [
  { value: '5th',  label: 'Semester' },
  { value: '6 mo', label: 'AI Roadmap' },
  { value: 'B2',   label: 'German target' },
];

const STACK = ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Statistics', 'Linear Algebra'];

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export const About: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressInView = useInView(progressRef, { once: true });

  return (
    <section className="ab-section" id="about">

      {/* ── 1. Centered catalog-style header ── */}
      <motion.div className="ab-hero-block" {...rise(0)}>
        <span className="ab-kicker">WHO I AM</span>
        <h2 className="ab-mega-title">THE STORY SO FAR</h2>
        <p className="ab-mega-sub">
          A CSE student building toward an AI career, one project at a time.
        </p>
      </motion.div>

      {/* ── 2. Full-width divider ── */}
      <div className="ab-rule" />

      {/* ── 3. Bio row — number label + two paragraphs ── */}
      <div className="ab-bio-row">
        <motion.div className="ab-bio-index" {...rise(0.06)}>
          <span className="ab-index-num">01</span>
          <span className="ab-index-label">STORY</span>
        </motion.div>
        <div className="ab-bio-copy">
          <motion.p className="ab-body-text" {...rise(0.1)}>
            I'm a second-year student at the <strong>University of Global Village, Barishal</strong>,
            currently in my 5th semester. Alongside my degree I'm working through a structured
            6-month AI Engineer roadmap — Python, NumPy, Pandas, Matplotlib and the maths that
            powers machine learning: statistics, probability, linear algebra, calculus.
          </motion.p>
          <motion.p className="ab-body-text" {...rise(0.15)}>
            I enjoy turning theory into real projects — from a Blood Bank Management System
            and Compiler Design tools built with Lex/Flex, to a fully custom AI roadmap tracker
            built from scratch. I also write study guides in Bengali to help fellow students.
          </motion.p>
        </div>
      </div>

      {/* ── 4. Stats row ── */}
      <motion.div className="ab-stats-strip" {...rise(0.1)}>
        {STATS.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="ab-stat">
              <span className="ab-stat-val">{s.value}</span>
              <span className="ab-stat-lbl">{s.label}</span>
            </div>
            {i < STATS.length - 1 && <div className="ab-stat-divider" />}
          </React.Fragment>
        ))}
      </motion.div>

      {/* ── 5. Full-width divider ── */}
      <div className="ab-rule" />

      {/* ── 6. Three info cards ── */}
      <div className="ab-cards-row">

        {/* Location */}
        <motion.div className="ab-info-card" {...rise(0.06)}>
          <span className="ab-card-kicker">BASED IN</span>
          <div className="ab-location-display">
            <span className="ab-location-flag">📍</span>
            <span className="ab-location-name">Dhaka, Bangladesh</span>
          </div>
          <p className="ab-card-note">UTC +6 · Open to remote &amp; relocation</p>
        </motion.div>

        {/* AI Roadmap */}
        <motion.div className="ab-info-card ab-card-dark" {...rise(0.12)}>
          <span className="ab-card-kicker ab-kicker-orange">AI ROADMAP</span>
          <div className="ab-roadmap-label">
            <span className="ab-roadmap-title">6-Month Journey</span>
            <span className="ab-roadmap-pct">~40%</span>
          </div>
          <div className="ab-prog-track" ref={progressRef}>
            <motion.div
              className="ab-prog-fill"
              initial={{ width: 0 }}
              animate={progressInView ? { width: '40%' } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="ab-stack-wrap">
            {STACK.map((s) => <span key={s} className="ab-stack-chip">{s}</span>)}
          </div>
        </motion.div>

        {/* Dream goal */}
        <motion.div className="ab-info-card ab-card-goal" {...rise(0.18)}>
          <span className="ab-card-kicker ab-kicker-orange">DREAM GOAL</span>
          <div className="ab-goal-flag">🇦🇹</div>
          <div className="ab-goal-title">JKU Linz</div>
          <div className="ab-goal-country">Austria · Europe</div>
          <div className="ab-goal-sep" />
          <div className="ab-german-pill">
            <span>🗣</span>
            <div>
              <div className="ab-german-label">Learning German</div>
              <div className="ab-german-target">Target: B2</div>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
};
