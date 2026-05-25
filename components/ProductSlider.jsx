"use client";
import { useRef } from "react";
import ProductCard from "./ProductCard"; // ✅ ADD THIS

export default function ProductSlider({ title, products }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    ref.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth"
    });
  };

  return (
    <div className="bg-white mx-8 mt-6 p-4 relative">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-blue-500 cursor-pointer">See all offers</span>
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow px-2"
      >
        ‹
      </button>

      {/* ✅ FIXED */}
      <div ref={ref} className="flex gap-4 overflow-x-auto scroll-smooth">
        {products.map((p) => (
          <div key={p.id} className="min-w-[200px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow px-2"
      >
        ›
      </button>

    </div>
  );
}