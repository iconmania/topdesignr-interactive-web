
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Upload, Image as ImageIcon } from "lucide-react";

// Form schema
const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.string().min(2, "Category is required"),
  description: z.string().optional(),
  client: z.string().optional(),
  date: z.string().optional(),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
  image: z.string().min(1, "Featured image is required"),
  additionalImages: z.array(z.string()).optional(),
  size: z.enum(["small", "medium", "large"]).default("medium"),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  order: z.number().int().nonnegative().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PortfolioEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      client: "",
      date: "",
      link: "",
      image: "",
      additionalImages: [],
      size: "medium",
      alignment: "center",
      order: 0,
    },
  });

  // Load existing data if editing
  useEffect(() => {
    if (id && id !== "new") {
      const storedPortfolio = localStorage.getItem("adminPortfolio");
      if (storedPortfolio) {
        const portfolioItems = JSON.parse(storedPortfolio);
        const portfolioItem = portfolioItems.find(
          (item: { id: number }) => item.id.toString() === id
        );

        if (portfolioItem) {
          form.reset({
            title: portfolioItem.title || "",
            category: portfolioItem.category || "",
            description: portfolioItem.description || "",
            client: portfolioItem.client || "",
            date: portfolioItem.date || "",
            link: portfolioItem.link || "",
            image: portfolioItem.image || "",
            additionalImages: portfolioItem.additionalImages || [],
            size: portfolioItem.size || "medium",
            alignment: portfolioItem.alignment || "center",
            order: portfolioItem.order !== undefined ? portfolioItem.order : 0,
          });

          setImagePreview(portfolioItem.image || null);
          setAdditionalImages(portfolioItem.additionalImages || []);
          setAdditionalImagePreviews(portfolioItem.additionalImages || []);
        }
      }
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

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);

    // Get existing portfolio items
    const storedPortfolio = localStorage.getItem("adminPortfolio");
    let portfolioItems = storedPortfolio ? JSON.parse(storedPortfolio) : [];

    const portfolioId = id === "new" ? Date.now() : Number(id);
    const updatedPortfolioItem = {
      ...data,
      id: portfolioId,
      order: Number(data.order) || 0,
    };

    if (id === "new") {
      // Add new item
      portfolioItems.push(updatedPortfolioItem);
    } else {
      // Update existing item
      portfolioItems = portfolioItems.map((item: { id: number }) =>
        item.id.toString() === id ? { ...item, ...updatedPortfolioItem } : item
      );
    }

    // Save to localStorage
    localStorage.setItem("adminPortfolio", JSON.stringify(portfolioItems));

    toast({
      title: id === "new" ? "Portfolio item created" : "Portfolio item updated",
      description: `Successfully ${id === "new" ? "created" : "updated"} "${data.title}"`,
    });

    // Navigate back to portfolio list
    navigate("/admin/portfolio");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {id === "new" ? "Add Portfolio Item" : "Edit Portfolio Item"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Details</CardTitle>
          <CardDescription>
            Fill in the details of your portfolio project.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="Project title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Web Design" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
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
                </div>

                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Jan 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Project description"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Image*</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              id="image-upload"
                            />
                            {!imagePreview ? (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => fileInputRef.current?.click()}>
                                <div className="flex flex-col items-center gap-2">
                                  <Upload className="h-10 w-10 text-muted-foreground" />
                                  <p className="text-muted-foreground">
                                    Click to upload or drag and drop
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    SVG, PNG, JPG or GIF (max. 5MB)
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="relative">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                  onClick={handleRemoveImage}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                            <input
                              type="hidden"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Size</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
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
                </div>

                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="alignment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Alignment</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
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

                <div className="col-span-2 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0"
                            placeholder="Display order (0 = first)"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            value={field.value?.toString() || "0"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="additionalImages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Images</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <input
                              ref={additionalFileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAdditionalImageUpload}
                              id="additional-image-upload"
                            />
                            <div 
                              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => additionalFileInputRef.current?.click()}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                  Click to add more images
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  SVG, PNG, JPG or GIF (max. 5MB)
                                </p>
                              </div>
                            </div>

                            {additionalImagePreviews.length > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {additionalImagePreviews.map((image, index) => (
                                  <div key={index} className="relative">
                                    <img
                                      src={image}
                                      alt={`Additional ${index + 1}`}
                                      className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="absolute top-2 right-2"
                                      onClick={() => handleRemoveAdditionalImage(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                            <input
                              type="hidden"
                              {...field}
                              value={JSON.stringify(field.value)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/portfolio")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Portfolio Item"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
