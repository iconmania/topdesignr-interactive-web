
import { useEffect, useRef, useState, RefObject } from 'react';

type AnimationOptions = {
  threshold?: number;
  delay?: number;
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
};

export function useScrollAnimation<T extends HTMLElement>(
  options: AnimationOptions = {}
): [RefObject<T>, boolean] {
  const {
    threshold = 0.1,
    delay = 0,
    root = null,
    rootMargin = '0px',
    once = true,
  } = options;
  
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, once, delay]);

  return [ref, isVisible];
}

// Common animation classes
export const fadeInUpAnimation = (isVisible: boolean, delay = 0) => 
  `transition-all duration-1000 ${
    isVisible 
      ? "opacity-100 translate-y-0" 
      : "opacity-0 translate-y-10"
  } ${delay ? `delay-${delay}` : ''}`;

export const fadeInAnimation = (isVisible: boolean, delay = 0) => 
  `transition-all duration-1000 ${
    isVisible 
      ? "opacity-100" 
      : "opacity-0"
  } ${delay ? `delay-${delay}` : ''}`;

export const scaleInAnimation = (isVisible: boolean, delay = 0) => 
  `transition-all duration-1000 ${
    isVisible 
      ? "opacity-100 scale-100" 
      : "opacity-0 scale-95"
  } ${delay ? `delay-${delay}` : ''}`;

export const slideInRightAnimation = (isVisible: boolean, delay = 0) => 
  `transition-all duration-1000 ${
    isVisible 
      ? "opacity-100 translate-x-0" 
      : "opacity-0 -translate-x-10"
  } ${delay ? `delay-${delay}` : ''}`;

export const slideInLeftAnimation = (isVisible: boolean, delay = 0) => 
  `transition-all duration-1000 ${
    isVisible 
      ? "opacity-100 translate-x-0" 
      : "opacity-0 translate-x-10"
  } ${delay ? `delay-${delay}` : ''}`;
