
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StyleCursor from "@/components/StyleCursor";
import { useEffect, useRef } from "react";

const Index = () => {
  // Add custom cursor class to body
  useEffect(() => {
    document.body.classList.add('use-custom-cursor');
    
    // Fix for horizontal scrolling issue
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    
    // Add ScrollReveal animation to all sections
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-section-visible');
          // Once the animation is done, we can unobserve
          if (entry.target.classList.contains('animate-once')) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!entry.target.classList.contains('animate-once')) {
            entry.target.classList.remove('animate-section-visible');
          }
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
      section.classList.add('animate-section', 'animate-once');
      observer.observe(section);
    });
    
    // Create or update data in localStorage if needed
    const ensureDataConsistency = () => {
      // For portfolio
      const adminPortfolio = localStorage.getItem("adminPortfolio");
      const portfolioProjects = localStorage.getItem("portfolioProjects");
      
      if (!adminPortfolio || JSON.parse(adminPortfolio).length === 0) {
        // If we have frontend portfolio data, use it to initialize admin data
        if (portfolioProjects) {
          localStorage.setItem("adminPortfolio", portfolioProjects);
        }
      }
      
      // For services
      const adminServices = localStorage.getItem("adminServices");
      const defaultServices = [
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
      
      if (!adminServices || JSON.parse(adminServices).length === 0) {
        localStorage.setItem("adminServices", JSON.stringify(defaultServices));
      }
      
      // For testimonials
      const adminTestimonials = localStorage.getItem("adminTestimonials");
      const defaultTestimonials = [
        {
          id: 1,
          quote: "Working with TopDesignr transformed our brand. Their strategic approach and attention to detail exceeded our expectations.",
          author: "Sarah Johnson",
          position: "Marketing Director",
          company: "Quantum Innovations",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          quote: "TopDesignr's team delivered a website that perfectly captures our brand essence while driving significant improvements in user engagement.",
          author: "Michael Chen",
          position: "CEO",
          company: "NexTech Solutions",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          quote: "The most impressive aspect of working with TopDesignr was their ability to translate our complex requirements into an intuitive user experience.",
          author: "Emily Rodriguez",
          position: "Product Manager",
          company: "Horizon Digital",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ];
      
      if (!adminTestimonials || JSON.parse(adminTestimonials).length === 0) {
        localStorage.setItem("adminTestimonials", JSON.stringify(defaultTestimonials));
      }
    };
    
    ensureDataConsistency();
    
    return () => {
      document.body.classList.remove('use-custom-cursor');
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      document.documentElement.style.width = '';
      observer.disconnect();
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full overflow-hidden">
        <StyleCursor />
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Portfolio />
          <About />
          <Services />
          <Testimonials />
          <CallToAction />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
