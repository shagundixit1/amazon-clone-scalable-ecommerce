"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "../../lib/api";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data || []);
    });
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered(products);
      return;
    }

    const result = products.filter((p: any) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(result);
  }, [query, products]);

  return (
  <main className="bg-[#EAEDED] min-h-screen py-6">

    <div className="max-w-[1500px] mx-auto flex gap-6 px-4">

      {/* LEFT FILTER SIDEBAR */}
      <div className="w-[20%] hidden md:block bg-white p-4 h-fit">

        <h2 className="font-semibold mb-3">Filters</h2>

        <div className="mb-4">
          <p className="font-medium mb-2">Price</p>
          <p className="text-sm text-gray-600 cursor-pointer">Under ₹500</p>
          <p className="text-sm text-gray-600 cursor-pointer">₹500 - ₹1000</p>
          <p className="text-sm text-gray-600 cursor-pointer">Above ₹1000</p>
        </div>

        <div>
          <p className="font-medium mb-2">Availability</p>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            In Stock
          </label>
        </div>

      </div>

      {/* RIGHT PRODUCTS */}
      <div className="w-full md:w-[80%]">

        <h1 className="text-2xl font-semibold mb-4">
          Results for "{query}"
        </h1>

        {filtered.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="flex flex-col gap-4">

            {filtered.map((product: any) => (
              <div
                key={product.id}
                onClick={() => {
                  window.location.href = `/product/${product.id}`;
                }}
                className="bg-white p-4 flex gap-6 cursor-pointer hover:shadow"
              >

                {/* IMAGE */}
                <img
                  src={product.thumbnail || "/placeholder.png"}
                  className="w-[200px] h-[200px] object-contain"
                />

                {/* DETAILS */}
                <div className="flex flex-col justify-between flex-1">

                  <div>
                    <h2 className="text-lg font-medium text-blue-600 hover:underline">
                      {product.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description || "No description available"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-xl font-semibold">
                      ₹{product.price}
                    </p>

                    <p className="text-sm text-green-600 mt-1">
                      In stock
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="mt-3 bg-yellow-400 px-6 py-2 rounded"
                    >
                      Add to cart
                    </button>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>

  </main>
);
}