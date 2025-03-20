
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

    // Intersection Observer setup
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

  const goToPrevious = () => {
    if (isAnimating || testimonials.length <= 1) return;
    
    setDirection('left');
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToNext = () => {
    if (isAnimating || testimonials.length <= 1) return;
    
    setDirection('right');
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonials.length > 1) {
        goToNext();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating, testimonials.length]);

  // Early return if no testimonials
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 relative overflow-hidden" data-cursor="design">      
      {/* Background Typography */}
      <div className="absolute right-0 top-0 opacity-5 pointer-events-none overflow-hidden z-0" style={{
        transform: `translateX(${normalizedX * 20}px) translateY(${normalizedY * 20}px)`,
        transition: 'transform 0.3s ease-out'
      }}>
        <h1 className="text-[30vw] font-black tracking-tighter">
          CLIENTS
        </h1>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-60"
          style={{
            transform: `translate(${normalizedX * 30}px, ${normalizedY * 30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        <div 
          className="absolute bottom-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60"
          style={{
            transform: `translate(${normalizedX * -30}px, ${normalizedY * -30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
      </div>
      
      <div className="container px-4 md:px-12 mb-16">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0 px-0">
            <p className="text-sm uppercase tracking-widest">Testimonials</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            Client <span className="text-gradient">Success</span> Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl text-xl font-light">
            Hear what our clients have to say about working with us and the results we've achieved together.
          </p>
        </div>
      </div>
      
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
          <div className="md:h-[500px] flex items-center justify-center">
            <div className="relative w-full overflow-hidden">
              {testimonials.map((testimonial, index) => {
                // Calculate styles based on active state
                let style = {};
                
                if (index === activeIndex) {
                  style = {
                    transform: 'translateX(0)',
                    opacity: 1
                  };
                } else if (
                  (direction === 'right' && index === (activeIndex - 1 + testimonials.length) % testimonials.length) ||
                  (direction === 'left' && index === (activeIndex + 1) % testimonials.length)
                ) {
                  style = {
                    transform: direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)',
                    opacity: 0,
                    position: 'absolute' as 'absolute',
                    pointerEvents: 'none' as 'none'
                  };
                } else {
                  style = {
                    transform: 'translateX(100%)',
                    opacity: 0,
                    position: 'absolute' as 'absolute',
                    pointerEvents: 'none' as 'none'
                  };
                }
                
                return (
                  <div 
                    key={testimonial.id}
                    className="w-full transition-all duration-500 top-0 left-0"
                    style={style}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                      <div className="order-2 md:order-1">
                        <div 
                          className="text-6xl text-primary/20 mb-6"
                          style={{
                            transform: `translateY(${normalizedY * 20}px)`,
                            transition: 'transform 0.3s ease-out'
                          }}
                        >
                          <Quote />
                        </div>
                        <blockquote className="text-2xl md:text-3xl font-light italic mb-8">
                          {testimonial.quote}
                        </blockquote>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              {testimonial.image ? (
                                <img 
                                  src={testimonial.image} 
                                  alt={testimonial.author} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-primary font-bold">
                                    {testimonial.author.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{testimonial.author}</h3>
                            <p className="text-muted-foreground">
                              {testimonial.position}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className="order-1 md:order-2 rounded-xl overflow-hidden h-64 md:h-96"
                        style={{
                          transform: `translate(${normalizedX * 15}px, ${normalizedY * 15}px)`,
                          transition: 'transform 0.3s ease-out'
                        }}
                      >
                        <div className="h-full w-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                          <div className="text-center p-8">
                            <div className="text-6xl text-primary/30 mb-4">
                              <Quote />
                            </div>
                            <p className="text-xl text-primary/70">{testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full"
                disabled={isAnimating}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isAnimating) return;
                      setDirection(index > activeIndex ? 'right' : 'left');
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-primary/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full"
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
