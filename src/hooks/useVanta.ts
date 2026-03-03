import { useEffect, useRef, useCallback, useState } from 'react';

interface VantaEffect {
  destroy: () => void;
}

/** Detect mobile/touch - skip Vanta to avoid WebGL issues and white screen */
function isMobileOrTouch(): boolean {
  if (typeof window === 'undefined') return true; // SSR: assume mobile, skip Vanta
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 768px)').matches ||
    'ontouchstart' in window
  );
}

interface VantaWavesOptions {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  color: number;
  shininess: number;
  waveHeight: number;
  waveSpeed: number;
  zoom: number;
}

declare global {
  interface Window {
    VANTA: {
      WAVES: (options: VantaWavesOptions) => VantaEffect;
    };
    THREE: unknown;
  }
}

const DEFAULT_VANTA_CONFIG: Omit<VantaWavesOptions, 'el'> = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x882200,
  shininess: 30,
  waveHeight: 15,
  waveSpeed: 1,
  zoom: 1,
};

/**
 * Custom hook for managing Vanta.js waves effect.
 * Handles initialization, cleanup, and responsive resize.
 */
export const useVanta = (overrides: Partial<Omit<VantaWavesOptions, 'el'>> = {}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);
  const [skipVanta] = useState(() => isMobileOrTouch());

  const createEffect = useCallback(() => {
    if (skipVanta) return;
    if (!vantaRef.current || !window.VANTA || !window.THREE) return;

    try {
      vantaEffect.current = window.VANTA.WAVES({
        el: vantaRef.current,
        ...DEFAULT_VANTA_CONFIG,
        ...overrides,
      });
    } catch (error) {
      console.error('Failed to initialize Vanta effect:', error);
    }
  }, [overrides, skipVanta]);

  const destroyEffect = useCallback(() => {
    if (!vantaEffect.current) return;

    try {
      vantaEffect.current.destroy();
      vantaEffect.current = null;
    } catch (error) {
      console.error('Failed to destroy Vanta effect:', error);
    }
  }, []);

  // Initialize and cleanup (skip on mobile to prevent WebGL white screen)
  useEffect(() => {
    if (skipVanta) return;
    if (typeof window === 'undefined' || !window.VANTA || !window.THREE) return;

    createEffect();
    return destroyEffect;
  }, [createEffect, destroyEffect, skipVanta]);

  // Debounced resize handler (only when Vanta is active)
  useEffect(() => {
    if (skipVanta) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        destroyEffect();
        createEffect();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [createEffect, destroyEffect, skipVanta]);

  return vantaRef;
};