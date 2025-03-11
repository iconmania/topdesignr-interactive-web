
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
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
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-12 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="glass px-4 py-1 rounded-full inline-flex items-center mb-4">
              <p className="text-sm">About Us</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              We create <span className="text-gradient">digital experiences</span> that captivate
            </h2>
            <p className="text-muted-foreground mb-6">
              Founded in 2013, TopDesignr has grown from a small design studio to an award-winning 
              digital agency with a global client base. We combine strategic thinking, technical 
              expertise, and creative innovation to deliver results-driven solutions.
            </p>
            <p className="text-muted-foreground mb-8">
              Our multidisciplinary team of designers, developers, and strategists work 
              collaboratively to create cohesive experiences that engage audiences and drive 
              business growth. We're committed to pushing the boundaries of what's possible 
              in digital design.
            </p>
            <Button className="button-animation">Learn More</Button>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 p-6 md:p-8 glass rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Our Core Values</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-1.5 rounded-full bg-primary mr-2"></span>
                  <span>Creative excellence</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-1.5 rounded-full bg-primary mr-2"></span>
                  <span>Strategic thinking</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-1.5 rounded-full bg-primary mr-2"></span>
                  <span>Human-centered design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
