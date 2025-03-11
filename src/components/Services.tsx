
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Palette, LineChart, LayoutGrid, Globe, Layers, MousePointer } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
};

const services: Service[] = [
  {
    id: 1,
    title: "Strategy & Branding",
    description: "We develop comprehensive brand strategies that align with your business goals and resonate with your target audience.",
    icon: <LineChart className="h-10 w-10" />
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Our user-centered approach creates intuitive interfaces and meaningful experiences that drive engagement and satisfaction.",
    icon: <Palette className="h-10 w-10" />
  },
  {
    id: 3,
    title: "Web Development",
    description: "We build high-performance, responsive websites with clean code and cutting-edge technologies for optimal user experience.",
    icon: <Globe className="h-10 w-10" />
  },
  {
    id: 4,
    title: "App Development",
    description: "From concept to launch, we create native and cross-platform mobile applications that engage users and deliver results.",
    icon: <Layers className="h-10 w-10" />
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "We implement data-driven marketing strategies that increase visibility, drive traffic, and convert visitors into customers.",
    icon: <LineChart className="h-10 w-10" />
  },
  {
    id: 6,
    title: "Interactive Experiences",
    description: "We design immersive digital experiences that captivate audiences, from AR/VR to interactive installations.",
    icon: <LayoutGrid className="h-10 w-10" />
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
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
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
        setScrollProgress(scrollPercentage);
        
        // Determine active service based on scroll position
        const serviceIndex = Math.floor(scrollPercentage * services.length);
        setActiveService(services[Math.min(serviceIndex, services.length - 1)]?.id || 1);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  return (
    <section id="services" ref={sectionRef} className="py-32 relative overflow-hidden cursor-design">
      {/* Interactive cursor effect */}
      <div 
        className="fixed pointer-events-none w-12 h-12 rounded-full border border-primary mix-blend-difference z-50 hidden md:block"
        style={{
          transform: `translate(${normalizedX * window.innerWidth}px, ${normalizedY * window.innerHeight}px) translate(-50%, -50%) scale(${activeService ? 1.5 : 1})`,
          opacity: isVisible ? 0.7 : 0,
          transition: 'transform 0.1s ease-out, opacity 0.3s ease-out',
        }}
      >
        <MousePointer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
      </div>
      
      {/* Background Typography */}
      <div className="absolute -left-20 top-0 opacity-5 pointer-events-none overflow-hidden">
        <h1 className="text-[30vw] font-black tracking-tighter">
          WORK
        </h1>
      </div>
      
      <div className="relative z-10">
        <div className="container px-4 md:px-12 mb-12">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="glass px-4 py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0">
              <p className="text-sm uppercase tracking-widest">Our Services</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
              What <span className="text-gradient">We Do</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl text-xl font-light">
              Our comprehensive suite of services is designed to help businesses
              achieve their goals through strategic design and technical excellence.
            </p>
          </div>
        </div>
        
        {/* Horizontal scroll progress indicator */}
        <div className="container px-4 md:px-12 mb-8">
          <div className="w-full h-1 bg-primary/10 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Horizontal scroll container */}
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory" 
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          {services.map((service) => (
            <div 
              key={service.id}
              className="min-w-full md:min-w-[80vw] lg:min-w-[60vw] h-[70vh] flex items-center px-4 md:px-12 snap-center"
            >
              <div 
                className={`w-full h-full rounded-2xl p-10 md:p-16 relative overflow-hidden transition-all duration-700 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{
                  transitionDelay: `${service.id * 100}ms`,
                }}
              >
                {/* Background gradient animation */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-foreground/5 animate-gradient-x"
                  style={{
                    transform: `rotate(${service.id * 45}deg)`,
                  }}
                ></div>
                
                {/* Background decorative elements */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full border border-primary/10 opacity-20"></div>
                <div className="absolute bottom-10 -left-20 w-40 h-40 rounded-full border border-primary/10 opacity-20"></div>
                
                {/* Service number background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black opacity-5 pointer-events-none select-none">
                  {service.id}
                </div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                  <div 
                    className="w-20 h-20 flex items-center justify-center text-primary mb-8 transition-all duration-500"
                    style={{
                      transform: isVisible ? 'translateY(0) rotate(0)' : 'translateY(20px) rotate(-5deg)',
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${service.id * 100 + 200}ms`,
                    }}
                  >
                    {service.icon}
                  </div>
                  
                  <h3 
                    className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isVisible ? 1 : 0,
                      transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                      transitionDelay: `${service.id * 100 + 300}ms`,
                    }}
                  >
                    {service.title}
                  </h3>
                  
                  <p 
                    className="text-xl text-muted-foreground max-w-lg mb-10 font-light"
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isVisible ? 1 : 0,
                      transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                      transitionDelay: `${service.id * 100 + 400}ms`,
                    }}
                  >
                    {service.description}
                  </p>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center text-lg font-medium text-primary group w-fit"
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isVisible ? 1 : 0,
                      transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
                      transitionDelay: `${service.id * 100 + 500}ms`,
                    }}
                  >
                    <span className="mr-4 transition-all duration-300 group-hover:mr-6">Learn more</span>
                    <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
