import { useEffect } from "react";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { motion } from "framer-motion";

export default function Portfolio() {
  useEffect(() => {
    document.title = "Portfolio | Eugine Ray Studios";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="pt-32 pb-20 bg-neutral-light dark:bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Our Work</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mt-2 mb-6 dark:text-white">
              Our Portfolio
            </h1>
            <p className="text-neutral dark:text-neutral-light mb-6">
              Browse through our collection of visual stories that showcase our artistic approach and technical expertise.
              Each project tells a unique story with our signature cinematic quality.
            </p>
          </div>
          
          <PortfolioGallery />
          
        </div>
      </section>
    </motion.div>
  );
}
