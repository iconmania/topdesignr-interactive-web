
import { UseFormReturn } from "react-hook-form";
import { ServiceFormValues } from "./types";
import { StarterPricingForm } from "./pricing/StarterPricingForm";
import { ProfessionalPricingForm } from "./pricing/ProfessionalPricingForm";
import { EnterprisePricingForm } from "./pricing/EnterprisePricingForm";

interface ServicePricingFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ServicePricingForm({ form }: ServicePricingFormProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Pricing</h3>

      {/* Starter Pricing */}
      <StarterPricingForm form={form} />

      {/* Professional Pricing */}
      <ProfessionalPricingForm form={form} />

      {/* Enterprise Pricing */}
      <EnterprisePricingForm form={form} />
    </div>
  );
}
