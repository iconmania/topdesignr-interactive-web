
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
      className="flex-1 p-8 relative transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`relative z-10 transition-all duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}>
        <div className="text-6xl md:text-7xl lg:text-8xl font-black mb-2 relative">
          <span className="text-gradient-animated">{displayed}</span>
          <span className="text-gradient-animated">{suffix}</span>
          <span className={`inline-block w-2 h-14 bg-primary ml-1 align-bottom ${isHovering ? 'animate-cursor-blink' : ''}`}></span>
        </div>
        <div className="text-md md:text-lg text-muted-foreground font-light tracking-wide uppercase">
          {label}
        </div>
      </div>
      
      {/* Interactive background effect */}
      <div className={`absolute inset-0 bg-primary/5 transition-all duration-500 ease-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 translate-y-1/2 -translate-x-1/2 rounded-full bg-primary/10 mix-blend-overlay"></div>
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
    <section id="stats" ref={sectionRef} className="py-24 px-6 md:px-12 relative cursor-text">
      {/* Mouse light glow effect */}
      <div 
        className="absolute pointer-events-none rounded-full bg-gradient-to-r from-primary/10 to-accent-foreground/10 mix-blend-overlay blur-3xl"
        style={{
          width: '40vw',
          height: '40vw',
          left: `calc(${normalizedX * 100 + 50}% - 20vw)`,
          top: `calc(${normalizedY * 100 + 50}% - 20vw)`,
          opacity: isInView ? 0.6 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      ></div>
      
      {/* Decorative typography */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="text-[25vw] font-black text-primary/[0.02] tracking-tighter select-none">
          STATS
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 light-glow">
          <StatItem value={10} label="Years Experience" suffix="+" delay={0} />
          <StatItem value={134} label="Returning Clients" suffix="+" delay={200} />
          <StatItem value={400} label="Successful Projects" suffix="+" delay={400} />
          <StatItem value={25} label="Design Awards" suffix="+" delay={600} />
        </div>
      </div>
    </section>
  );
}
