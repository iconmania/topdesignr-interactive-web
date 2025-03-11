
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { normalizedX, normalizedY } = useMousePosition();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="py-32 relative overflow-hidden w-full h-screen flex items-center justify-center cursor-text"
      style={{
        background: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Parallax Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      ></div>
      
      {/* Interactive Parallax Elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 mix-blend-overlay blur-3xl"
        style={{
          transform: `translate(${normalizedX * -50}px, ${normalizedY * -50}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      ></div>
      
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/20 mix-blend-overlay blur-3xl"
        style={{
          transform: `translate(${normalizedX * 60}px, ${normalizedY * 60}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      ></div>
      
      {/* Typographical Element */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10"
        style={{
          transform: `translate(${normalizedX * 30}px, ${normalizedY * 30}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        <h1 className="text-[25vw] font-black text-white">CTA</h1>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div 
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white tracking-tighter"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            Ready to transform your <span className="text-gradient">digital presence</span>?
          </h2>
          
          <p 
            className="text-xl text-white/70 max-w-3xl mx-auto mb-12 font-light"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            Let's collaborate to create meaningful experiences that elevate your brand,
            engage your audience, and drive measurable results.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            style={{
              transform: `translateY(${scrollY * -0.02}px)`,
            }}
          >
            <Button 
              size="lg" 
              className="button-animation group bg-white text-black hover:bg-white/90 px-8 py-7 text-lg"
            >
              <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500">
                START A PROJECT
              </span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="button-animation border-white text-white hover:bg-white/10 px-8 py-7 text-lg"
            >
              <span className="relative z-10">VIEW OUR PROCESS</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
