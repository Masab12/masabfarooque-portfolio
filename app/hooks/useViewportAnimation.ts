import { useEffect, useState, RefObject } from 'react';

interface UseViewportAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

interface UseViewportAnimationReturn {
  isVisible: boolean;
}

export function useViewportAnimation<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseViewportAnimationOptions = {}
): UseViewportAnimationReturn {
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.1, triggerOnce = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, triggerOnce]);

  return { isVisible };
}