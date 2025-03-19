
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

  const nextTestimonial = () => {
    if (isAnimating || testimonials.length <= 1) return;
    
    setDirection('right');
    setIsAnimating(true);
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const prevTestimonial = () => {
    if (isAnimating || testimonials.length <= 1) return;
    
    setDirection('left');
    setIsAnimating(true);
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const getTransformStyles = (index: number) => {
    if (testimonials.length <= 1) return {};
    
    if (index === activeIndex) {
      if (isAnimating) {
        return {
          transform: `translateX(${direction === 'left' ? '100%' : '-100%'})`,
          opacity: 0
        };
      }
      return {
        transform: 'translateX(0)',
        opacity: 1
      };
    } else if (
      index === (activeIndex + 1) % testimonials.length && 
      direction === 'right' && 
      isAnimating
    ) {
      return {
        transform: 'translateX(0)',
        opacity: 1
      };
    } else if (
      index === (activeIndex - 1 + testimonials.length) % testimonials.length && 
      direction === 'left' && 
      isAnimating
    ) {
      return {
        transform: 'translateX(0)',
        opacity: 1
      };
    } else if (index === (activeIndex + 1) % testimonials.length) {
      return {
        transform: 'translateX(100%)',
        opacity: 0
      };
    } else if (index === (activeIndex - 1 + testimonials.length) % testimonials.length) {
      return {
        transform: 'translateX(-100%)',
        opacity: 0
      };
    } else {
      return {
        transform: 'translateX(0)',
        opacity: 0,
        position: 'absolute',
        pointerEvents: 'none'
      };
    }
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="py-32 px-6 md:px-12 relative overflow-hidden"
      data-cursor="design"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      
      <div className="container mx-auto relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0 px-0">
            <p className="text-sm uppercase tracking-widest">Client Success</p>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            <span className="inline-block relative">
              <span
                className="absolute -top-20 left-0 text-[10rem] font-black opacity-5 text-primary"
                style={{
                  transform: `translate(${normalizedX * 5}px, ${normalizedY * 5}px)`,
                }}
              >
                "
              </span>
              <span className="relative">What Our <span className="text-gradient">Clients Say</span></span>
            </span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-md text-lg font-light">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto md:px-10">
          <div className={`relative h-[400px] md:h-80 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out flex flex-col md:flex-row items-center gap-6 md:gap-10"
                style={getTransformStyles(index)}
              >
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-background shadow-lg">
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <Quote className="h-10 w-10 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
                    <Quote className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-xl md:text-2xl mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.author}</h3>
                    <p className="text-muted-foreground">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-10 space-x-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevTestimonial}
                className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
                disabled={isAnimating}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextTestimonial}
                className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
                disabled={isAnimating}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
