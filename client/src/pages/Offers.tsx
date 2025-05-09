import { useEffect } from "react";
import { motion } from "framer-motion";
import OfferCard from "@/components/offers/OfferCard";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Offers() {
  // Example offers data - in a real application, this would come from an API
  const offers = [
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
    },
    {
      id: 3,
      title: "Family Portrait Special",
      description: "Family portrait session including studio and outdoor shots, 10 edited digital images, and one framed print.",
      image: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      originalPrice: 45000,
      discountedPrice: 38250,
      discount: "15% OFF",
      endsIn: "2023-11-30",
      isNew: false
    },
    {
      id: 4,
      title: "Event Coverage Bundle",
      description: "Full event coverage with two photographers, one videographer, same-day highlight reel, and all edited digital files.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      originalPrice: 70000,
      discountedPrice: 59500,
      discount: "15% OFF",
      endsIn: "2023-12-15",
      isNew: false
    }
  ];

  useEffect(() => {
    document.title = "Special Offers | Eugine Ray Studios";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section id="offers" className="pt-32 py-20 md:py-28 bg-primary text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-accent opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Limited Time</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mt-2 mb-6">
              Special Offers
            </h1>
            <p className="text-neutral-light">
              Take advantage of our seasonal promotions and special packages designed to provide exceptional value.
              Book now to secure these limited-time offers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {offers.map((offer) => (
              <OfferCard 
                key={offer.id}
                title={offer.title}
                description={offer.description}
                image={offer.image}
                originalPrice={offer.originalPrice}
                discountedPrice={offer.discountedPrice}
                discount={offer.discount}
                endsIn={offer.endsIn}
                isNew={offer.isNew}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="border-2 border-white hover:border-secondary text-white hover:text-secondary font-montserrat font-medium px-8 py-6 rounded-full variant-outline">
              <Link href="/booking">Book Now and Save</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">FAQ</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2 mb-6 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral dark:text-neutral-light">
              Get answers to common questions about our special offers and packages.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-neutral-light dark:bg-primary-light p-6 rounded-xl">
              <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white">How long are special offers valid?</h3>
              <p className="text-neutral-dark dark:text-neutral-light">
                Each offer has its own expiration date, which is clearly listed. Once the date passes, the offer is no longer valid, so we recommend booking early.
              </p>
            </div>
            
            <div className="bg-neutral-light dark:bg-primary-light p-6 rounded-xl">
              <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white">Can I combine multiple offers?</h3>
              <p className="text-neutral-dark dark:text-neutral-light">
                Generally, offers cannot be combined with other promotions or discounts unless specifically stated. However, feel free to contact us to discuss your specific needs.
              </p>
            </div>
            
            <div className="bg-neutral-light dark:bg-primary-light p-6 rounded-xl">
              <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white">What is the booking process for special offers?</h3>
              <p className="text-neutral-dark dark:text-neutral-light">
                The booking process is the same as our regular services. Simply fill out the booking form and mention the specific offer you're interested in. We'll confirm availability and process your booking accordingly.
              </p>
            </div>
            
            <div className="bg-neutral-light dark:bg-primary-light p-6 rounded-xl">
              <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white">Is a deposit required?</h3>
              <p className="text-neutral-dark dark:text-neutral-light">
                Yes, a 30% deposit is required to secure your booking for any special offer. The remaining balance is due one week before the scheduled service date.
              </p>
            </div>
            
            <div className="bg-neutral-light dark:bg-primary-light p-6 rounded-xl">
              <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white">What if I need to reschedule?</h3>
              <p className="text-neutral-dark dark:text-neutral-light">
                We understand that plans can change. Please contact us at least 14 days in advance to reschedule. Changes made less than 14 days before your scheduled date may incur additional fees.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
