
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Send, MousePointer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const { toast } = useToast();
  const { normalizedX, normalizedY } = useMousePosition();

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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible.",
      });
      
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 md:px-12 relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 rounded-bl-[100px]"
          style={{
            transform: `translate(${normalizedX * 20}px, ${normalizedY * 20}px)`,
            transition: 'transform 0.4s ease-out',
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-primary/5 rounded-tr-[100px]"
          style={{
            transform: `translate(${normalizedX * -20}px, ${normalizedY * -20}px)`,
            transition: 'transform 0.4s ease-out',
          }}
        ></div>
      </div>
      
      {/* Custom cursor */}
      <div 
        className="fixed pointer-events-none w-12 h-12 rounded-full border-2 border-primary z-50 hidden md:block opacity-0"
        style={{
          transform: `translate(${normalizedX * window.innerWidth}px, ${normalizedY * window.innerHeight}px) translate(-50%, -50%) scale(${activeField ? 0.5 : 1})`,
          opacity: activeField ? 0.7 : 0,
          transition: 'transform 0.1s ease-out, opacity 0.3s ease-out',
        }}
      >
        <MousePointer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass px-4 py-1 rounded-full inline-flex items-center mb-4">
            <p className="text-sm">Get in Touch</p>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">Contact Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-light">
            Have a project in mind or want to learn more about our services?
            We'd love to hear from you. Reach out and let's start a conversation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className={`lg:col-span-3 bg-background rounded-2xl p-8 md:p-12 border border-border/50 shadow-sm transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}>
            <h3 className="text-3xl font-bold mb-10 tracking-tight">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div 
                className={`space-y-2 light-glow ${activeField === 'name' ? 'opacity-100' : 'opacity-90'}`}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full border-2 h-14 px-6 text-lg transition-all duration-300 bg-transparent focus:border-primary"
                />
              </div>
              
              <div 
                className={`space-y-2 light-glow ${activeField === 'email' ? 'opacity-100' : 'opacity-90'}`}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full border-2 h-14 px-6 text-lg transition-all duration-300 bg-transparent focus:border-primary"
                />
              </div>
              
              <div 
                className={`space-y-2 light-glow ${activeField === 'message' ? 'opacity-100' : 'opacity-90'}`}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full min-h-[200px] p-6 text-lg border-2 transition-all duration-300 bg-transparent focus:border-primary"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full button-animation h-16 text-lg font-medium tracking-wider"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
          
          <div className={`lg:col-span-2 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}>
            <div className="bg-background rounded-2xl p-8 md:p-12 border border-border/50 shadow-sm mb-8">
              <h3 className="text-3xl font-bold mb-10 tracking-tight">Contact Information</h3>
              
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-xl">Visit Us</h4>
                    <p className="text-muted-foreground text-lg">
                      123 Design Street, Creative District<br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-xl">Email Us</h4>
                    <p className="text-muted-foreground text-lg">
                      hello@topdesignr.com<br />
                      support@topdesignr.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-xl">Call Us</h4>
                    <p className="text-muted-foreground text-lg">
                      +1 (555) 234-5678<br />
                      Mon-Fri, 9am-6pm PST
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background rounded-2xl overflow-hidden h-[300px] border border-border/50 shadow-sm relative">
              <div className="absolute inset-0 bg-primary/5 z-10 pointer-events-none"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1623256242502!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Our location"
                aria-hidden="false"
                tabIndex={0}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
