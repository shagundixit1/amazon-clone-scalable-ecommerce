"use client";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="bg-white border rounded-lg cursor-pointer w-[260px] h-[380px] flex flex-col hover:shadow-md transition"
    >
      {/* IMAGE SECTION (FIXED HEIGHT) */}
      <div className="h-[180px] flex items-center justify-center p-3">
        {(product?.images?.[0]?.imageUrl || product?.thumbnail) && (
          <img
            src={product?.images?.[0]?.imageUrl || product?.thumbnail}
            alt={product.title}
            className="max-h-full object-contain"
          />
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="px-3 flex flex-col flex-grow">
        {/* TITLE FIXED HEIGHT */}
        <h2
          title={product.title}
          className="text-sm leading-5 font-medium text-gray-800 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "40px",
            maxHeight: "40px",
          }}
        >
          {product.title}
        </h2>

        {/* CATEGORY */}
        <p className="text-xs text-gray-500 mt-1 h-[16px]">
          {product.category?.name}
        </p>

        {/* PRICE */}
        <p className="text-lg font-semibold mt-2">
          ₹{Number(product.price).toFixed(2)}
        </p>

        {/* PUSH BUTTON DOWN */}
        <div className="flex-grow"></div>

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id);
          }}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded mt-3"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}