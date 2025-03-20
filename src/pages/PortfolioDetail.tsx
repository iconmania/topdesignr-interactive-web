
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Clock, Building, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useEffect(() => {
    // Get project from localStorage
    const savedProjects = localStorage.getItem("adminPortfolio");
    if (savedProjects && id) {
      const projects = JSON.parse(savedProjects);
      const projectId = parseInt(id);
      const foundProject = projects.find((p: any) => p.id === projectId);
      
      if (foundProject) {
        // If we have a match from admin dashboard data
        setProject(foundProject);
      } else {
        // Try to get from portfolioProjects (frontend data)
        const frontendProjects = localStorage.getItem("portfolioProjects");
        if (frontendProjects) {
          const projects = JSON.parse(frontendProjects);
          const foundProject = projects.find((p: any) => p.id === projectId);
          if (foundProject) {
            setProject(foundProject);
          }
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

  const nextImage = () => {
    const totalImages = 1 + (project.additionalImages?.length || 0);
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    const totalImages = 1 + (project.additionalImages?.length || 0);
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const allImages = [project.image, ...(project.additionalImages || [])].filter(Boolean);

  return (
    <div ref={sectionRef} className="min-h-screen pb-24">
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
              <MagneticButton asChild strength={20}>
                <Link to="/" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Portfolio
                </Link>
              </MagneticButton>
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

        {/* Gallery Section - Slider */}
        {allImages.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-12 text-center">Project Gallery</h2>
            
            <div className="relative overflow-hidden rounded-xl aspect-video mb-12">
              {allImages.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeImageIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} - image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 transition-colors text-white rounded-full p-3 z-10"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 transition-colors text-white rounded-full p-3 z-10"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          activeImageIndex === index 
                            ? "bg-white w-6" 
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Gallery Section - Full Images Stacked */}
            <div className="space-y-12">
              {project.additionalImages && project.additionalImages.map((image: string, index: number) => (
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

        {/* Next Project Navigation */}
        <div className="flex justify-center">
          <div className="flex space-x-4">
            <MagneticButton asChild strength={20}>
              <Link to="/" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
