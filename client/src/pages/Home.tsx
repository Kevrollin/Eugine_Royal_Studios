import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import ServicesList from "@/components/home/ServicesList";
import TestimonialSection from "@/components/home/TestimonialSection";
import OffersHighlight from "@/components/offers/OffersHighlight";
import CallToAction from "@/components/home/CallToAction";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    document.title = "Eugine Ray Studios | Premium Photography & Videography | Meru, Kenya";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <IntroSection />
      <ServicesList />
      <PortfolioPreview />
      <TestimonialSection />
      <OffersHighlight />
      <CallToAction />
    </motion.div>
  );
}
