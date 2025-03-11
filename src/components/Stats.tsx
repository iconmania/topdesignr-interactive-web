
import { useEffect, useRef, useState } from "react";

type StatItemProps = {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
};

const StatItem = ({ value, label, suffix = "", delay = 0 }: StatItemProps) => {
  const [displayed, setDisplayed] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
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
    <div ref={ref} className="flex-1 flex flex-col items-center p-6">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
        {displayed}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">{label}</div>
    </div>
  );
};

export default function Stats() {
  return (
    <section id="stats" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl p-6 md:p-10">
          <div className="flex flex-wrap">
            <StatItem value={10} label="Years Experience" suffix="+" delay={0} />
            <StatItem value={134} label="Returning Clients" suffix="+" delay={200} />
            <StatItem value={400} label="Successful Projects" suffix="+" delay={400} />
            <StatItem value={25} label="Design Awards" suffix="+" delay={600} />
          </div>
        </div>
      </div>
    </section>
  );
}
