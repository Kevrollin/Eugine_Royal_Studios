import { useEffect } from "react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/home/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
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
    },
    {
      id: 4,
      title: "Portrait Sessions",
      description: "Capture your personality with professional portrait photography that brings out your best features and true character.",
      image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Portrait Photography",
      features: [
        "Individual portraits",
        "Family portraits",
        "Studio or location options"
      ]
    },
    {
      id: 5,
      title: "Aerial Photography",
      description: "See your world from a different perspective with stunning drone photography and videography services.",
      image: "https://images.unsplash.com/photo-1533310266094-8898a03807dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Aerial Photography",
      features: [
        "Property aerial views",
        "Landscape cinematography",
        "Special event aerial coverage"
      ]
    },
    {
      id: 6,
      title: "Video Production",
      description: "Tell your story through professional video production with cinematic quality and compelling narrative.",
      image: "https://images.unsplash.com/photo-1540655037529-dec987208707?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Video Production",
      features: [
        "Corporate videos",
        "Documentary filmmaking",
        "Music videos and promotional content"
      ]
    }
  ];

  useEffect(() => {
    document.title = "Services | Eugine Ray Studios";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="pt-32 pb-20 bg-white dark:bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">What We Offer</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mt-2 mb-6 dark:text-white">
              Our Professional Services
            </h1>
            <p className="text-neutral dark:text-neutral-light mb-8">
              From intimate weddings to commercial campaigns, we provide comprehensive visual solutions tailored to your specific needs,
              all with our signature cinematic quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                alt={service.alt}
                features={service.features}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-primary rounded-full px-8 py-6 font-montserrat font-medium">
              <Link href="/booking">
                <i className="fa-regular fa-calendar mr-2"></i> Schedule a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
