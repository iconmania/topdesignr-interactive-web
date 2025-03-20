
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Clock, Building, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Simple Footer component
const ProjectFooter = () => {
  return (
    <footer className="border-t border-border/20 mt-32 pt-8 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 TopDesignr. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [nextProject, setNextProject] = useState<any>(null);
  const [prevProject, setPrevProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const [allProjects, setAllProjects] = useState<any[]>([]);

  useEffect(() => {
    // Get all projects first
    const fetchAllProjects = () => {
      const savedProjects = localStorage.getItem("adminPortfolio");
      if (savedProjects) {
        return JSON.parse(savedProjects);
      }
      
      // Try to get from portfolioProjects (frontend data)
      const frontendProjects = localStorage.getItem("portfolioProjects");
      if (frontendProjects) {
        return JSON.parse(frontendProjects);
      }
      
      return [];
    };
    
    const projects = fetchAllProjects();
    setAllProjects(projects);
    
    if (projects.length > 0 && id) {
      const projectId = parseInt(id);
      const currentIndex = projects.findIndex((p: any) => p.id === projectId);
      
      if (currentIndex !== -1) {
        // Set current project
        setProject(projects[currentIndex]);
        
        // Set next project
        if (currentIndex < projects.length - 1) {
          setNextProject(projects[currentIndex + 1]);
        } else {
          setNextProject(projects[0]); // Wrap around to first project
        }
        
        // Set previous project
        if (currentIndex > 0) {
          setPrevProject(projects[currentIndex - 1]);
        } else {
          setPrevProject(projects[projects.length - 1]); // Wrap around to last project
        }
      }
    }
    
    setLoading(false);
    
    // Animation timing
    setTimeout(() => {
      setIsTextVisible(true);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-black/60 z-10"
          style={{
            opacity: 0.7 - normalizedY * 0.3,
          }}
        ></div>
        
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `scale(1.1) translateY(${normalizedY * -30}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        
        <div 
          className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-16 lg:p-24"
          style={{
            transform: `translateY(${normalizedY * 50}px)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          <div className="max-w-3xl">
            <h1 
              className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white transition-all duration-1000 transform ${
                isTextVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              {project.title}
            </h1>
            
            <div 
              className={`flex flex-wrap gap-2 mb-8 transition-all duration-1000 delay-100 transform ${
                isTextVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              <span className="bg-primary/90 text-white text-sm px-4 py-1 rounded-full">
                {project.category}
              </span>
              <span className="bg-background/30 backdrop-blur-md text-white text-sm px-4 py-1 rounded-full">
                {project.date || project.year}
              </span>
            </div>
            
            <p 
              className={`text-lg lg:text-xl text-white/90 mb-10 max-w-2xl transition-all duration-1000 delay-200 transform ${
                isTextVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              {project.description}
            </p>
            
            <div 
              className={`transition-all duration-1000 delay-300 transform ${
                isTextVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            >
              <div className="flex flex-wrap gap-4">
                <MagneticButton asChild strength={20}>
                  <Link to="/" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Portfolio
                  </Link>
                </MagneticButton>

                {project.url && (
                  <MagneticButton asChild variant="secondary" strength={20}>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="group">
                      Visit Project
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                    </a>
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info Section */}
      <div className="container mx-auto px-6 -mt-20 relative z-30">
        <div className="bg-card border shadow-xl rounded-xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.client && (
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Client</h3>
                  <p>{project.client}</p>
                </div>
              </div>
            )}
            
            {project.duration && (
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Duration</h3>
                  <p>{project.duration}</p>
                </div>
              </div>
            )}
            
            {(project.date || project.year) && (
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Year</h3>
                  <p>{project.date || project.year}</p>
                </div>
              </div>
            )}
            
            {project.url && (
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Project URL</h3>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate inline-block max-w-[200px]"
                  >
                    {project.url}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Content Sections */}
      <div className="container mx-auto px-6 space-y-24">
        {/* Challenge, Solution, Result Section */}
        {(project.challenge || project.solution || project.result) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {project.challenge && (
              <div>
                <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-primary pb-2">The Challenge</h2>
                <p className="text-muted-foreground">{project.challenge}</p>
              </div>
            )}
            
            {project.solution && (
              <div>
                <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-primary pb-2">The Solution</h2>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>
            )}
            
            {project.result && (
              <div>
                <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-primary pb-2">The Result</h2>
                <p className="text-muted-foreground">{project.result}</p>
              </div>
            )}
          </div>
        )}

        {/* Gallery Section - Full Images Stacked */}
        {project.additionalImages && project.additionalImages.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-12 text-center">Project Gallery</h2>
            
            {/* Display additional images stacked */}
            <div className="space-y-12">
              {project.additionalImages.map((image: string, index: number) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-xl"
                >
                  <img 
                    src={image} 
                    alt={`${project.title} - detail ${index + 1}`} 
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial Section */}
        {project.testimonial && (
          <div className="max-w-4xl mx-auto">
            <blockquote className="relative border-l-4 border-primary pl-6 py-6 italic text-xl">
              <span className="absolute text-9xl text-primary/10 -top-10 -left-6">"</span>
              {project.testimonial}
            </blockquote>
            {project.client && (
              <p className="text-right mt-4 font-medium">— {project.client}</p>
            )}
          </div>
        )}

        {/* Next/Previous Project Navigation */}
        <div className="mt-24 border-t border-border/20 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {prevProject && (
              <Link 
                to={`/portfolio/${prevProject.id}`} 
                className="flex items-center group mb-6 md:mb-0 hover:text-primary transition-colors"
              >
                <ChevronLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-sm text-muted-foreground">Previous Project</p>
                  <h4 className="font-medium">{prevProject.title}</h4>
                </div>
              </Link>
            )}

            <MagneticButton asChild strength={20} className="my-6 md:my-0">
              <Link to="/">
                <div className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
                </div>
              </Link>
            </MagneticButton>

            {nextProject && (
              <Link 
                to={`/portfolio/${nextProject.id}`} 
                className="flex items-center group text-right hover:text-primary transition-colors"
              >
                <div>
                  <p className="text-sm text-muted-foreground">Next Project</p>
                  <h4 className="font-medium">{nextProject.title}</h4>
                </div>
                <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <ProjectFooter />
    </div>
  );
}
