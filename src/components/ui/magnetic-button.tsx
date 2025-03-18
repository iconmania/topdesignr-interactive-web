
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  className?: string;
  children: React.ReactNode;
  rounded?: boolean;
  glowColor?: string;
  distance?: number;
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ 
    strength = 25, 
    className, 
    children, 
    rounded = true, 
    glowColor = "rgba(var(--primary-rgb), 0.3)", 
    distance = 0.8,
    ...props 
  }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Position for button movement
      setPosition({ x, y });
      
      // Position for glow effect - follows cursor more precisely
      const glowX = ((e.clientX - rect.left) / rect.width) * 100;
      const glowY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlow({ x: glowX, y: glowY, opacity: 0.8 });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setGlow({ x: 0, y: 0, opacity: 0 });
      // Use a fast transition out
      setPosition({ x: 0, y: 0 });
    };
    
    const handleMouseDown = () => {
      setIsPressed(true);
    };
    
    const handleMouseUp = () => {
      setIsPressed(false);
    };

    const magneticStyle = isHovered
      ? {
          transform: `translate(${position.x / (strength / 10)}px, ${position.y / (strength / 10)}px) scale(${isPressed ? 0.97 : 1.03})`,
          transition: 'transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)',
        }
      : {
          transform: 'translate(0, 0) scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
        };
        
    const glowStyle = {
      background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${glowColor} 0%, transparent 60%)`,
      opacity: glow.opacity,
    };

    // Add event listeners to document for mouseup to handle cases where mouse is released outside button
    useEffect(() => {
      const handleDocumentMouseUp = () => {
        if (isPressed) setIsPressed(false);
      };
      
      document.addEventListener('mouseup', handleDocumentMouseUp);
      
      return () => {
        document.removeEventListener('mouseup', handleDocumentMouseUp);
      };
    }, [isPressed]);

    return (
      <Button
        ref={(node) => {
          // Handle both refs
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          buttonRef.current = node;
        }}
        className={cn(
          "transform-gpu relative transition-all overflow-hidden duration-300 ease-out active:scale-[0.97]",
          isHovered ? "shadow-lg shadow-primary/20" : "",
          rounded ? "rounded-full" : "rounded-xl",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={magneticStyle}
        {...props}
      >
        <div className="absolute inset-0 z-0" style={glowStyle}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
        
        {/* Shiny effect - appears on hover */}
        <div className="absolute inset-0 overflow-hidden z-0 opacity-0 group-hover:opacity-100">
          <div className="absolute top-0 left-0 right-0 h-full w-8 bg-white/20 -skew-x-12 transform -translate-x-32 group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></div>
        </div>
        
        {children}
      </Button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export { MagneticButton };
