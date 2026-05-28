import { useCallback } from 'react';

interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  [key: string]: any;
}

export function useWaapi() {
  const animate = useCallback((target: any, options: AnimationOptions) => {
    if (!target) return;
    
    const element = Array.isArray(target) ? target[0] : target;
    if (!element || !element.animate) return;
    
    try {
      element.animate(
        [
          { transform: 'translateY(0)', opacity: 1 },
          { transform: 'translateY(0)', opacity: 1 }
        ],
        {
          duration: options.duration || 400,
          easing: options.easing || 'ease-out',
          fill: 'forwards'
        }
      );
    } catch (error) {
      console.warn('WAAPI animation failed:', error);
    }
  }, []);

  return { animate };
}