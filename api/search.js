// api/search.js - Vercel Serverless Function
export default function handler(req, res) {
  const method = req.method;
  if (method !== 'GET' && method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS for browser compatibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') return res.status(200).end();

  const query = req.query.q || req.body?.q || '';
  
  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Search query must be a string' });
  }

  const q = query.trim().toLowerCase();
  if (!q) {
    return res.status(200).json({ results: [], suggestions: [], total: 0 });
  }

  // 🔥 FULL UPDATED PRODUCT CATALOG — synced with frontend
  const products = [
    // --- PULSE OF SOUND T-SHIRT ---
    {
      id: "pulse-white",
      name: "Pulse of Sound T-Shirt White",
      price: 50000,
      image: "/TIMELESS/PULSEOFSOUNDWHITE.jpg",
      currency: "₦",
      category: "shirt",
      type: "t-shirt",
      color: "white"
    },
    {
      id: "pulse-black",
      name: "Pulse of Sound T-Shirt Black",
      price: 50000,
      image: "/TIMELESS/PULSEOFSOUNDBLACK.jpg",
      currency: "₦",
      category: "shirt",
      type: "t-shirt",
      color: "black"
    },

    // --- GOLD STANDARD SHIRT ---
    {
      id: "gold-white",
      name: "Gold Standard Shirt White",
      price: 50000,
      image: "/images/gold-white.jpg", // Replace with real path
      currency: "₦",
      category: "shirt",
      type: "button-up",
      color: "white"
    },
    {
      id: "gold-black",
      name: "Gold Standard Shirt Black",
      price: 50000,
      image: "/images/gold-black.jpg", // Replace with real path
      currency: "₦",
      category: "shirt",
      type: "button-up",
      color: "black"
    },

    // --- MEN'S TANK TOPS ---
    {
      id: "m-tank-black",
      name: "Men's Tank Top Black",
      price: 25000,
      image: "/images/tank-black.jpg", // Placeholder – update with actual
      currency: "₦",
      category: "top",
      type: "tank",
      gender: "male",
      color: "black"
    },
    {
      id: "m-tank-white",
      name: "Men's Tank Top White",
      price: 25000,
      image: "/images/tank-white.jpg",
      currency: "₦",
      category: "top",
      type: "tank",
      gender: "male",
      color: "white"
    },
    {
      id: "m-tank-orange",
      name: "Men's Tank Top Orange",
      price: 25000,
      image: "/images/tank-orange.jpg",
      currency: "₦",
      category: "top",
      type: "tank",
      gender: "male",
      color: "orange"
    },
    {
      id: "m-tank-green",
      name: "Men's Tank Top Green",
      price: 25000,
      image: "/images/tank-green.jpg",
      currency: "₦",
      category: "top",
      type: "tank",
      gender: "male",
      color: "green"
    },

    // --- WOMEN'S CROP TOPS ---
    {
      id: "f-crop-blue",
      name: "Women's Crop Top Blue",
      price: 25000,
      image: "/images/crop-blue.jpg",
      currency: "₦",
      category: "top",
      type: "crop",
      gender: "female",
      color: "blue"
    },
    {
      id: "f-crop-pink",
      name: "Women's Crop Top Pink",
      price: 25000,
      image: "/images/crop-pink.jpg",
      currency: "₦",
      category: "top",
      type: "crop",
      gender: "female",
      color: "pink"
    },

    // --- SNAPBACK CAPS ---
    {
      id: "cap-black",
      name: "Snapback Cap Black",
      price: 20000,
      image: "/images/cap-black.jpg",
      currency: "₦",
      category: "hat",
      type: "snapback",
      color: "black"
    },
    {
      id: "cap-pink",
      name: "Snapback Cap Pink",
      price: 20000,
      image: "/images/cap-pink.jpg",
      currency: "₦",
      category: "hat",
      type: "snapback",
      color: "pink"
    },
    {
      id: "cap-green",
      name: "Snapback Cap Green",
      price: 20000,
      image: "/images/cap-green.jpg",
      currency: "₦",
      category: "hat",
      type: "snapback",
      color: "green"
    },
    {
      id: "cap-purple",
      name: "Snapback Cap Purple",
      price: 20000,
      image: "/images/cap-purple.jpg",
      currency: "₦",
      category: "hat",
      type: "snapback",
      color: "purple"
    },
    {
      id: "cap-orange",
      name: "Snapback Cap Orange",
      price: 20000,
      image: "/images/cap-orange.jpg",
      currency: "₦",
      category: "hat",
      type: "snapback",
      color: "orange"
    },
    {
      id: "cap-blue",
      name: "Snapback Cap Blue",
      price: 20000,
      image: "/images/cap-blue.jpg",
      currency: "₦",
      category: "hat",
      type: "snapback",
      color: "blue"
    },

    // --- CASUAL SHORTS ---
    {
      id: "shorts-white",
      name: "Casual Shorts White",
      price: 25000,
      image: "/images/shorts-white.jpg",
      currency: "₦",
      category: "bottom",
      type: "shorts",
      color: "white"
    },
    {
      id: "shorts-black",
      name: "Casual Shorts Black",
      price: 25000,
      image: "/images/shorts-black.jpg",
      currency: "₦",
      category: "bottom",
      type: "shorts",
      color: "black"
    },
    {
      id: "shorts-red",
      name: "Casual Shorts Red",
      price: 25000,
      image: "/images/shorts-red.jpg",
      currency: "₦",
      category: "bottom",
      type: "shorts",
      color: "red"
    },
    {
      id: "shorts-blue",
      name: "Casual Shorts Blue",
      price: 25000,
      image: "/images/shorts-blue.jpg",
      currency: "₦",
      category: "bottom",
      type: "shorts",
      color: "blue"
    },

    // --- LEGACY PRODUCTS (Optional: keep or remove) ---
    {
      id: "jorts-brown",
      name: "Brown Camo Jorts",
      price: 320000,
      image: "https://www.zttw.store/cdn/shop/files/z43.png?v=1754337498&width=3000",
      currency: "₦",
      category: "bottom",
      type: "jorts",
      color: "brown"
    },
    {
      id: "pattern-top-black",
      name: "Black Pattern-Cut Top",
      price: 320000,
      image: "https://www.zttw.store/cdn/shop/files/zttw_51_10e04cd8-4da8-459c-a614-58272cddb652.jpg?v=1741958010&width=3000",
      currency: "₦",
      category: "top",
      type: "pattern-cut",
      color: "black"
    },
    {
      id: "pattern-shorts-black",
      name: "Black Pattern-Cut Shorts",
      price: 240000,
      image: "https://www.zttw.store/cdn/shop/files/zttw_53_8e95ed70-7bd8-46eb-b431-47c1067f51a3.jpg?v=1741957993&width=3000",
      currency: "₦",
      category: "bottom",
      type: "pattern-cut",
      color: "black"
    },
    {
      id: "hat-blue",
      name: "Baseball hat - Blue",
      price: 160000,
      image: "https://www.zttw.store/cdn/shop/files/zttw_52.jpg?v=1733571780&width=3000",
      currency: "₦",
      category: "hat",
      type: "baseball",
      color: "blue"
    },
    {
      id: "hat-cream",
      name: "Baseball hat - Cream",
      price: 160000,
      image: "https://www.zttw.store/cdn/shop/files/zttw_50.jpg?v=1733571776&width=3000",
      currency: "₦",
      category: "hat",
      type: "baseball",
      color: "cream"
    },
    {
      id: "hat-camo-black",
      name: "Black Camo Hat",
      price: 160000,
      image: "https://www.zttw.store/cdn/shop/files/zttw_45_21693ff9-273f-45b6-afb5-a24ae2a9428f.jpg?v=1741957993&width=3000",
      currency: "₦",
      category: "hat",
      type: "camo",
      color: "black"
    }
  ];

  // Filter products by query in name (case-insensitive)
  const filtered = products.filter(p =>
    p.available !== false && // Exclude out-of-stock
    p.name.toLowerCase().includes(q)
  );

  // Generate smart suggestions based on keywords
  const suggestionKeywords = [...new Set(
    filtered.flatMap(p => 
      p.name.split(" ")
       .filter(word => word.length > 2)
    )
  )].sort((a, b) => a.localeCompare(b));

  res.status(200).json({
    query: q,
    results: filtered,
    suggestions: suggestionKeywords,
    total: filtered.length
  });
}