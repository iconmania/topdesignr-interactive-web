
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

export default function TestimonialsAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Testimonial>({
    id: 0,
    quote: "",
    author: "",
    position: "",
    company: "",
    image: ""
  });

  // Load testimonials from localStorage
  useEffect(() => {
    const storedTestimonials = localStorage.getItem("adminTestimonials");
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      id: Date.now(),
      quote: "",
      author: "",
      position: "",
      company: "",
      image: ""
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsEditing(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData(testimonial);
    setEditingId(testimonial.id);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    // Filter out the deleted testimonial
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    
    // Update state and localStorage
    setTestimonials(updatedTestimonials);
    localStorage.setItem("adminTestimonials", JSON.stringify(updatedTestimonials));
    
    toast({
      title: "Testimonial deleted",
      description: "The testimonial has been removed successfully."
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.quote || !formData.author) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    let updatedTestimonials: Testimonial[];
    
    // Process based on whether we're editing or adding new
    if (editingId !== null) {
      // Edit existing testimonial
      updatedTestimonials = testimonials.map(t => 
        t.id === editingId ? { ...formData } : t
      );
      toast({
        title: "Testimonial updated",
        description: "The testimonial has been updated successfully."
      });
    } else {
      // Add new testimonial
      const newTestimonial: Testimonial = {
        ...formData,
        id: Date.now()
      };
      updatedTestimonials = [...testimonials, newTestimonial];
      toast({
        title: "Testimonial added",
        description: "The new testimonial has been added successfully."
      });
    }
    
    // Update state and localStorage
    setTestimonials(updatedTestimonials);
    localStorage.setItem("adminTestimonials", JSON.stringify(updatedTestimonials));
    
    // Reset form and editing state
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        {!isEditing && (
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        )}
      </div>

      {isEditing ? (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="quote" className="text-sm font-medium">Testimonial Quote*</label>
                <Textarea 
                  id="quote"
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="Enter the testimonial quote..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="author" className="text-sm font-medium">Author Name*</label>
                  <Input 
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter the author name..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">Position</label>
                  <Input 
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Enter the author's position..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company</label>
                  <Input 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter the company name..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">Image URL</label>
                  <Input 
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter the image URL..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Update" : "Save"} Testimonial
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6 overflow-auto">
            {testimonials.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No testimonials found. Add your first testimonial.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Position / Company</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="max-w-md">
                        <div className="truncate">{testimonial.quote}</div>
                      </TableCell>
                      <TableCell>{testimonial.author}</TableCell>
                      <TableCell>
                        {testimonial.position && `${testimonial.position}`}
                        {testimonial.position && testimonial.company && ' at '}
                        {testimonial.company && `${testimonial.company}`}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(testimonial)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(testimonial.id)}>
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
      )}
    </div>
  );
}
