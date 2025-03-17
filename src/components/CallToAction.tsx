
import { useRef, useState, useEffect } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sectionScrollProgress, setSectionScrollProgress] = useState(0);
  const { normalizedX, normalizedY } = useMousePosition();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPercentage = Math.max(0, Math.min(1, 
        1 - (rect.top / window.innerHeight)
      ));
      
      setSectionScrollProgress(scrollPercentage);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      data-cursor="text"
      className="py-32 relative overflow-hidden h-screen flex items-center justify-center"
    >
      {/* Background Parallax Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          transform: `translate(${normalizedX * -15}px, ${normalizedY * -15}px) translateY(${-sectionScrollProgress * 100}px)`,
          transition: 'transform 0.3s ease-out',
          height: "120%", // Make image taller to prevent white space
          top: "-10%", // Position it higher
        }}
      ></div>
      
      {/* Parallax Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      ></div>
      
      {/* Interactive Parallax Elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 mix-blend-overlay blur-3xl"
        style={{
          transform: `translate(${normalizedX * -50}px, ${normalizedY * -50}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      ></div>
      
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/20 mix-blend-overlay blur-3xl"
        style={{
          transform: `translate(${normalizedX * 60}px, ${normalizedY * 60}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      ></div>
      
      {/* Typographical Element */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10"
        style={{
          transform: `translate(${normalizedX * 30}px, ${normalizedY * 30}px)`,
          transition: 'transform 0.3s ease-out',
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
          >
            Ready to transform your <span className="text-gradient">digital presence</span>?
          </h2>
          
          <p 
            className="text-xl text-white/70 max-w-3xl mx-auto mb-12 font-light"
          >
            Let's collaborate to create meaningful experiences that elevate your brand,
            engage your audience, and drive measurable results.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <MagneticButton 
              size="lg" 
              className="animated-button bg-white text-black hover:bg-white/90 px-8 py-7 text-lg"
              strength={15}
            >
              <span className="relative z-10 flex items-center">
                START A PROJECT
                <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 transform translate-x-[-5px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
            </MagneticButton>
            
            <MagneticButton 
              variant="outline" 
              size="lg"
              className="animated-button border-white text-white hover:bg-white/10 px-8 py-7 text-lg"
              strength={15}
            >
              <span className="relative z-10">VIEW OUR PROCESS</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
