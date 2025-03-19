
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { ServiceFormValues } from "./types";

interface ServiceFaqFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServiceFaqForm({ form }: ServiceFaqFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faq"
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">FAQs</h3>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">FAQ #{index + 1}</h4>
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
                name={`faq.${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. How long does this take?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`faq.${index}.answer`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your answer..." {...field} />
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
          onClick={() => append({ question: "", answer: "" })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add FAQ
        </Button>
      </div>
    </div>
  );
}
