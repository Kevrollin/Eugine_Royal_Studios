import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { apiRequest } from "@/lib/queryClient";
import { exportToPDF, exportBookingToPDF, exportToDOCX, exportBookingToDOCX } from "@/lib/exportUtils";
import { Booking } from "@shared/schema";

export default function Bookings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    document.title = "Manage Bookings | Eugine Ray Studios";
  }, []);

  // Fetch all bookings
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ["/api/admin/bookings", statusFilter, sortField, sortDirection],
    queryFn: async () => {
      let query = supabase
        .from('bookings')
        .select('*')
        .order(sortField, { ascending: sortDirection === 'asc' });
      
      if (statusFilter !== "all") {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      return data.map((booking: any) => ({
        id: booking.id,
        firstName: booking.first_name,
        lastName: booking.last_name,
        email: booking.email,
        phone: booking.phone,
        serviceType: booking.service_type,
        eventDate: booking.event_date,
        location: booking.location,
        message: booking.message,
        budget: booking.budget,
        status: booking.status,
        createdAt: new Date(booking.created_at)
      }));
    }
  });

  // Update booking status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({
        title: "Status Updated",
        description: "The booking status has been updated successfully.",
      });
      setIsStatusDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Filter bookings based on search query
  const filteredBookings = bookings?.filter((booking: Booking) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      booking.firstName.toLowerCase().includes(searchLower) ||
      booking.lastName.toLowerCase().includes(searchLower) ||
      booking.email.toLowerCase().includes(searchLower) ||
      booking.phone.toLowerCase().includes(searchLower) ||
      booking.serviceType.toLowerCase().includes(searchLower)
    );
  });

  // Format date for display
  const formatDate = (date: string | null) => {
    if (!date) return "Not specified";
    return new Date(date).toLocaleDateString();
  };

  // Handle sorting
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // View booking details
  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  // Open status change dialog
  const handleStatusChangeClick = (booking: any) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setIsStatusDialogOpen(true);
  };

  // Update booking status
  const handleStatusChange = async () => {
    if (selectedBooking && newStatus) {
      updateStatusMutation.mutate({ id: selectedBooking.id, status: newStatus });
    }
  };

  // Export all filtered bookings to PDF
  const handleExportToPDF = () => {
    if (filteredBookings && filteredBookings.length > 0) {
      exportToPDF(filteredBookings, "Eugine Ray Studios Bookings");
      toast({
        title: "Export Successful",
        description: "Bookings have been exported to PDF.",
      });
    } else {
      toast({
        title: "Export Failed",
        description: "No bookings to export.",
        variant: "destructive",
      });
    }
  };

  // Export single booking to PDF
  const handleExportSingleToPDF = (booking: Booking) => {
    exportBookingToPDF(booking);
    toast({
      title: "Export Successful",
      description: `Booking #${booking.id} has been exported to PDF.`,
    });
  };

  // Export all filtered bookings to DOCX
  const handleExportToDOCX = async () => {
    if (filteredBookings && filteredBookings.length > 0) {
      await exportToDOCX(filteredBookings, "Eugine Ray Studios Bookings");
      toast({
        title: "Export Successful",
        description: "Bookings have been exported to DOCX.",
      });
    } else {
      toast({
        title: "Export Failed",
        description: "No bookings to export.",
        variant: "destructive",
      });
    }
  };

  // Export single booking to DOCX
  const handleExportSingleToDOCX = async (booking: Booking) => {
    await exportBookingToDOCX(booking);
    toast({
      title: "Export Successful",
      description: `Booking #${booking.id} has been exported to DOCX.`,
    });
  };

  return (
    <AdminLayout title="Manage Bookings">
      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportToPDF}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              Export PDF
            </Button>
            <Button variant="outline" onClick={handleExportToDOCX}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              Export DOCX
            </Button>
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="bg-white dark:bg-primary-light rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('id')} className="cursor-pointer">
                    ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('first_name')} className="cursor-pointer">
                    Name {sortField === 'first_name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('service_type')} className="cursor-pointer">
                    Service {sortField === 'service_type' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('event_date')} className="cursor-pointer">
                    Date {sortField === 'event_date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('budget')} className="cursor-pointer">
                    Budget {sortField === 'budget' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('created_at')} className="cursor-pointer">
                    Created {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5).fill(null).map((_, index) => (
                    <TableRow key={index}>
                      {Array(8).fill(null).map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filteredBookings?.length ? (
                  filteredBookings.map((booking: Booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.firstName} {booking.lastName}</TableCell>
                      <TableCell>{booking.serviceType}</TableCell>
                      <TableCell>{formatDate(booking.eventDate)}</TableCell>
                      <TableCell>KSh {booking.budget.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'pending' 
                            ? 'bg-amber-100 text-amber-800' 
                            : booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'canceled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewBooking({
                        ...booking,
                        createdAt: booking.createdAt.toString()
                      })}>
                            View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleStatusChangeClick(booking)}>
                            Status
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No bookings found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* View Booking Dialog */}
      {selectedBooking && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Booking #{selectedBooking.id} | Created on {new Date(selectedBooking.createdAt).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <p>{selectedBooking.firstName} {selectedBooking.lastName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <p>{selectedBooking.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Phone:</span>
                    <p>{selectedBooking.phone}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Service:</span>
                    <p>{selectedBooking.serviceType}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Event Date:</span>
                    <p>{formatDate(selectedBooking.eventDate)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <p>{selectedBooking.location || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Budget:</span>
                    <p>KSh {selectedBooking.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <p className="capitalize">{selectedBooking.status}</p>
                  </div>
                </div>
              </div>
              {selectedBooking.message && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-2">Additional Message</h3>
                  <p className="text-sm">{selectedBooking.message}</p>
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleExportSingleToPDF(selectedBooking)}
                >
                  Export to PDF
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleExportSingleToDOCX(selectedBooking)}
                >
                  Export to DOCX
                </Button>
              </div>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Change Status Dialog */}
      {selectedBooking && (
        <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Booking Status</DialogTitle>
              <DialogDescription>
                Change the status for booking #{selectedBooking.id}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleStatusChange}
                disabled={updateStatusMutation.isPending}
              >
                {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}