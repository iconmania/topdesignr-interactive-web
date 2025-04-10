
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortfolioForm from "@/components/admin/portfolio/PortfolioForm";
import { Project } from "@/types/portfolio";

export default function PortfolioEdit() {
  const { id = "new" } = useParams<{ id: string }>();
  const [existingData, setExistingData] = useState<Project | undefined>(undefined);

  // Load existing data if editing
  useEffect(() => {
    if (id !== "new") {
      const storedPortfolio = localStorage.getItem("adminPortfolio");
      if (storedPortfolio) {
        try {
          const portfolioItems = JSON.parse(storedPortfolio);
          const portfolioItem = portfolioItems.find(
            (item: { id: number }) => item.id.toString() === id
          );

          if (portfolioItem) {
            setExistingData(portfolioItem);
          }
        } catch (error) {
          console.error("Error loading portfolio item:", error);
        }
      }
    }
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {id === "new" ? "Add Portfolio Item" : "Edit Portfolio Item"}
        </h1>
      </div>
      
      <PortfolioForm portfolioId={id} existingData={existingData} />
    </div>
  );
}
