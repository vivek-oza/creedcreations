/**
 * Shared scroll-based animation variants for titles and descriptions.
 * Smooth easing, varied effects, and consistent timing.
 */

export const ease = [0.22, 1, 0.36, 1] as const;
export const easeOut = [0.16, 1, 0.3, 1] as const;

/** Section title: slide up + fade + subtle scale */
export const titleAnim = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

/** Description: slide up + fade with delay */
export const descAnim = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
};

/** Slide from left — for alternating layouts */
export const slideLeftAnim = {
  initial: { opacity: 0, x: -48 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

/** Slide from right */
export const slideRightAnim = {
  initial: { opacity: 0, x: 48 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

/** Reveal with longer distance — more dramatic */
export const revealAnim = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

/** Stagger children delay helper */
export const staggerDelay = (index: number, base = 0.06) => index * base;
