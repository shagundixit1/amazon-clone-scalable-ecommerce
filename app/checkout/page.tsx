


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddressModal from "@/components/AddressModal";
import { useCart } from "@/context/CartContext";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

type Address = {
  id: string;
  fullName: string;
  addressLine1: string;
  city: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } = useCart() as {
    cart: CartItem[];
    clearCart: () => void;
  };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [buyNowProduct, setBuyNowProduct] = useState<CartItem | null>(null);
  const [finalItems, setFinalItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  //  LOAD EVERYTHING SAFELY
  useEffect(() => {
    const stored = localStorage.getItem("buyNowProduct");

    let items: CartItem[] = [];

    if (stored && cart.length === 0) {
      // buy now flow
      const parsed = JSON.parse(stored);
      setBuyNowProduct(parsed);
      items = [parsed];
    } else {
      // cart flow
      items = cart;
    }

    setFinalItems(items);
    setIsLoaded(true);
  }, [cart]);

  // AUTH CHECK
  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  //  FETCH ADDRESS
  useEffect(() => {
    if (!token) return;

    const fetchAddresses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setAddresses(data.data || []);

        if (data.data?.length > 0) {
          setSelectedAddress(data.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddresses();
  }, [token]);

  //  WAIT UNTIL LOADED
  if (!isLoaded) {
    return null;
  }

  const handlePlaceOrder = async () => {
  if (!selectedAddress) {
    alert("Please select address");
    return;
  }

  //  ALWAYS GET FRESH DATA
  const stored = localStorage.getItem("buyNowProduct");

  let items: CartItem[] = [];

  if (stored && cart.length === 0) {
    items = [JSON.parse(stored)];
  } else {
    items = cart;
  }

  if (!items || items.length === 0) {
    alert("Cart is empty");
    return;
  }

  try {
    const orderItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        addressId: selectedAddress.id,
        items: orderItems, // ✅ THIS IS THE FIX
      }),
    });

    const data = await res.json();

    if (data.success) {
      // alert("Order placed successfully");

      clearCart();
      localStorage.removeItem("buyNowProduct");

      router.push(`/order-success?id=${data.data.id}`);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
  <div className="bg-[#eaeded] min-h-screen px-8 py-6 flex gap-6">

    {/* LEFT SIDE */}
    <div className="flex-1 space-y-6">

      {/* DELIVERY ADDRESS */}
      <div className="bg-white border p-6">
        {addresses.length === 0 ? (
          <>
            <h2 className="text-lg font-semibold">
              Add delivery address
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-400 px-4 py-2 mt-3 rounded"
            >
              Add a new delivery address
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">
              Delivering to {selectedAddress?.fullName}
            </h2>

            <p className="text-sm mt-1 text-gray-700">
              {selectedAddress?.addressLine1},{" "}
              {selectedAddress?.city}
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 mt-2 text-sm"
            >
              Change
            </button>
          </>
        )}
      </div>

      {/* PAYMENT METHOD SECTION */}
      <div className="bg-white border p-6">
        <h2 className="text-lg font-semibold mb-4">
          Payment method
        </h2>

        <div className="border rounded p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="radio" checked readOnly className="mt-1" />

            <div>
              <p className="font-medium">
                Cash on Delivery / Pay on Delivery
              </p>

              <p className="text-sm text-gray-600">
                Pay using cash, UPI or card at delivery
              </p>
            </div>
          </label>
        </div>

        <button className="mt-4 bg-yellow-300 px-4 py-2 rounded border text-sm">
          Use this payment method
        </button>
      </div>

      {/* REVIEW ITEMS */}
      <div className="bg-white border p-6">
        <h2 className="text-lg font-semibold mb-4">
          Review items and shipping
        </h2>

        {finalItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border-t pt-4 mt-4"
          >
            <img
              src={item.thumbnail}
              className="w-24 h-24 object-contain"
            />

            <div>
              <p className="font-medium">{item.title}</p>

              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-6 text-xs text-gray-500">
          When your order is placed, you will receive an email confirmation.
        </div>
      </div>

    </div>

    {/* RIGHT SIDEBAR */}
    <div className="w-[320px] bg-white p-6 h-fit border">

      <button
        disabled={!selectedAddress || finalItems.length === 0}
        onClick={handlePlaceOrder}
        className={`w-full py-2 rounded font-semibold ${
          selectedAddress && finalItems.length > 0
            ? "bg-yellow-400"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Place Order
      </button>

      <div className="mt-4 text-sm space-y-1">
        <p>
          Items: ₹
          {finalItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </p>

        <p>Delivery: FREE</p>

        <h3 className="font-bold text-lg mt-2">
          Order Total: ₹
          {finalItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </h3>
      </div>

    </div>

    <AddressModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    />
  </div>
  );
}