/**
 * Centralized logging utility
 * In production, only errors are logged (to a logging service if configured).
 * Development: full logging. Production: minimal, no sensitive data.
 */

const isDev = import.meta.env.DEV;

export const logger = {
  error(message: string, context?: Record<string, unknown>): void {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error(`[CREED] ${message}`, context ?? '');
    }
    // Production: could send to error tracking (Sentry, etc.)
  },
  warn(message: string, context?: Record<string, unknown>): void {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn(`[CREED] ${message}`, context ?? '');
    }
  },
  debug(_message: string, _context?: Record<string, unknown>): void {
    if (isDev) {
      // Only in dev if needed
    }
  },
};
