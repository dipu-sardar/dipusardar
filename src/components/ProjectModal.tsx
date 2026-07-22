import React from 'react';
import type { Product } from '../types';
import { X, ExternalLink, Cpu } from 'lucide-react';
import './ProjectModal.css';

interface ProjectModalProps {
  project: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  // Custom simple parser to render basic markdown elements (headers, bullets, bold text)
  const renderDocumentation = (docText?: string) => {
    if (!docText) return null;

    return docText.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      
      // Headers (### Header)
      if (trimmed.startsWith('###')) {
        return (
          <h4 key={index} className="modal-doc-heading">
            {trimmed.replace('###', '').trim()}
          </h4>
        );
      }
      
      // Bullet lists
      if (trimmed.startsWith('-')) {
        return (
          <ul key={index} className="modal-doc-list">
            {trimmed.split('\n').map((line, lineIndex) => {
              const cleanLine = line.replace(/^-/, '').trim();
              const boldRegex = /^\*\*(.*?)\*\*(.*)/;
              const match = cleanLine.match(boldRegex);

              if (match) {
                return (
                  <li key={lineIndex}>
                    <strong>{match[1]}</strong>
                    {match[2]}
                  </li>
                );
              }
              return <li key={lineIndex}>{cleanLine}</li>;
            })}
          </ul>
        );
      }

      // Default paragraph
      return (
        <p key={index} className="modal-doc-para">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="project-modal-backdrop fade-in" onClick={onClose}>
      <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Project Image Banner */}
        <div className="project-modal-hero">
          <img src={project.image} alt={project.name} className="project-modal-img" />
          <div className="project-modal-gradient"></div>
        </div>

        {/* Project Header Info */}
        <div className="project-modal-body">
          <div className="project-modal-meta">
            <span className="project-modal-category">{project.category}</span>
          </div>

          <h2 className="project-modal-title">{project.name}</h2>
          
          <p className="project-modal-short-desc">{project.description}</p>

          {/* Tech Stack Badges */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="project-modal-tech-section">
              <h4 className="tech-section-title">
                <Cpu size={14} />
                <span>TECHNOLOGIES</span>
              </h4>
              <div className="project-modal-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          <div className="project-modal-divider"></div>

          {/* Documentation Details */}
          <div className="project-modal-documentation">
            <h3 className="doc-section-title">PROJECT OVERVIEW & DOCUMENTATION</h3>
            <div className="doc-content-body">
              {renderDocumentation(project.documentation)}
            </div>
          </div>

          <div className="project-modal-divider"></div>

          {/* Footer Actions */}
          <div className="project-modal-actions">
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-modal-action-btn live-btn"
              >
                <span>LAUNCH LIVE APP</span>
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-modal-action-btn github-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
