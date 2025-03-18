
import { useRef, useState, useEffect } from "react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/magnetic-button";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { normalizedX, normalizedY } = useMousePosition();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Get testimonials from localStorage or use default ones
    const savedTestimonials = localStorage.getItem("adminTestimonials");
    
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      // Default testimonials
      setTestimonials([
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
      ]);
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

  const handlePrev = () => {
    if (isAnimating || testimonials.length <= 1) return;
    
    setIsAnimating(true);
    setDirection('left');
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setDirection(null);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating || testimonials.length <= 1) return;
    
    setIsAnimating(true);
    setDirection('right');
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setDirection(null);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 300);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === activeIndex || testimonials.length <= 1) return;
    
    setIsAnimating(true);
    setDirection(index > activeIndex ? 'right' : 'left');
    
    setTimeout(() => {
      setActiveIndex(index);
      setDirection(null);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 300);
  };

  // In case there are no testimonials
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 px-6 md:px-12 bg-secondary/30 relative overflow-hidden" data-cursor="text">
      {/* Background glowing effect */}
      <div className="absolute pointer-events-none rounded-full bg-primary/5 mix-blend-overlay blur-3xl" style={{
        width: '40vw',
        height: '40vw',
        left: `calc(50% + ${normalizedX * 20}px)`,
        top: `calc(50% + ${normalizedY * 20}px)`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 0.8 : 0,
        transition: 'opacity 0.5s ease-out, left 0.3s ease-out, top 0.3s ease-out'
      }}></div>
      
      {/* Large Quote Background */}
      <div className="absolute pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 z-0">
        <Quote className="w-[30vw] h-[30vw] text-primary" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0 px-0">
            <p className="text-sm uppercase tracking-widest">Testimonials</p>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">
            What Our <span className="text-gradient-animated">Clients</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            Don't just take our word for it. Here's what some of our clients have to say about working with us.
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-all duration-500 absolute inset-0 flex flex-col md:flex-row items-center ${
                  index === activeIndex 
                    ? 'opacity-100 z-10 translate-x-0' 
                    : 'opacity-0 z-0 translate-x-full'
                } ${
                  direction === 'left' && index === activeIndex ? 'animate-slide-in-right' : ''
                } ${
                  direction === 'right' && index === activeIndex ? 'animate-slide-up' : ''
                }`}
                style={{
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  transform: index === activeIndex 
                    ? 'translateX(0)' 
                    : direction === 'left' 
                      ? 'translateX(100px)' 
                      : 'translateX(-100px)'
                }}
              >
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background shadow-xl overflow-hidden">
                      {testimonial.image ? (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <Quote className="h-12 w-12 text-primary/50" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -right-2 -bottom-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                      <Quote className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-8">
                  <div className="glass p-6 rounded-xl bg-background/5 backdrop-blur-md border border-border/20">
                    <p className="italic mb-6 text-lg">{testimonial.quote}</p>
                    <div>
                      <p className="font-bold text-lg">{testimonial.author}</p>
                      <p className="text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Create an empty container to maintain height */}
            <div className="invisible">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="w-24 h-24 md:w-32 md:h-32"></div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <div className="p-6 rounded-xl">
                    <p className="mb-6 text-lg">&nbsp;</p>
                    <p className="mb-6 text-lg">&nbsp;</p>
                    <p className="mb-6 text-lg">&nbsp;</p>
                    <div>
                      <p className="font-bold text-lg">&nbsp;</p>
                      <p>&nbsp;</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <MagneticButton 
              variant="outline" 
              size="icon" 
              onClick={handlePrev}
              className="button-animation rounded-full"
              strength={25}
            >
              <ArrowLeft className="h-5 w-5" />
            </MagneticButton>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-primary w-8' : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <MagneticButton 
              variant="outline" 
              size="icon" 
              onClick={handleNext}
              className="button-animation rounded-full"
              strength={25}
            >
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
