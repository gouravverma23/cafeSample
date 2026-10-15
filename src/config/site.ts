export interface MenuItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Teas & Cold Brews' | 'Bakery & Pastries' | 'Artisanal Bites';
  price: number;
  description: string;
  originOrHighlight?: string;
  dietary?: 'Vegetarian' | 'Vegan' | 'Contains Nuts' | 'Gluten-Free';
  isSignature?: boolean;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  review: string;
  source: 'Google Review' | 'Verified Guest';
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  aspect: 'square' | 'portrait' | 'landscape';
  image: string;
}

export const siteConfig = {
  name: "The Daily Grind",
  tagline: "Artisanal Coffee & Slow Living",
  subheading: "Single-origin beans, house-laminated viennoiserie, and an intentional pause in the rhythm of your day.",
  establishedYear: 2021,
  
  contact: {
    phone: "+91 98765 43210",
    phoneDisplay: "+91 98765 43210",
    email: "concierge@thedailygrind.cafe",
    address: "Plot 42, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
    directionsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.495080970034!2d78.40456107579169!3d17.436028001397858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96b42b936d59%3A0x6b77202ee19a27b8!2sRoad%20No.%2036%2C%20Jubilee%20Hills%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",
    whatsappNumber: "919876543210",
    whatsappPrefilledMessage: "Hello The Daily Grind! I'd like to ask about today's roast / reserve a table.",
  },

  socials: {
    instagram: "https://instagram.com/thedailygrind",
    instagramHandle: "@thedailygrind.cafe",
    facebook: "https://facebook.com/thedailygrind",
    googleReview: "https://search.google.com/local/writereview?placeid=ChIJW22T-7WWyzsRuCeazz4gd2s",
  },

  hours: [
    { days: "Monday – Friday", hours: "08:00 AM – 09:30 PM", note: "Espresso Bar & Bakery open early" },
    { days: "Saturday & Sunday", hours: "08:30 AM – 10:30 PM", note: "Weekend Tasting Flight available" },
  ],

  stats: [
    { value: "100%", label: "Direct-Trade Indian Arabica" },
    { value: "48 hr", label: "Slow Cold Extraction" },
    { value: "4.9 ★", label: "Google Rating (620+ Reviews)" },
  ],

  story: {
    kicker: "The Philosophy",
    title: "Brewed with intention, served with stillness.",
    paragraph1: "The Daily Grind was conceived in 2021 as an antidote to rushing. We believe the cup you hold in your hands should be more than a morning utility—it is a conscious sensory ritual.",
    paragraph2: "We partner exclusively with multi-generational estates nestled in the shade-grown mist of Chikmagalur and the Baba Budan Giri ranges. Every single lot is roasted in small batches on our cast-iron drum roaster to celebrate the terroir of South Indian specialty coffee.",
    features: [
      {
        title: "Ethical Direct Trade",
        desc: "Paying 35% above fair-market baseline directly to grower families in Karnataka and Araku Valley."
      },
      {
        title: "Micro-Batch Roasting",
        desc: "Weekly profiles adjusted for humidity and roast date to extract optimal floral sweetness."
      },
      {
        title: "House Viennoiserie",
        desc: "Hand-laminated sourdough pastry using churned Normandy-style butter baked fresh every 4 hours."
      }
    ]
  },

  categories: ['All', 'Coffee', 'Teas & Cold Brews', 'Bakery & Pastries', 'Artisanal Bites'] as const,

  menu: [
    {
      id: "c1",
      name: "Signature Cortado",
      category: "Coffee",
      price: 240,
      description: "Equal proportions of vibrant double-shot espresso cut with lightly textured, velvety microfoam in a faceted glass.",
      originOrHighlight: "Chikmagalur Washed Arabica",
      isSignature: true,
      image: "https://images.unsplash.com/photo-1534706936160-d5ee67737049?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "c2",
      name: "Iced Sea Salt Vanilla Latte",
      category: "Coffee",
      price: 290,
      description: "Slow-steeped Madagascar vanilla, chilled whole milk, espresso float, finished with hand-harvested flaky pink salt.",
      originOrHighlight: "Customer Favorite",
      isSignature: true,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "c3",
      name: "Single Origin Pour-Over (V60)",
      category: "Coffee",
      price: 260,
      description: "Manual gravity brew with notes of jasmine blossom, candied orange zest, and crisp blackcurrant finish.",
      originOrHighlight: "Attikan Estate Micro-Lot",
      dietary: "Vegan",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "c4",
      name: "Flat White Velvet",
      category: "Coffee",
      price: 250,
      description: "A ristretto double shot crowned with glossy micro-foam, offering intense cacao and hazelnut undertones.",
      originOrHighlight: "Medium Dark Roast",
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "t1",
      name: "Hibiscus & Rose Cold Steep",
      category: "Teas & Cold Brews",
      price: 230,
      description: "Wild organic Nilgiri hibiscus flowers cold-brewed for 16 hours with Damascus rose petals and orange peel.",
      originOrHighlight: "Naturally Caffeine Free",
      dietary: "Vegan",
      isSignature: true,
      image: "https://images.unsplash.com/photo-1595854271872-690a0ef15c0e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "t2",
      name: "Cascara Sparkling Elixir",
      category: "Teas & Cold Brews",
      price: 240,
      description: "Sun-dried coffee cherry tea brewed chilled, infused with fresh lime zest and carbonated mountain spring water.",
      originOrHighlight: "Zero Waste Coffee Craft",
      dietary: "Vegan",
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "t3",
      name: "Matcha Ceremonial Cloud",
      category: "Teas & Cold Brews",
      price: 310,
      description: "First-harvest stone-ground Uji matcha whisked with oat milk and topped with sea salt sweet foam.",
      originOrHighlight: "Authentic Kyoto Import",
      dietary: "Vegetarian",
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "b1",
      name: "Almond Frangipane Croissant",
      category: "Bakery & Pastries",
      price: 210,
      description: "Twice-baked butter croissant filled with house-whipped almond cream, toasted sliced almonds, and powdered sugar.",
      originOrHighlight: "Baked Fresh at 8 AM & 2 PM",
      dietary: "Contains Nuts",
      isSignature: true,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "b2",
      name: "Dark Chocolate Babka Twist",
      category: "Bakery & Pastries",
      price: 220,
      description: "Enriched brioche ribbons braided with 70% Single-Estate Kerala dark chocolate and cinnamon simple syrup.",
      originOrHighlight: "Belgian Cacao & Kerala Beans",
      dietary: "Vegetarian",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "b3",
      name: "Pistachio Rose Morning Bun",
      category: "Bakery & Pastries",
      price: 240,
      description: "Caramelized croissant dough spiraled with crushed Iranian pistachio and rose blossom brown butter.",
      originOrHighlight: "Crispy Caramelized Base",
      dietary: "Contains Nuts",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "s1",
      name: "Heirloom Avocado Sourdough",
      category: "Artisanal Bites",
      price: 330,
      description: "Wild yeast rustic sourdough loaf with crushed Hass avocado, marinated cherry tomatoes, hemp seeds, and chili oil.",
      originOrHighlight: "36-Hour Sourdough Ferment",
      dietary: "Vegan",
      isSignature: true,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "s2",
      name: "Smoked Burrata & Fig Tartine",
      category: "Artisanal Bites",
      price: 370,
      description: "Creamy artisanal burrata, honeyed mission figs, baby arugula, aged balsamic drizzle on toasted brioche.",
      originOrHighlight: "Local Artisanal Dairy",
      dietary: "Vegetarian",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
    }
  ] as MenuItem[],

  gallery: [
    {
      id: "g1",
      title: "Espresso Extraction",
      caption: "Precision 9-bar pressure on our La Marzocco machine",
      aspect: "portrait",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=900"
    },
    {
      id: "g2",
      title: "The Sunlit Sunken Lounge",
      caption: "Minimalist warm oak seating bathed in morning light",
      aspect: "landscape",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "g3",
      title: "Hand-Crafted Pour Over",
      caption: "Single-origin tasting profiles brewed by our baristas",
      aspect: "square",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "g4",
      title: "Fresh Morning Viennoiserie",
      caption: "Butter croissants hot out of the deck oven at 8:00 AM",
      aspect: "square",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "g5",
      title: "Community Table & Coffee Library",
      caption: "A quiet space designed for remote work and thoughtful reading",
      aspect: "portrait",
      image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=900"
    },
    {
      id: "g6",
      title: "Outdoor Courtyard",
      caption: "Surrounded by native palms and terracotta planters",
      aspect: "landscape",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200"
    }
  ] as GalleryItem[],

  reviews: [
    {
      id: "r1",
      author: "Aditi Ramanathan",
      role: "Architect & Regular",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "2 days ago",
      review: "The Cortado here is genuinely the most balanced in the city. You can actually taste the floral notes in their Chikmagalur lot. The space has incredible natural light and zero chaotic rush.",
      source: "Google Review"
    },
    {
      id: "r2",
      author: "Vikram Sengupta",
      role: "Specialty Coffee Enthusiast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "1 week ago",
      review: "Finally a café that takes water chemistry and roast dates seriously. Their V60 single origin was immaculate. Plus the almond croissant actually flakes into a hundred layers like in Paris.",
      source: "Google Review"
    },
    {
      id: "r3",
      author: "Meera Krishnan",
      role: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "2 weeks ago",
      review: "My go-to sanctuary for quiet creative work. The playlists are curated, the iced sea salt latte is addictive, and the baristas genuinely know coffee craft inside out.",
      source: "Google Review"
    }
  ] as ReviewItem[],

  faq: [
    {
      q: "Do you offer oat or plant-based milks?",
      a: "Yes! We proudly steam freshly prepared barista-grade Oat Milk and Almond Milk with zero extra charge for any beverage."
    },
    {
      q: "Can I buy whole-bean coffee bags for home brewing?",
      a: "Absolutely. We retail whole beans and provide complimentary custom grinding suited for French Press, AeroPress, V60, or Moka Pot."
    },
    {
      q: "Is there high-speed Wi-Fi and power outlets for working?",
      a: "Yes, our indoor mezzanine has dedicated power points and complimentary 300 Mbps fiber internet for guests."
    },
    {
      q: "Are pets welcome?",
      a: "Our outdoor sunlit courtyard is completely pet-friendly! We even offer fresh water bowls and organic dog biscuits."
    }
  ]
};
