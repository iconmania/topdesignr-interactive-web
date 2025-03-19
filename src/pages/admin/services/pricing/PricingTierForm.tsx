
import { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ServiceFormValues } from "../types";

interface PricingTierFormProps {
  form: UseFormReturn<ServiceFormValues>;
  tierName: string;
  tierPath: "starter" | "professional" | "enterprise";
  title: string;
}

export function PricingTierForm({ form, tierName, tierPath, title }: PricingTierFormProps) {
  const [newFeature, setNewFeature] = useState("");
  
  const features = useFieldArray({
    control: form.control,
    name: `pricing.${tierPath}.features` as any
  });

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    features.append(newFeature as any);
    setNewFeature("");
  };

  return (
    <div className="mb-6 border-b pb-6">
      <h4 className="font-medium mb-3">{title}</h4>
      <div className="space-y-3">
        <FormField
          control={form.control}
          name={`pricing.${tierPath}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`pricing.${tierPath}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder={`e.g. ${tierName === "Enterprise" ? "Custom" : "$999"}`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Features</FormLabel>
          <div className="space-y-2 mt-2">
            {features.fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...form.register(`pricing.${tierPath}.features.${index}`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => features.remove(index)}
                >
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}

            <div className="flex gap-2">
              <Input
                placeholder="Add a feature..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddFeature}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
