
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUploadField from "./ImageUploadField";
import MultipleImagesUploadField from "./MultipleImagesUploadField";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/portfolio";

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
  size: z.enum(["full", "col-8", "col-6", "col-4"]).default("col-6"),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  order: z.number().int().nonnegative().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

interface PortfolioFormProps {
  portfolioId: string;
  existingData?: Project;
}

export const PortfolioForm = ({ portfolioId, existingData }: PortfolioFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewItem = portfolioId === "new";

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
      size: "col-6",
      alignment: "center",
      order: 0,
    },
  });

  // Convert legacy size values to new format
  const convertLegacySizeValue = (size: string): "full" | "col-8" | "col-6" | "col-4" => {
    if (size === "large") return "col-8";
    if (size === "medium") return "col-6";
    if (size === "small") return "col-4";
    if (["full", "col-8", "col-6", "col-4"].includes(size)) {
      return size as "full" | "col-8" | "col-6" | "col-4";
    }
    return "col-6";
  };

  // Load existing data if editing
  useEffect(() => {
    if (existingData) {
      form.reset({
        title: existingData.title || "",
        category: existingData.category || "",
        description: existingData.description || "",
        client: existingData.client || "",
        date: existingData.date || "",
        link: existingData.link || "",
        image: existingData.image || "",
        additionalImages: existingData.additionalImages || [],
        size: convertLegacySizeValue(existingData.size),
        alignment: existingData.alignment || "center",
        order: existingData.order !== undefined ? existingData.order : 0,
      });
    }
  }, [existingData, form]);

  const onSubmit = (data: FormValues) => {
    // Get existing portfolio items
    const storedPortfolio = localStorage.getItem("adminPortfolio");
    let portfolioItems = storedPortfolio ? JSON.parse(storedPortfolio) : [];

    const id = isNewItem ? Date.now() : Number(portfolioId);
    const updatedPortfolioItem = {
      ...data,
      id,
      order: Number(data.order) || 0,
    };

    if (isNewItem) {
      // Add new item
      portfolioItems.push(updatedPortfolioItem);
    } else {
      // Update existing item
      portfolioItems = portfolioItems.map((item: { id: number }) =>
        item.id.toString() === portfolioId ? { ...item, ...updatedPortfolioItem } : item
      );
    }

    // Save to localStorage
    localStorage.setItem("adminPortfolio", JSON.stringify(portfolioItems));

    toast({
      title: isNewItem ? "Portfolio item created" : "Portfolio item updated",
      description: `Successfully ${isNewItem ? "created" : "updated"} "${data.title}"`,
    });

    // Navigate back to portfolio list
    navigate("/admin/portfolio");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Details</CardTitle>
            <CardDescription>
              Fill in the details of your portfolio project.
            </CardDescription>
          </CardHeader>
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
                <ImageUploadField 
                  form={form} 
                  name="image" 
                  label="Featured Image" 
                  required 
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
                          <SelectItem value="full">Full Width (12 columns)</SelectItem>
                          <SelectItem value="col-8">8 columns</SelectItem>
                          <SelectItem value="col-6">6 columns</SelectItem>
                          <SelectItem value="col-4">4 columns</SelectItem>
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
                <MultipleImagesUploadField
                  form={form}
                  name="additionalImages"
                  label="Additional Images"
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
            <Button type="submit">
              {isNewItem ? "Create Portfolio Item" : "Update Portfolio Item"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default PortfolioForm;
