

"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required");
      return;
    }

    fetch("https://amazon-clone-backend-production-0d92.up.railway.app/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 FIX
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ORDERS RESPONSE:", data);

        if (data.success) {
          setOrders(data.data || []);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error("ORDER FETCH ERROR:", err);
        setOrders([]);
      });

  }, []);

  return (
  <main className="bg-[#EAEDED] min-h-screen py-6">

    <div className="max-w-[1200px] mx-auto px-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Your Orders</h1>

        <div className="flex gap-2">
          <input
            placeholder="Search all orders"
            className="border px-4 py-2 rounded w-[300px]"
          />
          <button className="bg-gray-800 text-white px-4 rounded">
            Search Orders
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b mb-6 text-sm">
        <p className="border-b-2 border-orange-500 pb-2 cursor-pointer">
          Orders
        </p>
        <p className="text-gray-500 cursor-pointer">Buy Again</p>
        <p className="text-gray-500 cursor-pointer">Not Yet Shipped</p>
        <p className="text-gray-500 cursor-pointer">Digital Orders</p>
      </div>

      {/* ORDERS */}
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-white border rounded"
            >

              {/* ORDER HEADER */}
              <div className="bg-gray-100 p-4 flex justify-between text-sm">
                <div>
                  <p className="text-gray-600">ORDER PLACED</p>
                  <p>Recently</p>
                </div>

                <div>
                  <p className="text-gray-600">TOTAL</p>
                  <p>₹{order.totalAmount}</p>
                </div>

                <div>
                  <p className="text-gray-600">ORDER ID</p>
                  <p className="text-blue-600">{order.id}</p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="p-4 space-y-4">
                {order.orderItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4">

                    {/* IMAGE */}
                    <img
                      src={item.product?.thumbnail || "/placeholder.png"}
                      className="w-[100px] h-[100px] object-contain border"
                    />

                    {/* DETAILS */}
                    <div className="flex-1">
                      <p className="text-blue-600 hover:underline cursor-pointer">
                        {item.product?.title || "Product"}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm mt-1">
                        Price: ₹{item.product?.price || 0}
                      </p>

                      <button
  onClick={() => {
    if (item.product?.id) {
      window.location.href = `/product/${item.product.id}`;
    }
  }}
  className="mt-3 border px-3 py-1 text-sm rounded hover:bg-gray-100"
>
                        Buy it again
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      )}

      {/* RECOMMENDED PRODUCTS */}
      <div className="mt-10">

        <h2 className="text-2xl font-semibold mb-4">
          Recommended based on your shopping trends
        </h2>

        {/* USE YOUR EXISTING PRODUCTS COMPONENT */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

          {/* ⚠️ Replace this with your real products later */}
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white p-3 border rounded">

              <img
                src="/placeholder.png"
                className="h-[120px] w-full object-contain"
              />

              <p className="text-sm mt-2 line-clamp-2">
                Product Title
              </p>

              <p className="font-semibold mt-1">₹999</p>

            </div>
          ))}

        </div>

      </div>

    </div>
  </main>
);
}