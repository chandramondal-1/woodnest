export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  seats: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  colors: string[];
  fabric: string[];
  woodFinish: string[];
  badges: string[];
  dimensions: string;
  material: string;
  leadTime: string;
  description: string;
  image: string;
  stockCount: number;
  trending: boolean;
  specifications: Record<string, string>;
  reviews_list: Array<{ user: string; rating: number; comment: string; date: string; helpful: number }>;
  faqs: Array<{ q: string; a: string }>;
};



export const categories = [
  { title: "1 Seater Sofas", icon: "🪑", seats: "1", blurb: "Compact comfort for reading nooks and premium corners." },
  { title: "2 Seater Sofas", icon: "🛋", seats: "2", blurb: "Apartment-friendly silhouettes with luxurious detailing." },
  { title: "3 Seater Sofas", icon: "🛋🛋", seats: "3", blurb: "Statement pieces built for modern family living." },
  { title: "L Shape Sofas", icon: "👨‍👩‍👧‍👦", seats: "5+", blurb: "Expansive layouts for entertaining and open-plan homes." },
  { title: "Sofa Cum Beds", icon: "🛏", seats: "Multi", blurb: "Space-smart versatility without losing the premium feel." },
  { title: "Luxury Recliners", icon: "💎", seats: "1-3", blurb: "Relaxation-led comfort with rich finishes and plush support." }
];

export const features = [
  { title: "5 Year Warranty", value: "Built on a solid wood promise." },
  { title: "Solid Wood Frame", value: "Durable internal structure for daily use." },
  { title: "Free Delivery", value: "White-glove delivery across major cities." },
  { title: "Easy Returns", value: "Simple post-purchase support and exchanges." },
  { title: "Custom Sizes", value: "Tailored dimensions for your space." }
];

export const testimonials = [
  {
    name: "Aparna S.",
    city: "Bengaluru",
    quote: "The detailing feels far more premium than what we saw in stores. Delivery and finishing both felt luxury-level."
  },
  {
    name: "Rahul & Meera",
    city: "Pune",
    quote: "We customized our sectional around our living room wall and it fit perfectly. The walnut finish is gorgeous."
  },
  {
    name: "Nikita R.",
    city: "Kolkata",
    quote: "The product page gave us enough confidence to order online. The sofa arrived exactly as promised."
  }
];

export const products: Product[] = [
  {
    slug: "oslo-3-seater",
    name: "WOODNEST Oslo 3 Seater Sofa",
    tagline: "Clean-lined luxury with deep seat comfort.",
    category: "3 Seater",
    seats: 3,
    price: 29999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 124,
    colors: ["Sand Beige", "Charcoal", "Walnut Brown"],
    fabric: ["Linen", "Velvet", "Leatherette"],
    woodFinish: ["Oak", "Walnut", "Teak"],
    badges: ["Bestseller", "Premium Pick"],
    dimensions: "84W x 35D x 33H in",
    material: "Kiln-dried solid wood frame, high resilience foam, premium upholstery",
    leadTime: "Delivery in 7-10 days",
    description: "A versatile living room anchor designed for modern homes that want understated elegance and long-lasting comfort.",
    image: "/assets/products/oslo.png",
    stockCount: 12,
    trending: true,
    specifications: { "Frame": "Solid Oak", "Foam": "HD Resilient", "Fabric": "Premium Linen" },
    reviews_list: [{ user: "Ananya K.", rating: 5, comment: "Absolutely stunning!", date: "2024-03-12", helpful: 24 }],
    faqs: [{ q: "Is the fabric washable?", a: "We recommend professional dry clean for best longevity." }]
  },


  {
    slug: "aalto-l-shape",
    name: "WOODNEST Aalto L Shape Sofa",
    tagline: "Spacious hosting comfort with sculpted edges.",
    category: "L Shape",
    seats: 5,
    price: 54999,
    originalPrice: 69999,
    rating: 4.9,
    reviews: 86,
    colors: ["Ivory Mist", "Forest Olive", "Mocha"],
    fabric: ["Chenille", "Velvet", "Leatherette"],
    woodFinish: ["Walnut", "Teak"],
    badges: ["Most Loved", "Custom Size"],
    dimensions: "108W x 72D x 34H in",
    material: "Engineered hardwood frame, layered foam support, stain-resistant premium fabric",
    leadTime: "Delivery in 10-14 days",
    description: "Made for expansive family evenings, with plush cushioning and a layout that elevates open-plan living rooms.",
    image: "/assets/products/aalto.png",
    stockCount: 5,
    trending: true,
    specifications: { "Frame": "Hardwood", "Foam": "Layered Soft", "Fabric": "Velvet Mix" },
    reviews_list: [{ user: "Vikrant M.", rating: 4, comment: "Great for big families.", date: "2024-02-28", helpful: 12 }],
    faqs: [{ q: "Can we change the side of the L?", a: "Yes, suggest our custom builder for left/right orientation." }]
  },


  {
    slug: "bergen-recliner",
    name: "WOODNEST Bergen Luxury Recliner",
    tagline: "Cinema-style relaxation dressed as a design piece.",
    category: "Recliner",
    seats: 1,
    price: 26999,
    originalPrice: 34999,
    rating: 4.7,
    reviews: 62,
    colors: ["Taupe", "Espresso", "Ash Grey"],
    fabric: ["Leatherette", "Velvet"],
    woodFinish: ["Walnut"],
    badges: ["New Arrival", "Premium Pick"],
    dimensions: "39W x 38D x 41H in",
    material: "Metal recliner mechanism, layered foam cushioning, breathable upholstery",
    leadTime: "Delivery in 5-8 days",
    description: "A rich recliner built for home theatres, lounge corners, and anyone who wants indulgent support at the end of the day.",
    image: "/assets/products/bergen.png",
    stockCount: 2,
    trending: false,
    specifications: { "Mechanism": "German Steel", "Fabric": "Top Grain Leatherette" },
    reviews_list: [{ user: "Samrat P.", rating: 5, comment: "Best nap of my life.", date: "2024-04-05", helpful: 45 }],
    faqs: [{ q: "Does it need power?", a: "Manual glide mechanism, no power required." }]
  },


  {
    slug: "siena-2-seater",
    name: "WOODNEST Siena 2 Seater Sofa",
    tagline: "Apartment-scale sophistication with tailored arms.",
    category: "2 Seater",
    seats: 2,
    price: 23999,
    originalPrice: 31999,
    rating: 4.6,
    reviews: 94,
    colors: ["Cream", "Stone Grey", "Chestnut"],
    fabric: ["Linen", "Chenille"],
    woodFinish: ["Oak", "Walnut"],
    badges: ["Urban Favorite"],
    dimensions: "68W x 34D x 32H in",
    material: "Solid wood core, soft-touch fabric, medium firm cushioning",
    leadTime: "Delivery in 6-9 days",
    description: "Crafted for city homes that value compact footprints, premium construction, and a warm design language.",
    image: "/assets/products/siena.png",
    stockCount: 24,
    trending: false,
    specifications: { "Frame": "Engineered Wood", "Fabric": "Chenille" },
    reviews_list: [{ user: "Meera D.", rating: 5, comment: "Perfect for our small flat.", date: "2024-01-20", helpful: 8 }],
    faqs: [{ q: "Is it assembly-free?", a: "Yes, white glove delivery includes setup." }]
  }
];



export const sofaBuilderBasePrice = 18999;
