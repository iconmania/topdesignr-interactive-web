
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function StyleCursor() {
  const { x, y, isMoving } = useMousePosition();
  const [cursorType, setCursorType] = useState<"default" | "design" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const trackCursorType = () => {
      const elements = document.querySelectorAll("[data-cursor]");
      const handleMouseOver = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const cursorType = target.dataset.cursor as "default" | "design" | "text";
        setCursorType(cursorType || "default");
      };
      
      const handleMouseOut = () => {
        setCursorType("default");
      };
      
      elements.forEach(element => {
        element.addEventListener("mouseover", handleMouseOver);
        element.addEventListener("mouseout", handleMouseOut);
      });
      
      return () => {
        elements.forEach(element => {
          element.removeEventListener("mouseover", handleMouseOver);
          element.removeEventListener("mouseout", handleMouseOut);
        });
      };
    };
    
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    
    const cleanup = trackCursorType();
    
    return () => {
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cleanup();
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Base cursor */}
      <div 
        className={`fixed pointer-events-none z-50 transition-all duration-100 ${isMoving ? 'scale-90' : 'scale-100'}`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`rounded-full mix-blend-difference transition-all duration-200 ${
            cursorType === "default" ? "w-6 h-6 bg-white" :
            cursorType === "design" ? "w-12 h-12 border-2 border-white bg-transparent" :
            "w-16 h-16 border border-white bg-transparent"
          }`}
        />
      </div>
      
      {/* Text cursor */}
      {cursorType === "text" && (
        <div 
          className="fixed pointer-events-none z-50 text-white mix-blend-difference font-light"
          style={{
            left: `${x + 20}px`,
            top: `${y}px`,
            transform: 'translateY(-50%)'
          }}
        >
          Text
        </div>
      )}
      
      {/* Design cursor */}
      {cursorType === "design" && (
        <div 
          className="fixed pointer-events-none z-50 text-white mix-blend-difference font-light"
          style={{
            left: `${x + 20}px`,
            top: `${y}px`,
            transform: 'translateY(-50%)'
          }}
        >
          View
        </div>
      )}
    </>
  );
}
