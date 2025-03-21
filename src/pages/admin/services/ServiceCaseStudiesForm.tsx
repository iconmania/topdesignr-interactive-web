
import { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Upload } from "lucide-react";
import { ServiceFormValues } from "./types";

interface ServiceCaseStudiesFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServiceCaseStudiesForm({ form }: ServiceCaseStudiesFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "caseStudies"
  });

  // Store image previews for each case study
  const [imagePreviews, setImagePreviews] = useState<Record<number, string>>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreviews(prev => ({
          ...prev,
          [index]: imageUrl
        }));
        form.setValue(`caseStudies.${index}.image`, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Case Studies</h3>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Case Study #{index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </div>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name={`caseStudies.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Success Story" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`caseStudies.${index}.client`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. ABC Company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`caseStudies.${index}.image`}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <div className="space-y-3">
                      <FormControl>
                        <div className="flex items-center gap-3">
                          <Input 
                            placeholder="Enter image URL" 
                            value={value}
                            onChange={(e) => {
                              onChange(e);
                              if (e.target.value) {
                                setImagePreviews(prev => ({
                                  ...prev,
                                  [index]: e.target.value
                                }));
                              } else {
                                setImagePreviews(prev => {
                                  const newPreviews = {...prev};
                                  delete newPreviews[index];
                                  return newPreviews;
                                });
                              }
                            }}
                            {...field} 
                          />
                          <div className="relative">
                            <Input
                              type="file"
                              id={`case-study-image-${index}`}
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={(e) => handleImageUpload(e, index)}
                            />
                            <Button type="button" variant="outline" size="icon">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      
                      {(imagePreviews[index] || value) && (
                        <div className="mt-2 relative">
                          <div className="w-full h-40 rounded-md overflow-hidden border">
                            <img 
                              src={imagePreviews[index] || value} 
                              alt="Case study preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="absolute bottom-2 right-2"
                            onClick={() => {
                              setImagePreviews(prev => {
                                const newPreviews = {...prev};
                                delete newPreviews[index];
                                return newPreviews;
                              });
                              form.setValue(`caseStudies.${index}.image`, "");
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      )}
                      
                      <FormDescription>
                        Image for this case study (optional)
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`caseStudies.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the case study..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ title: "", client: "", description: "", image: "" })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Case Study
        </Button>
      </div>
    </div>
  );
}
