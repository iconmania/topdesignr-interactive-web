
import { useState, useEffect } from "react";
import { 
  Check, 
  Mail, 
  MailOpen, 
  Search, 
  Trash, 
  Forward,
  X,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

// Sample data
const sampleMessages: Message[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    message: "Hello, I'm interested in your UI/UX Design services. Can you provide more information about your process and pricing?",
    date: "2023-06-15T10:30:00",
    read: false
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily@example.com",
    message: "I need help with a complete brand redesign for my startup. Would love to schedule a consultation to discuss the details.",
    date: "2023-06-14T15:45:00",
    read: true
  },
  {
    id: "3",
    name: "David Lee",
    email: "david@example.com",
    message: "Your portfolio is impressive! I have a web development project that needs your expertise. When can we talk?",
    date: "2023-06-12T09:15:00",
    read: true
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    message: "We're looking for a partner to help us create an interactive experience for our new product launch. Would you be interested?",
    date: "2023-06-10T11:20:00",
    read: false
  },
];

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [forwardEmail, setForwardEmail] = useState("");
  const [isForwardDialogOpen, setIsForwardDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [autoForwardEmail, setAutoForwardEmail] = useState("");
  const { toast } = useToast();

  // Initialize with sample data
  useEffect(() => {
    // In a real app, we would fetch messages from an API
    const savedMessages = localStorage.getItem("adminMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(sampleMessages);
      localStorage.setItem("adminMessages", JSON.stringify(sampleMessages));
    }

    // Get any saved auto-forward email
    const savedAutoForward = localStorage.getItem("autoForwardEmail");
    if (savedAutoForward) {
      setAutoForwardEmail(savedAutoForward);
    }
  }, []);

  const filteredMessages = messages.filter(message => {
    const query = searchQuery.toLowerCase();
    return (
      message.name.toLowerCase().includes(query) ||
      message.email.toLowerCase().includes(query) ||
      message.message.toLowerCase().includes(query)
    );
  });

  const markAsRead = (id: string) => {
    const updatedMessages = messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
    localStorage.setItem("adminMessages", JSON.stringify(updatedMessages));
  };

  const deleteMessage = (id: string) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem("adminMessages", JSON.stringify(updatedMessages));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    toast({
      title: "Message deleted",
      description: "The message has been removed.",
    });
  };

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const handleForward = () => {
    if (!forwardEmail || !selectedMessage) return;
    
    // In a real app, we would actually send the email
    toast({
      title: "Message forwarded",
      description: `Message forwarded to ${forwardEmail}`,
    });
    
    setForwardEmail("");
    setIsForwardDialogOpen(false);
  };

  const saveAutoForwardSettings = () => {
    localStorage.setItem("autoForwardEmail", autoForwardEmail);
    toast({
      title: "Settings saved",
      description: autoForwardEmail 
        ? `Messages will be auto-forwarded to ${autoForwardEmail}` 
        : "Auto-forwarding has been disabled",
    });
    setIsSettingsDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Messages</h1>
          <p className="text-muted-foreground">Manage client inquiries and emails.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={() => setIsSettingsDialogOpen(true)} variant="outline">
            Message Settings
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-[calc(100vh-250px)] overflow-auto border rounded-lg">
          {filteredMessages.length > 0 ? (
            <div className="divide-y">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id
                      ? "bg-muted"
                      : message.read
                      ? ""
                      : "bg-primary/5"
                  } hover:bg-muted`}
                  onClick={() => handleMessageSelect(message)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-2">
                      {!message.read ? (
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary"></div>
                      ) : (
                        <div className="h-2 w-2 mt-2"></div>
                      )}
                      <div>
                        <h3 className="font-semibold">{message.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {message.email}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(message.date).split(",")[0]}
                    </p>
                  </div>
                  <p className="mt-2 text-sm line-clamp-2">{message.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No messages found</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery ? "Try a different search term" : "Your inbox is empty"}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="h-[calc(100vh-250px)] flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedMessage.name}</CardTitle>
                    <CardDescription>{selectedMessage.email}</CardDescription>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedMessage.date)}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto">
                <div className="prose dark:prose-invert max-w-none">
                  <p>{selectedMessage.message}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsForwardDialogOpen(true)}
                  >
                    <Forward className="mr-2 h-4 w-4" />
                    Forward
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => markAsRead(selectedMessage.id)}
                  >
                    <MailOpen className="mr-2 h-4 w-4" />
                    Mark as {selectedMessage.read ? "unread" : "read"}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-250px)] border rounded-lg p-6">
              <div className="text-center">
                <MailOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No message selected</h3>
                <p className="text-muted-foreground">
                  Select a message from the list to view its details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Forward Dialog */}
      <Dialog open={isForwardDialogOpen} onOpenChange={setIsForwardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forward Message</DialogTitle>
            <DialogDescription>
              Forward this message to another email address
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recipient Email</label>
              <Input 
                placeholder="email@example.com" 
                value={forwardEmail} 
                onChange={(e) => setForwardEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                value={selectedMessage?.message || ""} 
                readOnly 
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsForwardDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleForward} disabled={!forwardEmail}>
              Forward Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Settings</DialogTitle>
            <DialogDescription>
              Configure how you want to handle incoming messages
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Auto-forward Messages To</label>
              <Input 
                placeholder="Leave empty to disable auto-forwarding" 
                value={autoForwardEmail} 
                onChange={(e) => setAutoForwardEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                All new contact form submissions will also be sent to this email
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notification Preferences</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select notification preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All messages</SelectItem>
                  <SelectItem value="important">Important only</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveAutoForwardSettings}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
