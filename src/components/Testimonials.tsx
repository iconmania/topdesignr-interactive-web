
import { useRef, useState, useEffect } from "react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMousePosition } from "@/hooks/useMousePosition";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "TopDesignr transformed our digital presence with a website that perfectly captures our brand essence. Their strategic approach and attention to detail exceeded our expectations.",
    author: "Sarah Johnson",
    position: "Marketing Director",
    company: "Eleva Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    quote: "Working with TopDesignr on our app redesign was a game-changer. They not only delivered a beautiful interface but also improved user engagement and conversion rates dramatically.",
    author: "Michael Chen",
    position: "Product Manager",
    company: "Pulse Technologies",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    quote: "The team at TopDesignr brings a perfect blend of creativity and strategic thinking. Their rebrand of our company helped us stand out in a crowded market and attract our ideal clients.",
    author: "Emma Rodriguez",
    position: "CEO",
    company: "Nova Creative",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    quote: "TopDesignr's approach to UX design completely revolutionized our platform. They took the time to understand our users' needs and delivered an experience that feels intuitive and engaging.",
    author: "David Park",
    position: "UX Lead",
    company: "Spectrum Digital",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
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
  
  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('left');
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }, 300);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 600);
  };
  
  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('right');
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 300);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 600);
  };
  
  return (
    <section id="testimonials" ref={sectionRef} className="py-32 px-6 md:px-12 bg-secondary/30 relative overflow-hidden">
      {/* Background Typography */}
      <div className="absolute -right-20 bottom-0 opacity-5 pointer-events-none overflow-hidden">
        <h1 className="text-[30vw] font-black tracking-tighter">
          SAYS
        </h1>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass px-4 py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0">
            <p className="text-sm uppercase tracking-widest">Testimonials</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            Client <span className="text-gradient">Feedback</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-xl font-light">
            Don't just take our word for it—hear what our clients have to say about
            their experiences working with TopDesignr.
          </p>
        </div>
        
        <div 
          className={`relative transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ 
            transform: `translate(${normalizedX * -10}px, ${normalizedY * -10}px)`,
            transition: "transform 0.3s ease-out"
          }}
        >
          <div className="py-16 relative">
            {/* Large Quote Mark */}
            <div 
              className="absolute top-0 left-0 text-[200px] leading-none text-primary/10 font-black pointer-events-none select-none"
              style={{
                transform: `translate(${normalizedX * 20}px, ${normalizedY * 20}px)`,
                transition: "transform 0.4s ease-out"
              }}
            >
              "
            </div>
            
            {/* Testimonial Carousel */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="md:col-span-4 order-2 md:order-1">
                <div className="relative h-[350px] w-full">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.id}
                      className={`absolute inset-0 transition-all duration-700 ${
                        activeIndex === index 
                          ? "opacity-100 scale-100" 
                          : "opacity-0 scale-90 pointer-events-none"
                      }`}
                    >
                      <div className="h-full w-full flex flex-col items-center justify-center relative">
                        <div 
                          className="w-64 h-64 rounded-full overflow-hidden border-8 border-background relative mb-6"
                          style={{
                            transform: activeIndex === index 
                              ? `translate(${normalizedX * 15}px, ${normalizedY * 15}px)` 
                              : "none",
                            transition: "transform 0.3s ease-out"
                          }}
                        >
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="text-2xl font-bold">{testimonial.author}</h4>
                          <p className="text-muted-foreground">
                            {testimonial.position}, <br/>
                            <span className="font-semibold">{testimonial.company}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-8 order-1 md:order-2">
                <div className="relative min-h-[220px] flex items-center">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.id}
                      className={`w-full absolute transition-all duration-700 ${
                        activeIndex === index 
                          ? "opacity-100 translate-x-0" 
                          : direction === 'right' 
                            ? "opacity-0 -translate-x-20 pointer-events-none" 
                            : direction === 'left' 
                              ? "opacity-0 translate-x-20 pointer-events-none" 
                              : "opacity-0 translate-x-0 pointer-events-none"
                      }`}
                    >
                      <p className="text-2xl md:text-3xl lg:text-4xl mb-8 font-light leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 flex items-center justify-between">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (index < activeIndex) {
                            setDirection('left');
                          } else if (index > activeIndex) {
                            setDirection('right');
                          }
                          setActiveIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeIndex ? "w-10 bg-primary" : "bg-primary/30"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrev}
                      className="w-14 h-14 rounded-full border-2 hover:border-primary group"
                      aria-label="Previous testimonial"
                    >
                      <ArrowLeft className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNext}
                      className="w-14 h-14 rounded-full border-2 hover:border-primary group"
                      aria-label="Next testimonial"
                    >
                      <ArrowRight className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
