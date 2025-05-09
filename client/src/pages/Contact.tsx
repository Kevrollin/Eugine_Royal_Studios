import { useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

// Define the contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Contact Us | Eugine Ray Studios";
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await apiRequest("POST", "/api/contact", data);
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again.",
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
      <section id="contact" className="pt-32 py-20 md:py-28 bg-neutral-light dark:bg-primary-light relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Get In Touch</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mt-2 mb-6 dark:text-white">
              Contact Us
            </h1>
            <p className="text-neutral dark:text-neutral-light">
              Have questions or need more information? Reach out to us through any of the channels below or visit our studio in Meru.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              {/* Map */}
              <div className="h-80 rounded-xl overflow-hidden mb-8 shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8184969248937!2d37.6462139!3d0.0461312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDInNDYuMSJOIDM3wrAzOCc0Ni40IkU!5e0!3m2!1sen!2ske!4v1628147289123!5m2!1sen!2ske"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  className="grayscale dark:brightness-75"
                  title="Eugine Ray Studios Location"
                ></iframe>
              </div>
              
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-primary p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <i className="fa-solid fa-location-dot text-secondary text-xl"></i>
                  </div>
                  <h3 className="font-playfair font-bold mb-2 dark:text-white">Studio Location</h3>
                  <p className="text-neutral dark:text-neutral-light">
                    Meru Town, Njuri Street<br />
                    Opposite Landmark Hotel<br />
                    Kenya
                  </p>
                </div>
                
                <div className="bg-white dark:bg-primary p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <i className="fa-solid fa-phone text-secondary text-xl"></i>
                  </div>
                  <h3 className="font-playfair font-bold mb-2 dark:text-white">Phone & Email</h3>
                  <p className="text-neutral dark:text-neutral-light">
                    +254 712 345 678<br />
                    info@eugineraystudios.com
                  </p>
                </div>
                
                <div className="bg-white dark:bg-primary p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <i className="fa-regular fa-clock text-secondary text-xl"></i>
                  </div>
                  <h3 className="font-playfair font-bold mb-2 dark:text-white">Working Hours</h3>
                  <p className="text-neutral dark:text-neutral-light">
                    Monday-Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: By appointment
                  </p>
                </div>
                
                <div className="bg-white dark:bg-primary p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <i className="fa-solid fa-share-nodes text-secondary text-xl"></i>
                  </div>
                  <h3 className="font-playfair font-bold mb-2 dark:text-white">Social Media</h3>
                  <div className="flex gap-3">
                    <a href="#" className="w-8 h-8 rounded-full bg-neutral-light dark:bg-primary-light flex items-center justify-center text-neutral-dark dark:text-white hover:bg-secondary hover:text-primary transition-colors">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-neutral-light dark:bg-primary-light flex items-center justify-center text-neutral-dark dark:text-white hover:bg-secondary hover:text-primary transition-colors">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-neutral-light dark:bg-primary-light flex items-center justify-center text-neutral-dark dark:text-white hover:bg-secondary hover:text-primary transition-colors">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-neutral-light dark:bg-primary-light flex items-center justify-center text-neutral-dark dark:text-white hover:bg-secondary hover:text-primary transition-colors">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {/* Contact Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white dark:bg-primary p-8 rounded-xl shadow-lg">
                  <h3 className="font-playfair text-xl font-bold mb-6 dark:text-white">Send Us a Message</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-neutral-dark dark:text-neutral-light">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your full name" 
                            {...field} 
                            className="bg-neutral-light dark:bg-primary-light border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-neutral-dark dark:text-neutral-light">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            type="email" 
                            {...field} 
                            className="bg-neutral-light dark:bg-primary-light border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-neutral-dark dark:text-neutral-light">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What is this regarding?" 
                            {...field} 
                            className="bg-neutral-light dark:bg-primary-light border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-neutral-dark dark:text-neutral-light">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message here..." 
                            rows={5}
                            {...field} 
                            className="bg-neutral-light dark:bg-primary-light border border-neutral/20 dark:border-white/10 focus:ring-2 focus:ring-secondary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-secondary/90 text-primary font-montserrat font-medium py-6 rounded-full"
                  >
                    Send Message
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
