
import { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { ServiceFormValues, BenefitField } from "./types";

interface ServiceBenefitsFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServiceBenefitsForm({ form }: ServiceBenefitsFormProps) {
  const [newBenefit, setNewBenefit] = useState("");
  
  // Use a dummy generic parameter to avoid TypeScript errors
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "benefits" as any
  });

  const addBenefit = () => {
    if (!newBenefit.trim()) return;
    append(newBenefit as any);
    setNewBenefit("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Service Benefits</h3>
      
      <div className="flex gap-2">
        <Input
          placeholder="Add a benefit..."
          value={newBenefit}
          onChange={(e) => setNewBenefit(e.target.value)}
          className="flex-1"
        />
        <Button type="button" onClick={addBenefit} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              {...form.register(`benefits.${index}`)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
