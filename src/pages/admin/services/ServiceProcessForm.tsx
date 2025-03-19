
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { ServiceFormValues, ProcessType } from "./types";

interface ServiceProcessFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServiceProcessForm({ form }: ServiceProcessFormProps) {
  const [newProcess, setNewProcess] = useState("");
  
  const { fields, append, remove } = form.control._formValues.process ? 
    form.control.fieldArrays.process : 
    { fields: [], append: () => {}, remove: () => {} };

  const addProcess = () => {
    if (!newProcess.trim()) return;
    append(newProcess as any);
    setNewProcess("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Process</h3>
      
      <div className="flex gap-2">
        <Input
          placeholder="Add a process step..."
          value={newProcess}
          onChange={(e) => setNewProcess(e.target.value)}
          className="flex-1"
        />
        <Button type="button" onClick={addProcess} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              {index + 1}
            </div>
            <Input
              {...form.register(`process.${index}`)}
              className="flex-1"
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
