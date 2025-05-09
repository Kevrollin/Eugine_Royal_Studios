import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type GalleryCategory = "all" | "wedding" | "commercial" | "events" | "portrait";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: GalleryCategory;
  isVideo?: boolean;
  videoUrl?: string;
}

export default function PortfolioPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");

  // Featured gallery items (subset of full portfolio)
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Sara & David's Wedding",
      description: "Traditional Ceremony, Meru",
      image: "https://images.unsplash.com/photo-1560364897-91578ff41817?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "wedding"
    },
    {
      id: 2,
      title: "Savanna Breeze Campaign",
      description: "Product Photography",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "commercial"
    },
    {
      id: 3,
      title: "Meru Cultural Festival",
      description: "Annual Celebration",
      image: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "events"
    },
    {
      id: 4,
      title: "Heritage Series",
      description: "Fine Art Portraits",
      image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "portrait"
    },
    {
      id: 5,
      title: "Urban Elegance",
      description: "Fashion Editorial",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "commercial"
    },
    {
      id: 6,
      title: "James & Lisa",
      description: "Destination Wedding",
      image: "https://pixabay.com/get/g1b3e71f7f37c9b79224f8f6f660b9b81eeb22df1f3f7da5665a87bcba27f1cbd32ff472b8e15b0ec91fa5274e56cceaafebb924aa4526a13aa1a5ff4e48a1b16_1280.jpg",
      category: "wedding"
    }
  ];

  // Filter items based on active category
  const filteredItems = galleryItems.filter(item => 
    activeFilter === "all" || item.category === activeFilter
  );

  const handleFilterChange = (category: GalleryCategory) => {
    setActiveFilter(category);
  };

  const filters: { label: string; value: GalleryCategory }[] = [
    { label: "All Work", value: "all" },
    { label: "Weddings", value: "wedding" },
    { label: "Commercial", value: "commercial" },
    { label: "Events", value: "events" },
    { label: "Portraits", value: "portrait" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="portfolio" className="py-20 md:py-28 bg-neutral-light dark:bg-primary-light" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Our Work</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2 mb-6 dark:text-white">
            Featured Portfolio
          </h2>
          <p className="text-neutral dark:text-neutral-light mb-8">
            Browse through our collection of visual stories that showcase our artistic approach and technical expertise.
          </p>
          
          {/* Portfolio Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`py-2 px-4 rounded-full font-montserrat text-sm transition-colors ${
                  activeFilter === filter.value
                    ? "bg-secondary text-primary"
                    : "bg-white dark:bg-primary border border-neutral/20 text-neutral-dark dark:text-white hover:bg-secondary hover:text-primary"
                }`}
                onClick={() => handleFilterChange(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Portfolio Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              className="rounded-xl overflow-hidden shadow-lg relative group"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <img 
                      src={item.image}
                      alt={item.title} 
                      className="w-full h-72 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <h3 className="font-playfair text-xl text-white mb-1">{item.title}</h3>
                      <p className="text-neutral-light text-sm mb-3">{item.description}</p>
                      <span className="text-secondary font-montserrat text-sm hover:underline">View Gallery</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] p-0 bg-neutral-light dark:bg-primary overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto"
                  />
                  <div className="p-6">
                    <h3 className="font-playfair text-2xl font-bold mb-2 dark:text-white">{item.title}</h3>
                    <p className="text-neutral dark:text-neutral-light">{item.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button asChild variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary font-montserrat font-medium px-8 py-6 rounded-full">
            <Link href="/portfolio">View Complete Portfolio</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
