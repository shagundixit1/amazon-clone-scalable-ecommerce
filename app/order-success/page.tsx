"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

type OrderItem = {
  id: string;
  quantity: number;
  product: {
    title: string;
    thumbnail: string;
  };
};

type Order = {
  id: string;
  orderItems: OrderItem[];
  createdAt: string;
};

function OrderSuccessContent() {
  const params = useSearchParams();
  const router = useRouter();

  const orderId = params.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !orderId) {
      router.push("/");
      return;
    }

    const fetchOrder = async () => {
      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrder(data.data);
      }
    };

    const fetchRecommendations = async () => {
      const res = await fetch(
        "http://localhost:5000/api/products"
      );
      const data = await res.json();

      if (data.success) {
        setRecommendations(data.data.slice(0, 6));
      }
    };

    fetchOrder();
    fetchRecommendations();
  }, [orderId]);

  if (!order) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-[#eaeded] min-h-screen p-6">
      <div className="bg-white p-6 rounded shadow flex justify-between items-center">
        <div>
          <h1 className="text-green-600 font-semibold text-xl">
            Order placed, thank you!
          </h1>

          <p className="text-sm mt-2">
            Confirmation will be sent to your email.
          </p>

          <p className="mt-3 text-sm">
            Order ID: <span className="font-medium">{order.id}</span>
          </p>

          <button
            onClick={() => router.push("/orders")}
            className="text-blue-600 mt-4 text-sm"
          >
            Review your orders
          </button>
        </div>

        <img
          src={order.orderItems[0]?.product.thumbnail}
          className="w-24"
        />
      </div>

      <div className="bg-white p-6 mt-6">
        <h2 className="font-semibold mb-4">
          Your Items
        </h2>

        {order.orderItems.map((item) => (
          <div key={item.id} className="flex gap-4 mb-4">
            <img
              src={item.product.thumbnail}
              className="w-20 h-20 object-contain"
            />

            <div>
              <p>{item.product.title}</p>
              <p className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Recommendations Based on Your Order
        </h2>

        <div className="grid grid-cols-6 gap-4">
          {recommendations.map((product: any) => (
            <div key={product.id} className="bg-white p-3">
              <img
                src={product.thumbnail}
                className="h-32 object-contain mx-auto"
              />

              <p className="text-sm mt-2 line-clamp-2">
                {product.title}
              </p>

              <p className="font-semibold mt-1">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}