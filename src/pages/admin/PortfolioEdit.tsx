
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, ArrowLeft, Upload, X, Plus, Trash } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().optional(),
  client: z.string().optional(),
  date: z.string().optional(),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  additionalImages: z.array(z.string()).optional(),
  size: z.enum(["small", "medium", "large"]).default("medium"),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  order: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PortfolioEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNewItem, setIsNewItem] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const [nextOrder, setNextOrder] = useState<number>(0);

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      image: "",
      client: "",
      date: "",
      link: "",
      additionalImages: [],
      size: "medium",
      alignment: "center",
      order: 0
    }
  });

  useEffect(() => {
    if (id === "new") {
      setIsNewItem(true);
      
      // Get the next available order number for new items
      const savedPortfolio = localStorage.getItem("adminPortfolio");
      if (savedPortfolio) {
        const portfolioItems = JSON.parse(savedPortfolio);
        const maxOrder = portfolioItems.reduce((max: number, item: any) => 
          Math.max(max, item.order || 0), 0);
        setNextOrder(maxOrder + 1);
        form.setValue("order", maxOrder + 1);
      } else {
        form.setValue("order", 1);
      }
      
      return;
    }

    // Get portfolio items from localStorage
    const savedPortfolio = localStorage.getItem("adminPortfolio");
    if (!savedPortfolio) {
      // If no portfolio exists yet, this is a new item
      setIsNewItem(true);
      return;
    }

    const portfolioItems = JSON.parse(savedPortfolio);
    const itemId = parseInt(id || "0");
    const portfolioItem = portfolioItems.find((item: any) => item.id === itemId);

    if (portfolioItem) {
      // Existing item, populate form
      form.reset({
        title: portfolioItem.title || "",
        category: portfolioItem.category || "",
        description: portfolioItem.description || "",
        image: portfolioItem.image || "",
        client: portfolioItem.client || "",
        date: portfolioItem.date || "",
        link: portfolioItem.link || "",
        additionalImages: portfolioItem.additionalImages || [],
        size: portfolioItem.size || "medium",
        alignment: portfolioItem.alignment || "center",
        order: portfolioItem.order || 0
      });
      
      if (portfolioItem.image) {
        setImagePreview(portfolioItem.image);
      }
      
      if (portfolioItem.additionalImages && portfolioItem.additionalImages.length > 0) {
        setAdditionalImages(portfolioItem.additionalImages);
        setAdditionalImagePreviews(portfolioItem.additionalImages);
      }
    } else {
      // New item
      setIsNewItem(true);
    }
  }, [id, form]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      form.setValue("image", base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAdditionalImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newAdditionalImages = [...additionalImages, base64String];
      const newAdditionalImagePreviews = [...additionalImagePreviews, base64String];
      
      setAdditionalImages(newAdditionalImages);
      setAdditionalImagePreviews(newAdditionalImagePreviews);
      form.setValue("additionalImages", newAdditionalImages);
      
      // Clear the input for next upload
      if (event.target) {
        event.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    const newAdditionalImages = [...additionalImages];
    const newAdditionalImagePreviews = [...additionalImagePreviews];
    
    newAdditionalImages.splice(index, 1);
    newAdditionalImagePreviews.splice(index, 1);
    
    setAdditionalImages(newAdditionalImages);
    setAdditionalImagePreviews(newAdditionalImagePreviews);
    form.setValue("additionalImages", newAdditionalImages);
  };

  const onSubmit = (values: FormValues) => {
    // Prepare data with additional images
    const finalValues = {
      ...values,
      additionalImages: additionalImages,
      order: values.order || nextOrder
    };

    // Save to localStorage
    const savedPortfolio = localStorage.getItem("adminPortfolio");
    const portfolioItems = savedPortfolio ? JSON.parse(savedPortfolio) : [];
    const itemId = id === "new" ? Date.now() : parseInt(id || "0");

    if (isNewItem) {
      // Add new item
      const newItem = {
        id: itemId,
        ...finalValues
      };
      portfolioItems.push(newItem);
    } else {
      // Update existing item
      const index = portfolioItems.findIndex((item: any) => item.id === itemId);
      if (index !== -1) {
        portfolioItems[index] = {
          ...portfolioItems[index],
          ...finalValues
        };
      } else {
        // Item not found, add as new
        const newItem = {
          id: itemId,
          ...finalValues
        };
        portfolioItems.push(newItem);
      }
    }

    localStorage.setItem("adminPortfolio", JSON.stringify(portfolioItems));

    toast({
      title: isNewItem ? "Portfolio item created" : "Portfolio item updated",
      description: `Your portfolio item has been ${isNewItem ? "created" : "updated"} successfully.`
    });

    navigate("/admin/portfolio");
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
            {isNewItem ? "Add New Portfolio Item" : "Edit Portfolio Item"}
          </h1>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)}>
          <Save className="h-4 w-4 mr-2" />
          Save Item
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Modern Website Redesign" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Web Design, Branding" {...field} />
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
                        <FormLabel>Cover Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 relative overflow-hidden group"
                              >
                                <Upload className="h-4 w-4 relative z-10 group-hover:text-white transition-colors" />
                                <span className="relative z-10 group-hover:text-white transition-colors">Upload Image</span>
                                <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                              </Button>
                              <Input
                                placeholder="Or enter image URL..."
                                value={field.value}
                                onChange={field.onChange}
                                className="max-w-xs"
                              />
                            </div>
                            <input 
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            {imagePreview && (
                              <div className="relative w-full max-w-xs">
                                <img 
                                  src={imagePreview} 
                                  alt="Preview" 
                                  className="rounded-md h-40 w-full object-cover border"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2 h-8 w-8"
                                  onClick={handleRemoveImage}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload an image or enter a URL for the portfolio item cover
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. ABC Corporation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. June 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Link (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://projectwebsite.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Size</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select card size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small (4 columns)</SelectItem>
                          <SelectItem value="medium">Medium (6 columns)</SelectItem>
                          <SelectItem value="large">Large (8-12 columns)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Controls how much space the card takes in the grid
                      </FormDescription>
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
                      <FormDescription>
                        Controls how content aligns on the card
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1"
                          placeholder="Display position (1, 2, 3...)" 
                          value={value || nextOrder}
                          onChange={(e) => onChange(parseInt(e.target.value))}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Controls the order items appear in the portfolio grid
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detailed description of the project..." 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <FormLabel className="text-base">Additional Project Images</FormLabel>
                  <div>
                    <input 
                      type="file"
                      id="additionalImageUpload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAdditionalImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('additionalImageUpload')?.click()}
                      className="flex items-center gap-2 relative overflow-hidden group"
                    >
                      <Plus className="h-4 w-4 relative z-10 group-hover:text-white transition-colors" />
                      <span className="relative z-10 group-hover:text-white transition-colors">Add Image</span>
                      <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {additionalImagePreviews.map((image, index) => (
                    <div key={index} className="relative border rounded-md overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Additional image ${index + 1}`} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveAdditionalImage(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {additionalImagePreviews.length === 0 && (
                    <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-10 w-10 mb-2" />
                      <p>No additional images added</p>
                      <p className="text-sm">Click "Add Image" to upload project gallery images</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

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
              Save Item
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
