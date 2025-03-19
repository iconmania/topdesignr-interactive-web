
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash, Eye, LayoutGrid, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

// Get initial services from the Services component
const initialServices = [
  {
    id: 1,
    title: "Strategy & Branding",
    description: "We develop comprehensive brand strategies that align with your business goals and resonate with your target audience.",
    icon: "LineChart"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Our user-centered approach creates intuitive interfaces and meaningful experiences that drive engagement and satisfaction.",
    icon: "Palette"
  },
  {
    id: 3,
    title: "Web Development",
    description: "We build high-performance, responsive websites with clean code and cutting-edge technologies for optimal user experience.",
    icon: "Globe"
  },
  {
    id: 4,
    title: "App Development",
    description: "From concept to launch, we create native and cross-platform mobile applications that engage users and deliver results.",
    icon: "Layers"
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "We implement data-driven marketing strategies that increase visibility, drive traffic, and convert visitors into customers.",
    icon: "LineChart"
  },
  {
    id: 6,
    title: "Interactive Experiences",
    description: "We design immersive digital experiences that captivate audiences, from AR/VR to interactive installations.",
    icon: "LayoutGrid"
  }
];

// Add detail fields to each service
const servicesWithDetails = initialServices.map(service => ({
  ...service,
  fullDescription: `Our ${service.title} service is designed to help businesses achieve their goals through strategic thinking and technical excellence. We work closely with our clients to understand their unique needs and deliver solutions that exceed expectations.`,
  benefits: [
    "Increase user engagement and satisfaction",
    "Drive business growth through digital innovation",
    "Stand out from competitors with unique digital solutions"
  ],
  process: [
    "Initial consultation and discovery",
    "Strategy development and planning",
    "Implementation and execution",
    "Testing and refinement",
    "Launch and ongoing support"
  ],
  caseStudies: [
    {
      title: "Success Story",
      client: "Example Client",
      description: "A brief description of how this service helped a client solve a specific problem and achieve remarkable results."
    }
  ],
  pricing: {
    starter: {
      name: "Starter",
      price: "$1,000",
      features: ["Basic service", "One revision", "7-day delivery"]
    },
    professional: {
      name: "Professional",
      price: "$2,500",
      features: ["Advanced service", "Three revisions", "14-day delivery", "Additional support"]
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      features: ["Comprehensive service", "Unlimited revisions", "Priority delivery", "Dedicated support"]
    }
  },
  faq: [
    {
      question: "How long does this service typically take?",
      answer: "The timeline varies depending on the scope and complexity of the project, but we typically deliver within 2-4 weeks."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, we offer various support packages to ensure your project continues to perform optimally after launch."
    }
  ]
}));

export default function ServicesAdmin() {
  const [services, setServices] = useState(servicesWithDetails);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we would fetch services from an API
    const savedServices = localStorage.getItem("adminServices");
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      setServices(servicesWithDetails);
      localStorage.setItem("adminServices", JSON.stringify(servicesWithDetails));
    }
  }, []);

  const handleDeleteClick = (id: number) => {
    setServiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete === null) return;
    
    const updatedServices = services.filter(service => service.id !== serviceToDelete);
    setServices(updatedServices);
    localStorage.setItem("adminServices", JSON.stringify(updatedServices));
    
    toast({
      title: "Service deleted",
      description: "The service has been removed successfully."
    });
    
    setDeleteDialogOpen(false);
    setServiceToDelete(null);
  };

  const handleCreateNew = () => {
    // Calculate the next ID
    const nextId = services.length > 0 
      ? Math.max(...services.map(p => p.id)) + 1 
      : 1;
    
    navigate(`/admin/services/${nextId}`);
  };

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "LineChart":
        return <LineChartIcon className="h-8 w-8" />;
      case "Palette":
        return <PaletteIcon className="h-8 w-8" />;
      case "Globe":
        return <GlobeIcon className="h-8 w-8" />;
      case "Layers":
        return <LayersIcon className="h-8 w-8" />;
      case "LayoutGrid":
        return <LayoutGrid className="h-8 w-8" />;
      default:
        return <Settings className="h-8 w-8" />;
    }
  };

  // Simple icon components for the admin display
  const LineChartIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );

  const PaletteIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="19" cy="12" r="2.5" />
      <circle cx="13.5" cy="17.5" r="2.5" />
      <circle cx="6.5" cy="12" r="2.5" />
      <path d="M12 12H6.5" />
      <path d="M12 12v-5.5" />
      <path d="M12 12h7" />
      <path d="M12 12v5.5" />
    </svg>
  );

  const GlobeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );

  const LayersIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.18-8.58 3.91a2 2 0 0 1-1.66 0L2 12.18" />
      <path d="m22 17.18-8.58 3.91a2 2 0 0 1-1.66 0L2 17.18" />
    </svg>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings and details.</p>
        </div>
        <Button onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  {getIconComponent(service.icon)}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="py-4 flex-grow">
              <p className="text-muted-foreground line-clamp-3 text-sm">
                {service.description}
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-4 flex justify-between">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link to={`/services/${service.id}`}>
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link to={`/admin/services/${service.id}`}>
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteClick(service.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
          <Settings className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground text-center mb-6">
            You haven't added any services yet
          </p>
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Service
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
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
