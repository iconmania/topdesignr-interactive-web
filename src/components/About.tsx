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
              className="group overflow-hidden relative px-8 py-6 text-lg font-medium tracking-wider mt-6" 
              strength={30}
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                transitionDelay: '0.9s'
              }}
            >
              <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500">
                LEARN MORE
              </span>
              <span className="absolute inset-0 bg-primary z-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </MagneticButton>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 h-full ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
            {/* Interactive SVG Illustration */}
            <div className="relative aspect-square" style={{
            transform: `rotateY(${normalizedX * 10}deg) rotateX(${normalizedY * -10}deg)`,
            transition: 'transform 0.2s ease-out',
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}>
              <svg viewBox="0 0 600 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Animated Grid Pattern */}
                <g className="stroke-primary/10">
                  {Array.from({
                  length: 12
                }).map((_, i) => <line key={`h-${i}`} x1="50" y1={100 + i * 40} x2="550" y2={100 + i * 40} className="animate-float-slow opacity-50" style={{
                  strokeWidth: "0.5",
                  animationDelay: `${i * 0.1}s`,
                  transform: `translateY(${Math.sin(i) * 5}px)`,
                  transformOrigin: 'center',
                  opacity: isVisible ? "0.5" : "0"
                }} />)}
                  {Array.from({
                  length: 12
                }).map((_, i) => <line key={`v-${i}`} x1={100 + i * 40} y1="50" x2={100 + i * 40} y2="550" className="animate-float-slow opacity-50" style={{
                  strokeWidth: "0.5",
                  animationDelay: `${i * 0.1}s`,
                  transform: `translateX(${Math.cos(i) * 5}px)`,
                  transformOrigin: 'center',
                  opacity: isVisible ? "0.5" : "0"
                }} />)}
                </g>
                
                {/* Interactive Abstract Shapes with 3D parallax effect */}
                <circle cx="200" cy="200" r="50" className="fill-primary/20 animate-float-slow" style={{
                animationDelay: "0.2s",
                transform: `translate(${normalizedX * -30}px, ${normalizedY * -30}px)`,
                transition: "transform 0.3s ease-out",
                transformOrigin: 'center',
                opacity: isVisible ? "1" : "0",
                transitionProperty: "transform, opacity",
                transitionDuration: "0.7s",
                transitionDelay: "0.2s"
              }} />
                <rect x="350" y="150" width="100" height="100" className="fill-primary/15 animate-float-slow" style={{
                animationDelay: "0.5s",
                transform: `rotate(${scrollY * 0.05}deg) translate(${normalizedX * 25}px, ${normalizedY * 25}px)`,
                transformOrigin: "center",
                transition: "transform 0.3s ease-out",
                opacity: isVisible ? "1" : "0",
                transitionProperty: "transform, opacity",
                transitionDuration: "0.7s",
                transitionDelay: "0.4s"
              }} />
                <polygon points="250,350 300,450 200,450" className="fill-primary/25 animate-float-slow" style={{
                animationDelay: "0.8s",
                transform: `translate(${normalizedX * -20}px, ${normalizedY * -20}px)`,
                transition: "transform 0.3s ease-out",
                transformOrigin: 'center',
                opacity: isVisible ? "1" : "0",
                transitionProperty: "transform, opacity",
                transitionDuration: "0.7s",
                transitionDelay: "0.6s"
              }} />
                <path d="M400,300 Q450,250 500,300 T600,300" className="stroke-primary/40 fill-none animate-float-slow" style={{
                strokeWidth: "4",
                animationDelay: "1.1s",
                transform: `translate(${normalizedX * 15}px, ${normalizedY * 15}px)`,
                transition: "transform 0.3s ease-out",
                transformOrigin: 'center',
                opacity: isVisible ? "1" : "0",
                transitionProperty: "transform, opacity",
                transitionDuration: "0.7s",
                transitionDelay: "0.8s"
              }} />
                
                {/* Core Values Labels with staggered animation */}
                <g>
                  <g style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                  transitionDelay: '1s'
                }}>
                    <circle cx="150" cy="380" r="5" className="fill-primary" />
                    <text x="165" y="385" className="fill-primary font-bold text-[16px]">Creative excellence</text>
                  </g>
                  
                  <g style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                  transitionDelay: '1.2s'
                }}>
                    <circle cx="150" cy="420" r="5" className="fill-primary" />
                    <text x="165" y="425" className="fill-primary font-bold text-[16px]">Strategic thinking</text>
                  </g>
                  
                  <g style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                  transitionDelay: '1.4s'
                }}>
                    <circle cx="150" cy="460" r="5" className="fill-primary" />
                    <text x="165" y="465" className="fill-primary font-bold text-[16px]">Human-centered design</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
