
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
      // Clamp values to prevent overflow
      const x = Math.min(ev.clientX, window.innerWidth - 5);
      const normalizedX = Math.min(x / window.innerWidth - 0.5, 0.49);
      
      setMousePosition({
        x,
        y: ev.clientY,
        normalizedX,
        normalizedY: ev.clientY / window.innerHeight - 0.5
      });
      
      // Set isMoving to true when mouse moves
      setIsMoving(true);
      
      // Reset isMoving after some time
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };
    
    // Update on window resize to keep normalized values accurate
    const handleResize = () => {
      // Keep the last position but update normalized values
      setMousePosition(prev => ({
        ...prev,
        normalizedX: Math.min(prev.x / window.innerWidth - 0.5, 0.49),
        normalizedY: prev.y / window.innerHeight - 0.5
      }));
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);
  
  return { ...mousePosition, isMoving };
}
