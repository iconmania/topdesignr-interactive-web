
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceFormActionsProps {
  isNewService: boolean;
  onSubmit: () => void;
}

export function ServiceFormActions({ isNewService, onSubmit }: ServiceFormActionsProps) {
  const navigate = useNavigate();
  
  return (
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
      <Button onClick={onSubmit}>
        <Save className="h-4 w-4 mr-2" />
        Save Service
      </Button>
    </div>
  );
}
