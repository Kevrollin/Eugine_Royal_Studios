import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBookingsRoute] = useRoute("/admin/bookings");
  const [isOffersRoute] = useRoute("/admin/offers");
  const [isPortfolioRoute] = useRoute("/admin/portfolio");
  const [isMessagesRoute] = useRoute("/admin/messages");
  const [isDashboardRoute] = useRoute("/admin/dashboard");
  const { toast } = useToast();
  
  // Check if user is authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setLocation("/admin/login");
      }
    };
    
    checkSession();
  }, [setLocation]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    setLocation("/admin/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-neutral-light dark:bg-primary text-neutral-dark dark:text-white">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-primary-light transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}
      >
        <div className="h-full flex flex-col shadow-lg lg:shadow-none">
          {/* Logo and close button */}
          <div className="flex items-center justify-between p-4 border-b border-neutral/10">
            <div className="font-playfair text-xl font-bold">
              <span className="text-secondary">E</span>ugine <span className="text-secondary">R</span>ay
            </div>
            <button 
              onClick={toggleSidebar}
              className="lg:hidden text-neutral-dark dark:text-white"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              <li>
                <a 
                  href="/admin/dashboard" 
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    isDashboardRoute 
                      ? "bg-secondary text-primary" 
                      : "hover:bg-neutral-light dark:hover:bg-primary hover:text-secondary"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  href="/admin/bookings" 
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    isBookingsRoute 
                      ? "bg-secondary text-primary" 
                      : "hover:bg-neutral-light dark:hover:bg-primary hover:text-secondary"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Bookings
                </a>
              </li>
              <li>
                <a 
                  href="/admin/portfolio" 
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    isPortfolioRoute 
                      ? "bg-secondary text-primary" 
                      : "hover:bg-neutral-light dark:hover:bg-primary hover:text-secondary"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="/admin/offers" 
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    isOffersRoute 
                      ? "bg-secondary text-primary" 
                      : "hover:bg-neutral-light dark:hover:bg-primary hover:text-secondary"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Offers
                </a>
              </li>
              <li>
                <a 
                  href="/admin/messages" 
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    isMessagesRoute 
                      ? "bg-secondary text-primary" 
                      : "hover:bg-neutral-light dark:hover:bg-primary hover:text-secondary"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Messages
                </a>
              </li>
            </ul>
          </nav>
          
          {/* User menu */}
          <div className="p-4 border-t border-neutral/10">
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white dark:bg-primary-light shadow-sm z-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* Mobile menu button */}
                <div className="flex items-center lg:hidden">
                  <button 
                    onClick={toggleSidebar}
                    className="text-neutral-dark dark:text-white p-2"
                    aria-label="Open sidebar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                
                {/* Page title */}
                <div className="flex items-center ml-4 lg:ml-0">
                  <h1 className="text-xl font-bold">{title}</h1>
                </div>
              </div>
              
              {/* Quick actions */}
              <div className="flex items-center">
                <a href="/" target="_blank" rel="noopener noreferrer" className="text-neutral-dark dark:text-white hover:text-secondary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="hidden sm:inline">View Site</span>
                </a>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <motion.main 
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}