
import { useState, useRef, useEffect } from "react";
import { 
  Send,
  Mail,
  PhoneCall,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Loader2
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save message to localStorage for admin message center
      const savedMessages = localStorage.getItem("adminMessages");
      const messages = savedMessages ? JSON.parse(savedMessages) : [];
      
      const newMessage = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        message: data.message,
        date: new Date().toISOString(),
        read: false
      };
      
      messages.unshift(newMessage);
      localStorage.setItem("adminMessages", JSON.stringify(messages));
      
      // Check if auto-forward is enabled
      const autoForwardEmail = localStorage.getItem("autoForwardEmail");
      if (autoForwardEmail) {
        console.log(`Auto-forwarding message to ${autoForwardEmail}`);
        // In a real app, we would send the email here
      }
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-12 relative overflow-hidden" data-cursor="text">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="glass py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0 px-0">
              <p className="text-sm uppercase tracking-widest">Get In Touch</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">
              Let's <span className="text-gradient-animated">Connect</span>
            </h2>
            <p className="text-muted-foreground mb-12 max-w-md text-lg font-light">
              Have a project in mind or want to learn more about our services? 
              We'd love to hear from you. Get in touch with us using the contact form or
              connect via the information below.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">hello@topdesignr.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                  <PhoneCall className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    123 Design Street<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <MagneticButton variant="outline" size="icon" className="button-animation rounded-full" strength={20}>
                <Instagram className="h-5 w-5" />
              </MagneticButton>
              <MagneticButton variant="outline" size="icon" className="button-animation rounded-full" strength={20}>
                <Twitter className="h-5 w-5" />
              </MagneticButton>
              <MagneticButton variant="outline" size="icon" className="button-animation rounded-full" strength={20}>
                <Linkedin className="h-5 w-5" />
              </MagneticButton>
              <MagneticButton variant="outline" size="icon" className="button-animation rounded-full" strength={20}>
                <Facebook className="h-5 w-5" />
              </MagneticButton>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
            <div className="bg-card border shadow-lg rounded-xl p-8 relative overflow-hidden">
              {/* Form Background Effects */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project..." 
                            className="min-h-[150px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <MagneticButton 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                    strength={25}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
