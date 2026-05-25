

"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductClient({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [qty, setQty] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const days = Math.floor(Math.random() * 5 + 1);
    const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    setDeliveryDate(date.toDateString());
  }, []);

  const handleBuyNow = () => {
    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({
        ...product,
        quantity: qty,
      })
    );

    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-3 text-sm">

      <p className="text-2xl font-semibold">
        ₹{product.price}
      </p>

      <p>
        FREE delivery{" "}
        <span className="font-semibold">
          {deliveryDate}
        </span>
      </p>

      <p>
        Or fastest delivery{" "}
        <span className="font-semibold">
          Tomorrow
        </span>
      </p>

      <p className="text-blue-600 cursor-pointer hover:underline">
        Delivering to your location - Update location
      </p>

      <p className="text-green-600 text-base font-medium">
        In stock
      </p>

      <select
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="w-full border rounded px-2 py-2"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            Quantity: {n}
          </option>
        ))}
      </select>

      <button
        onClick={() => addToCart(product.id)}
        className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full font-medium"
      >
        Add to Cart
      </button>

      <button
        onClick={handleBuyNow}
        className="w-full bg-orange-400 hover:bg-orange-500 py-2 rounded-full font-medium"
      >
        Buy Now
      </button>

      <div className="text-xs text-gray-700 mt-2 space-y-1">
        <p>
          Ships from <span className="font-medium">Amazon</span>
        </p>
        <p>
          Sold by <span className="text-blue-600">Amazon Seller</span>
        </p>
        <p className="text-blue-600">Secure transaction</p>
      </div>

    </div>
  );
}