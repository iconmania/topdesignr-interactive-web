
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Edit, Trash, Plus, Quote, Save, X } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Get initial testimonials from the Testimonials component
const initialTestimonials = [
  {
    id: 1,
    quote: "TopDesignr transformed our digital presence with a website that perfectly captures our brand essence. Their strategic approach and attention to detail exceeded our expectations.",
    author: "Sarah Johnson",
    position: "Marketing Director",
    company: "Eleva Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    quote: "Working with TopDesignr on our app redesign was a game-changer. They not only delivered a beautiful interface but also improved user engagement and conversion rates dramatically.",
    author: "Michael Chen",
    position: "Product Manager",
    company: "Pulse Technologies",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    quote: "The team at TopDesignr brings a perfect blend of creativity and strategic thinking. Their rebrand of our company helped us stand out in a crowded market and attract our ideal clients.",
    author: "Emma Rodriguez",
    position: "CEO",
    company: "Nova Creative",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    quote: "TopDesignr's approach to UX design completely revolutionized our platform. They took the time to understand our users' needs and delivered an experience that feels intuitive and engaging.",
    author: "David Park",
    position: "UX Lead",
    company: "Spectrum Digital",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

// Form schema
const formSchema = z.object({
  quote: z.string().min(10, "Testimonial quote must be at least 10 characters"),
  author: z.string().min(2, "Author name is required"),
  position: z.string().min(2, "Position is required"),
  company: z.string().min(2, "Company name is required"),
  image: z.string().url("Please enter a valid image URL").or(z.literal(""))
});

type FormValues = z.infer<typeof formSchema>;

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: "",
      author: "",
      position: "",
      company: "",
      image: ""
    }
  });

  useEffect(() => {
    // In a real app, we would fetch testimonials from an API
    const savedTestimonials = localStorage.getItem("adminTestimonials");
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      setTestimonials(initialTestimonials);
      localStorage.setItem("adminTestimonials", JSON.stringify(initialTestimonials));
    }
  }, []);

  const openAddDialog = () => {
    form.reset({
      quote: "",
      author: "",
      position: "",
      company: "",
      image: ""
    });
    setIsEditing(false);
    setCurrentTestimonial(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: any) => {
    form.reset({
      quote: testimonial.quote,
      author: testimonial.author,
      position: testimonial.position,
      company: testimonial.company,
      image: testimonial.image || ""
    });
    setIsEditing(true);
    setCurrentTestimonial(testimonial);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (testimonial: any) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = (values: FormValues) => {
    // Create a copy of the current testimonials
    const updatedTestimonials = [...testimonials];

    if (isEditing && currentTestimonial) {
      // Update existing testimonial
      const index = updatedTestimonials.findIndex(t => t.id === currentTestimonial.id);
      if (index !== -1) {
        updatedTestimonials[index] = {
          ...updatedTestimonials[index],
          ...values
        };
      }
      toast({
        title: "Testimonial updated",
        description: "The testimonial has been updated successfully."
      });
    } else {
      // Add new testimonial
      const newId = updatedTestimonials.length > 0 
        ? Math.max(...updatedTestimonials.map(t => t.id)) + 1 
        : 1;
      
      updatedTestimonials.push({
        id: newId,
        ...values
      });
      toast({
        title: "Testimonial added",
        description: "The new testimonial has been added successfully."
      });
    }

    // Save to localStorage
    setTestimonials(updatedTestimonials);
    localStorage.setItem("adminTestimonials", JSON.stringify(updatedTestimonials));
    
    // Close dialog
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (!currentTestimonial) return;

    // Filter out the testimonial to delete
    const updatedTestimonials = testimonials.filter(t => t.id !== currentTestimonial.id);
    
    // Save to localStorage
    setTestimonials(updatedTestimonials);
    localStorage.setItem("adminTestimonials", JSON.stringify(updatedTestimonials));
    
    toast({
      title: "Testimonial deleted",
      description: "The testimonial has been removed successfully."
    });
    
    // Close dialog
    setIsDeleteDialogOpen(false);
    setCurrentTestimonial(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials shown on your website.</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden flex flex-col">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-muted">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{testimonial.author}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4 flex-grow">
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                <p className="pl-4 italic text-muted-foreground">
                  "{testimonial.quote}"
                </p>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog(testimonial)}
              >
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openDeleteDialog(testimonial)}
                className="text-destructive hover:text-destructive"
              >
                <Trash className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
          <Quote className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No testimonials found</h3>
          <p className="text-muted-foreground text-center mb-6">
            You haven't added any client testimonials yet
          </p>
          <Button onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Testimonial
          </Button>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update the testimonial details below." 
                : "Add a new client testimonial to showcase on your website."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial Quote</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter the client's testimonial..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. CEO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? "Update" : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
