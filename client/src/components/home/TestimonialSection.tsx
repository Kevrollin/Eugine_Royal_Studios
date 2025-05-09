import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const testimonials = [
    {
      id: 1,
      quote: "Eugine and his team captured our wedding day perfectly. The cinematic approach brought a magical quality to our photos and video that we'll cherish forever.",
      name: "Sarah M.",
      role: "Wedding Client",
      imageSrc: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: 2,
      quote: "Our product campaign exceeded all expectations thanks to Eugine Ray Studios. Their attention to detail and creative direction transformed our brand image completely.",
      name: "Daniel K.",
      role: "Marketing Director",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: 3,
      quote: "The team at Eugine Ray Studios documented our cultural festival with such respect and artistic vision. They captured the spirit of our community beautifully.",
      name: "Amina J.",
      role: "Event Organizer",
      imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
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
    <section className="py-20 md:py-28 bg-white dark:bg-primary" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Client Testimonials</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2 mb-6 dark:text-white">
            What Our Clients Say
          </h2>
          <p className="text-neutral dark:text-neutral-light">
            We take pride in exceeding expectations and creating lasting relationships with our clients. Here's what some of them have to say.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {testimonials.map(testimonial => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <TestimonialCard 
                  quote={testimonial.quote}
                  name={testimonial.name}
                  role={testimonial.role}
                  imageSrc={testimonial.imageSrc}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
