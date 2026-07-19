import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion';
import './InfiniteCarousel.css';

// ── Card data ──────────────────────────────────────────────────────────────
interface CarouselCard {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  accent: string;   // CSS colour for the tinted top strip / glow
  icon: string;     // emoji / text icon
  year: string;
}

const CARDS: CarouselCard[] = [
  {
    id: 'c1',
    title: 'Neural Vision',
    subtitle: 'Semantic Segmentation',
    tag: 'COMPUTER VISION',
    accent: '#e05e35',
    icon: '👁',
    year: '2024',
  },
  {
    id: 'c2',
    title: 'Latent Space',
    subtitle: 'Embedding Visualizer',
    tag: 'GENERATIVE AI',
    accent: '#6c63ff',
    icon: '✦',
    year: '2024',
  },
  {
    id: 'c3',
    title: 'Edge Traverse',
    subtitle: 'Autonomous Navigation',
    tag: 'ROBOTICS',
    accent: '#1db954',
    icon: '◈',
    year: '2023',
  },
  {
    id: 'c4',
    title: 'Diffusion Art',
    subtitle: 'Stable Diffusion Fine-tune',
    tag: 'IMAGE GEN',
    accent: '#f7c948',
    icon: '◉',
    year: '2024',
  },
  {
    id: 'c5',
    title: 'Signal Flow',
    subtitle: 'Real-time Audio ML',
    tag: 'AUDIO AI',
    accent: '#e0356a',
    icon: '〜',
    year: '2023',
  },
  {
    id: 'c6',
    title: 'LLM Forge',
    subtitle: 'Fine-tuned Language Model',
    tag: 'NLP',
    accent: '#00b4d8',
    icon: '⟡',
    year: '2025',
  },
  {
    id: 'c7',
    title: 'Pose Craft',
    subtitle: 'Human Pose Estimation',
    tag: 'CV · POSE',
    accent: '#ff9f43',
    icon: '⌬',
    year: '2024',
  },
  {
    id: 'c8',
    title: 'Mesh Mind',
    subtitle: '3D Point Cloud Learning',
    tag: '3D · DEEP LEARNING',
    accent: '#a29bfe',
    icon: '⬡',
    year: '2025',
  },
];

// ── Physics-based infinite scroller ───────────────────────────────────────
const CARD_WIDTH = 220;   // px  (must match --carousel-card-w in CSS)
const CARD_GAP   = 20;    // px  (must match --carousel-gap in CSS)
const STEP       = CARD_WIDTH + CARD_GAP;
const SPEED      = 60;    // px per second (base scroll speed)

interface LoopProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  /** Total pixel width of ONE full set of items */
  totalWidth: number;
}

const InfiniteLoop: React.FC<LoopProps> = ({
  children,
  speed = SPEED,
  pauseOnHover = true,
  totalWidth,
}) => {
  const x = useMotionValue(0);
  const isPaused = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Wrap x into [−totalWidth, 0) so it loops perfectly
  const wrappedX = useTransform(x, (v) => wrap(-totalWidth, 0, v));

  // Native DOM listeners — more reliable than React synthetic events
  // when Framer Motion's animation frame is involved
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !pauseOnHover) return;
    const pause  = () => { isPaused.current = true; };
    const resume = () => { isPaused.current = false; };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    return () => {
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, [pauseOnHover]);

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return;
    x.set(x.get() - (speed * delta) / 1000);
  });

  return (
    <div ref={containerRef} className="carousel-track-container">
      <motion.div
        className="carousel-track"
        style={{ x: wrappedX }}
      >
        {/* Render children TWICE so the loop is seamless */}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

// ── Individual card ────────────────────────────────────────────────────────
const Card: React.FC<{ card: CarouselCard }> = ({ card }) => (
  <motion.div
    className="carousel-card"
    whileHover={{ y: -8, scale: 1.04 }}
    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    style={{ '--card-accent': card.accent } as React.CSSProperties}
  >
    {/* Tinted top strip – mimics album cover art area */}
    <div className="card-art-area">
      <div className="card-art-bg" />
      <span className="card-icon">{card.icon}</span>
      <span className="card-year">{card.year}</span>
    </div>

    {/* Bottom info */}
    <div className="card-body">
      <span className="card-tag">{card.tag}</span>
      <h3 className="card-title">{card.title}</h3>
      <p className="card-subtitle">{card.subtitle}</p>
    </div>
  </motion.div>
);

// ── Main export ────────────────────────────────────────────────────────────
export const InfiniteCarousel: React.FC = () => {
  const totalWidth = CARDS.length * STEP;

  return (
    <section className="carousel-section">
      {/* Section header */}
      <div className="carousel-header">
        <span className="carousel-kicker">TOOLS &amp; EXPERIMENTS</span>
        <h2 className="carousel-heading">
          ALWAYS <span className="carousel-heading-accent">BUILDING</span>
        </h2>
      </div>

      {/* Outer wrapper provides the edge-fade mask */}
      <div className="carousel-mask-wrapper">
        <InfiniteLoop totalWidth={totalWidth} speed={SPEED}>
          {CARDS.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </InfiniteLoop>
      </div>
    </section>
  );
};
