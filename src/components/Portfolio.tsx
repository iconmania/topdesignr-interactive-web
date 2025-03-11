
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Quantum Brand Redesign",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    year: "2023"
  },
  {
    id: 2,
    title: "Nebula Mobile App",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    year: "2023"
  },
  {
    id: 3,
    title: "Echo E-commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    year: "2022"
  },
  {
    id: 4,
    title: "Pulse Interactive Installation",
    category: "Interactive Design",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    year: "2022"
  },
  {
    id: 5,
    title: "Horizon Virtual Reality",
    category: "Immersive Experience",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    year: "2021"
  },
  {
    id: 6,
    title: "Nova Marketing Campaign",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    year: "2021"
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
  
  return (
    <div 
      ref={cardRef}
      className={`group relative overflow-hidden rounded-lg transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative aspect-[4/3] overflow-hidden"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : ""
          }`}
        />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className={`transition-all duration-500 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-white/70 mb-1">{project.category}</p>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
            </div>
            <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-500 ${
              isHovered ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}>
              <ArrowUpRight className="h-5 w-5 text-black" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-white/70">{project.year}</p>
          </div>
        </div>
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
    <section id="work" ref={sectionRef} className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass px-4 py-1 rounded-full inline-flex items-center mb-4">
            <p className="text-sm">Our Projects</p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Selected Work</h2>
          <p className="text-muted-foreground max-w-2xl">
            Explore our portfolio of award-winning projects where thoughtful design
            meets cutting-edge technology to create meaningful digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
