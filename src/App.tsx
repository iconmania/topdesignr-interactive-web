
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Messages from "./pages/admin/Messages";
import PortfolioAdmin from "./pages/admin/PortfolioAdmin";
import PortfolioEdit from "./pages/admin/PortfolioEdit";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import ServiceEdit from "./pages/admin/ServiceEdit";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import PortfolioDetail from "./pages/PortfolioDetail";
import ServiceDetail from "./pages/ServiceDetail";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="messages" element={<Messages />} />
              <Route path="portfolio" element={<PortfolioAdmin />} />
              <Route path="portfolio/:id" element={<PortfolioEdit />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="services/:id" element={<ServiceEdit />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
