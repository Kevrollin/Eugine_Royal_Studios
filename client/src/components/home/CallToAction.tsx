import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      className="py-20 md:py-28 bg-primary text-white relative overflow-hidden"
      ref={ref}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80"
          alt="Dramatic Kenyan landscape at sunset" 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="font-playfair text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Ready to capture your <span className="text-secondary">story</span>?
          </motion.h2>
          <motion.p 
            className="text-neutral-light text-lg mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Let's collaborate to create visual memories that will last a lifetime. Book your session today and experience the Eugine Ray difference.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-primary font-montserrat font-medium px-8 py-6 rounded-full">
              <Link href="/booking">Book a Session</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-2 border-white hover:border-secondary text-white hover:text-secondary font-montserrat font-medium px-8 py-6 rounded-full">
              <Link href="/portfolio">Explore Our Work</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
