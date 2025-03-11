
import { useRef, useState, useEffect } from "react";
import { Layers, ArrowRight, Palette, LineChart, LayoutGrid, Globe } from "lucide-react";

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
    <section id="services" ref={sectionRef} className="py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Typography */}
      <div className="absolute -left-20 top-0 opacity-5 pointer-events-none overflow-hidden">
        <h1 className="text-[30vw] font-black tracking-tighter">
          WORK
        </h1>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-left mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Service Navigation */}
          <div className="lg:col-span-4">
            <ul className="space-y-8">
              {services.map((service, index) => (
                <li 
                  key={service.id}
                  className={`border-l-4 pl-6 py-2 transition-all duration-500 cursor-pointer ${
                    activeService === service.id 
                      ? "border-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setActiveService(service.id)}
                >
                  <div 
                    className={`transition-all duration-300 ${
                      activeService === service.id 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-[-10px] opacity-70"
                    }`}
                  >
                    <h3 className={`text-2xl font-bold mb-2 tracking-tight ${
                      activeService === service.id ? "text-gradient" : ""
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-muted-foreground font-light ${
                      activeService === service.id ? "block" : "hidden md:block"
                    }`}>
                      {service.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Service Details */}
          <div className="lg:col-span-8 relative min-h-[500px]">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`absolute inset-0 transition-all duration-700 flex items-center ${
                  activeService === service.id 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10 pointer-events-none"
                }`}
                style={{
                  transform: activeService === service.id 
                    ? `translateY(${scrollY * 0.05}px)` 
                    : "translateY(40px)",
                }}
              >
                <div className="w-full h-full relative overflow-hidden rounded-2xl">
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <div className="text-[20vw] font-black tracking-tighter">
                      {service.id.toString().padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"></div>
                  
                  <div className="relative z-10 p-10 md:p-16 flex flex-col h-full justify-between">
                    <div>
                      <div className="w-20 h-20 flex items-center justify-center text-primary mb-8 transition-all duration-500">
                        {service.icon}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                        {service.title}
                      </h3>
                      <p className="text-xl text-muted-foreground max-w-lg mb-10 font-light">
                        {service.description}
                      </p>
                    </div>
                    
                    <a href="#" className="inline-flex items-center text-lg font-medium text-primary group w-fit">
                      <span className="mr-4 transition-all duration-300 group-hover:mr-6">Learn more</span>
                      <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
