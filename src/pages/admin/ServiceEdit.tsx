import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ServiceBasicInfoForm } from "./services/ServiceBasicInfoForm";
import { ServiceBenefitsForm } from "./services/ServiceBenefitsForm";
import { ServiceProcessForm } from "./services/ServiceProcessForm";
import { ServicePricingForm } from "./services/ServicePricingForm";
import { ServiceFaqForm } from "./services/ServiceFaqForm";
import { ServiceCaseStudiesForm } from "./services/ServiceCaseStudiesForm";
import { formSchema, ServiceFormValues } from "./services/types";

export default function ServiceEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNewService, setIsNewService] = useState(false);

  // Initialize form with default values
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "Settings",
      fullDescription: "",
      benefits: [""],
      process: [""],
      caseStudies: [
        {
          title: "",
          client: "",
          description: ""
        }
      ],
      pricing: {
        starter: {
          name: "Starter",
          price: "",
          features: [""]
        },
        professional: {
          name: "Professional",
          price: "",
          features: [""]
        },
        enterprise: {
          name: "Enterprise",
          price: "",
          features: [""]
        }
      },
      faq: [
        {
          question: "",
          answer: ""
        }
      ]
    }
  });

  useEffect(() => {
    if (!id) return navigate("/admin/services");

    // Get services from localStorage
    const savedServices = localStorage.getItem("adminServices");
    if (!savedServices) {
      // If no services exist yet, this is a new service
      setIsNewService(true);
      return;
    }

    const services = JSON.parse(savedServices);
    const serviceId = parseInt(id);
    const service = services.find((s: any) => s.id === serviceId);

    if (service) {
      // Existing service, populate form
      form.reset({
        title: service.title || "",
        description: service.description || "",
        icon: service.icon || "Settings",
        fullDescription: service.fullDescription || "",
        benefits: service.benefits?.length ? service.benefits : [""],
        process: service.process?.length ? service.process : [""],
        caseStudies: service.caseStudies?.length ? service.caseStudies : [{
          title: "",
          client: "",
          description: ""
        }],
        pricing: {
          starter: {
            name: service.pricing?.starter?.name || "Starter",
            price: service.pricing?.starter?.price || "",
            features: service.pricing?.starter?.features?.length ? 
              service.pricing.starter.features : [""]
          },
          professional: {
            name: service.pricing?.professional?.name || "Professional",
            price: service.pricing?.professional?.price || "",
            features: service.pricing?.professional?.features?.length ? 
              service.pricing.professional.features : [""]
          },
          enterprise: {
            name: service.pricing?.enterprise?.name || "Enterprise",
            price: service.pricing?.enterprise?.price || "",
            features: service.pricing?.enterprise?.features?.length ? 
              service.pricing.enterprise.features : [""]
          }
        },
        faq: service.faq?.length ? service.faq : [{
          question: "",
          answer: ""
        }]
      });
    } else {
      // New service
      setIsNewService(true);
    }
  }, [id, navigate, form]);

  const onSubmit = (values: ServiceFormValues) => {
    // Save to localStorage
    const savedServices = localStorage.getItem("adminServices");
    const services = savedServices ? JSON.parse(savedServices) : [];
    const serviceId = parseInt(id || "0");

    // Clean up empty array entries
    const cleanedValues = {
      ...values,
      benefits: values.benefits.filter(b => b.trim() !== ""),
      process: values.process.filter(p => p.trim() !== ""),
      caseStudies: values.caseStudies.filter(cs => cs.title.trim() !== "" || cs.client.trim() !== "" || cs.description.trim() !== ""),
      pricing: {
        starter: {
          ...values.pricing.starter,
          features: values.pricing.starter.features.filter(f => f.trim() !== "")
        },
        professional: {
          ...values.pricing.professional,
          features: values.pricing.professional.features.filter(f => f.trim() !== "")
        },
        enterprise: {
          ...values.pricing.enterprise,
          features: values.pricing.enterprise.features.filter(f => f.trim() !== "")
        }
      },
      faq: values.faq.filter(f => f.question.trim() !== "" || f.answer.trim() !== "")
    };

    if (isNewService) {
      // Add new service
      const newService = {
        id: serviceId,
        ...cleanedValues
      };
      services.push(newService);
    } else {
      // Update existing service
      const index = services.findIndex((s: any) => s.id === serviceId);
      if (index !== -1) {
        services[index] = {
          ...services[index],
          ...cleanedValues
        };
      } else {
        // Service not found, add as new
        const newService = {
          id: serviceId,
          ...cleanedValues
        };
        services.push(newService);
      }
    }

    localStorage.setItem("adminServices", JSON.stringify(services));

    toast({
      title: isNewService ? "Service created" : "Service updated",
      description: `Your service has been ${isNewService ? "created" : "updated"} successfully.`
    });

    navigate("/admin/services");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/admin/services")} 
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">
            {isNewService ? "Add New Service" : "Edit Service"}
          </h1>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)}>
          <Save className="h-4 w-4 mr-2" />
          Save Service
        </Button>
      </div>

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
    </div>
  );
}
