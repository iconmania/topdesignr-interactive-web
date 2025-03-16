
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
  
  const [isMoving, setIsMoving] = useState(false);
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const updateMousePosition = (ev: MouseEvent) => {
      // Prevent values that would cause overflow by clamping them
      const x = Math.min(Math.max(0, ev.clientX), window.innerWidth);
      const y = Math.min(Math.max(0, ev.clientY), window.innerHeight);
      
      // Normalized values between -0.5 and 0.5
      const normalizedX = (x / window.innerWidth) - 0.5;
      const normalizedY = (y / window.innerHeight) - 0.5;
      
      // Direct setting of state for faster response
      setMousePosition({
        x,
        y,
        normalizedX,
        normalizedY
      });
      
      // Set isMoving to true when mouse moves
      setIsMoving(true);
      
      // Reset isMoving after shorter timeout for faster response
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMoving(false);
      }, 30); // Reduced from 50ms to 30ms for faster response
    };
    
    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearTimeout(timeout);
    };
  }, []);
  
  return { ...mousePosition, isMoving };
}
