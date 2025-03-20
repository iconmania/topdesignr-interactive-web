
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
  description: z.string().min(1, "Description is required"),
  image: z.string().optional()
});

export const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required")
});

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().min(1, "Icon is required"),
  image: z.string().optional().default("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"),
  coverImage: z.string().optional().default(""),
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

// Field array types for benefits, process, and pricing features
export type BenefitType = string;
export type ProcessType = string;
export type PricingFeatureType = string;

// Type for benefits array item
export interface BenefitField {
  value: string;
}

// Type for process array item
export interface ProcessField {
  value: string;
}

// Type for pricing feature array item
export interface PricingFeatureField {
  value: string;
}
