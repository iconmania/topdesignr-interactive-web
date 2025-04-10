
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ServiceFormValues } from "./types";

interface ServiceBasicInfoFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServiceBasicInfoForm({ form }: ServiceBasicInfoFormProps) {
  const [serviceImagePreview, setServiceImagePreview] = useState<string | null>(form.getValues("image") || null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(form.getValues("coverImage") || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "image" | "coverImage") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        if (fieldName === "image") {
          setServiceImagePreview(imageUrl);
          form.setValue("image", imageUrl);
        } else {
          setCoverImagePreview(imageUrl);
          form.setValue("coverImage", imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. UI/UX Design" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Short Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Brief description of the service..." 
                className="h-20" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              This will appear on the service card
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Service Card Image with Upload */}
      <FormField
        control={form.control}
        name="image"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Service Image</FormLabel>
            <div className="space-y-3">
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input 
                    type="text" 
                    placeholder="Enter image URL (e.g. https://images.unsplash.com/...)" 
                    value={value || ""}
                    onChange={(e) => {
                      onChange(e);
                      setServiceImagePreview(e.target.value);
                    }}
                    {...field} 
                  />
                  <div className="relative cursor-pointer">
                    <Input
                      type="file"
                      id="service-image-upload"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                      onChange={(e) => handleImageUpload(e, "image")}
                    />
                    <Button type="button" variant="outline" size="icon" className="pointer-events-none">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </FormControl>
              
              {serviceImagePreview && (
                <div className="mt-2 relative">
                  <div className="w-full h-40 rounded-md overflow-hidden border">
                    <img 
                      src={serviceImagePreview} 
                      alt="Service preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      setServiceImagePreview(null);
                      form.setValue("image", "");
                    }}
                  >
                    Clear
                  </Button>
                </div>
              )}
              
              <FormDescription>
                This image will appear on the service card and detail page
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Cover Image with Upload */}
      <FormField
        control={form.control}
        name="coverImage"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Cover Image (Detail Page)</FormLabel>
            <div className="space-y-3">
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input 
                    type="text" 
                    placeholder="Enter cover image URL for detail page" 
                    value={value || ""}
                    onChange={(e) => {
                      onChange(e);
                      setCoverImagePreview(e.target.value);
                    }}
                    {...field} 
                  />
                  <div className="relative cursor-pointer">
                    <Input
                      type="file"
                      id="cover-image-upload"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                      onChange={(e) => handleImageUpload(e, "coverImage")}
                    />
                    <Button type="button" variant="outline" size="icon" className="pointer-events-none">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </FormControl>
              
              {coverImagePreview && (
                <div className="mt-2 relative">
                  <div className="w-full h-40 rounded-md overflow-hidden border">
                    <img 
                      src={coverImagePreview} 
                      alt="Cover preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      setCoverImagePreview(null);
                      form.setValue("coverImage", "");
                    }}
                  >
                    Clear
                  </Button>
                </div>
              )}
              
              <FormDescription>
                This larger image will be used as hero image on the detail page
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="LineChart">Line Chart</SelectItem>
                <SelectItem value="Palette">Palette</SelectItem>
                <SelectItem value="Globe">Globe</SelectItem>
                <SelectItem value="Layers">Layers</SelectItem>
                <SelectItem value="LayoutGrid">Layout Grid</SelectItem>
                <SelectItem value="Settings">Settings</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fullDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Detailed description of the service..." 
                className="min-h-[150px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              This will appear on the service detail page
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
