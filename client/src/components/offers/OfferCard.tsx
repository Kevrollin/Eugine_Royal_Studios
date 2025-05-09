import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface OfferCardProps {
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  endsIn: string;
  isNew: boolean;
}

export default function OfferCard({
  title,
  description,
  image,
  originalPrice,
  discountedPrice,
  discount,
  endsIn,
  isNew,
}: OfferCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  
  // Calculate time left for offer expiration
  useEffect(() => {
    if (!endsIn) return;
    
    const calculateTimeLeft = () => {
      const endDate = new Date(endsIn);
      const now = new Date();
      
      // If the offer has expired
      if (endDate <= now) {
        setTimeLeft("Expired");
        return;
      }
      
      const diff = endDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      setTimeLeft(`${days} days`);
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 86400000); // Update every day
    
    return () => clearInterval(timer);
  }, [endsIn]);
  
  return (
    <div className="bg-primary-light rounded-xl overflow-hidden shadow-lg border border-white/10 relative group">
      {/* Display discount or NEW tag if applicable */}
      {discount && (
        <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full font-montserrat text-sm font-medium z-10">
          {discount}
        </div>
      )}
      
      {isNew && (
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full font-montserrat text-sm font-medium z-10">
          NEW
        </div>
      )}
      
      <div className="h-48 overflow-hidden">
        <img 
          src={image}
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-playfair text-xl font-bold mb-3 text-white">
          {title}
        </h3>
        <p className="text-neutral-light mb-4">
          {description}
        </p>
        
        <div className="flex justify-between items-end mb-6">
          <div>
            {originalPrice !== discountedPrice && (
              <span className="text-neutral-light text-sm line-through">
                KSh {originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-secondary font-bold text-2xl block">
              KSh {discountedPrice.toLocaleString()}
            </span>
          </div>
          
          {endsIn && (
            <div className="text-neutral-light text-sm">
              <i className="fa-regular fa-clock mr-1"></i> Ends in:
              <span className="countdown font-montserrat ml-1">{timeLeft}</span>
            </div>
          )}
          
          {isNew && !endsIn && (
            <div className="text-neutral-light text-sm">
              <i className="fa-solid fa-tag mr-1"></i> Launch Promo
            </div>
          )}
        </div>
        
        <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-primary font-montserrat font-medium py-3 rounded-full">
          <Link href="/booking">Book This Offer</Link>
        </Button>
      </div>
    </div>
  );
}
