import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Cinematic view of Kenya" 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="relative h-full z-10 flex items-center px-4 md:px-12 lg:px-16">
        <div className="max-w-5xl">
          <motion.h1 
            className="font-playfair text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Capturing <span className="text-secondary">moments</span> with cinematic excellence
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-neutral-light max-w-2xl mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Premium photography and videography services in Meru, Kenya. We transform ordinary moments into extraordinary memories.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-primary font-montserrat font-medium px-8 py-6 rounded-full">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-2 border-white hover:border-secondary text-white hover:text-secondary font-montserrat font-medium px-8 py-6 rounded-full">
              <Link href="/booking">Book a Session</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a href="#intro" className="text-white opacity-70 hover:opacity-100 transition-opacity animate-bounce inline-block">
          <i className="fa-solid fa-chevron-down text-2xl"></i>
        </a>
      </motion.div>
    </section>
  );
}
