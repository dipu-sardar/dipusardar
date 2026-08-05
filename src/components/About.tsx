import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder } from 'lucide-react';
import './About.css';

type FolderType = 'education' | 'roadmap' | 'goals' | null;

export const About: React.FC = () => {
  const [activeNote, setActiveNote] = useState<FolderType>('education');

  const toggleFolder = (folder: FolderType) => {
    setActiveNote((prev) => (prev === folder ? null : folder));
  };

  return (
    <section className="ab-mini-folder-section" id="about">
      {/* ── 1. SECTION HEADER ── */}
      <motion.div
        className="ab-mini-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="ab-mini-badge">
          <Folder size={14} />
          <span>ABOUT ME</span>
        </div>
        <h2 className="ab-mini-title">
          EXPLORE MY <span className="orange-accent">JOURNEY</span>
        </h2>
        <p className="ab-mini-sub">
          Click on any folder below to inspect my education, AI roadmap, and future goals.
        </p>
      </motion.div>

      {/* ── 2. EXACT 3 FOLDERS ROW GRID ── */}
      <div className="ab-folders-row-grid">
        
        {/* FOLDER 1: EDUCATION (DARK FOREST GREEN) */}
        <motion.div
          className={`journey-folder-card folder-dark-theme ${activeNote === 'education' ? 'active-folder' : ''}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          onClick={() => toggleFolder('education')}
        >
          <div className="journey-folder-tab" />
          
          <div className="journey-folder-header">
            <span className="journey-folder-tag">ACADEMIC</span>
            <span className="journey-folder-badge">5TH SEM</span>
          </div>

          <div className="journey-folder-body">
            <h3 className="journey-folder-title">Education</h3>
            <p className="journey-folder-sub">4 timeline notes</p>
          </div>

          <div className="journey-folder-footer">
            <span>OPEN TIMELINE</span>
            <span className="journey-arrow">→</span>
          </div>
        </motion.div>

        {/* FOLDER 2: AI ROADMAP (VIBRANT LIME GREEN) */}
        <motion.div
          className={`journey-folder-card folder-lime-theme ${activeNote === 'roadmap' ? 'active-folder' : ''}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => toggleFolder('roadmap')}
        >
          <div className="journey-folder-tab" />
          
          <div className="journey-folder-header">
            <span className="journey-folder-tag">AI TRACK</span>
            <span className="journey-folder-badge">40%</span>
          </div>

          <div className="journey-folder-body">
            <h3 className="journey-folder-title">AI Roadmap</h3>
            <p className="journey-folder-sub">6-month track</p>
          </div>

          <div className="journey-folder-footer">
            <span>VIEW MATRIX</span>
            <span className="journey-arrow">→</span>
          </div>
        </motion.div>

        {/* FOLDER 3: FUTURE GOALS (PURE WHITE) */}
        <motion.div
          className={`journey-folder-card folder-white-theme ${activeNote === 'goals' ? 'active-folder' : ''}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onClick={() => toggleFolder('goals')}
        >
          <div className="journey-folder-tab" />
          
          <div className="journey-folder-header">
            <span className="journey-folder-tag">HORIZON</span>
            <span className="journey-folder-badge">2027</span>
          </div>

          <div className="journey-folder-body">
            <h3 className="journey-folder-title">Future Goals</h3>
            <p className="journey-folder-sub">3 milestones</p>
          </div>

          <div className="journey-folder-footer">
            <span>SEE GOALS</span>
            <span className="journey-arrow">→</span>
          </div>
        </motion.div>

      </div>

      {/* ── 3. INLINE EXPANDABLE DETAILS PANEL (ZERO-FLICKER ANIMATION) ── */}
      <motion.div
        className={`journey-expanded-panel ${activeNote ? 'is-open' : ''}`}
        initial={false}
        animate={{
          height: activeNote ? 'auto' : 0,
          opacity: activeNote ? 1 : 0,
          marginTop: activeNote ? 16 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <AnimatePresence mode="wait">
          {activeNote === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="journey-panel-content"
            >
              <span className="panel-category-tag">ACADEMIC</span>
              <h2 className="panel-main-title">EDUCATION</h2>

              <div className="journey-rows-list">
                <div className="journey-row-item">
                  <span className="row-date-badge">2023</span>
                  <span className="row-desc-text">BSc in Computer Science &amp; Engineering — began coursework</span>
                </div>

                <div className="journey-row-item">
                  <span className="row-date-badge">2024</span>
                  <span className="row-desc-text">Specialized in deep learning and computer vision electives</span>
                </div>

                <div className="journey-row-item">
                  <span className="row-date-badge">2025</span>
                  <span className="row-desc-text">Research assistant on edge-inference optimization</span>
                </div>

                <div className="journey-row-item">
                  <span className="row-date-badge">2026</span>
                  <span className="row-desc-text">Final year thesis: generative interface systems</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeNote === 'roadmap' && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="journey-panel-content"
            >
              <span className="panel-category-tag">AI TRACK</span>
              <h2 className="panel-main-title">AI ROADMAP</h2>

              <div className="journey-rows-list">
                <div className="journey-row-item">
                  <span className="row-date-badge">Month 1–2</span>
                  <span className="row-desc-text">Python Data Analysis, NumPy, Pandas &amp; Matplotlib foundations</span>
                </div>

                <div className="journey-row-item">
                  <span className="row-date-badge">Month 3–4</span>
                  <span className="row-desc-text">Mathematics for AI (Linear Algebra, Calculus &amp; Scikit-Learn ML models)</span>
                </div>

                <div className="journey-row-item">
                  <span className="row-date-badge">Month 5–6</span>
                  <span className="row-desc-text">Deep Learning with PyTorch, CNNs, Transformers &amp; Generative AI</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeNote === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="journey-panel-content"
            >
              <span className="panel-category-tag">HORIZON</span>
              <h2 className="panel-main-title">FUTURE GOALS</h2>

              <div className="journey-rows-list">
                <div className="journey-row-item">
                  <span className="row-date-badge">2026</span>
                  <span className="row-desc-text">Graduate BSc CSE &amp; Publish research in Edge Computer Vision</span>
                </div>

                <div className="journey-row-item">
                  <span className="row-date-badge">2027</span>
                  <span className="row-desc-text">German B2 Certification &amp; Apply for M.Sc. AI Program in Austria</span>
                </div>

                <div className="journey-row-item">
                  <span className="row-date-badge">2028+</span>
                  <span className="row-desc-text">Pioneer next-generation human-AI interface architectures @ JKU Linz</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default About;
