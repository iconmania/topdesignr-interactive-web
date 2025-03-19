
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function ServicesAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);

  // Load services from localStorage
  useEffect(() => {
    const storedServices = localStorage.getItem("adminServices");
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  const handleAddNew = () => {
    // Generate new ID
    const newId = services.length > 0 
      ? Math.max(...services.map(service => service.id)) + 1 
      : 1;
    
    navigate(`/admin/services/${newId}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/services/${id}`);
  };

  const handleDelete = (id: number) => {
    // Filter out the deleted service
    const updatedServices = services.filter(service => service.id !== id);
    
    // Update state and localStorage
    setServices(updatedServices);
    localStorage.setItem("adminServices", JSON.stringify(updatedServices));
    
    toast({
      title: "Service deleted",
      description: "The service has been removed successfully."
    });
  };

  const handleView = (id: number) => {
    window.open(`/services/${id}`, '_blank');
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 overflow-auto">
          {services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No services found. Add your first service.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{truncateText(service.description)}</TableCell>
                    <TableCell>{service.icon}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(service.id)}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(service.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
