import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ServiceCard from "./ServiceCard";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ServicesList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const services = [
    {
      id: 1,
      title: "Wedding Photography & Films",
      description: "Preserve your special day with our award-winning wedding coverage that captures both grand moments and intimate details.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Wedding Photography in Kenya",
      features: [
        "Full day coverage options",
        "Cinematic highlight films",
        "Drone aerial coverage"
      ]
    },
    {
      id: 2,
      title: "Commercial & Fashion",
      description: "Elevate your brand with compelling visuals that command attention and communicate your unique story.",
      image: "https://pixabay.com/get/g9a4abcb9e66cfc1a6390d9859876fe38189e9da559ea5414787b64e90b3ecb80cd3a27447172247ae85dc0242b8d5a961643ea7eca2063f1a3f319d486981759_1280.jpg",
      alt: "Commercial and Fashion Photography",
      features: [
        "Product photography",
        "Model portfolios",
        "Brand campaign creation"
      ]
    },
    {
      id: 3,
      title: "Event Coverage",
      description: "From corporate gatherings to cultural celebrations, we document your events with style and precision.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Event Coverage",
      features: [
        "Corporate events",
        "Concerts & performances",
        "Multi-camera setups"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white dark:bg-primary relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">What We Offer</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2 mb-6 dark:text-white">
            Our Premium Services
          </h2>
          <p className="text-neutral dark:text-neutral-light">
            From intimate weddings to commercial campaigns, we provide comprehensive visual solutions tailored to your specific needs, all with our signature cinematic quality.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard 
                title={service.title}
                description={service.description}
                image={service.image}
                alt={service.alt}
                features={service.features}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-primary font-montserrat font-medium px-8 py-6 rounded-full">
            <Link href="/services">
              <i className="fa-solid fa-plus mr-2"></i> View All Services
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
