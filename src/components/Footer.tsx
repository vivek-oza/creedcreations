import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Instagram, Linkedin, Phone } from 'lucide-react';

const TAG_LINE = 'Bold. Disruptive. Creative.';
const VISIT_STORAGE_KEY = 'creed_visits';
const VISIT_DISPLAY_BASE = 10750; // Base so displayed count shows 10,751+ on first visit

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/creed_creation/', icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/creedcreation/', icon: Linkedin },
  { name: 'Phone', href: 'tel:7600111331', icon: Phone },
  { name: 'WhatsApp', href: 'https://wa.me/7600111331', icon: WhatsAppIcon },
] as const;

function AnimatedVisitCounter({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setDisplay(Math.floor(eased * value));

      if (progress < 1) requestAnimationFrame(update);
      else setDisplay(value);
    };

    requestAnimationFrame(update);
  }, [inView, value]);

  const displayStr = display.toLocaleString();
  const displayBody = displayStr.slice(0, -1);
  const displayLast = displayStr.slice(-1);
  const atEnd = display >= value && value > 0;

  return (
    <span className="tabular-nums">
      {displayBody}
      <span
        key={atEnd ? `roll-${displayLast}` : 'static'}
        className={atEnd ? 'inline-block min-w-[0.55em] text-neon-orange align-bottom animate-roll-digit' : 'inline-block min-w-[0.55em] text-neon-orange align-bottom'}
      >
        {displayLast}
      </span>
    </span>
  );
}

interface FooterProps {
  onContactClick?: () => void;
}

const Footer: React.FC<FooterProps> = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(VISIT_STORAGE_KEY);
      const count = stored ? parseInt(stored, 10) + 1 : 1;
      if (!Number.isNaN(count)) {
        localStorage.setItem(VISIT_STORAGE_KEY, String(count));
        setVisitCount(count + VISIT_DISPLAY_BASE);
      } else {
        setVisitCount(1 + VISIT_DISPLAY_BASE);
      }
    } catch {
      setVisitCount(1 + VISIT_DISPLAY_BASE);
    }
  }, []);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative bg-black text-white overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
        {/* Row 1: Brand + Tagline (left) | Social (right) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8"
        >
          <div>
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight uppercase mb-0.5"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              CREED CREATIONS
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              {TAG_LINE}
            </p>
            <p className="text-white/50 text-xs sm:text-sm mt-2">
              901, 9th Fl, Shreeji Signature, Sargasan, Gandhinagar, Gujarat
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              href="tel:7600111331"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm uppercase tracking-wide hover:bg-neon-orange hover:text-white transition-all duration-300"
            >
              Book a call
            </motion.a>
            {SOCIAL_LINKS.map((link, idx) => {
              const Icon = link.icon;
              const isExternal = link.href.startsWith('http') || link.href.startsWith('https');
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.1 + idx * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  aria-label={link.name}
                  className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/5 hover:bg-neon-orange hover:border-neon-orange hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px bg-white/10 origin-left mb-6"
        />

        {/* Row 2: Visit Counter (larger) | Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-widest text-white/60 text-xs sm:text-sm">Visits</span>
            <span className="font-bold text-neon-orange text-xl sm:text-2xl tabular-nums" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              <AnimatedVisitCounter value={visitCount} inView={isInView} />
            </span>
          </div>
          <p className="text-white/50 text-xs sm:text-sm">
            © 2026 CREED CREATIONS. All rights reserved. Website by{' '}
            <a
              href="https://digilynk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-neon-orange transition-colors duration-300"
            >
              Digilynk.in
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
