
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ServiceFormValues, PricingFeatureType } from "./types";

interface ServicePricingFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServicePricingForm({ form }: ServicePricingFormProps) {
  const [newStarterFeature, setNewStarterFeature] = useState("");
  const [newProfessionalFeature, setNewProfessionalFeature] = useState("");
  const [newEnterpriseFeature, setNewEnterpriseFeature] = useState("");
  
  const starterFields = form.control._formValues.pricing?.starter.features ? 
    form.control.fieldArrays["pricing.starter.features"]?.fields || [] : [];
  
  const professionalFields = form.control._formValues.pricing?.professional.features ? 
    form.control.fieldArrays["pricing.professional.features"]?.fields || [] : [];
  
  const enterpriseFields = form.control._formValues.pricing?.enterprise.features ? 
    form.control.fieldArrays["pricing.enterprise.features"]?.fields || [] : [];

  const appendStarterFeature = (value: string) => {
    if (form.control.fieldArrays["pricing.starter.features"]) {
      form.control.fieldArrays["pricing.starter.features"].append(value as any);
    }
  };

  const removeStarterFeature = (index: number) => {
    if (form.control.fieldArrays["pricing.starter.features"]) {
      form.control.fieldArrays["pricing.starter.features"].remove(index);
    }
  };

  const appendProfessionalFeature = (value: string) => {
    if (form.control.fieldArrays["pricing.professional.features"]) {
      form.control.fieldArrays["pricing.professional.features"].append(value as any);
    }
  };

  const removeProfessionalFeature = (index: number) => {
    if (form.control.fieldArrays["pricing.professional.features"]) {
      form.control.fieldArrays["pricing.professional.features"].remove(index);
    }
  };

  const appendEnterpriseFeature = (value: string) => {
    if (form.control.fieldArrays["pricing.enterprise.features"]) {
      form.control.fieldArrays["pricing.enterprise.features"].append(value as any);
    }
  };

  const removeEnterpriseFeature = (index: number) => {
    if (form.control.fieldArrays["pricing.enterprise.features"]) {
      form.control.fieldArrays["pricing.enterprise.features"].remove(index);
    }
  };

  const handleAddStarterFeature = () => {
    if (!newStarterFeature.trim()) return;
    appendStarterFeature(newStarterFeature);
    setNewStarterFeature("");
  };

  const handleAddProfessionalFeature = () => {
    if (!newProfessionalFeature.trim()) return;
    appendProfessionalFeature(newProfessionalFeature);
    setNewProfessionalFeature("");
  };

  const handleAddEnterpriseFeature = () => {
    if (!newEnterpriseFeature.trim()) return;
    appendEnterpriseFeature(newEnterpriseFeature);
    setNewEnterpriseFeature("");
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Pricing</h3>

      {/* Starter Pricing */}
      <div className="mb-6 border-b pb-6">
        <h4 className="font-medium mb-3">Starter Package</h4>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="pricing.starter.name"
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
            name="pricing.starter.price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Features</FormLabel>
            <div className="space-y-2 mt-2">
              {starterFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...form.register(`pricing.starter.features.${index}`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStarterFeature(index)}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="Add a feature..."
                  value={newStarterFeature}
                  onChange={(e) => setNewStarterFeature(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddStarterFeature}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Pricing */}
      <div className="mb-6 border-b pb-6">
        <h4 className="font-medium mb-3">Professional Package</h4>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="pricing.professional.name"
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
            name="pricing.professional.price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $1999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Features</FormLabel>
            <div className="space-y-2 mt-2">
              {professionalFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...form.register(`pricing.professional.features.${index}`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProfessionalFeature(index)}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="Add a feature..."
                  value={newProfessionalFeature}
                  onChange={(e) => setNewProfessionalFeature(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddProfessionalFeature}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Pricing */}
      <div>
        <h4 className="font-medium mb-3">Enterprise Package</h4>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="pricing.enterprise.name"
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
            name="pricing.enterprise.price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Custom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Features</FormLabel>
            <div className="space-y-2 mt-2">
              {enterpriseFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...form.register(`pricing.enterprise.features.${index}`)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEnterpriseFeature(index)}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="Add a feature..."
                  value={newEnterpriseFeature}
                  onChange={(e) => setNewEnterpriseFeature(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddEnterpriseFeature}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
