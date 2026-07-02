import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const getVariants = () => {
    if (direction === 'none') {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, delay } },
      };
    }

    const offsets = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { x: 40, y: 0 },
      right: { x: -40, y: 0 },
    };

    return {
      hidden: {
        opacity: 0,
        x: offsets[direction].x,
        y: offsets[direction].y,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: 'spring' as const,
          stiffness: 70,
          damping: 15,
          duration: 0.6,
          delay,
        },
      },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};
