
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ServiceFormValues } from "./types";

interface ServicePricingFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServicePricingForm({ form }: ServicePricingFormProps) {
  const { fields: starterFeaturesFields, append: appendStarterFeature, remove: removeStarterFeature } = useFieldArray({
    control: form.control,
    name: "pricing.starter.features"
  });

  const { fields: professionalFeaturesFields, append: appendProfessionalFeature, remove: removeProfessionalFeature } = useFieldArray({
    control: form.control,
    name: "pricing.professional.features" 
  });

  const { fields: enterpriseFeaturesFields, append: appendEnterpriseFeature, remove: removeEnterpriseFeature } = useFieldArray({
    control: form.control,
    name: "pricing.enterprise.features"
  });

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
              {starterFeaturesFields.map((field, index) => (
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

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendStarterFeature("")}
                className="w-full mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </Button>
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
              {professionalFeaturesFields.map((field, index) => (
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

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendProfessionalFeature("")}
                className="w-full mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </Button>
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
              {enterpriseFeaturesFields.map((field, index) => (
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

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendEnterpriseFeature("")}
                className="w-full mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
