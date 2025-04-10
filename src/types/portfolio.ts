
export type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  client?: string;
  date?: string;
  link?: string;
  year?: string;
  size: "full" | "col-8" | "col-6" | "col-4";
  alignment: "left" | "center" | "right";
  additionalImages?: string[];
  url?: string;
  order?: number;
};

// Default projects if no admin data exists
export const defaultProjects: Project[] = [{
  id: 1,
  title: "Quantum Brand Redesign",
  category: "Branding",
  image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  year: "2023",
  size: "col-8",
  alignment: "left"
}, {
  id: 2,
  title: "Nebula Mobile App",
  category: "UI/UX Design",
  image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  year: "2023",
  size: "col-6",
  alignment: "center"
}, {
  id: 3,
  title: "Echo E-commerce Platform",
  category: "Web Development",
  image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  year: "2022",
  size: "col-4",
  alignment: "right"
}, {
  id: 4,
  title: "Pulse Interactive Installation",
  category: "Interactive Design",
  image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  year: "2022",
  size: "col-8",
  alignment: "right"
}, {
  id: 5,
  title: "Horizon Virtual Reality",
  category: "Immersive Experience",
  image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  year: "2021",
  size: "col-6",
  alignment: "left"
}, {
  id: 6,
  title: "Nova Marketing Campaign",
  category: "Digital Marketing",
  image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  year: "2021",
  size: "col-4",
  alignment: "center"
}];
