
import { useParams } from "react-router-dom";
import { useServiceForm } from "./services/hooks/useServiceForm";
import { ServiceFormActions } from "./services/components/ServiceFormActions";
import { ServiceForm } from "./services/components/ServiceForm";

export default function ServiceEdit() {
  const { id } = useParams<{ id: string }>();
  const { form, isNewService, onSubmit } = useServiceForm(id);

  return (
    <div className="space-y-6">
      <ServiceFormActions 
        isNewService={isNewService} 
        onSubmit={form.handleSubmit(onSubmit)} 
      />
      
      <ServiceForm 
        form={form} 
        onSubmit={onSubmit} 
      />
    </div>
  );
}
