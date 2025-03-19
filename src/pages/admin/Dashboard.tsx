
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Image, 
  LayoutList, 
  Quote,
  Layers,
  Users,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { title: "Messages", value: "12", icon: MessageSquare, color: "bg-blue-500/10 text-blue-500" },
    { title: "Portfolio Items", value: "6", icon: Image, color: "bg-purple-500/10 text-purple-500" },
    { title: "Services", value: "6", icon: LayoutList, color: "bg-emerald-500/10 text-emerald-500" },
    { title: "Testimonials", value: "4", icon: Quote, color: "bg-amber-500/10 text-amber-500" },
  ];

  const quickLinks = [
    { title: "Check Messages", path: "/admin/messages", icon: MessageSquare },
    { title: "Add Portfolio Item", path: "/admin/portfolio", icon: Image },
    { title: "Manage Services", path: "/admin/services", icon: LayoutList },
    { title: "Update Testimonials", path: "/admin/testimonials", icon: Quote },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your website today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className={`p-2 rounded-md ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Layers className="mr-2 h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks you can perform right away
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2">
            {quickLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors group"
              >
                <div className="flex items-center">
                  <link.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span>{link.title}</span>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform transform group-hover:translate-x-1" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-primary pl-4 py-2">
              <p className="font-medium">Portfolio Updated</p>
              <p className="text-sm text-muted-foreground">You added a new project "Quantum Brand Redesign"</p>
              <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-medium">New Message</p>
              <p className="text-sm text-muted-foreground">You received a new message from john@example.com</p>
              <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4 py-2">
              <p className="font-medium">Service Updated</p>
              <p className="text-sm text-muted-foreground">You updated the "UI/UX Design" service details</p>
              <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
