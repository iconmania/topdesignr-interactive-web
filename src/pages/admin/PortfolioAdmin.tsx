
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  client?: string;
  date?: string;
  link?: string;
}

export default function PortfolioAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  // Load portfolio items from localStorage
  useEffect(() => {
    const storedPortfolio = localStorage.getItem("adminPortfolio");
    if (storedPortfolio) {
      setPortfolioItems(JSON.parse(storedPortfolio));
    }
  }, []);

  const handleAddNew = () => {
    navigate("/admin/portfolio/new");
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/portfolio/${id}`);
  };

  const handleDelete = (id: number) => {
    // Filter out the deleted item
    const updatedPortfolio = portfolioItems.filter(item => item.id !== id);
    
    // Update state and localStorage
    setPortfolioItems(updatedPortfolio);
    localStorage.setItem("adminPortfolio", JSON.stringify(updatedPortfolio));
    
    toast({
      title: "Portfolio item deleted",
      description: "The portfolio item has been removed successfully."
    });
  };

  const handleView = (id: number) => {
    window.open(`/portfolio/${id}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Portfolio Item
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 overflow-auto">
          {portfolioItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No portfolio items found. Add your first project.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.client || "—"}</TableCell>
                    <TableCell>{item.date || "—"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(item.id)}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
