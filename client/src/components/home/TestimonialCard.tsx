interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

export default function TestimonialCard({ quote, name, role, imageSrc }: TestimonialCardProps) {
  return (
    <div className="bg-neutral-light dark:bg-primary-light p-8 rounded-xl shadow-md">
      <div className="text-secondary mb-4">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
      <p className="text-neutral-dark dark:text-neutral-light italic mb-6">
        "{quote}"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={imageSrc}
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-montserrat font-semibold dark:text-white">{name}</h4>
          <p className="text-sm text-neutral dark:text-neutral-light">{role}</p>
        </div>
      </div>
    </div>
  );
}
