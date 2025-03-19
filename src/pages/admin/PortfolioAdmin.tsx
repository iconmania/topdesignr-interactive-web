
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash, Eye, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Get initial projects from the Portfolio component
const initialProjects = [
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

// Add detail fields to each project
const projectsWithDetails = initialProjects.map(project => ({
  ...project,
  description: `This ${project.category.toLowerCase()} project showcases our expertise in creating impactful digital experiences. We worked closely with the client to deliver exceptional results that exceeded their expectations.`,
  client: "Client Name",
  duration: "8 weeks",
  services: ["Strategy", "Design", "Development"],
  challenge: "The main challenge was to create a solution that would stand out in a competitive market while meeting the client's specific requirements and timeline constraints.",
  solution: "We implemented a user-centered design approach, focusing on intuitive interfaces and seamless interactions. Our team developed custom features that enhanced the overall experience and addressed the client's unique needs.",
  result: "The project resulted in a 40% increase in user engagement and received positive feedback from both the client and end-users. It has set a new standard for quality and innovation in the industry.",
  testimonial: "Working with TopDesignr was an absolute pleasure. They understood our vision from the start and delivered beyond our expectations.",
  additionalImages: [
    "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  ]
}));

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState(projectsWithDetails);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we would fetch projects from an API
    const savedProjects = localStorage.getItem("portfolioProjects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(projectsWithDetails);
      localStorage.setItem("portfolioProjects", JSON.stringify(projectsWithDetails));
    }
  }, []);

  const handleDeleteClick = (id: number) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete === null) return;
    
    const updatedProjects = projects.filter(project => project.id !== projectToDelete);
    setProjects(updatedProjects);
    localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects));
    
    toast({
      title: "Project deleted",
      description: "The project has been removed from your portfolio."
    });
    
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleCreateNew = () => {
    // Calculate the next ID
    const nextId = projects.length > 0 
      ? Math.max(...projects.map(p => p.id)) + 1 
      : 1;
    
    navigate(`/admin/portfolio/${nextId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Portfolio</h1>
          <p className="text-muted-foreground">Manage your portfolio projects.</p>
        </div>
        <Button onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video relative overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                />
              ) : (
                <div className="bg-muted w-full h-full flex items-center justify-center">
                  <ImageOff className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <CardContent className="py-4 flex-grow">
              <div className="mb-2">
                <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-1">
                  {project.category}
                </span>
                <span className="text-xs text-muted-foreground ml-2">{project.year}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {project.description}
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-4 flex justify-between">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link to={`/portfolio/${project.id}`}>
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link to={`/admin/portfolio/${project.id}`}>
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteClick(project.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
          <ImageOff className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground text-center mb-6">
            You haven't added any portfolio projects yet
          </p>
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Project
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
