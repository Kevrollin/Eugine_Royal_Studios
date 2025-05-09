import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import OfferCard from "./OfferCard";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function OffersHighlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Example offers data - featured offers for the homepage
  const featuredOffers = [
    {
      id: 1,
      title: "Wedding Season Special",
      description: "Complete wedding photography and videography package including pre-wedding shoot, full day coverage, and cinematic highlight film.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      originalPrice: 120000,
      discountedPrice: 96000,
      discount: "20% OFF",
      endsIn: "2023-12-31",
      isNew: false
    },
    {
      id: 2,
      title: "Business Branding Package",
      description: "Comprehensive visual branding package including product photography, team headshots, and a 60-second promotional video.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      originalPrice: 85000,
      discountedPrice: 85000,
      discount: "",
      endsIn: "",
      isNew: true
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
    <section id="offers" className="py-20 md:py-28 bg-primary text-white relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-accent opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Limited Time</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2 mb-6">
            Special Offers
          </h2>
          <p className="text-neutral-light">
            Take advantage of our seasonal promotions and special packages designed to provide exceptional value.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredOffers.map((offer) => (
            <motion.div key={offer.id} variants={itemVariants}>
              <OfferCard 
                title={offer.title}
                description={offer.description}
                image={offer.image}
                originalPrice={offer.originalPrice}
                discountedPrice={offer.discountedPrice}
                discount={offer.discount}
                endsIn={offer.endsIn}
                isNew={offer.isNew}
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
          <Button asChild variant="outline" className="border-2 border-white hover:border-secondary text-white hover:text-secondary font-montserrat font-medium px-8 py-6 rounded-full">
            <Link href="/offers">View All Offers</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
