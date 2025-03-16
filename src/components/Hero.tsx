
import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const { normalizedX, normalizedY } = useMousePosition();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      data-cursor="text"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Animated Typography Background Elements */}
      <div className="absolute inset-0 flex justify-center items-center opacity-5 select-none overflow-hidden pointer-events-none">
        <h1 className="text-[25vw] font-black tracking-tighter text-primary/10 mix-blend-difference animate-float">
          TOP
        </h1>
      </div>
      
      <div className="absolute inset-0 flex justify-center items-end opacity-5 select-none overflow-hidden pointer-events-none">
        <h1 className="text-[25vw] font-black tracking-tighter text-primary/10 mix-blend-difference animate-float" style={{ animationDelay: "0.5s" }}>
          DESIGNR
        </h1>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10">
        <div 
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className="glass px-4 py-1 rounded-full inline-flex items-center bg-background/5 backdrop-blur-md border-0">
              <span className="animate-pulse-slow bg-green-500 w-2 h-2 rounded-full mr-2"></span>
              <p className="text-sm uppercase tracking-widest">Award-winning design</p>
            </div>
          </div>
          
          <div className="overflow-hidden mb-4">
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-2 tracking-tighter leading-none"
              style={{ 
                transform: `translateY(${scrollPosition * 0.2}px)`,
                transition: "transform 0.2s ease-out"
              }}
            >
              <span 
                className="inline-block"
                style={{ 
                  transform: `translate(${normalizedX * 10}px, ${normalizedY * 10}px)`,
                  transition: "transform 0.3s ease-out"
                }}
              >WE CREATE</span> 
            </h1>
          </div>
          
          <div className="overflow-hidden mb-8">
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-2 tracking-tighter leading-none"
              style={{ 
                transform: `translateY(${scrollPosition * 0.1}px)`,
                transition: "transform 0.3s ease-out"
              }}
            >
              <span 
                className="inline-block text-gradient"
                style={{ 
                  transform: `translate(${normalizedX * 10}px, ${normalizedY * 10}px)`,
                  transition: "transform 0.4s ease-out"
                }}
              >DIGITAL EXPERIENCES</span> 
            </h1>
          </div>
          
          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-light"
            style={{ 
              transform: `translate(${normalizedX * -5}px, ${normalizedY * -5}px)`,
              transition: "transform 0.2s ease-out"
            }}
          >
            Elevating brands through strategic design, cutting-edge technology,
            and immersive digital experiences that drive results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="group relative px-8 py-7 text-lg font-medium tracking-wider transition-all duration-300 overflow-hidden hover:shadow-lg"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                VIEW OUR WORK
              </span>
              <span className="absolute inset-0 bg-primary z-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group relative px-8 py-7 text-lg font-medium tracking-wider transition-all duration-300 overflow-hidden hover:shadow-md"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2 flex items-center">
                CONTACT US 
                <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
              </span>
              <span className="absolute inset-0 bg-primary/10 z-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
        style={{ 
          transform: `translate(-50%, ${normalizedY * 20}px)`,
          transition: "transform 0.2s ease-out"
        }}
      >
        <a href="#stats" aria-label="Scroll to stats" className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest mb-2 font-light">Scroll</span>
          <ChevronDown className="h-8 w-8 text-primary" />
        </a>
      </div>
    </section>
  );
}
