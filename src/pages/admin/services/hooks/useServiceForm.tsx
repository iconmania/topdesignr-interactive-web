import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { formSchema, ServiceFormValues } from "../types";

export function useServiceForm(serviceId: string | undefined) {
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
    if (!serviceId) return navigate("/admin/services");

    // Get services from localStorage
    const savedServices = localStorage.getItem("adminServices");
    if (!savedServices) {
      // If no services exist yet, this is a new service
      setIsNewService(true);
      return;
    }

    const services = JSON.parse(savedServices);
    const serviceIdNum = parseInt(serviceId);
    const service = services.find((s: any) => s.id === serviceIdNum);

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
  }, [serviceId, navigate, form]);

  const onSubmit = (values: ServiceFormValues) => {
    // Save to localStorage
    const savedServices = localStorage.getItem("adminServices");
    const services = savedServices ? JSON.parse(savedServices) : [];
    const serviceIdNum = parseInt(serviceId || "0");

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
        id: serviceIdNum,
        ...cleanedValues
      };
      services.push(newService);
    } else {
      // Update existing service
      const index = services.findIndex((s: any) => s.id === serviceIdNum);
      if (index !== -1) {
        services[index] = {
          ...services[index],
          ...cleanedValues
        };
      } else {
        // Service not found, add as new
        const newService = {
          id: serviceIdNum,
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

  return {
    form,
    isNewService,
    onSubmit
  };
}
