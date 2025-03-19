import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Save, ArrowLeft, Plus, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Form schema
const pricingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  features: z.array(z.string().min(1, "Feature is required"))
});

const caseStudySchema = z.object({
  title: z.string().min(1, "Title is required"),
  client: z.string().min(1, "Client is required"),
  description: z.string().min(1, "Description is required")
});

const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required")
});

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

export default function ServiceEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNewService, setIsNewService] = useState(false);
  const [newBenefit, setNewBenefit] = useState("");
  const [newProcess, setNewProcess] = useState("");

  // Initialize form with default values
  const form = useForm<FormValues>({
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

  // Field arrays for dynamic fields
  const { fields: benefitsFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control: form.control,
    name: "benefits"
  });

  const { fields: processFields, append: appendProcess, remove: removeProcess } = useFieldArray({
    control: form.control,
    name: "process"
  });

  const { fields: caseStudiesFields, append: appendCaseStudy, remove: removeCaseStudy } = useFieldArray({
    control: form.control,
    name: "caseStudies"
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control: form.control,
    name: "faq"
  });

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

  const onSubmit = (values: FormValues) => {
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

  const addBenefit = () => {
    if (!newBenefit.trim()) return;
    appendBenefit(newBenefit);
    setNewBenefit("");
  };

  const addProcess = () => {
    if (!newProcess.trim()) return;
    appendProcess(newProcess);
    setNewProcess("");
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
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. UI/UX Design" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief description of the service..." 
                              className="h-20" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This will appear on the service card
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an icon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="LineChart">Line Chart</SelectItem>
                              <SelectItem value="Palette">Palette</SelectItem>
                              <SelectItem value="Globe">Globe</SelectItem>
                              <SelectItem value="Layers">Layers</SelectItem>
                              <SelectItem value="LayoutGrid">Layout Grid</SelectItem>
                              <SelectItem value="Settings">Settings</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detailed description of the service..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This will appear on the service detail page
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Service Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a benefit..."
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addBenefit} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {benefitsFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <Input
                            {...form.register(`benefits.${index}`)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBenefit(index)}
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Process</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a process step..."
                        value={newProcess}
                        onChange={(e) => setNewProcess(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addProcess} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {processFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <Input
                            {...form.register(`process.${index}`)}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProcess(index)}
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
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
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">FAQs</h3>

                  <div className="space-y-4">
                    {faqFields.map((field, index) => (
                      <div key={field.id} className="border p-4 rounded-md">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">FAQ #{index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFaq(index)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name={`faq.${index}.question`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Question</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. How long does this take?" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`faq.${index}.answer`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Answer</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Your answer..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendFaq({ question: "", answer: "" })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add FAQ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Case Studies</h3>

                  <div className="space-y-4">
                    {caseStudiesFields.map((field, index) => (
                      <div key={field.id} className="border p-4 rounded-md">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Case Study #{index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCaseStudy(index)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name={`caseStudies.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Success Story" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`caseStudies.${index}.client`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. ABC Company" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`caseStudies.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Describe the case study..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendCaseStudy({ title: "", client: "", description: "" })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Case Study
                    </Button>
                  </div>
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
