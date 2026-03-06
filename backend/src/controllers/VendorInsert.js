const vendors = [

/* ===================== 🏰 VENUE ===================== */
{
  name: "Royal Palace Venue",
  category: "Venue",
  profilePic: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
  gallery: [
    "https://images.unsplash.com/photo-1519167758481-83f29c1f1c4b",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  ],
  availableTimings: { from: "9 AM", to: "11 PM" },
  socialLinks: {
    instagram: "https://instagram.com/royalpalace",
    facebook: "https://facebook.com/royalpalace",
    website: "https://royalpalace.com",
  },
  priceRates: { startingPrice: 150000, maxPrice: 350000 },
  packages: [
    { name: "Silver", price: 180000, includes: ["Hall", "Basic Decor"] },
    { name: "Gold", price: 280000, includes: ["Hall", "Premium Decor", "Lighting"] },
  ],
  reviews: [{ user: "Anjali", comment: "Beautiful venue", rating: 5 }],
  rating: 4.8,
  location: { city: "Kochi", state: "Kerala", address: "MG Road" },
},

{
  name: "Grand Orchid Convention",
  category: "Venue",
  profilePic: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  gallery: ["https://images.unsplash.com/photo-1519225421980-715cb0215aed"],
  availableTimings: { from: "8 AM", to: "10 PM" },
  socialLinks: { instagram: "", facebook: "", website: "" },
  priceRates: { startingPrice: 140000, maxPrice: 300000 },
  packages: [{ name: "Standard", price: 160000, includes: ["Hall", "Parking"] }],
  reviews: [{ user: "Rahul", comment: "Good service", rating: 4 }],
  rating: 4.4,
  location: { city: "Thrissur", state: "Kerala", address: "Round South" },
},

/* (8 more Venue vendors auto-complete vibe) */
...Array.from({ length: 8 }).map((_, i) => ({
  name: `Venue Elite ${i + 3}`,
  category: "Venue",
  profilePic: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
  gallery: [],
  availableTimings: { from: "9 AM", to: "11 PM" },
  socialLinks: {},
  priceRates: { startingPrice: 130000 + i * 5000, maxPrice: 300000 },
  packages: [{ name: "Wedding Package", price: 200000 }],
  reviews: [{ user: "User", comment: "Nice place", rating: 4 }],
  rating: 4.2,
  location: { city: "Kerala", state: "Kerala", address: "City Center" },
})),

/* ===================== 🌸 DECORATIONS ===================== */
...Array.from({ length: 10 }).map((_, i) => ({
  name: `Dream Decor ${i + 1}`,
  category: "Decorations",
  profilePic: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  gallery: [],
  availableTimings: { from: "7 AM", to: "10 PM" },
  socialLinks: {},
  priceRates: { startingPrice: 40000, maxPrice: 120000 },
  packages: [{ name: "Floral Theme", price: 60000 }],
  reviews: [{ user: "Bride", comment: "Loved the decor!", rating: 5 }],
  rating: 4.6,
  location: { city: "Kochi", state: "Kerala", address: "Decor Street" },
})),

/* ===================== 🍽 FOOD & BEVERAGE ===================== */
...Array.from({ length: 10 }).map((_, i) => ({
  name: `Royal Caterers ${i + 1}`,
  category: "Food & beverage",
  profilePic: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
  gallery: [],
  availableTimings: { from: "6 AM", to: "11 PM" },
  socialLinks: {},
  priceRates: { startingPrice: 50000, maxPrice: 200000 },
  packages: [{ name: "Veg & Non-Veg Buffet", price: 90000 }],
  reviews: [{ user: "Guest", comment: "Food was amazing", rating: 5 }],
  rating: 4.7,
  location: { city: "Trivandrum", state: "Kerala", address: "Catering Hub" },
})),

/* ===================== 📸 PHOTOGRAPHY ===================== */
...Array.from({ length: 10 }).map((_, i) => ({
  name: `Pixel Moments ${i + 1}`,
  category: "Photography",
  profilePic: "https://images.unsplash.com/photo-1519741497674-611481863552",
  gallery: [],
  availableTimings: { from: "All Day", to: "All Day" },
  socialLinks: {},
  priceRates: { startingPrice: 60000, maxPrice: 150000 },
  packages: [{ name: "Candid + Video", price: 90000 }],
  reviews: [{ user: "Couple", comment: "Captured every moment", rating: 5 }],
  rating: 4.9,
  location: { city: "Calicut", state: "Kerala", address: "Studio Lane" },
})),

/* ===================== 💄 MAKING & GROOMING ===================== */
...Array.from({ length: 10 }).map((_, i) => ({
  name: `Glow Studio ${i + 1}`,
  category: "Making & Grooming",
  profilePic: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  gallery: [],
  availableTimings: { from: "8 AM", to: "8 PM" },
  socialLinks: {},
  priceRates: { startingPrice: 20000, maxPrice: 80000 },
  packages: [{ name: "Bridal Makeup", price: 45000 }],
  reviews: [{ user: "Bride", comment: "Absolutely stunning look", rating: 5 }],
  rating: 4.8,
  location: { city: "Kochi", state: "Kerala", address: "Beauty Avenue" },
})),

];

export default vendors;