
import { useState, useEffect } from 'react';
import { Project, defaultProjects } from '@/types/portfolio';

export const usePortfolioProjects = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  
  useEffect(() => {
    // Load portfolio items from localStorage
    const savedPortfolio = localStorage.getItem("adminPortfolio");
    if (savedPortfolio) {
      try {
        const adminProjects = JSON.parse(savedPortfolio);
        // Check if we have at least one valid project
        if (adminProjects && adminProjects.length > 0) {
          // Map admin projects to our format with proper type checking for size and alignment
          const formattedProjects: Project[] = adminProjects.map((project: any) => {
            // Ensure size is one of the valid options and convert legacy values
            let size: "full" | "col-8" | "col-6" | "col-4" = "col-6";
            
            // Map legacy size values to new format
            if (project.size === "large") {
              size = "col-8";
            } else if (project.size === "medium") {
              size = "col-6";
            } else if (project.size === "small") {
              size = "col-4";
            } else if (["full", "col-8", "col-6", "col-4"].includes(project.size)) {
              size = project.size;
            }
            
            // Ensure alignment is one of the valid options
            let alignment: "left" | "center" | "right" = "center";
            if (project.alignment === "left" || project.alignment === "center" || project.alignment === "right") {
              alignment = project.alignment;
            }
            
            return {
              ...project,
              year: project.date || project.year || new Date().getFullYear().toString(),
              size,
              alignment,
              additionalImages: project.additionalImages || []
            };
          });
          
          // Sort projects by order if available
          formattedProjects.sort((a, b) => {
            const orderA = a.order !== undefined ? a.order : 999;
            const orderB = b.order !== undefined ? b.order : 999;
            return orderA - orderB;
          });
          
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Error parsing portfolio data:", error);
        // Fallback to default projects if parsing fails
        setProjects(defaultProjects);
      }
    }
  }, []);

  // Save projects to localStorage so they're available for PortfolioDetail page
  useEffect(() => {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
  }, [projects]);

  return { projects };
};
