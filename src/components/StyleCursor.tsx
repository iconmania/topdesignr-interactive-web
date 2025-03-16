
import { useMousePosition } from "@/hooks/useMousePosition";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export default function StyleCursor() {
  const { x, y, isMoving } = useMousePosition();
  const { theme } = useTheme();
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  useEffect(() => {
    // Track when mouse is over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || 
          target.closest('button') || target.closest('a')) {
        setHoveredElement(target.tagName.toLowerCase());
      } else {
        setHoveredElement(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Determine cursor style based on theme and element being hovered
  const getCursorStyle = () => {
    if (theme === 'dark') {
      return hoveredElement 
        ? 'mix-blend-difference bg-white border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]' 
        : 'border-2 border-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.3)]';
    } else {
      return hoveredElement 
        ? 'mix-blend-difference bg-white border border-blue-400/50' 
        : 'border border-primary/50 backdrop-blur-sm';
    }
  };

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full transition-transform duration-75 ${
          isMoving ? 'scale-100' : 'scale-90'
        } ${
          hoveredElement ? 'w-8 h-8' : 'w-5 h-5'
        } ${getCursorStyle()}`}
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
        }}
      >
        {theme === 'dark' && (
          <div className="absolute inset-0 rounded-full opacity-50 animate-pulse-slow" 
            style={{background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)'}}
          />
        )}
      </div>
      
      {/* Secondary cursor/trail effect */}
      <div
        className={`fixed pointer-events-none z-[9998] rounded-full opacity-30 w-12 h-12 transition-all duration-200 ${
          theme === 'dark' 
            ? 'border border-cyan-500' 
            : 'border border-blue-400/20 backdrop-blur-sm'
        }`}
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${isMoving ? 1.2 : 0.8})`,
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />
    </>
  );
}
