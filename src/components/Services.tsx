
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Palette, LineChart, LayoutGrid, Globe, Layers, MousePointer } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
};

const services: Service[] = [{
  id: 1,
  title: "Strategy & Branding",
  description: "We develop comprehensive brand strategies that align with your business goals and resonate with your target audience.",
  icon: <LineChart className="h-10 w-10" />
}, {
  id: 2,
  title: "UI/UX Design",
  description: "Our user-centered approach creates intuitive interfaces and meaningful experiences that drive engagement and satisfaction.",
  icon: <Palette className="h-10 w-10" />
}, {
  id: 3,
  title: "Web Development",
  description: "We build high-performance, responsive websites with clean code and cutting-edge technologies for optimal user experience.",
  icon: <Globe className="h-10 w-10" />
}, {
  id: 4,
  title: "App Development",
  description: "From concept to launch, we create native and cross-platform mobile applications that engage users and deliver results.",
  icon: <Layers className="h-10 w-10" />
}, {
  id: 5,
  title: "Digital Marketing",
  description: "We implement data-driven marketing strategies that increase visibility, drive traffic, and convert visitors into customers.",
  icon: <LineChart className="h-10 w-10" />
}, {
  id: 6,
  title: "Interactive Experiences",
  description: "We design immersive digital experiences that captivate audiences, from AR/VR to interactive installations.",
  icon: <LayoutGrid className="h-10 w-10" />
}];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(1);
  const [hoverService, setHoverService] = useState<number | null>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

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
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollRef.current) {
        setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
      }
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 400; // Adjust scroll amount as needed
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);
    
    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  const handleScrollEvent = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 relative overflow-hidden" data-cursor="design">
      {/* Background Typography */}
      <div className="absolute -left-20 top-0 opacity-5 pointer-events-none overflow-hidden">
        <h1 className="text-[30vw] font-black tracking-tighter">
          WORK
        </h1>
      </div>
      
      <div className="relative z-10">
        <div className="container px-4 md:px-12 mb-16">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="glass py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0 mx-0 px-0">
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
        
        <div className="container px-4 md:px-12 relative">
          {/* Scroll Navigation Controls */}
          <div className="hidden md:flex justify-end space-x-2 mb-6">
            <MagneticButton 
              variant="outline" 
              size="icon" 
              onClick={() => handleScroll('left')}
              className="rounded-full" 
              disabled={scrollPosition <= 0}
            >
              <ArrowLeft className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              variant="outline" 
              size="icon" 
              onClick={() => handleScroll('right')}
              className="rounded-full"
              disabled={scrollPosition >= maxScroll}
            >
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
          
          {/* Horizontal Scrolling Area */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none pb-8 gap-6 md:gap-8 snap-x snap-mandatory"
            onScroll={handleScrollEvent}
          >
            {services.map(service => (
              <Card 
                key={service.id} 
                className={`flex-shrink-0 w-[85%] md:w-[400px] snap-start rounded-xl p-1 relative transition-all duration-500 
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} 
                  ${hoverService === service.id ? 'scale-[1.02]' : 'scale-100'}`}
                onMouseEnter={() => setHoverService(service.id)} 
                onMouseLeave={() => setHoverService(null)}
                style={{
                  transitionDelay: `${service.id * 100}ms`,
                  transform: `perspective(1000px) rotateX(${normalizedY * 5}deg) rotateY(${normalizedX * 5}deg) scale(${hoverService === service.id ? 1.02 : 1})`,
                  boxShadow: hoverService === service.id ? '0 10px 40px rgba(0, 0, 0, 0.1)' : 'none',
                  background: `linear-gradient(to bottom right, var(--card) 0%, var(--background) 100%)`,
                }}
              >
                <CardContent className="p-8 md:p-10">
                  <div className="mb-6 w-16 h-16 flex items-center justify-center text-primary rounded-full bg-primary/10">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8">
                    {service.description}
                  </p>
                  
                  <MagneticButton variant="link" className="inline-flex items-center text-primary font-medium group p-0">
                    <span className="mr-2 group-hover:mr-4 transition-all duration-300">Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                  </MagneticButton>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Mobile scroll indicator */}
          <div className="flex md:hidden justify-center mt-4 space-x-1">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  activeService === service.id ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
