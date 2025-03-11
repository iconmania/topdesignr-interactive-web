
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
  size: "large" | "medium" | "small";
  alignment?: "left" | "center" | "right";
};

const projects: Project[] = [
  {
    id: 1,
    title: "Quantum Brand Redesign",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    year: "2023",
    size: "large",
    alignment: "left"
  },
  {
    id: 2,
    title: "Nebula Mobile App",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    year: "2023",
    size: "medium",
    alignment: "center"
  },
  {
    id: 3,
    title: "Echo E-commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    year: "2022",
    size: "small",
    alignment: "right"
  },
  {
    id: 4,
    title: "Pulse Interactive Installation",
    category: "Interactive Design",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    year: "2022",
    size: "large",
    alignment: "right"
  },
  {
    id: 5,
    title: "Horizon Virtual Reality",
    category: "Immersive Experience",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    year: "2021",
    size: "medium",
    alignment: "left"
  },
  {
    id: 6,
    title: "Nova Marketing Campaign",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    year: "2021",
    size: "small",
    alignment: "center"
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { normalizedX, normalizedY } = useMousePosition();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [index]);

  const getSizeClasses = () => {
    switch (project.size) {
      case "large":
        return "col-span-12 md:col-span-12 h-screen";
      case "medium":
        return "col-span-12 md:col-span-8 h-[90vh]";
      case "small":
        return "col-span-12 md:col-span-4 h-[70vh]";
      default:
        return "col-span-12 md:col-span-6 h-[80vh]";
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
    <div 
      ref={cardRef}
      className={`group relative overflow-hidden transition-all duration-700 ${getSizeClasses()} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } cursor-design`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="absolute inset-0 h-full w-full">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full transition-transform duration-1000 ease-out"
          style={{ 
            transform: isHovered 
              ? `scale(1.05) translate(${normalizedX * 5}px, ${normalizedY * 5}px)` 
              : 'scale(1)',
            objectPosition: project.alignment === "left" 
              ? "left center" 
              : project.alignment === "right" 
                ? "right center" 
                : "center"
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
      </div>
      
      <div className={`absolute inset-0 flex flex-col ${getAlignmentClasses()} items-start p-10 md:p-16`}>
        <div 
          className={`max-w-lg transition-all duration-700 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
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
      
      {/* Project number typography in background */}
      <div className="absolute bottom-0 right-0 p-10 opacity-20 pointer-events-none">
        <span className="text-[20vw] font-black text-white leading-none">{index + 1}</span>
      </div>
    </div>
  );
};

export default function Portfolio() {
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
  
  return (
    <section id="work" ref={sectionRef} className="py-24">
      <div className="container px-4 md:px-12 mb-20">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass px-4 py-1 rounded-full inline-flex items-center mb-4 bg-background/5 backdrop-blur-md border-0">
            <p className="text-sm uppercase tracking-widest">Our Projects</p>
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">Selected <span className="text-gradient">Work</span></h2>
          <p className="text-muted-foreground max-w-2xl text-xl font-light">
            Explore our portfolio of award-winning projects where thoughtful design
            meets cutting-edge technology to create meaningful digital experiences.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
