
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

type StatItemProps = {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
};

const StatItem = ({ value, label, suffix = "", delay = 0 }: StatItemProps) => {
  const [displayed, setDisplayed] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!isIntersecting) return;
    
    let start: number | null = null;
    let animationFrame: number;
    
    const startAnimation = () => {
      setTimeout(() => {
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const duration = 2000; // 2 seconds
          const easeOutQuad = (t: number) => t * (2 - t); // Easing function
          
          const percentage = Math.min(progress / duration, 1);
          const easedPercentage = easeOutQuad(percentage);
          
          setDisplayed(Math.floor(easedPercentage * value));
          
          if (progress < duration) {
            animationFrame = requestAnimationFrame(step);
          } else {
            setDisplayed(value);
          }
        };
        
        animationFrame = requestAnimationFrame(step);
      }, delay);
    };
    
    startAnimation();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isIntersecting, value, delay]);
  
  return (
    <div 
      ref={ref} 
      className="flex-1 p-6 md:p-8 relative transition-all duration-300 text-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`relative z-10 transition-all duration-300 ${isHovering ? 'scale-105' : 'scale-100'}`}>
        <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 relative">
          <span className="text-primary">{displayed}</span>
          <span className="text-primary">{suffix}</span>
          <span className={`inline-block w-2 h-10 bg-primary ml-1 align-bottom ${isHovering ? 'animate-cursor-blink' : ''}`}></span>
        </div>
        <div className="text-md md:text-lg text-muted-foreground font-light tracking-wide uppercase">
          {label}
        </div>
      </div>
      
      {/* Simple hover effect */}
      <div className={`absolute inset-0 bg-primary/5 rounded-xl transition-all duration-300 ease-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

export default function Stats() {
  const { normalizedX, normalizedY } = useMousePosition();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="stats" ref={sectionRef} className="py-24 px-6 md:px-12 relative cursor-text" data-cursor="text">
      {/* Mouse light glow effect */}
      <div 
        className="absolute pointer-events-none rounded-full bg-gradient-to-r from-primary/10 to-accent-foreground/10 mix-blend-overlay blur-3xl"
        style={{
          width: '30vw',
          height: '30vw',
          left: `calc(${normalizedX * 100 + 50}% - 15vw)`,
          top: `calc(${normalizedY * 100 + 50}% - 15vw)`,
          opacity: isInView ? 0.6 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Our Numbers <span className="text-gradient">Speak</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem value={10} label="Years Experience" suffix="+" delay={0} />
          <StatItem value={134} label="Returning Clients" suffix="+" delay={200} />
          <StatItem value={400} label="Successful Projects" suffix="+" delay={400} />
          <StatItem value={25} label="Design Awards" suffix="+" delay={600} />
        </div>
      </div>
    </section>
  );
}
