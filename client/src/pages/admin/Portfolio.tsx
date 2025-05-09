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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
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
import { PortfolioItem } from "@shared/schema";

interface PortfolioFormData {
  title: string;
  description: string;
  category: string;
  image: string;
  is_video: boolean;
  video_url?: string;
  featured: boolean;
}

export default function Portfolio() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Form state
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: "",
    description: "",
    category: "photography",
    image: "",
    is_video: false,
    video_url: "",
    featured: false
  });

  useEffect(() => {
    document.title = "Portfolio Management | Eugine Ray Studios";
  }, []);

  // Fetch portfolio items
  const { data: portfolioItems, isLoading, refetch } = useQuery({
    queryKey: ["/api/admin/portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    }
  });

  // Create portfolio item mutation
  const createItemMutation = useMutation({
    mutationFn: async (item: PortfolioFormData) => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert(item)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      toast({
        title: "Success",
        description: "Portfolio item has been created successfully.",
      });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create portfolio item. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update portfolio item mutation
  const updateItemMutation = useMutation({
    mutationFn: async ({ id, item }: { id: number; item: Partial<PortfolioFormData> }) => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .update(item)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      toast({
        title: "Success",
        description: "Portfolio item has been updated successfully.",
      });
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update portfolio item. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete portfolio item mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      toast({
        title: "Success",
        description: "Portfolio item has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Filter items based on active tab and search query
  const filteredItems = (portfolioItems || []).filter((item: any) => {
    // Filter by category
    if (activeTab !== "all" && item.category !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "photography",
      image: "",
      is_video: false,
      video_url: "",
      featured: false
    });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle switch/checkbox change
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Open edit dialog
  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      is_video: item.is_video,
      video_url: item.video_url || "",
      featured: item.featured
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (item: any) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Handle create form submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createItemMutation.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit form submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem) return;
    
    setIsSubmitting(true);
    
    try {
      await updateItemMutation.mutateAsync({
        id: selectedItem.id,
        item: formData
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    
    await deleteItemMutation.mutateAsync(selectedItem.id);
  };

  return (
    <AdminLayout title="Portfolio Management">
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <div className="w-full sm:w-1/3">
            <Input
              placeholder="Search portfolio items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-secondary hover:bg-secondary/90 text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Item
          </Button>
        </div>
        
        {/* Category Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="photography">Photography</TabsTrigger>
            <TabsTrigger value="videography">Videography</TabsTrigger>
            <TabsTrigger value="event">Event</TabsTrigger>
            <TabsTrigger value="wedding">Wedding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <PortfolioTable 
              items={filteredItems} 
              isLoading={isLoading} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </TabsContent>
          <TabsContent value="photography" className="mt-6">
            <PortfolioTable 
              items={filteredItems} 
              isLoading={isLoading} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </TabsContent>
          <TabsContent value="videography" className="mt-6">
            <PortfolioTable 
              items={filteredItems} 
              isLoading={isLoading} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </TabsContent>
          <TabsContent value="event" className="mt-6">
            <PortfolioTable 
              items={filteredItems} 
              isLoading={isLoading} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </TabsContent>
          <TabsContent value="wedding" className="mt-6">
            <PortfolioTable 
              items={filteredItems} 
              isLoading={isLoading} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Portfolio Item</DialogTitle>
            <DialogDescription>
              Add a new item to your portfolio. All fields are required except video URL (for videos only).
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Beach Wedding Photography"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    name="category" 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="videography">Videography</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the portfolio item"
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
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_video"
                  checked={formData.is_video}
                  onCheckedChange={(checked) => handleSwitchChange("is_video", checked)}
                />
                <Label htmlFor="is_video">This is a video</Label>
              </div>
              
              {formData.is_video && (
                <div className="space-y-2">
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input
                    id="video_url"
                    name="video_url"
                    value={formData.video_url}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/watch?v=..."
                    required={formData.is_video}
                  />
                  <p className="text-xs text-muted-foreground">YouTube or Vimeo URL for the video content</p>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleSwitchChange("featured", checked === true)}
                />
                <Label htmlFor="featured">Feature this item on the homepage</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Item Dialog */}
      {selectedItem && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Portfolio Item</DialogTitle>
              <DialogDescription>
                Update the details of this portfolio item.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Beach Wedding Photography"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select 
                      name="category" 
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="videography">Videography</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the portfolio item"
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
                  <p className="text-xs text-muted-foreground">Direct link to the image file. For best results, use a 16:9 aspect ratio.</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-is_video"
                    checked={formData.is_video}
                    onCheckedChange={(checked) => handleSwitchChange("is_video", checked)}
                  />
                  <Label htmlFor="edit-is_video">This is a video</Label>
                </div>
                
                {formData.is_video && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-video_url">Video URL</Label>
                    <Input
                      id="edit-video_url"
                      name="video_url"
                      value={formData.video_url}
                      onChange={handleInputChange}
                      placeholder="https://youtube.com/watch?v=..."
                      required={formData.is_video}
                    />
                    <p className="text-xs text-muted-foreground">YouTube or Vimeo URL for the video content</p>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked === true)}
                  />
                  <Label htmlFor="edit-featured">Feature this item on the homepage</Label>
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
      {selectedItem && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedItem.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteConfirm}
                disabled={deleteItemMutation.isPending}
              >
                {deleteItemMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}

interface PortfolioTableProps {
  items: any[] | undefined;
  isLoading: boolean;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

function PortfolioTable({ items, isLoading, onEdit, onDelete }: PortfolioTableProps) {
  return (
    <div className="bg-white dark:bg-primary-light rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Created</TableHead>
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
            ) : items?.length ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded overflow-hidden bg-neutral-100">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/gray/white?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="font-medium">{item.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{item.category}</span>
                  </TableCell>
                  <TableCell>
                    {item.is_video ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Video
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Photo
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.featured ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Featured
                      </span>
                    ) : (
                      <span className="text-neutral-500">—</span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => onDelete(item)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No portfolio items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}