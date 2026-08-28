import React from 'react';
import type { Product } from '../types';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './ProductCatalog.css';

// Import local assets
import assignmentPlannerImg from '../assets/assignment_planner.png';
import assignmentPlannerVideo from '../assets/project_1.mov';
import dsCanvasImg from '../assets/ds_canvas.png';
import editorialManImg from '../assets/editorial_man.png';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Assignment Planner',
    price: 78,
    image: assignmentPlannerImg,
    video: assignmentPlannerVideo,
    category: 'PRODUCTIVITY / EDTECH',
    description: 'An intelligent academic management portal designed for BSc CSE students to track, organize, and submit assignments and class tests.',
    liveLink: 'https://assignment-planner-phi.vercel.app',
    githubLink: 'https://github.com/dipu-sardar/Assignment-Planner',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    documentation: `Assignment Planner is a state-of-the-art web portal designed to assist Computer Science and Engineering students in tracking and planning their academic assignments, exams, and projects.

### Key Features
- **Dynamic Task Tracker:** Automatically classifies tasks into Status categories (Pending, In Progress, Done, Late).
- **Warning Notifications:** Features visual warnings for assignments due within 2-3 days.
- **Subject-Wise Filtering:** Allows seamless filtering of academic tasks based on semester subjects (e.g. Economics, Operating Systems, Applied Statistics).
- **Clean & Responsive Layout:** Offers a beautiful academic dashboard designed to optimize study workflows.

Built using React, Vite, and Tailwind CSS, it enables students to plan their study schedules and never miss a deadline.`
  },
  {
    id: 'prod-2',
    name: 'DS Canvas',
    price: 64,
    image: dsCanvasImg,
    category: 'GENERATIVE DESIGN / WEB APP',
    description: 'An interactive digital canvas web app that allows users to generate custom color pattern wallpapers using various textures, scales, and densities.',
    liveLink: 'https://ds-studio-two.vercel.app',
    githubLink: 'https://github.com/dipu-sardar/Ds-Studio',
    technologies: ['HTML5 Canvas', 'Vanilla JS', 'CSS3 Variables', 'Aesthetic Presets', 'HD Exporter'],
    documentation: `DS Canvas is an interactive web tool that enables users to design, customize, and export high-resolution color pattern wallpapers for desktops and phones.

### Key Features
- **Dynamic Pattern Settings:** Choose from multiple generator algorithms (e.g. Stained Glass, Grid, Grid-Texture) to create beautiful custom abstract art.
- **Aesthetic Randomizer:** Features quick randomize presets including Minimal, Pastel, Vibrant, and Modern Patterns.
- **Precise Controls:** Interactively adjust scale, density, angle, and texture intensity in real-time.
- **High-Quality Exporter:** Support for exporting high-definition PNG files in Desktop Full HD (1920x1080), Phone Full HD (1080x1920), Desktop 4K (3840x2160), or custom resolution dimensions.
- **Light/Dark & Theme Modes:** Offers dynamic background color themes for customized workspaces.

Developed as a fully clientside, high-performance canvas engine that runs smoothly in any modern web browser.`
  },
  {
    id: 'prod-3',
    name: 'Autonomous Edge Traversal',
    price: 240,
    image: editorialManImg,
    category: 'ROBOTICS',
    description: 'A fully integrated computer vision and edge computing platform for autonomous drone navigation.',
    liveLink: 'https://github.com/dipu-sardar',
    githubLink: 'https://github.com/dipu-sardar',
    technologies: ['C++', 'Python', 'ROS2', 'OpenCV', 'TensorRT', 'CUDA'],
    documentation: `Autonomous Edge Traversal is a computer vision and navigation stack built for edge hardware (like Jetson Nano/Orin) to navigate complex indoor and outdoor landscapes.

### Key Features
- **Real-Time Obstacle Avoidance:** Leverages TensorRT-accelerated deep learning models for depth estimation and semantic segmentation.
- **SLAM Integration:** Built-in simultaneous localization and mapping (SLAM) using stereo vision.
- **Low-Latency Pipelines:** Multi-threaded C++ pipeline designed for maximum performance on resource-constrained robotics hardware.

Successfully deployed on quadcopters for automated search-and-rescue and technical site inspections.`
  }
];

// Short hand-drawn badge caption per project (mirrors the reference sticker)
const BADGE_CAPTIONS: Record<string, string> = {
  'prod-1': 'Deadline slayer & student-brain whisperer',
  'prod-2': 'Pixel alchemist & wallpaper vending machine',
  'prod-3': 'Sees obstacles before the drone does'
};

const GithubGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct }) => {
  return (
    <section className="projects-section" id="projects">
      <header className="projects-intro">
        <span className="projects-eyebrow">Selected Work</span>
        <h2 className="projects-heading">
          Builds, prototypes, and the things I&rsquo;ve actually shipped.
        </h2>
        <p className="projects-lede">
          Every project starts from a real problem &mdash; not a template. Here are a few
          I&rsquo;ve taken from a blank file to something people use.
        </p>
      </header>

      <div className="projects-rows">
        {PRODUCTS.map((product, index) => {
          const flipped = index % 2 === 1;
          const number = String(index + 1).padStart(2, '0');

          return (
            <article
              key={product.id}
              className={`proj-row${flipped ? ' proj-row--flip' : ''}`}
            >
              {/* ── Copy column ─────────────────────────────── */}
              <div className="proj-copy">
                <span className="proj-kicker">
                  <span className="proj-kicker-num">{number}</span>
                  <span className="proj-kicker-dash" aria-hidden="true" />
                  {product.category}
                </span>

                <h3 className="proj-headline">{product.name}</h3>

                <p className="proj-body">{product.description}</p>

                <div className="proj-actions">
                  <button
                    type="button"
                    className="proj-cta"
                    onClick={() => onSelectProduct(product)}
                  >
                    View Project
                    <ArrowRight size={17} strokeWidth={2.4} />
                  </button>

                  {product.liveLink && (
                    <a
                      href={product.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-textlink"
                    >
                      Live <ArrowUpRight size={14} strokeWidth={2.4} />
                    </a>
                  )}
                  {product.githubLink && (
                    <a
                      href={product.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-textlink"
                    >
                      <GithubGlyph />
                      Code
                    </a>
                  )}
                </div>
              </div>

              {/* ── Visual column ───────────────────────────── */}
              <div className="proj-visual">
                <div className="proj-stripes" aria-hidden="true" />

                <button
                  type="button"
                  className="proj-frame"
                  onClick={() => onSelectProduct(product)}
                  aria-label={`Open ${product.name} case study`}
                >
                  {product.video ? (
                    <video
                      className="proj-media"
                      src={product.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img className="proj-media" src={product.image} alt={product.name} />
                  )}
                </button>

                <div className="proj-badge" aria-hidden="true">
                  <span className="proj-badge-text">{BADGE_CAPTIONS[product.id]}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
