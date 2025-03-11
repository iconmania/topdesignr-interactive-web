
import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ 
    x: 0, 
    y: 0,
    normalizedX: 0,
    normalizedY: 0
  });
  
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({
        x: ev.clientX,
        y: ev.clientY,
        normalizedX: ev.clientX / window.innerWidth - 0.5,
        normalizedY: ev.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}
