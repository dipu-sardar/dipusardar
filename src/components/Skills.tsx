import React from 'react';
import {
  Sparkles,
  Code2,
  Flame,
  Network,
  Eye,
  Atom,
  Braces,
  Palette,
  Boxes,
  Workflow,
  Cpu,
  GitBranch,
  Hexagon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './Skills.css';

interface SkillMark {
  name: string;
  icon: LucideIcon;
  color: string;
}

const SKILLS: SkillMark[] = [
  { name: 'Python', icon: Code2, color: '#3776AB' },
  { name: 'PyTorch', icon: Flame, color: '#EE4C2C' },
  { name: 'TensorFlow', icon: Network, color: '#FF6F00' },
  { name: 'OpenCV', icon: Eye, color: '#5C3EE8' },
  { name: 'React', icon: Atom, color: '#149ECA' },
  { name: 'TypeScript', icon: Braces, color: '#3178C6' },
  { name: 'Figma', icon: Palette, color: '#A259FF' },
  { name: 'Docker', icon: Boxes, color: '#2496ED' },
  { name: 'ROS · 2', icon: Workflow, color: '#22A6B3' },
  { name: 'CUDA', icon: Cpu, color: '#76B900' },
  { name: 'Git', icon: GitBranch, color: '#F05033' },
  { name: 'Node.js', icon: Hexagon, color: '#539E43' },
];

export const Skills: React.FC = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-header-text">
        <span className="skills-badge">
          <Sparkles size={13} />
          SKILLS &amp; TECH STACK
        </span>

        <h2 className="skills-headline">
          <span className="skills-headline-italic">built with</span>
          <span className="skills-headline-bold">the tools I trust.</span>
        </h2>

        <p className="skills-desc">
          I've spent real hours inside every one of these — training models,
          shipping interfaces, and debugging pipelines at 2am. This is the
          stack I reach for when an idea needs to become something people
          can actually use, not just a framework I've read the docs for.
        </p>
      </div>

      <div className="skills-grid">
        {SKILLS.map(({ name, icon: Icon, color }) => (
          <div key={name} className="skill-card" style={{ '--skill-color': color } as React.CSSProperties}>
            <div className="skill-icon-circle">
              <Icon size={22} strokeWidth={2} />
            </div>
            <span className="skill-name">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
