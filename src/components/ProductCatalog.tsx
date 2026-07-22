import React from 'react';
import type { Product } from '../types';
import { Eye, ExternalLink } from 'lucide-react';
import './ProductCatalog.css';

// Import local assets
import assignmentPlannerImg from '../assets/assignment_planner.png';
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

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct
}) => {
  return (
    <section className="product-catalog-section" id="projects">
      <div className="catalog-header">
        <h2 className="catalog-subtitle">SELECTED WORK</h2>
        <h1 className="catalog-title">FEATURED PROJECTS</h1>
        <p className="catalog-intro">
          Explore our latest collection of deep learning architectures, generative interfaces, and technical designs, bridging logic and interaction.
        </p>
      </div>

      <div className="product-grid">
        {PRODUCTS.map((product) => {
          return (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => onSelectProduct(product)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-actions-overlay">
                  <button 
                    className="product-action-btn view-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    title="View Details"
                    aria-label="View Project Details"
                  >
                    <Eye size={18} />
                  </button>
                  {product.liveLink && (
                    <a 
                      href={product.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-action-btn launch-app-btn"
                      onClick={(e) => e.stopPropagation()}
                      title="Launch Live App"
                      aria-label="Launch Live App"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {product.githubLink && (
                    <a 
                      href={product.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-action-btn code-repo-btn"
                      onClick={(e) => e.stopPropagation()}
                      title="View GitHub Code"
                      aria-label="View GitHub Code"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <div className="product-title-row">
                  <h3 className="product-name">{product.name}</h3>
                </div>
                <p className="product-desc">{product.description}</p>
                
                {/* Direct Action Buttons at Bottom */}
                <div className="project-card-actions">
                  <button 
                    className="project-card-btn details-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                  >
                    <Eye size={14} />
                    <span>DETAILS</span>
                  </button>
                  {product.liveLink && (
                    <a 
                      href={product.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card-btn live-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                      <span>LIVE</span>
                    </a>
                  )}
                  {product.githubLink && (
                    <a 
                      href={product.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card-btn github-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                      <span>CODE</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
