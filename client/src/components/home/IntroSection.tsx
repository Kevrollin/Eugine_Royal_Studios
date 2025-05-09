import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      id="intro" 
      className="py-20 md:py-28 bg-neutral-light dark:bg-primary-light relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              We bring <span className="text-secondary">stories</span> to life through our lens
            </h2>
            <p className="text-neutral-dark dark:text-neutral-light mb-6">
              At Eugine Ray Studios, we believe every moment deserves to be captured with artistic vision and technical excellence. Founded in Meru, we've grown to become Kenya's premier visual storytelling company.
            </p>
            <p className="text-neutral-dark dark:text-neutral-light mb-8">
              Our team combines local cultural awareness with international cinematography standards to deliver truly unique visual experiences for every client.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary font-montserrat font-medium rounded-full">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild className="bg-primary dark:bg-white text-white dark:text-primary hover:bg-neutral-dark font-montserrat font-medium rounded-full">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="order-1 md:order-2 overflow-hidden rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=900&q=80"
              alt="Professional photographer at work" 
              className="w-full h-auto rounded-xl shadow-lg cinematic-hover"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>
    </section>
  );
}
