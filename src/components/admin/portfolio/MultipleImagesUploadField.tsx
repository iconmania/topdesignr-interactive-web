
import { useState, useRef, useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, Image as ImageIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface MultipleImagesUploadFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
}

export const MultipleImagesUploadField = ({ form, name, label }: MultipleImagesUploadFieldProps) => {
  const { toast } = useToast();
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    form.getValues(name) || []
  );
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>(
    form.getValues(name) || []
  );
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update local state when form values change externally
    const subscription = form.watch((value, { name: fieldName }) => {
      if (fieldName === name && value[name]) {
        setAdditionalImages(value[name]);
        setAdditionalImagePreviews(value[name]);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, name]);

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
      form.setValue(name, newAdditionalImages, { shouldValidate: true });
      
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
    form.setValue(name, newAdditionalImages, { shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
  );
};

export default MultipleImagesUploadField;
