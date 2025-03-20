
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [nextService, setNextService] = useState<any>(null);
  const [prevService, setPrevService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useEffect(() => {
    // Get service from localStorage
    const savedServices = localStorage.getItem("adminServices");
    if (savedServices && id) {
      const services = JSON.parse(savedServices);
      const serviceId = parseInt(id);
      const foundService = services.find((s: any) => s.id === serviceId);
      
      if (foundService) {
        setService(foundService);
        
        // Find next and previous services
        const currentIndex = services.findIndex((s: any) => s.id === serviceId);
        setPrevService(currentIndex > 0 ? services[currentIndex - 1] : null);
        setNextService(currentIndex < services.length - 1 ? services[currentIndex + 1] : null);
      }
    }
    
    setLoading(false);
    
    // Animation timing
    setTimeout(() => {
      setIsTextVisible(true);
    }, 300);
    
    // Scroll to top when component mounts or ID changes
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  // Map icon names to components
  const getServiceIcon = () => {
    switch (service.icon) {
      case "LineChart":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        );
      case "Palette":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
            <circle cx="13.5" cy="6.5" r="2.5" />
            <circle cx="19" cy="12" r="2.5" />
            <circle cx="13.5" cy="17.5" r="2.5" />
            <circle cx="6.5" cy="12" r="2.5" />
            <path d="M12 12H6.5" />
            <path d="M12 12v-5.5" />
            <path d="M12 12h7" />
            <path d="M12 12v5.5" />
          </svg>
        );
      case "Globe":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        );
      case "Layers":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
            <path d="m22 12.18-8.58 3.91a2 2 0 0 1-1.66 0L2 12.18" />
            <path d="m22 17.18-8.58 3.91a2 2 0 0 1-1.66 0L2 17.18" />
          </svg>
        );
      case "LayoutGrid":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen pb-0">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
        {service.coverImage ? (
          <div className="absolute inset-0 opacity-20">
            <img 
              src={service.coverImage} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute -right-10 opacity-10 overflow-hidden">
              <div className="text-[40vw] font-black tracking-tighter text-primary/10">
                {service.title.substring(0, 1)}
              </div>
            </div>
          </div>
        )}
        
        <div 
          className="container mx-auto px-6 h-full flex flex-col justify-center"
          style={{
            transform: `translateY(${normalizedY * 30}px)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          <div className="max-w-3xl">
            <div 
              className={`text-primary mb-6 transition-all duration-1000 transform ${
                isTextVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              {getServiceIcon()}
            </div>
            
            <h1 
              className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 transition-all duration-1000 transform ${
                isTextVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              {service.title}
            </h1>
            
            <p 
              className={`text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl transition-all duration-1000 delay-200 transform ${
                isTextVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              {service.description}
            </p>
            
            <div 
              className={`transition-all duration-1000 delay-300 transform ${
                isTextVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              <MagneticButton asChild strength={20}>
                <Link to="/" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Services
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections (Vertical Layout) */}
      <div className="container mx-auto px-6 py-24">
        {/* Overview Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 tracking-tight">About this Service</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>{service.fullDescription}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-8 tracking-tight">Benefits</h2>
              <div className="space-y-4">
                {service.benefits?.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1 bg-primary/10 rounded-full p-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-8 bg-card rounded-xl border">
                <h3 className="text-2xl font-bold mb-6">Ready to get started?</h3>
                <p className="mb-6 text-muted-foreground">
                  Contact us today to discuss your needs and how we can help you achieve your goals.
                </p>
                <MagneticButton asChild strength={20}>
                  <Link to="/#contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        {service.process && service.process.length > 0 && (
          <div className="max-w-4xl mx-auto mb-32">
            <h2 className="text-3xl font-bold mb-12 tracking-tight text-center">Our Approach</h2>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[29px] top-10 bottom-10 w-px bg-border"></div>
              
              <div className="space-y-12">
                {service.process?.map((step: string, index: number) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center z-10">
                      <span className="text-xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-bold mb-4">Step {index + 1}</h3>
                      <p className="text-lg text-muted-foreground">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Section */}
        {service.pricing && (
          <div className="max-w-6xl mx-auto mb-32">
            <h2 className="text-3xl font-bold mb-12 tracking-tight text-center">Pricing Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              {service.pricing.starter && (
                <Card className="flex flex-col overflow-hidden border-border hover:border-primary/50 transition-colors">
                  <div className="bg-muted p-6 text-center">
                    <h3 className="text-lg font-bold mb-1">{service.pricing.starter.name}</h3>
                    <div className="text-3xl font-bold mb-1">{service.pricing.starter.price}</div>
                  </div>
                  <CardContent className="flex-grow p-6">
                    <ul className="space-y-4">
                      {service.pricing.starter.features?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 text-primary">
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <MagneticButton asChild className="w-full" strength={20} variant="outline">
                      <Link to="/#contact">Get Started</Link>
                    </MagneticButton>
                  </div>
                </Card>
              )}
              
              {/* Professional Plan */}
              {service.pricing.professional && (
                <Card className="flex flex-col overflow-hidden border-primary relative">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Popular
                  </div>
                  <div className="bg-primary/10 p-6 text-center">
                    <h3 className="text-lg font-bold mb-1">{service.pricing.professional.name}</h3>
                    <div className="text-3xl font-bold mb-1">{service.pricing.professional.price}</div>
                  </div>
                  <CardContent className="flex-grow p-6">
                    <ul className="space-y-4">
                      {service.pricing.professional.features?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 text-primary">
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <MagneticButton asChild className="w-full" strength={20}>
                      <Link to="/#contact">Get Started</Link>
                    </MagneticButton>
                  </div>
                </Card>
              )}
              
              {/* Enterprise Plan */}
              {service.pricing.enterprise && (
                <Card className="flex flex-col overflow-hidden border-border hover:border-primary/50 transition-colors">
                  <div className="bg-muted p-6 text-center">
                    <h3 className="text-lg font-bold mb-1">{service.pricing.enterprise.name}</h3>
                    <div className="text-3xl font-bold mb-1">{service.pricing.enterprise.price}</div>
                  </div>
                  <CardContent className="flex-grow p-6">
                    <ul className="space-y-4">
                      {service.pricing.enterprise.features?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 text-primary">
                            <Check className="h-4 w-4" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <MagneticButton asChild className="w-full" strength={20} variant="outline">
                      <Link to="/#contact">Contact Us</Link>
                    </MagneticButton>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Case Studies Section with Images */}
        {service.caseStudies && service.caseStudies.length > 0 && (
          <div className="max-w-6xl mx-auto mb-32">
            <h2 className="text-3xl font-bold mb-12 tracking-tight text-center">Case Studies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.caseStudies.map((caseStudy: any, index: number) => (
                <Card key={index} className="overflow-hidden">
                  {caseStudy.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={caseStudy.image} 
                        alt={caseStudy.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-2">{caseStudy.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">Client: {caseStudy.client}</p>
                    <p>{caseStudy.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {service.faq && service.faq.length > 0 && (
          <div className="max-w-4xl mx-auto mb-32">
            <h2 className="text-3xl font-bold mb-12 tracking-tight text-center">Frequently Asked Questions</h2>
            
            <div className="divide-y">
              {service.faq?.map((item: any, index: number) => (
                <div key={index} className="py-6">
                  <h3 className="text-xl font-bold mb-4">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg mb-6">Have more questions? We're here to help.</p>
              <MagneticButton asChild strength={20}>
                <Link to="/#contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        )}

        {/* Next/Previous Project Navigation */}
        <div className="max-w-6xl mx-auto mb-24 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-b py-8">
            <div>
              {prevService && (
                <Link 
                  to={`/services/${prevService.id}`} 
                  className="group flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <div>
                    <div className="text-sm text-muted-foreground">Previous Service</div>
                    <div className="font-medium">{prevService.title}</div>
                  </div>
                </Link>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              {nextService && (
                <Link 
                  to={`/services/${nextService.id}`} 
                  className="group flex items-center text-right"
                >
                  <div>
                    <div className="text-sm text-muted-foreground">Next Service</div>
                    <div className="font-medium">{nextService.title}</div>
                  </div>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-muted-foreground">© 2025 TopDesignr. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
