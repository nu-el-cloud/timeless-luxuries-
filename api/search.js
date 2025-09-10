// api/search.js - Vercel Serverless Function
export default function handler(req, res) {
  const method = req.method;
  if (method !== 'GET' && method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS Headers (important for browser)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = req.query.q || req.body?.q || '';

  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Search query must be a string' });
  }

  const q = query.trim().toLowerCase();

  // 🔥 FULL PRODUCT DATA — include price, image, currency
  const products = [
    { id: "pulse-black", name: "Pulse of Sound - Black", price: 23, image: "/TIMELESS/PULSEOFSOUNDBLACK.jpg", currency: "$" },
    { id: "pulse-white", name: "Pulse of Sound - White", price: 23, image: "/TIMELESS/PULSEOFSOUNDWHITE.jpg", currency: "$" },
    { id: "jorts-brown", name: "Brown Camo Jorts", price: 320000, image: "https://www.zttw.store/cdn/shop/files/z43.png?v=1754337498&width=3000", currency: "₦" },
    { id: "armless-black", name: "Armless Tee - Black", available: false },
    { id: "armless-white", name: "Armless Tee - White", available: false },
    { id: "pattern-top-black", name: "Black Pattern-Cut Top", price: 320000, image: "https://www.zttw.store/cdn/shop/files/zttw_51_10e04cd8-4da8-459c-a614-58272cddb652.jpg?v=1741958010&width=3000", currency: "₦" },
    { id: "pattern-shorts-black", name: "Black Pattern-Cut Shorts", price: 240000, image: "https://www.zttw.store/cdn/shop/files/zttw_53_8e95ed70-7bd8-46eb-b431-47c1067f51a3.jpg?v=1741957993&width=3000", currency: "₦" },
    { id: "hat-blue", name: "Baseball hat - Blue", price: 160000, image: "https://www.zttw.store/cdn/shop/files/zttw_52.jpg?v=1733571780&width=3000", currency: "₦" },
    { id: "hat-cream", name: "Baseball hat - Cream", price: 160000, image: "https://www.zttw.store/cdn/shop/files/zttw_50.jpg?v=1733571776&width=3000", currency: "₦" },
    { id: "hat-camo-black", name: "Black Camo Hat", price: 160000, image: "https://www.zttw.store/cdn/shop/files/zttw_45_21693ff9-273f-45b6-afb5-a24ae2a9428f.jpg?v=1741957993&width=3000", currency: "₦" },
    { id: "puffer-shorts-black", name: "Black Camo Puffer Shorts", price: 320000, image: "https://www.zttw.store/cdn/shop/files/zttw_13_267df2cb-be95-4bee-b400-2a0bb9037e51.jpg?v=1741957991&width=3000", currency: "₦" },
    { id: "puffer-top-black", name: "Black Camo Puffer Top", price: 320000, image: "https://www.zttw.store/cdn/shop/files/zttw_11_ca2fe38e-dfca-4b4a-ac93-7bd0012a0e14.jpg?v=1741958027&width=3000", currency: "₦" },
    { id: "vest-leather-black", name: "Black Leather Vest", price: 400000, image: "https://www.zttw.store/cdn/shop/files/zttw_17_461f8102-3c5a-4067-83cd-275b35dba60b.jpg?v=1741958033&width=3000", currency: "₦" },
    { id: "thunderbolt-set-black", name: "Black Thunderbolt Set", price: 1600000, image: "https://www.zttw.store/cdn/shop/files/zttw_37_75920b4d-fec0-46a9-b818-c91e3c4dc6b0.jpg?v=1741958011&width=3000", currency: "₦" },
    { id: "hat-camo-brown", name: "Brown Camo Hat", price: 160000, image: "https://www.zttw.store/cdn/shop/files/zttw_43_275b8d09-a62a-4b88-9d4c-7ed751582ec2.jpg?v=1741958006&width=3000", currency: "₦" },
    { id: "pattern-shorts-brown", name: "Brown Pattern-Cut Shorts", price: 240000, image: "https://www.zttw.store/cdn/shop/files/zttw_49_fd0c8527-624e-40b1-a5d5-429a6f667a58.jpg?v=1741958007&width=3000", currency: "₦" }
  ];

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(q)
  );

  res.status(200).json({
    query: q,
    results: filtered,
    total: filtered.length
  });
}