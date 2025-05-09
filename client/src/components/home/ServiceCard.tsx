import { Link } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
}

export default function ServiceCard({ title, description, image, alt, features }: ServiceCardProps) {
  return (
    <div className="bg-neutral-light dark:bg-primary-light rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
      <div className="h-48 overflow-hidden">
        <img 
          src={image}
          alt={alt} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white group-hover:text-secondary transition-colors">
          {title}
        </h3>
        <p className="text-neutral dark:text-neutral-light mb-4">
          {description}
        </p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-neutral-dark dark:text-neutral-light">
              <i className="fa-solid fa-circle-check text-secondary mr-2"></i>
              {feature}
            </li>
          ))}
        </ul>
        <Link href="/booking" className="inline-block text-secondary font-montserrat hover:underline">
          Book This Service <i className="fa-solid fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </div>
  );
}
