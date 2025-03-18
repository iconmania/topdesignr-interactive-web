
import { useRef, useState, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const {
    x,
    y,
    normalizedX,
    normalizedY
  } = useMousePosition();
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
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

  return <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 bg-secondary/30 relative overflow-hidden" data-cursor="text">
      {/* Interactive mouse glow effect */}
      <div className="absolute pointer-events-none rounded-full bg-primary/5 mix-blend-overlay blur-3xl" style={{
      width: '40vw',
      height: '40vw',
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)',
      opacity: isVisible ? 0.8 : 0,
      transition: 'opacity 0.5s ease-out'
    }}></div>
      
      {/* Background Typography */}
      <div className="absolute right-0 top-0 opacity-5 pointer-events-none overflow-hidden z-0" style={{
      transform: `translateX(${normalizedX * 20}px) translateY(${normalizedY * 20}px)`,
      transition: 'transform 0.3s ease-out'
    }}>
        <h1 className="text-[30vw] font-black tracking-tighter">
          ABOUT
        </h1>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
            <div className="glass py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0 px-0">
              <p className="text-sm uppercase tracking-widest">About Us</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none">
              We create <span className="text-gradient-animated">digital</span> experiences that <span className="text-gradient-animated">captivate</span>
            </h2>
            
            {/* Animated text reveal on scroll */}
            <div className="space-y-6 relative">
              <p className="text-muted-foreground text-lg font-light overflow-hidden relative" style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
              transitionDelay: '0.3s'
            }}>
                Founded in 2013, TopDesignr has grown from a small design studio to an award-winning 
                digital agency with a global client base. We combine strategic thinking, technical 
                expertise, and creative innovation to deliver results-driven solutions.
              </p>
              
              <p className="text-muted-foreground text-lg font-light overflow-hidden relative" style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
              transitionDelay: '0.5s'
            }}>
                Our multidisciplinary team of designers, developers, and strategists work 
                collaboratively to create cohesive experiences that engage audiences and drive 
                business growth. We're committed to pushing the boundaries of what's possible 
                in digital design.
              </p>
              
              {/* Animated line */}
              <div className="w-full h-px bg-primary/20 my-8" style={{
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 1s ease-out',
              transitionDelay: '0.7s'
            }}></div>
            </div>
            
            <MagneticButton 
              className="mt-6 font-medium tracking-wider"
              strength={30}
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                transitionDelay: '0.9s'
              }}
            >
              LEARN MORE
            </MagneticButton>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 h-full ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
            {/* Image with glass effect box */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Our team collaborating" 
                className="w-full h-full object-cover"
                style={{
                  transform: `translateX(${normalizedX * -15}px) translateY(${normalizedY * -15}px)`,
                  transition: 'transform 0.3s ease-out',
                }}
              />
              
              {/* Glass effect box for core values - adjusted position */}
              <div 
                className="absolute bottom-10 right-0 max-w-[80%] backdrop-blur-md bg-background/20 border border-white/10 p-6 rounded-l-2xl"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                  transitionDelay: '0.9s'
                }}
              >
                <h3 className="text-xl font-bold mb-4">Our Core Values</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                    <span>Creative excellence</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                    <span>Strategic thinking</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                    <span>Human-centered design</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
