
"use client";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const handleClick = () => {
  router.push(`/product/${product.id}`);
};

  return (
    <div
  onClick={handleClick}
  className="border rounded-lg p-4 shadow hover:shadow-lg hover:scale-105 transition bg-white cursor-pointer"
>
      {(product?.images?.[0]?.imageUrl || product?.thumbnail) && (
        <img
          src={product?.images?.[0]?.imageUrl || product?.thumbnail}
          alt={product.title}
          className="w-full h-40 object-contain mb-4"
        />
      )}
      <h2 className="font-semibold text-sm line-clamp-2 h-10">
        {product.title}
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        {product.category?.name}
      </p>

      <p className="text-xl font-bold mt-2">
        ₹{Number(product.price).toFixed(2)}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation(); // ✅ PREVENT PAGE NAVIGATION WHEN CLICK BUTTON
          addToCart(product.id);
        }}
        className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}