import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Types
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

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Gallery items data
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
    },
    {
      id: 7,
      title: "Corporate Launch",
      description: "Event Photography",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "events"
    },
    {
      id: 8,
      title: "Nairobi Dawn",
      description: "Cityscape Series",
      image: "https://images.unsplash.com/photo-1611144727915-ef30a08aaeb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "commercial"
    },
    {
      id: 9,
      title: "Family Portraits",
      description: "Multi-Generation Photography",
      image: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "portrait"
    },
    {
      id: 10,
      title: "Masai Mara Safari",
      description: "Wildlife Documentary",
      image: "https://images.unsplash.com/photo-1547970827-3fbe092ab561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "commercial",
      isVideo: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 11,
      title: "Corporate Headshots",
      description: "Executive Team Portraits",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "portrait"
    },
    {
      id: 12,
      title: "Music Festival",
      description: "Live Performance Coverage",
      image: "https://images.unsplash.com/photo-1468234847176-28606331216a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      category: "events",
      isVideo: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
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

      {/* Portfolio Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              layout
              className="rounded-xl overflow-hidden shadow-lg relative group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <img 
                      src={item.image}
                      alt={item.title} 
                      className="w-full h-72 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <h3 className="font-playfair text-xl text-white mb-1">{item.title}</h3>
                      <p className="text-neutral-light text-sm mb-3">{item.description}</p>
                      <span className="text-secondary font-montserrat text-sm hover:underline">
                        {item.isVideo ? "Watch Video" : "View Gallery"}
                      </span>
                    </div>
                    {item.isVideo && (
                      <div className="absolute top-4 right-4 bg-secondary text-primary rounded-full w-10 h-10 flex items-center justify-center">
                        <i className="fa-solid fa-play"></i>
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] p-0 bg-neutral-light dark:bg-primary overflow-hidden">
                  {item.isVideo ? (
                    <div className="w-full aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={item.videoUrl}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-auto"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-playfair text-2xl font-bold mb-2 dark:text-white">{item.title}</h3>
                    <p className="text-neutral dark:text-neutral-light">{item.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
