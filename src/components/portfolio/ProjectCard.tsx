
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Link } from "react-router-dom";
import { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({
  project,
  index
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const {
    normalizedX,
    normalizedY
  } = useMousePosition();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsVisible(true);
        }, index * 100);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [index]);

  // Size classes based on project size setting
  const getSizeClasses = () => {
    switch (project.size) {
      case "full":
        return "col-span-12 h-[90vh] md:h-[95vh]";
      case "col-8":
        return "col-span-12 md:col-span-8 h-[65vh] md:h-[80vh]";
      case "col-6":
        return "col-span-12 md:col-span-6 h-[55vh] md:h-[70vh]";
      case "col-4":
        return "col-span-12 md:col-span-4 h-[45vh] md:h-[60vh]";
      default:
        return "col-span-12 md:col-span-6 h-[60vh] md:h-[75vh]";
    }
  };

  const getAlignmentClasses = () => {
    switch (project.alignment) {
      case "left":
        return "justify-start md:pr-[40%]";
      case "center":
        return "justify-center";
      case "right":
        return "justify-end md:pl-[40%]";
      default:
        return "justify-center";
    }
  };

  return (
    <div className={`${getSizeClasses()}`}>
      <Link to={`/portfolio/${project.id}`} className="block h-full w-full">
        <div 
          ref={cardRef} 
          data-cursor="design" 
          className={`group relative overflow-hidden transition-all duration-700 h-full w-full ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`} 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
          style={{
            transitionDelay: `${index * 150}ms`
          }}
        >
          <div className="absolute inset-0 h-full w-full">
            <img 
              src={project.image} 
              alt={project.title} 
              className="object-cover w-full h-full transition-transform duration-1000 ease-out" 
              style={{
                transform: isHovered ? `scale(1.05) translate(${normalizedX * 5}px, ${normalizedY * 5}px)` : 'scale(1)',
                objectPosition: project.alignment === "left" ? "left center" : project.alignment === "right" ? "right center" : "center"
              }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          
          <div className={`absolute inset-0 flex flex-col ${getAlignmentClasses()} items-start p-10 md:p-16`}>
            <div className={`max-w-lg transition-all duration-700 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
              <div className="mb-2 overflow-hidden">
                <p className="text-sm tracking-widest uppercase text-white/70 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-100">
                  {project.category}
                </p>
              </div>
              
              <div className="overflow-hidden mb-4">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-200">
                  {project.title}
                </h3>
              </div>
              
              <div className="overflow-hidden">
                <div className="flex items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-300">
                  <p className="text-sm text-white/70 mr-4">{project.year}</p>
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center transition-all duration-500 transform scale-0 group-hover:scale-100">
                    <ArrowUpRight className="h-6 w-6 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
