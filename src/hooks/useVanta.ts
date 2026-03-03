import { useEffect, useRef, useCallback, useState } from 'react';
import { logger } from '../utils/logger';

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

/** Load Vanta scripts dynamically after paint to avoid blocking LCP */
function loadVantaScripts(): Promise<{ VANTA: unknown; THREE: unknown }> {
  if (typeof window !== 'undefined' && window.VANTA && window.THREE) {
    return Promise.resolve({ VANTA: window.VANTA, THREE: window.THREE });
  }
  return new Promise((resolve, reject) => {
    const three = document.createElement('script');
    three.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    three.async = true;
    three.onload = () => {
      const vanta = document.createElement('script');
      vanta.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js';
      vanta.async = true;
      vanta.onload = () => resolve({ VANTA: (window as any).VANTA, THREE: (window as any).THREE });
      vanta.onerror = reject;
      document.body.appendChild(vanta);
    };
    three.onerror = reject;
    document.body.appendChild(three);
  });
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
      logger.error('Vanta effect init failed', { error: error instanceof Error ? error.message : 'Unknown' });
    }
  }, [overrides, skipVanta]);

  const destroyEffect = useCallback(() => {
    if (!vantaEffect.current) return;

    try {
      vantaEffect.current.destroy();
      vantaEffect.current = null;
    } catch (error) {
      logger.error('Vanta effect destroy failed', { error: error instanceof Error ? error.message : 'Unknown' });
    }
  }, []);

  // Initialize after scripts load (deferred to avoid blocking initial paint)
  useEffect(() => {
    if (skipVanta) return;

    let cancelled = false;
    loadVantaScripts()
      .then(() => {
        if (cancelled) return;
        createEffect();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      destroyEffect();
    };
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