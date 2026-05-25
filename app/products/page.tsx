"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../../lib/api";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // 🔍 FILTER LOGIC
  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || p.category?.name === category;

    return matchesSearch && matchesCategory;
  });

  // 📦 UNIQUE CATEGORIES
  const categories = [
    "All",
    ...new Set(products.map((p: any) => p.category?.name)),
  ];

  return (
    <div className="p-6 bg-[#eaeded] min-h-screen">

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-2 border mb-4"
      />

      {/* 📂 CATEGORY FILTER */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat: any, i) => (
          <button
            key={i}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 border ${
              category === cat ? "bg-black text-white" : "bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🛒 GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}