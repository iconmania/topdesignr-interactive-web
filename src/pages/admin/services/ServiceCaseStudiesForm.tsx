
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { ServiceFormValues } from "./types";

interface ServiceCaseStudiesFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServiceCaseStudiesForm({ form }: ServiceCaseStudiesFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "caseStudies"
  });

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
          onClick={() => append({ title: "", client: "", description: "" })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Case Study
        </Button>
      </div>
    </div>
  );
}
