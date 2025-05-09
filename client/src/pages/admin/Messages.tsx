import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { ContactMessage } from "@shared/schema";

export default function Messages() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    document.title = "Contact Messages | Eugine Ray Studios";
  }, []);

  // Fetch contact messages
  const { data: messages, isLoading, refetch } = useQuery({
    queryKey: ["/api/admin/messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data.map((message: any) => ({
        id: message.id,
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        isRead: message.is_read,
        createdAt: new Date(message.created_at)
      })) || [];
    }
  });

  // Mark message as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async ({ id, isRead }: { id: number; isRead: boolean }) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ is_read: isRead })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Status Updated",
        description: "Message status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: "Failed to update message status. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Success",
        description: "Message has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Filter messages based on search query and read status
  const filteredMessages = messages?.filter((message: any) => {
    // Filter by read status
    if (filter === "unread" && message.isRead) {
      return false;
    }
    
    if (filter === "read" && !message.isRead) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        message.name.toLowerCase().includes(searchLower) ||
        message.email.toLowerCase().includes(searchLower) ||
        message.subject.toLowerCase().includes(searchLower) ||
        message.message.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // View message details
  const handleViewMessage = async (message: any) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    
    // If message is unread, mark it as read
    if (!message.isRead) {
      await markAsReadMutation.mutateAsync({ id: message.id, isRead: true });
      setSelectedMessage((prev: any) => ({ ...prev, isRead: true }));
    }
  };

  // Toggle read status
  const handleToggleReadStatus = async (message: any) => {
    await markAsReadMutation.mutateAsync({ id: message.id, isRead: !message.isRead });
  };

  // Open delete dialog
  const handleDeleteClick = (message: any) => {
    setSelectedMessage(message);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedMessage) return;
    
    await deleteMessageMutation.mutateAsync(selectedMessage.id);
  };

  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    const unreadMessages = messages?.filter((message: any) => !message.isRead) || [];
    
    if (unreadMessages.length === 0) {
      toast({
        title: "Info",
        description: "No unread messages to mark.",
      });
      return;
    }
    
    try {
      // Use Promise.all to mark all unread messages as read concurrently
      await Promise.all(
        unreadMessages.map((message: any) =>
          markAsReadMutation.mutateAsync({ id: message.id, isRead: true })
        )
      );
      
      toast({
        title: "Success",
        description: `Marked ${unreadMessages.length} messages as read.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark all messages as read. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Contact Messages">
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <div className="w-full sm:w-1/3">
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setFilter(filter === "all" ? "unread" : filter === "unread" ? "read" : "all")}
            >
              {filter === "all" 
                ? "Filter: All" 
                : filter === "unread" 
                ? "Filter: Unread" 
                : "Filter: Read"}
            </Button>
            <Button onClick={handleMarkAllAsRead}>
              Mark All as Read
            </Button>
          </div>
        </div>
        
        {/* Messages Table */}
        <div className="bg-white dark:bg-primary-light rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Status</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5).fill(null).map((_, index) => (
                    <TableRow key={index}>
                      {Array(5).fill(null).map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filteredMessages?.length ? (
                  filteredMessages.map((message: any) => (
                    <TableRow 
                      key={message.id} 
                      className={message.isRead ? "" : "bg-blue-50 dark:bg-blue-900/10 font-medium"}
                    >
                      <TableCell>
                        {message.isRead ? (
                          <Badge variant="outline" className="text-muted-foreground">Read</Badge>
                        ) : (
                          <Badge className="bg-blue-500">New</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{message.name}</div>
                          <div className="text-xs text-muted-foreground">{message.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>
                        {message.createdAt.toLocaleDateString()} 
                        <span className="text-xs text-muted-foreground ml-1">
                          {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewMessage(message)}>
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleToggleReadStatus(message)}
                          >
                            {message.isRead ? "Mark Unread" : "Mark Read"}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteClick(message)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No messages found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* View Message Dialog */}
      {selectedMessage && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription>
                From: {selectedMessage.name} &lt;{selectedMessage.email}&gt; • 
                {selectedMessage.createdAt.toLocaleDateString()} at {selectedMessage.createdAt.toLocaleTimeString()}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 py-2 px-4 bg-neutral-50 dark:bg-primary rounded-md whitespace-pre-wrap">
              {selectedMessage.message}
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-between mt-4">
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => window.location.href = `mailto:${selectedMessage.email}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Reply
                </Button>
                <Button 
                  variant={selectedMessage.isRead ? "outline" : "default"}
                  onClick={() => {
                    handleToggleReadStatus(selectedMessage);
                    setSelectedMessage((prev: any) => ({ ...prev, isRead: !prev.isRead }));
                  }}
                >
                  {selectedMessage.isRead ? "Mark as Unread" : "Mark as Read"}
                </Button>
              </div>
              <Button variant="destructive" onClick={() => {
                setIsViewDialogOpen(false);
                setIsDeleteDialogOpen(true);
              }}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      {selectedMessage && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this message from {selectedMessage.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteConfirm}
                disabled={deleteMessageMutation.isPending}
              >
                {deleteMessageMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}