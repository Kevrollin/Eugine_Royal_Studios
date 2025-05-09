import { useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

// Define the booking form schema
const bookingFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  serviceType: z.string().min(1, { message: "Please select a service type" }),
  eventDate: z.date().optional(),
  location: z.string().optional(),
  message: z.string().optional(),
  budget: z.number().min(10000).max(200000),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function Booking() {
  const [date, setDate] = useState<Date>();
  const [budget, setBudget] = useState<number>(50000);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Book a Session | Eugine Ray Studios";
  }, []);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceType: "",
      location: "",
      message: "",
      budget: 50000,
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      await apiRequest("POST", "/api/bookings", data);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      
      toast({
        title: "Booking Request Submitted",
        description: "We'll get back to you within 24 hours to confirm your booking.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error Submitting Booking",
        description: "There was a problem submitting your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section id="booking" className="pt-32 py-20 md:py-28 bg-white dark:bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Book a Session</span>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mt-2 mb-6 dark:text-white">
                Let's Create Together
              </h1>
              <p className="text-neutral dark:text-neutral-light mb-8">
                Ready to capture your special moments? Fill out the form with your details and requirements, and we'll get back to you within 24 hours to discuss your vision.
              </p>
              
              <div className="bg-neutral-light dark:bg-primary-light p-8 rounded-xl mb-8">
                <h3 className="font-playfair text-xl font-bold mb-4 dark:text-white">Why Book With Us</h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <i className="fa-solid fa-check text-secondary mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-montserrat font-semibold dark:text-white">Exceptional Quality</h4>
                      <p className="text-neutral dark:text-neutral-light text-sm">
                        Professional equipment and editing techniques to ensure stunning results.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <i className="fa-solid fa-check text-secondary mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-montserrat font-semibold dark:text-white">Personalized Experience</h4>
                      <p className="text-neutral dark:text-neutral-light text-sm">
                        We take time to understand your vision and create a custom plan.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <i className="fa-solid fa-check text-secondary mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-montserrat font-semibold dark:text-white">Quick Turnaround</h4>
                      <p className="text-neutral dark:text-neutral-light text-sm">
                        Receive your photos and videos faster than industry standard.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <i className="fa-solid fa-check text-secondary mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-montserrat font-semibold dark:text-white">Satisfaction Guarantee</h4>
                      <p className="text-neutral dark:text-neutral-light text-sm">
                        We're not happy until you're thrilled with the results.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <i className="fa-solid fa-phone text-secondary mr-3"></i>
                  <span className="dark:text-white">+254 712 345 678</span>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-envelope text-secondary mr-3"></i>
                  <span className="dark:text-white">bookings@eugineraystudios.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-neutral-light dark:bg-primary-light p-8 rounded-xl shadow-lg">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-dark dark:text-neutral-light">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your first name" 
                              {...field} 
                              className="bg-white dark:bg-primary border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-dark dark:text-neutral-light">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your last name" 
                              {...field} 
                              className="bg-white dark:bg-primary border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-dark dark:text-neutral-light">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              type="email" 
                              {...field} 
                              className="bg-white dark:bg-primary border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-dark dark:text-neutral-light">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+254 7XX XXX XXX" 
                              {...field} 
                              className="bg-white dark:bg-primary border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-neutral-dark dark:text-neutral-light">Service Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-white dark:bg-primary border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary">
                              <SelectValue placeholder="Select Service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding Photography & Videography</SelectItem>
                            <SelectItem value="event">Event Coverage</SelectItem>
                            <SelectItem value="commercial">Commercial & Brand Photography</SelectItem>
                            <SelectItem value="portrait">Portrait Session</SelectItem>
                            <SelectItem value="aerial">Aerial Photography</SelectItem>
                            <SelectItem value="video">Video Production</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-dark dark:text-neutral-light">Preferred Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full text-left font-normal bg-white dark:bg-primary border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-dark dark:text-neutral-light">Location</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Meru, Nairobi" 
                              {...field} 
                              className="bg-white dark:bg-primary border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-neutral-dark dark:text-neutral-light">Additional Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your event or project..." 
                            {...field} 
                            className="bg-white dark:bg-primary border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-neutral-dark dark:text-neutral-light">Estimated Budget (KSh)</FormLabel>
                        <FormControl>
                          <Slider
                            onValueChange={(value) => {
                              setBudget(value[0]);
                              field.onChange(value[0]);
                            }}
                            defaultValue={[budget]}
                            max={200000}
                            min={10000}
                            step={5000}
                            className="py-4"
                          />
                        </FormControl>
                        <div className="flex justify-between text-xs text-neutral dark:text-neutral-light mt-1">
                          <span>KSh 10,000</span>
                          <span>KSh 100,000</span>
                          <span>KSh 200,000+</span>
                        </div>
                        <div className="text-center mt-2">
                          <span className="text-secondary font-semibold">
                            KSh {budget.toLocaleString()}
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="mb-8 flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-neutral-dark dark:text-neutral-light">
                            I agree to the <a href="#" className="text-secondary hover:underline">terms and conditions</a> and consent to being contacted regarding my booking inquiry.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-secondary/90 text-primary font-montserrat font-medium py-6 rounded-full"
                  >
                    Submit Booking Request
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
