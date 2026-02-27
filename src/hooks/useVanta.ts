import { useEffect, useRef, useCallback } from 'react';

interface VantaEffect {
  destroy: () => void;
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

  const createEffect = useCallback(() => {
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
  }, [overrides]);

  const destroyEffect = useCallback(() => {
    if (!vantaEffect.current) return;

    try {
      vantaEffect.current.destroy();
      vantaEffect.current = null;
    } catch (error) {
      console.error('Failed to destroy Vanta effect:', error);
    }
  }, []);

  // Initialize and cleanup
  useEffect(() => {
    if (!window.VANTA || !window.THREE) {
      console.warn('Vanta.js or Three.js not loaded');
      return;
    }

    createEffect();
    return destroyEffect;
  }, [createEffect, destroyEffect]);

  // Debounced resize handler
  useEffect(() => {
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
  }, [createEffect, destroyEffect]);

  return vantaRef;
};