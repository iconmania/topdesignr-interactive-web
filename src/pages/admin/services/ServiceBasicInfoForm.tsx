
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ServiceFormValues } from "./types";

interface ServiceBasicInfoFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServiceBasicInfoForm({ form }: ServiceBasicInfoFormProps) {
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

      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Image</FormLabel>
            <FormControl>
              <Input 
                type="text" 
                placeholder="Enter image URL (e.g. https://images.unsplash.com/...)" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              This image will appear on the service card and detail page
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="coverImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cover Image (Detail Page)</FormLabel>
            <FormControl>
              <Input 
                type="text" 
                placeholder="Enter cover image URL for detail page" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              This larger image will be used as hero image on the detail page
            </FormDescription>
            <FormMessage />
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
