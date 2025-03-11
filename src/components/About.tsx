
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
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
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 bg-secondary/30 relative overflow-hidden">
      {/* Background Typography */}
      <div className="absolute -right-20 top-0 opacity-5 pointer-events-none overflow-hidden z-0">
        <h1 className="text-[30vw] font-black tracking-tighter">
          ABOUT
        </h1>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
            <div className="glass px-4 py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0">
              <p className="text-sm uppercase tracking-widest">About Us</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none">
              We create <span className="text-gradient">digital</span> experiences that <span className="text-gradient">captivate</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-lg font-light">
              Founded in 2013, TopDesignr has grown from a small design studio to an award-winning 
              digital agency with a global client base. We combine strategic thinking, technical 
              expertise, and creative innovation to deliver results-driven solutions.
            </p>
            <p className="text-muted-foreground mb-10 text-lg font-light">
              Our multidisciplinary team of designers, developers, and strategists work 
              collaboratively to create cohesive experiences that engage audiences and drive 
              business growth. We're committed to pushing the boundaries of what's possible 
              in digital design.
            </p>
            <Button className="group overflow-hidden relative px-8 py-6 text-lg font-medium tracking-wider">
              <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500">
                LEARN MORE
              </span>
              <span className="absolute inset-0 bg-primary z-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </Button>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
            {/* Animated SVG Illustration */}
            <div className="relative aspect-square">
              <svg 
                viewBox="0 0 600 600" 
                className="w-full h-full" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Circle */}
                <circle 
                  cx="300" 
                  cy="300" 
                  r="250" 
                  className="fill-secondary stroke-primary/20" 
                  style={{ 
                    strokeWidth: "1",
                    transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.02}px)`,
                    transition: "transform 0.2s ease-out"
                  }}
                />
                
                {/* Grid Pattern */}
                <g className="stroke-primary/10">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line 
                      key={`h-${i}`} 
                      x1="50" 
                      y1={100 + i * 40} 
                      x2="550" 
                      y2={100 + i * 40} 
                      className="animate-float opacity-50"
                      style={{ 
                        strokeWidth: "0.5", 
                        animationDelay: `${i * 0.1}s`,
                        transform: `translateY(${Math.sin(i) * 5}px)`,
                      }}
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line 
                      key={`v-${i}`}
                      x1={100 + i * 40} 
                      y1="50" 
                      x2={100 + i * 40} 
                      y2="550" 
                      className="animate-float opacity-50"
                      style={{ 
                        strokeWidth: "0.5", 
                        animationDelay: `${i * 0.1}s`,
                        transform: `translateX(${Math.cos(i) * 5}px)`,
                      }}
                    />
                  ))}
                </g>
                
                {/* Abstract Shapes */}
                <circle 
                  cx="200" 
                  cy="200" 
                  r="50" 
                  className="fill-primary/20 animate-float" 
                  style={{ animationDelay: "0.2s" }}
                />
                <rect 
                  x="350" 
                  y="150" 
                  width="100" 
                  height="100" 
                  className="fill-primary/15 animate-float" 
                  style={{ 
                    animationDelay: "0.5s",
                    transform: `rotate(${scrollY * 0.05}deg)`,
                    transformOrigin: "center",
                  }}
                />
                <polygon 
                  points="250,350 300,450 200,450" 
                  className="fill-primary/25 animate-float" 
                  style={{ animationDelay: "0.8s" }}
                />
                <path 
                  d="M400,300 Q450,250 500,300 T600,300" 
                  className="stroke-primary/40 fill-none animate-float" 
                  style={{ strokeWidth: "4", animationDelay: "1.1s" }}
                />
                
                {/* Core Values Labels */}
                <g 
                  className="translate-x-0 opacity-100 transition-all duration-700"
                  style={{ 
                    transform: `translateY(${isVisible ? '0' : '20px'})`,
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: "0.8s"
                  }}
                >
                  <circle cx="150" cy="380" r="5" className="fill-primary" />
                  <text x="165" y="385" className="fill-primary font-bold text-[16px]">Creative excellence</text>
                  
                  <circle cx="150" cy="420" r="5" className="fill-primary" />
                  <text x="165" y="425" className="fill-primary font-bold text-[16px]">Strategic thinking</text>
                  
                  <circle cx="150" cy="460" r="5" className="fill-primary" />
                  <text x="165" y="465" className="fill-primary font-bold text-[16px]">Human-centered design</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
