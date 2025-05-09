import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/lib/queryClient";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Booking from "@/pages/Booking";
import Offers from "@/pages/Offers";
import Contact from "@/pages/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import BackToTop from "@/components/ui/BackToTop";

// Admin Pages
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import AdminBookings from "@/pages/admin/Bookings";
import AdminPortfolio from "@/pages/admin/Portfolio";
import AdminOffers from "@/pages/admin/Offers";
import AdminMessages from "@/pages/admin/Messages";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/booking" component={Booking} />
      <Route path="/offers" component={Offers} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/bookings" component={AdminBookings} />
      <Route path="/admin/portfolio" component={AdminPortfolio} />
      <Route path="/admin/offers" component={AdminOffers} />
      <Route path="/admin/messages" component={AdminMessages} />
      
      {/* 404 Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {!isAdminRoute && <Navbar />}
            <main className={`min-h-screen ${!isAdminRoute ? 'pt-20' : ''}`}>
              <Router />
            </main>
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <BackToTop />}
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
