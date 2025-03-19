
import { z } from "zod";

// Form schema definitions
export const pricingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  features: z.array(z.string().min(1, "Feature is required"))
});

export const caseStudySchema = z.object({
  title: z.string().min(1, "Title is required"),
  client: z.string().min(1, "Client is required"),
  description: z.string().min(1, "Description is required")
});

export const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required")
});

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().min(1, "Icon is required"),
  fullDescription: z.string().min(10, "Full description must be at least 10 characters"),
  benefits: z.array(z.string().min(1, "Benefit cannot be empty")),
  process: z.array(z.string().min(1, "Process step cannot be empty")),
  caseStudies: z.array(caseStudySchema),
  pricing: z.object({
    starter: pricingSchema,
    professional: pricingSchema,
    enterprise: pricingSchema
  }),
  faq: z.array(faqSchema)
});

// Type for form values
export type ServiceFormValues = z.infer<typeof formSchema>;

// Type for the service with ID
export interface Service extends ServiceFormValues {
  id: number;
}

// Special field array path types to help TypeScript understand nested field arrays
export interface FieldArrayPathValue<T> {
  [key: string]: T;
}

export type BenefitType = string;
export type ProcessType = string;
export type PricingFeatureType = string;
