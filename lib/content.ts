// All homepage copy lives here so it can later be swapped for Shopify / CMS data.

export const announcements = [
  "Free discovery vial with every order",
  "Free shipping on all orders",
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#" },
  { label: "Discover", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "About", href: "#about" },
];

export const hero = {
  title: "Quietly Yours",
  text: "Golden Hour is made for real people like you, for whom fragrance isn't a statement but a quiet part of the day — warm amber, a little saffron, soft skin musk.",
  // Product cut-out: transparent PNG (tall bottle, sized by height in Hero.module.css).
  image: { src: "/images/product.png", alt: "Élara eau de parfum, 30ml — deep teal bottle", width: 306, height: 900 },
  product: {
    title: "Élara – Eau de Parfum – 30ml",
    comparePrice: "₹ 2,499",
    price: "₹ 1,999",
    href: "#",
    thumb: "/images/product.png",
  },
  ctas: [
    { label: "Shop Now", href: "#", variant: "primary" as const },
    { label: "How to Wear", href: "#", variant: "secondary" as const },
  ],
};

export const about = {
  label: "About Élara",
  statement:
    "We make honest fragrances for real life, blended in small batches with skin-safe oils and made to sit close to your skin, so you smell like yourself — only a little better.",
  cta: { label: "Learn More About Us", href: "#" },
  feature: {
    image: { src: "/images/photos/ingredient-rose.png", alt: "A single pink rose with leaves" },
    title: "Clean & Skin-Safe Oils",
    link: { label: "View More", href: "#" },
  },
  stack: [
    { src: "/images/photos/lifestyle-spray.jpg", alt: "A woman in a white dress spraying perfume by a sunlit window" },
    { src: "/images/photos/lifestyle-neck.jpg", alt: "A woman touching her neck where she has applied perfume" },
  ],
  caption: "Golden Hour – Eau de Parfum",
};

export const ritual = {
  label: "Shop the Ritual",
  heading: "Your Complete Scent Ritual",
  accent: "Layered into Essentials",
  description: "Start with Golden Hour, our signature eau de parfum. The rest of the ritual is coming soon.",
  steps: [
    {
      title: "Body Lotion",
      text: "A light, scented lotion that hydrates skin and gives your fragrance something to hold on to.",
      image: { src: "/images/photos/lifestyle-neck.jpg", alt: "Close-up of a woman touching her neck" },
      product: { name: "Golden Hour Body Lotion", price: "Coming Soon", href: "#" },
    },
    {
      title: "Hair & Linen Mist",
      text: "An alcohol-free mist for hair, scarves and pillows — a softer echo of your scent through the day.",
      image: { src: "/images/photos/ritual-rose.jpg", alt: "A single pink rose on a white background" },
      product: { name: "Rose Veil Hair Mist", price: "Coming Soon", href: "#" },
    },
    {
      title: "Discovery Set",
      text: "Five 2ml vials to wear for a week each, so you find your signature before you commit.",
      image: { src: "/images/photos/ritual-vials.jpg", alt: "Small glass perfume vials in warm sunlight" },
      product: { name: "The Discovery Set – 5 × 2ml", price: "Coming Soon", href: "#" },
    },
    {
      title: "Eau de Parfum",
      text: "Our signature: warm amber, a little saffron and soft skin musk that stays close from morning to night.",
      image: { src: "/images/photos/lifestyle-spray.jpg", alt: "A woman spraying perfume by a sunlit window" },
      product: { name: "Golden Hour – Eau de Parfum – 50ml", price: "₹ 1,999", href: "#" },
    },
  ],
  productImage: "/images/product-placeholder.png",
};

// "How it wears" — scroll story: the scent changing on skin through the day.
export const journey = {
  label: "How it wears",
  heading: "From first spray to last trace",
  stages: [
    {
      name: "Spray",
      time: "0 min",
      statement: "A bright first breath of bergamot and pink pepper, there and gone like morning light.",
      text: "The top notes lift off the skin in the first minutes — fresh, sparkling, a little bold.",
      notes: ["Bergamot", "Pink pepper"],
      image: { src: "/images/photos/lifestyle-spray.jpg", alt: "A woman spraying perfume by a sunlit window" },
    },
    {
      name: "Settle",
      time: "20 min",
      statement: "Then it softens and leans in, warming as it meets the rhythm of your skin.",
      text: "Saffron and rose begin to show as the brightness fades and the scent finds its place.",
      notes: ["Saffron", "Rose"],
      image: { src: "/images/photos/lifestyle-neck.jpg", alt: "A woman touching her neck where she applied perfume" },
    },
    {
      name: "Bloom",
      time: "2 hours",
      statement: "By midday the heart opens, round and close, noticed only by those who lean near.",
      text: "Amber and jasmine carry the body of the fragrance — the part people remember.",
      notes: ["Amber", "Jasmine"],
      image: { src: "/images/photos/ritual-rose.jpg", alt: "A single pink rose" },
    },
    {
      name: "Linger",
      time: "8 hours",
      statement: "What stays at night is quiet, soft and unmistakably yours.",
      text: "Sandalwood and skin musk remain on wrists and collars long after the day is done.",
      notes: ["Sandalwood", "Skin musk"],
      image: { src: "/images/photos/ritual-vials.jpg", alt: "Small glass perfume vials in warm light" },
    },
  ],
};
