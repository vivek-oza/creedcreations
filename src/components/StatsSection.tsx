import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { motion, useInView } from 'motion/react';

interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: '10', label: 'Years in business' },
  { value: '100', suffix: '+', label: 'Projects Delivered' },
  { value: '70', suffix: '+', label: 'Satisfied Clients' },
];

function AnimatedCounter({
  target,
  suffix = '',
  duration = 2000,
  inView,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = Math.floor(eased * target);
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplay(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [inView, target, duration]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function StatBlock({
  stat,
  index,
  inView,
}: {
  stat: StatItem;
  index: number;
  inView: boolean;
}) {
  const numValue = parseInt(stat.value, 10);
  const hasNumber = !Number.isNaN(numValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex flex-col items-center text-center group cursor-default"
    >
      <div
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white group-hover:text-neon-orange transition-colors duration-300"
        style={{ fontFamily: "'Archivo Black', sans-serif" }}
      >
        {hasNumber ? (
          <AnimatedCounter
            target={numValue}
            suffix={stat.suffix ?? ''}
            inView={inView}
            duration={2800}
          />
        ) : (
          stat.value + (stat.suffix ?? '')
        )}
      </div>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base font-medium uppercase tracking-widest text-white/60">
        {stat.label}
      </p>
    </motion.div>
  );
}

const StatsSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: '0px 0px -80px 0px',
  });

  return (
    <section
      ref={ref}
      id="stats"
      className="bg-black py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-heading text-white text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-4 text-center md:text-left"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
        >
          OUR STATS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/70 text-base sm:text-lg max-w-2xl mb-12 sm:mb-16 text-center md:text-left leading-relaxed"
        >
          A decade of creativity, hundreds of projects delivered, and trusted by brands worldwide — numbers that speak for themselves.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 md:gap-12 lg:gap-16 items-stretch">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col',
                index > 0 && 'sm:border-l sm:border-white/15 sm:pl-12 md:pl-16'
              )}
            >
              <StatBlock stat={stat} index={index} inView={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
