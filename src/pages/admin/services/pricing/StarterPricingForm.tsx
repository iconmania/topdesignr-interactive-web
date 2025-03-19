
import { UseFormReturn } from "react-hook-form";
import { ServiceFormValues } from "../types";
import { PricingTierForm } from "./PricingTierForm";

interface StarterPricingFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function StarterPricingForm({ form }: StarterPricingFormProps) {
  return (
    <PricingTierForm 
      form={form} 
      tierName="Starter" 
      tierPath="starter" 
      title="Starter Package" 
    />
  );
}
