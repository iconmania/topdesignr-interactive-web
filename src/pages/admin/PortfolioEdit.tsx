import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, ArrowLeft } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Image must be a valid URL"),
  client: z.string().optional(),
  date: z.string().optional(),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export default function PortfolioEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNewItem, setIsNewItem] = useState(false);

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
      link: ""
    }
  });

  useEffect(() => {
    if (id === "new") {
      setIsNewItem(true);
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
        link: portfolioItem.link || ""
      });
    } else {
      // New item
      setIsNewItem(true);
    }
  }, [id, form]);

  const onSubmit = (values: FormValues) => {
    // Save to localStorage
    const savedPortfolio = localStorage.getItem("adminPortfolio");
    const portfolioItems = savedPortfolio ? JSON.parse(savedPortfolio) : [];
    const itemId = id === "new" ? Date.now() : parseInt(id || "0");

    if (isNewItem) {
      // Add new item
      const newItem = {
        id: itemId,
        ...values
      };
      portfolioItems.push(newItem);
    } else {
      // Update existing item
      const index = portfolioItems.findIndex((item: any) => item.id === itemId);
      if (index !== -1) {
        portfolioItems[index] = {
          ...portfolioItems[index],
          ...values
        };
      } else {
        // Item not found, add as new
        const newItem = {
          id: itemId,
          ...values
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
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a valid URL for the portfolio image
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
