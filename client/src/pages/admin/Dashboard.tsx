import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [pendingBookings, setPendingBookings] = useState<number>(0);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [totalOffers, setTotalOffers] = useState<number>(0);
  const [totalPortfolioItems, setTotalPortfolioItems] = useState<number>(0);

  useEffect(() => {
    document.title = "Admin Dashboard | Eugine Ray Studios";
  }, []);

  // Fetch dashboard stats
  const { isLoading } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    queryFn: async () => {
      // Fetch bookings count
      const { count: bookingsCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });
      
      setTotalBookings(bookingsCount || 0);
      
      // Fetch pending bookings count
      const { count: pendingCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      setPendingBookings(pendingCount || 0);
      
      // Fetch messages count
      const { count: messagesCount } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true });
      
      setTotalMessages(messagesCount || 0);
      
      // Fetch unread messages count
      const { count: unreadCount } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      
      setUnreadMessages(unreadCount || 0);
      
      // Fetch offers count
      const { count: offersCount } = await supabase
        .from('offers')
        .select('*', { count: 'exact', head: true });
      
      setTotalOffers(offersCount || 0);
      
      // Fetch portfolio items count
      const { count: portfolioCount } = await supabase
        .from('portfolio_items')
        .select('*', { count: 'exact', head: true });
      
      setTotalPortfolioItems(portfolioCount || 0);
      
      return { success: true };
    }
  });

  // Recent bookings query
  const { data: recentBookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["/api/admin/recent-bookings"],
    queryFn: async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      return data || [];
    }
  });

  // Recent messages query
  const { data: recentMessages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["/api/admin/recent-messages"],
    queryFn: async () => {
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      return data || [];
    }
  });

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Total Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-20" />
                  ) : (
                    <div className="text-3xl font-bold">{totalBookings}</div>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="text-amber-500 font-medium">{pendingBookings} pending</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-20" />
                  ) : (
                    <div className="text-3xl font-bold">{totalMessages}</div>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="text-amber-500 font-medium">{unreadMessages} unread</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Content Items</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-20" />
                  ) : (
                    <div className="text-3xl font-bold">{totalPortfolioItems + totalOffers}</div>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="text-blue-500">{totalPortfolioItems} portfolio</span> • 
                    <span className="text-green-500 ml-1">{totalOffers} offers</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        
        {/* Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Bookings</CardTitle>
                  <a href="/admin/bookings" className="text-sm text-secondary hover:underline">
                    View All
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingBookings ? (
                  Array(3).fill(null).map((_, index) => (
                    <div key={index} className="mb-4">
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))
                ) : recentBookings?.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">No bookings yet</p>
                ) : (
                  <div className="space-y-4">
                    {recentBookings?.map((booking: any) => (
                      <div key={booking.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {booking.first_name} {booking.last_name}
                            </h4>
                            <p className="text-sm text-muted-foreground">{booking.service_type}</p>
                          </div>
                          <div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
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
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(booking.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Messages</CardTitle>
                  <a href="/admin/messages" className="text-sm text-secondary hover:underline">
                    View All
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingMessages ? (
                  Array(3).fill(null).map((_, index) => (
                    <div key={index} className="mb-4">
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))
                ) : recentMessages?.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">No messages yet</p>
                ) : (
                  <div className="space-y-4">
                    {recentMessages?.map((message: any) => (
                      <div key={message.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{message.name}</h4>
                            <p className="text-sm text-muted-foreground">{message.subject}</p>
                          </div>
                          {!message.is_read && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </section>
        
        {/* Quick Actions */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <a 
                    href="/admin/bookings" 
                    className="flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-primary-light rounded-lg hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Manage Bookings</span>
                  </a>
                  <a 
                    href="/admin/portfolio/new" 
                    className="flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-primary-light rounded-lg hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Portfolio Item</span>
                  </a>
                  <a 
                    href="/admin/offers/new" 
                    className="flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-primary-light rounded-lg hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create New Offer</span>
                  </a>
                  <a 
                    href="/admin/messages" 
                    className="flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-primary-light rounded-lg hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Check Messages</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </AdminLayout>
  );
}