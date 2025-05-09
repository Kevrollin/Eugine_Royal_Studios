import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { Offer } from "@shared/schema";

interface OfferFormData {
  title: string;
  description: string;
  image: string;
  original_price: number;
  discounted_price: number;
  discount: string | null;
  start_date: string;
  end_date: string | null;
  is_new: boolean;
  is_active: boolean;
}

export default function Offers() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  
  // Form state
  const [formData, setFormData] = useState<OfferFormData>({
    title: "",
    description: "",
    image: "",
    original_price: 0,
    discounted_price: 0,
    discount: null,
    start_date: new Date().toISOString().split('T')[0],
    end_date: null,
    is_new: true,
    is_active: true
  });

  useEffect(() => {
    document.title = "Offers Management | Eugine Ray Studios";
  }, []);

  // Fetch offers
  const { data: offers, isLoading, refetch } = useQuery({
    queryKey: ["/api/admin/offers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    }
  });

  // Create offer mutation
  const createOfferMutation = useMutation({
    mutationFn: async (offer: OfferFormData) => {
      // Calculate discount percentage if not provided
      if (!offer.discount && offer.original_price > 0 && offer.discounted_price > 0) {
        const discountPercentage = Math.round(
          ((offer.original_price - offer.discounted_price) / offer.original_price) * 100
        );
        offer.discount = `${discountPercentage}% OFF`;
      }
      
      const { data, error } = await supabase
        .from('offers')
        .insert(offer)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/offers"] });
      toast({
        title: "Success",
        description: "Offer has been created successfully.",
      });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create offer. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update offer mutation
  const updateOfferMutation = useMutation({
    mutationFn: async ({ id, offer }: { id: number; offer: Partial<OfferFormData> }) => {
      // Calculate discount percentage if not provided
      if (
        (offer.discount === null || offer.discount === "") &&
        offer.original_price && 
        offer.discounted_price && 
        offer.original_price > 0 && 
        offer.discounted_price > 0
      ) {
        const discountPercentage = Math.round(
          ((offer.original_price - offer.discounted_price) / offer.original_price) * 100
        );
        offer.discount = `${discountPercentage}% OFF`;
      }
      
      const { data, error } = await supabase
        .from('offers')
        .update(offer)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/offers"] });
      toast({
        title: "Success",
        description: "Offer has been updated successfully.",
      });
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update offer. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete offer mutation
  const deleteOfferMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/offers"] });
      toast({
        title: "Success",
        description: "Offer has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete offer. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Filter offers based on search query and active status
  const filteredOffers = offers?.filter((offer: any) => {
    // Filter by status
    if (filter === "active" && !offer.is_active) {
      return false;
    }
    
    if (filter === "inactive" && offer.is_active) {
      return false;
    }
    
    if (filter === "new" && !offer.is_new) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        offer.title.toLowerCase().includes(searchLower) ||
        offer.description.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      original_price: 0,
      discounted_price: 0,
      discount: null,
      start_date: new Date().toISOString().split('T')[0],
      end_date: null,
      is_new: true,
      is_active: true
    });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("price") ? parseFloat(value) : value
    }));
  };

  // Handle date change
  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date ? date.toISOString().split('T')[0] : null
    }));
  };

  // Handle switch change
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (formData.original_price > 0 && formData.discounted_price > 0) {
      const discountPercentage = Math.round(
        ((formData.original_price - formData.discounted_price) / formData.original_price) * 100
      );
      setFormData((prev) => ({
        ...prev,
        discount: `${discountPercentage}% OFF`
      }));
    }
  };

  // Open edit dialog
  const handleEditClick = (offer: any) => {
    setSelectedOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      image: offer.image,
      original_price: offer.original_price,
      discounted_price: offer.discounted_price,
      discount: offer.discount,
      start_date: offer.start_date,
      end_date: offer.end_date,
      is_new: offer.is_new,
      is_active: offer.is_active
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (offer: any) => {
    setSelectedOffer(offer);
    setIsDeleteDialogOpen(true);
  };

  // Handle create form submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createOfferMutation.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit form submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOffer) return;
    
    setIsSubmitting(true);
    
    try {
      await updateOfferMutation.mutateAsync({
        id: selectedOffer.id,
        offer: formData
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedOffer) return;
    
    await deleteOfferMutation.mutateAsync(selectedOffer.id);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No end date";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <AdminLayout title="Special Offers Management">
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search offers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter offers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-secondary hover:bg-secondary/90 text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Offer
          </Button>
        </div>
        
        {/* Offers Table */}
        <div className="bg-white dark:bg-primary-light rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5).fill(null).map((_, index) => (
                    <TableRow key={index}>
                      {Array(7).fill(null).map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filteredOffers?.length ? (
                  filteredOffers.map((offer: any) => (
                    <TableRow key={offer.id}>
                      <TableCell className="font-medium">{offer.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded overflow-hidden bg-neutral-100">
                            <img 
                              src={offer.image} 
                              alt={offer.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/gray/white?text=No+Image';
                              }}
                            />
                          </div>
                          <div className="font-medium">
                            {offer.title}
                            {offer.is_new && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm line-through text-muted-foreground">
                            {formatCurrency(offer.original_price)}
                          </div>
                          <div className="font-medium text-emerald-600">
                            {formatCurrency(offer.discounted_price)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          {offer.discount || "Special Offer"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>From: {formatDate(offer.start_date)}</div>
                          <div>To: {formatDate(offer.end_date)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {offer.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditClick(offer)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(offer)}>
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No offers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Add Offer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Offer</DialogTitle>
            <DialogDescription>
              Create a new special offer or promotion. All prices are in KSh.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Offer Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Summer Wedding Photography Special"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the offer details"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="text-xs text-muted-foreground">Direct link to the image file. For best results, use a 16:9 aspect ratio.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="original_price">Original Price (KSh)</Label>
                  <Input
                    id="original_price"
                    name="original_price"
                    type="number"
                    value={formData.original_price.toString()}
                    onChange={handleInputChange}
                    onBlur={calculateDiscount}
                    placeholder="e.g. 25000"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discounted_price">Discounted Price (KSh)</Label>
                  <Input
                    id="discounted_price"
                    name="discounted_price"
                    type="number"
                    value={formData.discounted_price.toString()}
                    onChange={handleInputChange}
                    onBlur={calculateDiscount}
                    placeholder="e.g. 20000"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Label (Optional)</Label>
                <Input
                  id="discount"
                  name="discount"
                  value={formData.discount || ""}
                  onChange={handleInputChange}
                  placeholder="e.g. 20% OFF"
                  className="mb-1"
                />
                <p className="text-xs text-muted-foreground">Leave blank to auto-calculate based on prices.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date (Optional)</Label>
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_new"
                    checked={formData.is_new}
                    onCheckedChange={(checked) => handleSwitchChange("is_new", checked)}
                  />
                  <Label htmlFor="is_new">Mark as New</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => handleSwitchChange("is_active", checked)}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Offer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Offer Dialog */}
      {selectedOffer && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Offer</DialogTitle>
              <DialogDescription>
                Update the details of this offer.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Offer Title</Label>
                  <Input
                    id="edit-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Summer Wedding Photography Special"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the offer details"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-original_price">Original Price (KSh)</Label>
                    <Input
                      id="edit-original_price"
                      name="original_price"
                      type="number"
                      value={formData.original_price.toString()}
                      onChange={handleInputChange}
                      onBlur={calculateDiscount}
                      placeholder="e.g. 25000"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-discounted_price">Discounted Price (KSh)</Label>
                    <Input
                      id="edit-discounted_price"
                      name="discounted_price"
                      type="number"
                      value={formData.discounted_price.toString()}
                      onChange={handleInputChange}
                      onBlur={calculateDiscount}
                      placeholder="e.g. 20000"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-discount">Discount Label (Optional)</Label>
                  <Input
                    id="edit-discount"
                    name="discount"
                    value={formData.discount || ""}
                    onChange={handleInputChange}
                    placeholder="e.g. 20% OFF"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-start_date">Start Date</Label>
                    <Input
                      id="edit-start_date"
                      name="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-end_date">End Date (Optional)</Label>
                    <Input
                      id="edit-end_date"
                      name="end_date"
                      type="date"
                      value={formData.end_date || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-is_new"
                      checked={formData.is_new}
                      onCheckedChange={(checked) => handleSwitchChange("is_new", checked)}
                    />
                    <Label htmlFor="edit-is_new">Mark as New</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => handleSwitchChange("is_active", checked)}
                    />
                    <Label htmlFor="edit-is_active">Active</Label>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      {selectedOffer && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the offer "{selectedOffer.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteConfirm}
                disabled={deleteOfferMutation.isPending}
              >
                {deleteOfferMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}