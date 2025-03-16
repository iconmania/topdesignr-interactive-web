
import { Instagram, Twitter, Facebook, Linkedin, ArrowUp, ChevronRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useState, useRef, useEffect } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function Footer() {
  const { normalizedX, normalizedY } = useMousePosition();
  const [year] = useState(new Date().getFullYear());
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);
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
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <footer ref={footerRef} className="bg-black text-white pt-32 pb-8 px-6 md:px-12 relative overflow-hidden">
      {/* Background Gradient Elements */}
      <div 
        className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-primary/10 blur-3xl"
        style={{
          transform: `translate(${normalizedX * 20}px, ${normalizedY * 20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      ></div>
      
      <div 
        className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-primary/10 blur-3xl"
        style={{
          transform: `translate(${normalizedX * -20}px, ${normalizedY * -20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Logo & Info */}
          <div className={`md:col-span-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <a href="#" className="text-4xl font-black tracking-tighter text-white mb-8 inline-block">
              Top<span className="text-gradient">Designr</span>
            </a>
            <p className="text-white/70 text-base mb-8 font-light max-w-sm">
              Creating exceptional digital experiences
              that drive engagement and deliver results.
            </p>
            <div className="flex space-x-4">
              <MagneticButton
                variant="ghost" 
                className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 group relative overflow-hidden p-0"
                aria-label="Instagram"
                onMouseEnter={() => setHoveredLink('instagram')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className={`absolute inset-0 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 opacity-0 transition-opacity duration-300 ${hoveredLink === 'instagram' ? 'opacity-100' : ''}`}></span>
                <Instagram className="h-5 w-5 relative z-10" />
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 group relative overflow-hidden p-0"
                aria-label="Twitter"
                onMouseEnter={() => setHoveredLink('twitter')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className={`absolute inset-0 bg-gradient-to-tr from-blue-400 to-blue-600 opacity-0 transition-opacity duration-300 ${hoveredLink === 'twitter' ? 'opacity-100' : ''}`}></span>
                <Twitter className="h-5 w-5 relative z-10" />
              </MagneticButton>
              <MagneticButton 
                variant="ghost"
                className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 group relative overflow-hidden p-0"
                aria-label="Facebook"
                onMouseEnter={() => setHoveredLink('facebook')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className={`absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-800 opacity-0 transition-opacity duration-300 ${hoveredLink === 'facebook' ? 'opacity-100' : ''}`}></span>
                <Facebook className="h-5 w-5 relative z-10" />
              </MagneticButton>
              <MagneticButton
                variant="ghost" 
                className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 group relative overflow-hidden p-0"
                aria-label="LinkedIn"
                onMouseEnter={() => setHoveredLink('linkedin')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className={`absolute inset-0 bg-gradient-to-tr from-blue-500 to-blue-700 opacity-0 transition-opacity duration-300 ${hoveredLink === 'linkedin' ? 'opacity-100' : ''}`}></span>
                <Linkedin className="h-5 w-5 relative z-10" />
              </MagneticButton>
            </div>
          </div>
          
          {/* Services */}
          <div className={`md:col-span-2 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h3 className="text-xl font-bold mb-6 tracking-tight">Services</h3>
            <ul className="space-y-3">
              {["Strategy & Branding", "UI/UX Design", "Web Development", "App Development", "Digital Marketing"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white/70 text-sm hover:text-white transition-colors duration-300 group flex items-center">
                    <ChevronRight className="h-3 w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-300" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div className={`md:col-span-2 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h3 className="text-xl font-bold mb-6 tracking-tight">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Our Work", "Careers", "Blog", "Contact"].map((item, index) => (
                <li key={index}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/70 text-sm hover:text-white transition-colors duration-300 group flex items-center">
                    <ChevronRight className="h-3 w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-300" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Subscribe */}
          <div className={`md:col-span-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h3 className="text-xl font-bold mb-6 tracking-tight">Subscribe</h3>
            <p className="text-white/70 text-sm mb-5">
              Subscribe to our newsletter to receive updates and insights.
            </p>
            <form className="flex mb-4 overflow-hidden rounded-full border border-white/20 focus-within:border-white transition-colors duration-300">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-6 py-3 bg-transparent text-white outline-none text-sm"
                required
              />
              <MagneticButton
                type="submit"
                variant="default"
                className="bg-white text-black px-5 py-2 font-medium hover:bg-white/90 transition-colors duration-300 rounded-none"
              >
                Subscribe
              </MagneticButton>
            </form>
            <p className="text-xs text-white/50">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-xs mb-4 md:mb-0">
            © {year} TopDesignr. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 items-center">
            <a href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-300">
              Cookie Policy
            </a>
            <MagneticButton
              variant="ghost"
              onClick={scrollToTop}
              className="text-white/50 hover:text-white transition-colors duration-300 ml-2 p-0 bg-transparent"
              aria-label="Back to top"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors duration-300">
                <ArrowUp className="h-3 w-3" />
              </div>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
