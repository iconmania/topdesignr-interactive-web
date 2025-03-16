
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
import { useEffect } from "react";

const Index = () => {
  // Add custom cursor class to body
  useEffect(() => {
    document.body.classList.add('use-custom-cursor');
    
    return () => {
      document.body.classList.remove('use-custom-cursor');
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full overflow-x-hidden">
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
