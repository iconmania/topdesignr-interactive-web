
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ServiceBasicInfoForm } from "../ServiceBasicInfoForm";
import { ServiceBenefitsForm } from "../ServiceBenefitsForm";
import { ServiceProcessForm } from "../ServiceProcessForm";
import { ServicePricingForm } from "../ServicePricingForm";
import { ServiceFaqForm } from "../ServiceFaqForm";
import { ServiceCaseStudiesForm } from "../ServiceCaseStudiesForm";
import { ServiceFormValues } from "../types";

interface ServiceFormProps {
  form: UseFormReturn<ServiceFormValues>;
  onSubmit: (values: ServiceFormValues) => void;
}

export function ServiceForm({ form, onSubmit }: ServiceFormProps) {
  const navigate = useNavigate();
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <ServiceBasicInfoForm form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <ServiceBenefitsForm form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <ServiceProcessForm form={form} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <ServicePricingForm form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <ServiceFaqForm form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <ServiceCaseStudiesForm form={form} />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            variant="outline" 
            className="mr-2"
            onClick={() => navigate("/admin/services")}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Service
          </Button>
        </div>
      </form>
    </Form>
  );
}
