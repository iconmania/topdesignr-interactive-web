
import { UseFormReturn } from "react-hook-form";
import { ServiceFormValues } from "../types";
import { PricingTierForm } from "./PricingTierForm";

interface EnterprisePricingFormProps {
  form: UseFormReturn<ServiceFormValues>;
}

export function EnterprisePricingForm({ form }: EnterprisePricingFormProps) {
  return (
    <PricingTierForm 
      form={form} 
      tierName="Enterprise" 
      tierPath="enterprise" 
      title="Enterprise Package" 
    />
  );
}
