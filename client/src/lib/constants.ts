// Services offered by the studio
export const SERVICES = [
  {
    id: 1,
    name: "Wedding Photography & Films",
    slug: "wedding",
    description: "Preserve your special day with our award-winning wedding coverage that captures both grand moments and intimate details.",
    features: [
      "Full day coverage options",
      "Cinematic highlight films",
      "Drone aerial coverage"
    ]
  },
  {
    id: 2,
    name: "Commercial & Fashion",
    slug: "commercial",
    description: "Elevate your brand with compelling visuals that command attention and communicate your unique story.",
    features: [
      "Product photography",
      "Model portfolios",
      "Brand campaign creation"
    ]
  },
  {
    id: 3,
    name: "Event Coverage",
    slug: "events",
    description: "From corporate gatherings to cultural celebrations, we document your events with style and precision.",
    features: [
      "Corporate events",
      "Concerts & performances",
      "Multi-camera setups"
    ]
  },
  {
    id: 4,
    name: "Portrait Sessions",
    slug: "portrait",
    description: "Capture your personality with professional portrait photography that brings out your best features and true character.",
    features: [
      "Individual portraits",
      "Family portraits",
      "Studio or location options"
    ]
  },
  {
    id: 5,
    name: "Aerial Photography",
    slug: "aerial",
    description: "See your world from a different perspective with stunning drone photography and videography services.",
    features: [
      "Property aerial views",
      "Landscape cinematography",
      "Special event aerial coverage"
    ]
  },
  {
    id: 6,
    name: "Video Production",
    slug: "video",
    description: "Tell your story through professional video production with cinematic quality and compelling narrative.",
    features: [
      "Corporate videos",
      "Documentary filmmaking",
      "Music videos and promotional content"
    ]
  }
];

// Studio contact information
export const CONTACT_INFO = {
  phone: "+254 712 345 678",
  email: "info@eugineraystudios.com",
  bookingEmail: "bookings@eugineraystudios.com",
  address: {
    street: "Njuri Street",
    city: "Meru Town",
    landmark: "Opposite Landmark Hotel",
    country: "Kenya"
  },
  hours: {
    weekdays: "9am - 6pm",
    saturday: "10am - 4pm",
    sunday: "By appointment"
  },
  social: {
    instagram: "https://instagram.com/eugineraystudios",
    facebook: "https://facebook.com/eugineraystudios",
    twitter: "https://twitter.com/eugineraystudios",
    youtube: "https://youtube.com/eugineraystudios"
  }
};

// Budget range for booking form
export const BUDGET_RANGE = {
  min: 10000,
  max: 200000,
  step: 5000,
  default: 50000
};
