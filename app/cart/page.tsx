"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/*
  This defines the structure of each cart item.
  TypeScript uses this to understand what "item" contains.
*/
type CartItemType = {
  id: number;
  productId: string;
  quantity: number;
  product: {
    title: string;
    price: number;
    thumbnail?: string;
    images?: { imageUrl: string }[];
  };
};

export default function CartPage() {

  // Getting cart data and actions from context
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const router = useRouter();

  // This ensures component renders only on client (avoids hydration issues)
  const [mounted, setMounted] = useState(false);

  // This stores selected (checked) items
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Mark component as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  /*
    Whenever cart updates,
    select all items by default
  */
  useEffect(() => {
    setSelectedItems(cart.map((item: CartItemType) => item.productId));
  }, [cart]);

  // Prevent rendering before mount
  if (!mounted) {
    return <div className="p-6">Loading cart...</div>;
  }

  /*
    Calculate subtotal ONLY for checked items
    Important: This avoids NaN and updates dynamically
  */
  const subtotal = cart.reduce(
    (acc: number, item: CartItemType) =>
      selectedItems.includes(item.productId)
        ? acc + (item.product?.price || 0) * item.quantity
        : acc,
    0
  );

  // Free delivery logic
  const FREE_DELIVERY_THRESHOLD = 1000;

  const remainingAmount = Math.max(
    FREE_DELIVERY_THRESHOLD - subtotal,
    0
  );

  const progressPercent = Math.min(
    (subtotal / FREE_DELIVERY_THRESHOLD) * 100,
    100
  );

  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;

  /*
    Toggle checkbox selection
  */
  const toggleItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="bg-[#eaeded] min-h-screen pt-6 px-6 flex gap-6">

      {/* LEFT SECTION (Cart Items) */}
      <div className="flex-1 bg-white p-6">

        <h1 className="text-[28px] font-normal mb-1">Shopping Cart</h1>

        <p className="text-blue-600 text-sm mb-4 cursor-pointer">
          Deselect all items
        </p>

        {/* If cart is empty */}
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (

          // Mapping each cart item
          cart.map((item: CartItemType) => (

            <div
              key={item.id}
              className="flex gap-4 border-t py-6 items-start"
            >

              {/* Checkbox to include/exclude item from subtotal */}
              <input
                type="checkbox"
                checked={selectedItems.includes(item.productId)}
                onChange={() => toggleItem(item.productId)}
                className="mt-6"
              />

              {/* Product Image */}
              <img
                src={
                  item.product?.images?.[0]?.imageUrl ||
                  item.product?.thumbnail ||
                  "/placeholder.png"
                }
                className="w-[120px] h-[120px] object-contain"
              />

              {/* Product Info */}
              <div className="flex-1">

                <h2 className="text-[18px] leading-6">
                  {item.product?.title}
                </h2>

                <p className="text-green-600 text-sm mt-1">
                  In stock
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  FREE delivery
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-3">

                  <div className="flex items-center border rounded-full px-3 py-1">

                    {/* Decrease quantity */}
                    <button
                      onClick={() => decreaseQty(item.productId)}
                      className="px-2"
                    >
                      -
                    </button>

                    <span className="px-2">{item.quantity}</span>

                    {/* Increase quantity */}
                    <button
                      onClick={() => increaseQty(item.productId)}
                      className="px-2"
                    >
                      +
                    </button>

                  </div>

                  {/* Delete item (removes from DB also) */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-blue-600 text-sm"
                  >
                    Delete
                  </button>

                  <span className="text-gray-400 text-sm">|</span>

                  <button className="text-blue-600 text-sm">
                    Save for later
                  </button>
                </div>
              </div>

              {/* Price for that item */}
              <div className="text-[18px] font-semibold">
                ₹{(item.product?.price || 0) * item.quantity}
              </div>
            </div>
          ))
        )}

        {/* Subtotal */}
        <div className="text-right mt-6 text-[18px]">
          Subtotal ({selectedItems.length} items):{" "}
          <span className="font-bold">₹{subtotal}</span>
        </div>

      </div>

      {/* RIGHT SECTION (Checkout Box) */}
      <div className="w-[320px]">

        <div className="bg-white p-4 border mb-4">

          {/* Free delivery condition */}
          {isFreeDelivery ? (
            <div className="mb-3 text-green-700 text-sm font-medium">
              Your order is eligible for FREE Delivery.
            </div>
          ) : (
            <div className="mb-3 text-sm">

              <p className="text-gray-700 mb-2">
                Add <span className="font-semibold">₹{remainingAmount}</span> more for FREE Delivery
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-green-600"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹1000</span>
              </div>

            </div>
          )}

          {/* Subtotal again */}
          <p className="text-[18px] font-semibold mb-2">
            Subtotal ({selectedItems.length} items): ₹{subtotal}
          </p>

          {/* Gift checkbox */}
          <label className="text-sm flex items-center gap-2 mb-3">
            <input type="checkbox" />
            This order contains a gift
          </label>

          {/* Proceed button */}
          <button
            onClick={() => {
              localStorage.removeItem("buyNowProduct");
              router.push("/checkout");
            }}
            className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded-full font-semibold"
          >
            Proceed to Buy
          </button>
        </div>

        {/* Prime section */}
        <div className="bg-blue-600 text-white p-4 rounded">
          <p className="text-sm">
            Enjoy faster deliveries, offers and more!
          </p>

          <button className="bg-yellow-400 text-black w-full py-2 mt-3 rounded-full">
            Join Prime
          </button>
        </div>

      </div>

    </div>
  );
}