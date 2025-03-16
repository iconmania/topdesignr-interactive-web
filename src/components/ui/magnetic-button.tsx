
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  className?: string;
  children: React.ReactNode;
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ strength = 25, className, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Make movement smoother and more responsive
      setPosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Use a fast transition out
      setPosition({ x: 0, y: 0 });
    };

    const magneticStyle = isHovered
      ? {
          transform: `translate(${position.x / (strength / 10)}px, ${position.y / (strength / 10)}px)`,
          transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
        }
      : {
          transform: 'translate(0, 0)',
          transition: 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
        };

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
          "transition-all duration-100 ease-out hover:scale-[1.02]",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
