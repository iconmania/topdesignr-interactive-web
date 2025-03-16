
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Palette, LineChart, LayoutGrid, Globe, Layers } from "lucide-react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(1);
  const [hoverService, setHoverService] = useState<number | null>(null);
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
        
        <div className="container px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`rounded-xl p-8 md:p-10 relative overflow-hidden transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                } ${hoverService === service.id ? 'scale-[1.02]' : 'scale-100'}`}
                onMouseEnter={() => setHoverService(service.id)}
                onMouseLeave={() => setHoverService(null)}
                style={{
                  transitionDelay: `${service.id * 100}ms`,
                  transform: `perspective(1000px) rotateX(${normalizedY * 5}deg) rotateY(${normalizedX * 5}deg) scale(${hoverService === service.id ? 1.02 : 1})`,
                  boxShadow: hoverService === service.id ? '0 10px 40px rgba(0, 0, 0, 0.1)' : 'none',
                }}
              >
                {/* Background gradient and decorative elements */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-foreground/5 opacity-50 transition-opacity duration-500"
                  style={{
                    opacity: hoverService === service.id ? '1' : '0.5',
                  }}
                ></div>
                
                <div className="relative z-10">
                  <div className="mb-6 w-16 h-16 flex items-center justify-center text-primary rounded-full bg-primary/10">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8">
                    {service.description}
                  </p>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary font-medium group"
                  >
                    <span className="mr-2 group-hover:mr-4 transition-all duration-300">Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
