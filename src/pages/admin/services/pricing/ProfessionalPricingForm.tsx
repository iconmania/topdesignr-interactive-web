
import { UseFormReturn } from "react-hook-form";
import { ServiceFormValues } from "../types";
import { PricingTierForm } from "./PricingTierForm";

interface ProfessionalPricingFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function ProfessionalPricingForm({ form }: ProfessionalPricingFormProps) {
  return (
    <PricingTierForm 
      form={form} 
      tierName="Professional" 
      tierPath="professional" 
      title="Professional Package" 
    />
  );
}
