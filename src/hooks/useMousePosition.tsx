
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
      
      setMousePosition({
        x,
        y,
        normalizedX,
        normalizedY
      });
      
      // Set isMoving to true when mouse moves
      setIsMoving(true);
      
      // Reset isMoving after some time
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMoving(false);
      }, 50); // Reduced from 100ms to 50ms for faster response
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearTimeout(timeout);
    };
  }, []);
  
  return { ...mousePosition, isMoving };
}
