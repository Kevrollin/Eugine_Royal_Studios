import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Eugine Ray Studios";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section id="about" className="pt-32 py-20 md:py-28 bg-neutral-light dark:bg-primary-light">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Our Story</span>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mt-2 mb-6 dark:text-white">
                The Team Behind the Lens
              </h1>
              <p className="text-neutral-dark dark:text-neutral-light mb-4">
                Eugine Ray Studios was founded in 2017 by Eugine Mwangi, a passionate photographer with a vision to elevate visual storytelling in Kenya. What began as a one-person operation has grown into a team of talented creatives dedicated to capturing life's moments with cinematic quality.
              </p>
              <p className="text-neutral-dark dark:text-neutral-light mb-6">
                Based in the beautiful landscapes of Meru, we draw inspiration from Kenya's rich cultural heritage and stunning natural environments. Our team combines traditional storytelling with modern cinematography techniques to create visual narratives that resonate.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary mr-4">
                    <i className="fa-solid fa-camera text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-playfair font-bold dark:text-white">500+</h4>
                    <p className="text-neutral dark:text-neutral-light">Photo Shoots</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary mr-4">
                    <i className="fa-solid fa-video text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-playfair font-bold dark:text-white">200+</h4>
                    <p className="text-neutral dark:text-neutral-light">Video Projects</p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="bg-primary dark:bg-white text-white dark:text-primary hover:bg-neutral-dark dark:hover:bg-neutral-light rounded-full font-montserrat font-medium">
                <Link href="/contact">Get to Know Us</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Team member image 1 */}
              <img 
                src="https://images.unsplash.com/photo-1552642986-ccb41e7059e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80"
                alt="Eugine, Lead Photographer" 
                className="w-full h-auto rounded-xl shadow-lg mb-4 cinematic-hover"
              />
              
              {/* Team member image 2 */}
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80"
                alt="Wanjiru, Lead Videographer" 
                className="w-full h-auto rounded-xl shadow-lg mt-8 cinematic-hover"
              />
              
              {/* Team member image 3 */}
              <img 
                src="https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80"
                alt="Our Team at Work" 
                className="w-full h-auto rounded-xl shadow-lg col-span-2 cinematic-hover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white dark:bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Our Philosophy</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2 mb-6 dark:text-white">
              Our Approach to Visual Storytelling
            </h2>
            <p className="text-neutral dark:text-neutral-light">
              We believe that every image should tell a story and evoke emotion. Our work is guided by these core principles.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-neutral-light dark:bg-primary-light p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="fa-solid fa-eye text-secondary text-xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white">Artistic Vision</h3>
              <p className="text-neutral dark:text-neutral-light">
                We approach each project with a unique artistic perspective, finding beauty in unexpected moments and angles.
              </p>
            </div>
            
            <div className="bg-neutral-light dark:bg-primary-light p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="fa-solid fa-lightbulb text-secondary text-xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white">Technical Excellence</h3>
              <p className="text-neutral dark:text-neutral-light">
                We combine artistic vision with technical precision, using professional equipment and advanced techniques.
              </p>
            </div>
            
            <div className="bg-neutral-light dark:bg-primary-light p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="fa-solid fa-heart text-secondary text-xl"></i>
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3 dark:text-white">Authentic Connection</h3>
              <p className="text-neutral dark:text-neutral-light">
                We build genuine relationships with our clients to understand their vision and create meaningful visual stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-neutral-light dark:bg-primary-light">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-montserrat uppercase tracking-wider text-sm">Meet The Team</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2 mb-6 dark:text-white">
              The Creative Minds
            </h2>
            <p className="text-neutral dark:text-neutral-light">
              Our diverse team of passionate professionals brings unique skills and perspectives to every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-primary p-6 rounded-xl overflow-hidden shadow-md">
              <div className="h-64 overflow-hidden rounded-lg mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1552642986-ccb41e7059e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
                  alt="Eugine Mwangi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-2 dark:text-white">Eugine Mwangi</h3>
              <p className="text-secondary font-montserrat text-sm mb-3">Founder & Lead Photographer</p>
              <p className="text-neutral dark:text-neutral-light text-sm">
                With over 10 years of experience, Eugine brings artistic vision and technical expertise to every shoot.
              </p>
            </div>
            
            <div className="bg-white dark:bg-primary p-6 rounded-xl overflow-hidden shadow-md">
              <div className="h-64 overflow-hidden rounded-lg mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
                  alt="Wanjiru Kamau" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-2 dark:text-white">Wanjiru Kamau</h3>
              <p className="text-secondary font-montserrat text-sm mb-3">Lead Videographer</p>
              <p className="text-neutral dark:text-neutral-light text-sm">
                Wanjiru's background in film brings cinematic storytelling to our video productions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-primary p-6 rounded-xl overflow-hidden shadow-md">
              <div className="h-64 overflow-hidden rounded-lg mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
                  alt="Daniel Ochieng" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-2 dark:text-white">Daniel Ochieng</h3>
              <p className="text-secondary font-montserrat text-sm mb-3">Creative Director</p>
              <p className="text-neutral dark:text-neutral-light text-sm">
                Daniel's eye for detail and creative direction ensures every project exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
