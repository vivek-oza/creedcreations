import React from 'react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CometCardProps {
  className?: string;
  children: ReactNode;
}

export const CometCard: React.FC<CometCardProps> = ({ className, children }) => {
  return (
    <motion.div
      className={cn('relative rounded-2xl transition-transform', className)}
      initial={{ scale: 1, y: 0, boxShadow: '0 18px 40px rgba(0,0,0,0.55)' }}
      whileHover={{
        scale: 1.03,
        y: -6,
        boxShadow: '0 28px 70px rgba(0,0,0,0.75)',
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
    >
      {children}
    </motion.div>
  );
};

