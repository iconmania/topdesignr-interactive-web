import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, ArrowLeft, Plus, Trash, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

// Form schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
  image: z.string().url("Please enter a valid URL").or(z.literal("")),
  size: z.enum(["small", "medium", "large"]),
  alignment: z.enum(["left", "center", "right"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  client: z.string().optional(),
  duration: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  testimonial: z.string().optional(),
  additionalImages: z.array(z.string().url("Please enter a valid URL").or(z.literal("")))
});

// Define a type based on the schema
type FormValues = z.infer<typeof formSchema>;

export default function PortfolioEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNewProject, setIsNewProject] = useState(false);
  const [additionalImageField, setAdditionalImageField] = useState("");

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      year: new Date().getFullYear().toString(),
      image: "",
      size: "medium",
      alignment: "center",
      description: "",
      client: "",
      duration: "",
      challenge: "",
      solution: "",
      result: "",
      testimonial: "",
      additionalImages: []
    }
  });

  useEffect(() => {
    if (!id) return navigate("/admin/portfolio");

    // Get portfolio projects from localStorage
    const savedProjects = localStorage.getItem("portfolioProjects");
    if (!savedProjects) {
      // If no projects exist yet, this is a new project
      setIsNewProject(true);
      return;
    }

    const projects = JSON.parse(savedProjects);
    const projectId = parseInt(id);
    const project = projects.find((p: any) => p.id === projectId);

    if (project) {
      // Existing project, populate form
      form.reset({
        title: project.title || "",
        category: project.category || "",
        year: project.year || new Date().getFullYear().toString(),
        image: project.image || "",
        size: project.size || "medium",
        alignment: project.alignment || "center",
        description: project.description || "",
        client: project.client || "",
        duration: project.duration || "",
        challenge: project.challenge || "",
        solution: project.solution || "",
        result: project.result || "",
        testimonial: project.testimonial || "",
        additionalImages: project.additionalImages || []
      });
    } else {
      // New project
      setIsNewProject(true);
    }
  }, [id, navigate, form]);

  const onSubmit = (values: FormValues) => {
    // Save to localStorage
    const savedProjects = localStorage.getItem("portfolioProjects");
    const projects = savedProjects ? JSON.parse(savedProjects) : [];
    const projectId = parseInt(id || "0");

    // Filter out empty additional images
    const cleanedValues = {
      ...values,
      additionalImages: values.additionalImages.filter(url => url.trim() !== "")
    };

    if (isNewProject) {
      // Add new project
      const newProject = {
        id: projectId,
        ...cleanedValues
      };
      projects.push(newProject);
    } else {
      // Update existing project
      const index = projects.findIndex((p: any) => p.id === projectId);
      if (index !== -1) {
        projects[index] = {
          ...projects[index],
          ...cleanedValues
        };
      } else {
        // Project not found, add as new
        const newProject = {
          id: projectId,
          ...cleanedValues
        };
        projects.push(newProject);
      }
    }

    localStorage.setItem("portfolioProjects", JSON.stringify(projects));

    toast({
      title: isNewProject ? "Project created" : "Project updated",
      description: `Your portfolio project has been ${isNewProject ? "created" : "updated"} successfully.`
    });

    navigate("/admin/portfolio");
  };

  const addAdditionalImage = () => {
    if (!additionalImageField.trim()) return;
    
    const currentImages = form.getValues().additionalImages || [];
    form.setValue("additionalImages", [...currentImages, additionalImageField]);
    setAdditionalImageField("");
  };

  const removeAdditionalImage = (index: number) => {
    const currentImages = form.getValues().additionalImages || [];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    form.setValue("additionalImages", newImages);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/admin/portfolio")} 
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">
            {isNewProject ? "Add New Project" : "Edit Project"}
          </h1>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)}>
          <Save className="h-4 w-4 mr-2" />
          Save Project
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Branding" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input placeholder="YYYY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the URL of the main project image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size on Homepage</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="alignment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content Alignment</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select alignment" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your project..." 
                              className="min-h-[120px]" 
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
                        name="client"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                              <Input placeholder="Client name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 4 weeks" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Project Narrative</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="challenge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>The Challenge</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What challenges did this project present?" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="solution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>The Solution</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How did you solve the problem?" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="result"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>The Result</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What was the outcome?" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="testimonial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Testimonial</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What did the client say about the project?" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Additional Images</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Enter image URL"
                        value={additionalImageField}
                        onChange={(e) => setAdditionalImageField(e.target.value)}
                      />
                      <Button 
                        type="button"
                        onClick={addAdditionalImage}
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2 mt-4">
                      {form.watch("additionalImages")?.map((url, index) => (
                        <div 
                          key={index} 
                          className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50"
                        >
                          <div className="w-10 h-10 bg-muted flex items-center justify-center rounded overflow-hidden">
                            {url ? (
                              <img src={url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-sm flex-1 truncate">{url}</p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAdditionalImage(index)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}

                      {(!form.watch("additionalImages") || form.watch("additionalImages").length === 0) && (
                        <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
                          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground text-sm">No additional images added yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={() => navigate("/admin/portfolio")}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Project
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
