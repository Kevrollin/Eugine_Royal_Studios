import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary-light py-12 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-playfair text-xl mb-6">Eugine Ray Studios</h3>
            <p className="text-neutral-light mb-6">
              Premium photography and videography services in Meru, Kenya. Transforming moments into cinematic memories since 2017.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-light hover:text-secondary transition-colors" aria-label="Instagram">
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-neutral-light hover:text-secondary transition-colors" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-neutral-light hover:text-secondary transition-colors" aria-label="Twitter">
                <i className="fa-brands fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-neutral-light hover:text-secondary transition-colors" aria-label="YouTube">
                <i className="fa-brands fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-neutral-light hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-neutral-light hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-neutral-light hover:text-secondary transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-neutral-light hover:text-secondary transition-colors">Portfolio</Link></li>
              <li><Link href="/booking" className="text-neutral-light hover:text-secondary transition-colors">Book a Session</Link></li>
              <li><Link href="/contact" className="text-neutral-light hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-neutral-light hover:text-secondary transition-colors">Wedding Photography</Link></li>
              <li><Link href="/services" className="text-neutral-light hover:text-secondary transition-colors">Commercial Photography</Link></li>
              <li><Link href="/services" className="text-neutral-light hover:text-secondary transition-colors">Event Coverage</Link></li>
              <li><Link href="/services" className="text-neutral-light hover:text-secondary transition-colors">Portrait Sessions</Link></li>
              <li><Link href="/services" className="text-neutral-light hover:text-secondary transition-colors">Video Production</Link></li>
              <li><Link href="/services" className="text-neutral-light hover:text-secondary transition-colors">Aerial Photography</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <i className="fa-solid fa-location-dot text-secondary mt-1 mr-3"></i>
                <span className="text-neutral-light">Meru Town, Njuri Street<br />Opposite Landmark Hotel</span>
              </li>
              <li className="flex">
                <i className="fa-solid fa-phone text-secondary mt-1 mr-3"></i>
                <span className="text-neutral-light">+254 712 345 678</span>
              </li>
              <li className="flex">
                <i className="fa-solid fa-envelope text-secondary mt-1 mr-3"></i>
                <span className="text-neutral-light">info@eugineraystudios.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-neutral">
          <p>&copy; {new Date().getFullYear()} Eugine Ray Studios. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <a href="#" className="text-neutral hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="text-neutral hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="text-neutral hover:text-secondary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
