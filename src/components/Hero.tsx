
import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { x, y } = useMousePosition();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
          style={{ 
            transform: `translate(${x * -20}px, ${y * -20}px)`,
            transition: "transform 0.1s linear"
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
          style={{ 
            transform: `translate(${x * 20}px, ${y * 20}px)`,
            transition: "transform 0.1s linear"
          }}
        />
      </div>
      
      {/* Animated Objects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-1/3 left-1/5 w-20 h-20 rounded-md border border-primary/20 animate-float opacity-70"
          style={{ 
            transform: `translate(${x * 50}px, ${y * 50}px) rotate(${x * 10}deg)`,
            transition: "transform 0.1s linear",
            animationDelay: "0.2s"
          }}
        />
        <div 
          className="absolute top-2/3 right-1/4 w-16 h-16 rounded-full border border-primary/20 animate-float opacity-70"
          style={{ 
            transform: `translate(${x * -40}px, ${y * -40}px) rotate(${y * 10}deg)`,
            transition: "transform 0.1s linear",
            animationDelay: "0.5s"
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-md border border-primary/20 animate-float opacity-70"
          style={{ 
            transform: `translate(${x * 30}px, ${y * 30}px) rotate(${x * -10}deg)`,
            transition: "transform 0.1s linear",
            animationDelay: "0.8s"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className="glass px-4 py-1 rounded-full inline-flex items-center">
              <span className="animate-pulse-slow bg-green-500 w-2 h-2 rounded-full mr-2"></span>
              <p className="text-sm">Award-winning design agency</p>
            </div>
          </div>
          
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={{ 
              transform: `translate(${x * 10}px, ${y * 10}px)`,
              transition: "transform 0.2s ease-out"
            }}
          >
            We create <span className="text-gradient">digital experiences</span> that matter
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            style={{ 
              transform: `translate(${x * -5}px, ${y * -5}px)`,
              transition: "transform 0.2s ease-out"
            }}
          >
            Elevating brands through strategic design, cutting-edge technology,
            and immersive digital experiences that drive results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="button-animation"
            >
              View Our Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="button-animation"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#stats" aria-label="Scroll to stats">
          <ChevronDown className="h-8 w-8 text-muted-foreground/50" />
        </a>
      </div>
    </section>
  );
}
