
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Service = {
  id: number;
  title: string;
  description: string;
  image?: string;
  icon?: JSX.Element;
  price?: string;
};

// Default services if no admin data exists
const defaultServices: Service[] = [
  {
    id: 1,
    title: "Strategy & Branding",
    description: "We develop comprehensive brand strategies that align with your business goals and resonate with your target audience.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    price: "$1,500"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Our user-centered approach creates intuitive interfaces and meaningful experiences that drive engagement and satisfaction.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    price: "$2,000"
  },
  {
    id: 3,
    title: "Web Development",
    description: "We build high-performance, responsive websites with clean code and cutting-edge technologies for optimal user experience.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    price: "$3,000"
  },
  {
    id: 4,
    title: "App Development",
    description: "From concept to launch, we create native and cross-platform mobile applications that engage users and deliver results.",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    price: "$5,000"
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "We implement data-driven marketing strategies that increase visibility, drive traffic, and convert visitors into customers.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    price: "$1,200"
  },
  {
    id: 6,
    title: "Interactive Experiences",
    description: "We design immersive digital experiences that captivate audiences, from AR/VR to interactive installations.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    price: "$4,500"
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(1);
  const [hoverService, setHoverService] = useState<number | null>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    // Load services from localStorage (admin dashboard)
    const savedServices = localStorage.getItem("adminServices");
    if (savedServices) {
      try {
        const adminServices = JSON.parse(savedServices);
        if (adminServices && adminServices.length > 0) {
          setServices(adminServices);
        }
      } catch (error) {
        console.error("Error parsing services data:", error);
      }
    }

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

  // Improved smooth scroll function
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

  // Improved mouse drag handling for smoother scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
    
    // Prevent default behavior to avoid text selection during drag
    e.preventDefault();
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
    scrollRef.current.style.removeProperty('user-select');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Adjusted scroll speed multiplier for smoother drag
    
    // Apply scrolling directly without animation for smoother dragging
    scrollRef.current.scrollLeft = scrollLeft - walk;
    setScrollPosition(scrollRef.current.scrollLeft);
    
    // Prevent default to avoid text selection
    e.preventDefault();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2.5;
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
    setScrollPosition(scrollRef.current.scrollLeft);
    
    // Prevent page scrolling while dragging
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Clean up events if component unmounts while dragging
    return () => {
      handleMouseUp();
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 relative overflow-hidden" data-cursor="design">
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
              className="animated-button rounded-full" 
              disabled={scrollPosition <= 0}
              strength={25}
            >
              <ArrowLeft className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              variant="outline" 
              size="icon" 
              onClick={() => handleScroll('right')}
              className="animated-button rounded-full"
              disabled={scrollPosition >= maxScroll}
              strength={25}
            >
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
          
          {/* Left-side gradient fade effect */}
          <div className="absolute left-0 top-8 bottom-20 w-12 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          
          {/* Right-side gradient fade effect */}
          <div className="absolute right-0 top-8 bottom-20 w-12 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          
          {/* Horizontal Scrolling Area with Improved Drag Feature */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none pb-20 pt-8 gap-6 md:gap-8 px-12 ml-[-48px] mr-[-48px] w-[calc(100%+96px)] cursor-grab"
            onScroll={handleScrollEvent}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              scrollBehavior: 'auto', 
              scrollSnapType: 'none',
            }}
          >
            {services.map(service => (
              <Card 
                key={service.id} 
                className={`flex-shrink-0 w-[85%] md:w-[400px] h-[550px] rounded-xl p-1 relative transition-all duration-500 
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} 
                  ${hoverService === service.id ? 'scale-[1.05] z-20' : 'scale-100 z-0'}
                  hover:shadow-xl`}
                onMouseEnter={() => setHoverService(service.id)} 
                onMouseLeave={() => setHoverService(null)}
                style={{
                  transitionDelay: `${service.id * 100}ms`,
                  transform: `scale(${hoverService === service.id ? 1.05 : 1})`,
                  boxShadow: hoverService === service.id 
                    ? '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 25px rgba(var(--primary-rgb), 0.3)' 
                    : '0 5px 20px rgba(0, 0, 0, 0.1)',
                  background: `linear-gradient(to bottom right, 
                    hsl(var(--card-hsl, var(--card)) / 1) 10%, 
                    hsl(var(--background-hsl, var(--background)) / 1) 100%)
                  `,
                  transition: 'all 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
                  overflow: 'hidden'
                }}
              >
                {/* Service image at the top - increased height */}
                <div className="w-full h-64 overflow-hidden rounded-t-xl">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                
                <CardContent className="p-8 h-[calc(100%-16rem)] flex flex-col justify-between">
                  <div>
                    <h3 
                      className="text-2xl md:text-3xl font-bold mb-4"
                    >
                      {service.title}
                    </h3>
                    
                    <p 
                      className="text-muted-foreground mb-6"
                    >
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    {service.price && (
                      <p className="font-semibold text-primary mb-4">
                        Starting from <span className="text-lg font-bold">{service.price}</span>
                      </p>
                    )}
                    
                    <MagneticButton 
                      asChild
                      variant="default" 
                      className="w-full justify-center group"
                      strength={20}
                    >
                      <Link 
                        to={`/services/${service.id}`}
                        className="font-medium inline-flex items-center"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </MagneticButton>
                  </div>
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
