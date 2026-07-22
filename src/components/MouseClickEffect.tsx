import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickEvent {
  id: number;
  x: number;
  y: number;
}

export const MouseClickEffect: React.FC = () => {
  const [clicks, setClicks] = useState<ClickEvent[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setClicks((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        },
      ]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleAnimationComplete = (id: number) => {
    setClicks((prev) => prev.filter((click) => click.id !== id));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {clicks.map((click) => (
          <ClickBurst
            key={click.id}
            x={click.x}
            y={click.y}
            onComplete={() => handleAnimationComplete(click.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ClickBurstProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const ClickBurst: React.FC<ClickBurstProps> = ({ x, y, onComplete }) => {
  const size = 80;
  const half = size / 2;
  const duration = 0.5;
  const strokeWidth = 1.5;
  const color = 'var(--color-accent-orange)';

  // 8 symmetric angles (in radians)
  const angles = Array.from({ length: 8 }, (_, i) => (i * 45 * Math.PI) / 180);

  return (
    <svg
      width={size}
      height={size}
      style={{
        position: 'absolute',
        left: x - half,
        top: y - half,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {/* Expanding Ripple Ring */}
      <motion.circle
        cx={half}
        cy={half}
        initial={{ r: 4, opacity: 1, strokeWidth }}
        animate={{ r: 24, opacity: 0, strokeWidth: 0.5 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        fill="none"
        stroke={color}
      />

      {/* 8-ray Burst Lines */}
      {angles.map((angle, index) => {
        // Start coords
        const x1Start = half + Math.cos(angle) * 6;
        const y1Start = half + Math.sin(angle) * 6;
        const x2Start = half + Math.cos(angle) * 14;
        const y2Start = half + Math.sin(angle) * 14;

        // End coords
        const x1End = half + Math.cos(angle) * 22;
        const y1End = half + Math.sin(angle) * 22;
        const x2End = half + Math.cos(angle) * 26;
        const y2End = half + Math.sin(angle) * 26;

        return (
          <motion.line
            key={index}
            initial={{ x1: x1Start, y1: y1Start, x2: x2Start, y2: y2Start, opacity: 1, strokeWidth }}
            animate={{
              x1: [x1Start, x1End],
              y1: [y1Start, y1End],
              x2: [x2Start, x2End],
              y2: [y2Start, y2End],
              opacity: [1, 1, 0],
              strokeWidth: [strokeWidth, strokeWidth * 0.5, 0],
            }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={index === 0 ? onComplete : undefined}
            stroke={color}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};
