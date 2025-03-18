
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  className?: string;
  children: React.ReactNode;
  distance?: number;
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ 
    strength = 25, 
    className, 
    children, 
    distance = 0.8,
    ...props 
  }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Position for button movement
      setPosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Reset position with a fast transition
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
          "transform-gpu",
          isHovered ? "shadow-md" : "",
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
        {children}
      </Button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export { MagneticButton };
