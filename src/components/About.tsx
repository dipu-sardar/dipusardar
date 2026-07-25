import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderKanban, Settings, X, ArrowUpRight, GraduationCap, Cpu, Compass, MapPin } from 'lucide-react';
import './About.css';

type FolderType = 'education' | 'roadmap' | 'goals' | 'location' | null;

export const About: React.FC = () => {
  const [activeNote, setActiveNote] = useState<FolderType>(null);

  const handleScrollToContact = () => {
    setActiveNote(null);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* ── 2. COMPACT MINI-FOLDERS ROW GRID ── */}
      <div className="ab-folders-row-grid">
        
        {/* MINI-FOLDER 1: EDUCATION (SIGNATURE ORANGE) */}
        <motion.div
          className="mini-folder-card-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          onClick={() => setActiveNote('education')}
        >
          <div className="folder-back-plate" />
          <div className="folder-top-tab" />

          {/* Paper Note Slip */}
          <div className="paper-note-slip">
            <div className="slip-date-tag">
              <span>ACADEMIC</span>
              <span className="slip-time-badge">5th Sem</span>
            </div>
            <div className="slip-preview-line accent" />
            <div className="slip-preview-line" />
          </div>

          {/* Front Pocket */}
          <div className="folder-front-pocket">
            <div className="pocket-header-row">
              <div>
                <h3 className="pocket-folder-name">Education</h3>
                <p className="pocket-folder-sub">4 Timeline Notes</p>
              </div>
              <div className="pocket-icons-wrap">
                <GraduationCap size={16} />
                <Settings size={14} />
              </div>
            </div>

            <div className="pocket-footer-click">
              <span>OPEN TIMELINE</span>
              <ArrowUpRight size={12} />
            </div>
          </div>
        </motion.div>

        {/* MINI-FOLDER 2: AI ROADMAP (EDITORIAL DARK SLATE) */}
        <motion.div
          className="mini-folder-card-wrap folder-dark-theme"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => setActiveNote('roadmap')}
        >
          <div className="folder-back-plate" />
          <div className="folder-top-tab" />

          <div className="paper-note-slip">
            <div className="slip-date-tag">
              <span>AI TRACK</span>
              <span className="slip-time-badge">~40%</span>
            </div>
            <div className="slip-preview-line accent" />
            <div className="slip-preview-line" />
          </div>

          <div className="folder-front-pocket">
            <div className="pocket-header-row">
              <div>
                <h3 className="pocket-folder-name">AI Roadmap</h3>
                <p className="pocket-folder-sub">6-Month Track</p>
              </div>
              <div className="pocket-icons-wrap">
                <Cpu size={16} />
                <Settings size={14} />
              </div>
            </div>

            <div className="pocket-footer-click">
              <span>VIEW MATRIX</span>
              <ArrowUpRight size={12} />
            </div>
          </div>
        </motion.div>

        {/* MINI-FOLDER 3: JKU LINZ AUSTRIA (SIGNATURE ORANGE) */}
        <motion.div
          className="mini-folder-card-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onClick={() => setActiveNote('goals')}
        >
          <div className="folder-back-plate" />
          <div className="folder-top-tab" />

          <div className="paper-note-slip">
            <div className="slip-date-tag">
              <span>AUSTRIA 🇦🇹</span>
              <span className="slip-time-badge">Target B2</span>
            </div>
            <div className="slip-preview-line accent" />
            <div className="slip-preview-line" />
          </div>

          <div className="folder-front-pocket">
            <div className="pocket-header-row">
              <div>
                <h3 className="pocket-folder-name">JKU Linz</h3>
                <p className="pocket-folder-sub">Master's Goal</p>
              </div>
              <div className="pocket-icons-wrap">
                <Compass size={16} />
                <Settings size={14} />
              </div>
            </div>

            <div className="pocket-footer-click">
              <span>VIEW GOALS</span>
              <ArrowUpRight size={12} />
            </div>
          </div>
        </motion.div>

        {/* MINI-FOLDER 4: LOCATION & STATUS (EDITORIAL DARK SLATE) */}
        <motion.div
          className="mini-folder-card-wrap folder-dark-theme"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setActiveNote('location')}
        >
          <div className="folder-back-plate" />
          <div className="folder-top-tab" />

          <div className="paper-note-slip">
            <div className="slip-date-tag">
              <span>LOCATION</span>
              <span className="slip-time-badge" style={{ background: '#ecfdf5', color: '#10b981' }}>UTC +6</span>
            </div>
            <div className="slip-preview-line accent" />
            <div className="slip-preview-line" />
          </div>

          <div className="folder-front-pocket">
            <div className="pocket-header-row">
              <div>
                <h3 className="pocket-folder-name">Location</h3>
                <p className="pocket-folder-sub">Dhaka, Bangladesh</p>
              </div>
              <div className="pocket-icons-wrap">
                <MapPin size={16} />
                <FolderKanban size={14} />
              </div>
            </div>

            <div className="pocket-footer-click">
              <span>CHECK STATUS</span>
              <ArrowUpRight size={12} />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── 3. WHITE NOTE CARD MODAL WITH SPRING PHYSICS & TIMELINE UI ── */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            className="note-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              className="note-card-window"
              initial={{ scale: 0.88, opacity: 0, y: 24, rotateX: 6 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24, rotateX: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar */}
              <div className="note-card-top-bar">
                <div className="note-date-wrap">
                  <span>FILE TIMELINE NOTE</span>
                  <span className="note-time-chip">LIVE PREVIEW</span>
                </div>
                <button className="note-close-icon" onClick={() => setActiveNote(null)}>
                  <X size={16} />
                </button>
              </div>

              {/* Note Body with Vertical Timeline */}
              <div className="note-card-body">
                {/* EDUCATION TIMELINE NOTE */}
                {activeNote === 'education' && (
                  <>
                    <h4 className="note-main-heading">ACADEMIC BACKGROUND TIMELINE</h4>
                    
                    <div className="modal-timeline-wrap">
                      <div className="modal-timeline-step">
                        <span className="step-date-badge">2024 — PRESENT</span>
                        <h5 className="step-title-text">B.Sc. in Computer Science &amp; Engineering (5th Semester)</h5>
                        <p className="step-desc-text">
                          University of Global Village (UGV), Barishal. Focusing on software engineering, algorithm design, and database architectures.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill active-pill">UGV Barishal</span>
                          <span className="timeline-mini-pill">5th Sem</span>
                          <span className="timeline-mini-pill">CSE Major</span>
                        </div>
                      </div>

                      <div className="modal-timeline-step">
                        <span className="step-date-badge">2024 — ACTIVE</span>
                        <h5 className="step-title-text">Bengali CS Study Guides Author</h5>
                        <p className="step-desc-text">
                          Writing open computer science study guides in Bengali to make technical concepts accessible to university students.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill active-pill">Open Content</span>
                          <span className="timeline-mini-pill">Bengali CS</span>
                        </div>
                      </div>

                      <div className="modal-timeline-step">
                        <span className="step-date-badge">2023 — COMPLETED</span>
                        <h5 className="step-title-text">Compiler Design &amp; Management Systems</h5>
                        <p className="step-desc-text">
                          Engineered Lex/Flex compiler analysis tools and a Blood Bank Management System.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill">Lex / Flex</span>
                          <span className="timeline-mini-pill">C / C++</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* AI ROADMAP TIMELINE NOTE */}
                {activeNote === 'roadmap' && (
                  <>
                    <h4 className="note-main-heading">6-MONTH AI ENGINEER TRACK TIMELINE (~40%)</h4>

                    <div className="modal-timeline-wrap">
                      <div className="modal-timeline-step">
                        <span className="step-date-badge">MONTH 1 – 2 (COMPLETED)</span>
                        <h5 className="step-title-text">Python &amp; Data Analysis Foundations</h5>
                        <p className="step-desc-text">
                          Mastered Python syntax, NumPy array manipulation, Pandas dataframes, Matplotlib/Seaborn visualization, and data cleaning pipelines.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill active-pill">Python</span>
                          <span className="timeline-mini-pill">NumPy</span>
                          <span className="timeline-mini-pill">Pandas</span>
                        </div>
                      </div>

                      <div className="modal-timeline-step">
                        <span className="step-date-badge">MONTH 3 – 4 (ACTIVE ~40%)</span>
                        <h5 className="step-title-text">Mathematics for AI &amp; Classical ML</h5>
                        <p className="step-desc-text">
                          Linear Algebra (matrices, vectors, eigenvalues), Multivariable Calculus (gradients, optimization), Probability &amp; Scikit-Learn models.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill active-pill">Calculus</span>
                          <span className="timeline-mini-pill active-pill">Linear Algebra</span>
                          <span className="timeline-mini-pill">Scikit-learn</span>
                        </div>
                      </div>

                      <div className="modal-timeline-step">
                        <span className="step-date-badge">MONTH 5 – 6 (UPCOMING)</span>
                        <h5 className="step-title-text">Deep Learning &amp; Neural Architectures</h5>
                        <p className="step-desc-text">
                          Building neural networks from scratch with PyTorch, CNNs for vision, and Transformers for Generative AI applications.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill">PyTorch</span>
                          <span className="timeline-mini-pill">Deep Learning</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* JKU LINZ NOTE CARD */}
                {activeNote === 'goals' && (
                  <>
                    <h4 className="note-main-heading">MASTER'S GOAL: JKU LINZ · AUSTRIA 🇦🇹</h4>

                    <div className="modal-timeline-wrap">
                      <div className="modal-timeline-step">
                        <span className="step-date-badge">PHASE 1 (ACTIVE)</span>
                        <h5 className="step-title-text">German Language Certification (B2 Target)</h5>
                        <p className="step-desc-text">
                          Enrolled in intensive German language study targeting B2 proficiency for academic integration in Austria.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill active-pill">German B2</span>
                          <span className="timeline-mini-pill">Language Track</span>
                        </div>
                      </div>

                      <div className="modal-timeline-step">
                        <span className="step-date-badge">PHASE 2 (TARGET)</span>
                        <h5 className="step-title-text">M.Sc. in Artificial Intelligence @ JKU Linz</h5>
                        <p className="step-desc-text">
                          Johannes Kepler University Linz, Austria. Focusing on advanced autonomous systems and machine learning research.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill active-pill">JKU Linz 🇦🇹</span>
                          <span className="timeline-mini-pill">AI Master's</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* LOCATION NOTE CARD */}
                {activeNote === 'location' && (
                  <>
                    <h4 className="note-main-heading">LOCATION &amp; WORKING STATUS</h4>

                    <div className="modal-timeline-wrap">
                      <div className="modal-timeline-step">
                        <span className="step-date-badge">CURRENT BASE</span>
                        <h5 className="step-title-text">Dhaka, Bangladesh (UTC +6:00)</h5>
                        <p className="step-desc-text">
                          Available for remote Machine Learning engineering, software development roles, and open-source contributions worldwide.
                        </p>
                        <div className="step-tag-pills">
                          <span className="timeline-mini-pill active-pill">Dhaka Base</span>
                          <span className="timeline-mini-pill">UTC+6</span>
                        </div>
                      </div>
                    </div>

                    <div className="note-action-footer">
                      <button onClick={handleScrollToContact} className="note-btn-primary">
                        <span>SEND MESSAGE</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
