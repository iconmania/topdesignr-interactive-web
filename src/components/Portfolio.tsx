
import { useRef, useState, useEffect } from "react";
import ProjectCard from "./portfolio/ProjectCard";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { projects } = usePortfolioProjects();

  useEffect(() => {
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

  return (
    <section id="work" ref={sectionRef} className="py-24 w-full overflow-hidden">
      <div className="container px-4 md:px-12 mb-20">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0 px-0">
            <p className="text-sm uppercase tracking-widest">Our Projects</p>
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">Selected <span className="text-gradient">Work</span></h2>
          <p className="text-muted-foreground max-w-2xl text-xl font-light">
            Explore our portfolio of award-winning projects where thoughtful design
            meets cutting-edge technology to create meaningful digital experiences.
          </p>
        </div>
      </div>
      
      {/* Full-width grid container for portfolio items */}
      <div className="grid grid-cols-12 gap-8 px-4 md:px-8 max-w-[100vw] w-full">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
