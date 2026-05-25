"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart();

  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    fetch("https://amazon-clone-backend-production-0d92.up.railway.app/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("User invalid");
        return res.json();
      })
      .then((data) => {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      });
  }, []);

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/search?q=${search}`);
  };

  return (
  <div className="bg-[#131921] text-white w-full">
    
    {/* FULL WIDTH CONTAINER */}
    <div className="flex items-center h-[60px] w-full px-3 gap-2">

      {/* LOGO */}
      <Link href="/">
        <div className="flex items-center cursor-pointer hover:border border-white px-2 py-1">
          <span className="text-[22px] font-bold tracking-wide">
            amazon<span className="text-orange-400">.in</span>
          </span>
        </div>
      </Link>

      {/* LOCATION */}
      <div className="hidden lg:flex flex-col justify-center leading-tight cursor-pointer hover:border border-white px-2 py-1 min-w-fit">
        <span className="text-gray-300 text-[11px]">Delivering to</span>
        <span className="font-bold text-[13px]">Your Location</span>
      </div>

      {/* SEARCH BAR (MOST IMPORTANT FIX) */}
      <div className="flex flex-1 items-center mx-2">

        <div className="flex w-full h-[40px] rounded-md overflow-hidden">

          {/* CATEGORY */}
          <select className="bg-[#e6e6e6] text-black px-2 text-xs outline-none border-r border-gray-300 min-w-[55px]">
            <option>All</option>
          </select>

          {/* INPUT */}
          <input
            type="text"
            placeholder="Search Amazon.in"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full px-3 text-black outline-none text-sm"
          />

          {/* BUTTON */}
          <button
            onClick={handleSearch}
            className="bg-[#febd69] hover:bg-[#f3a847] px-5 flex items-center justify-center"
          >
            🔍
          </button>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* LANGUAGE */}
        <div className="hidden lg:flex items-center cursor-pointer hover:border border-white px-2 py-1">
          🇮🇳 <span className="ml-1 text-sm">EN</span>
        </div>

        {/* ACCOUNT */}
        <div
          onClick={() => {
            if (!user) window.location.href = "/auth/login";
          }}
          className="flex flex-col leading-tight cursor-pointer hover:border border-white px-2 py-1"
        >
          <span className="text-[11px]">
            {user ? `Hello, ${user.name}` : "Hello, sign in"}
          </span>
          <span className="font-bold text-[13px] whitespace-nowrap">
            Account & Lists
          </span>
        </div>

        {/* ORDERS */}
        <Link href="/orders">
          <div className="flex flex-col leading-tight cursor-pointer hover:border border-white px-2 py-1">
            <span className="text-[11px]">Returns</span>
            <span className="font-bold text-[13px]">& Orders</span>
          </div>
        </Link>

        {/* CART */}
        <Link href="/cart">
          <div className="flex items-end cursor-pointer hover:border border-white px-2 py-1 relative">

            <span className="text-[28px]">🛒</span>

            {/* COUNT */}
            <span className="absolute top-0 right-3 text-[12px] font-bold text-[#f08804]">
              {mounted ? totalItems : 0}
            </span>

            <span className="ml-1 font-bold text-[13px]">Cart</span>
          </div>
        </Link>

      </div>
    </div>
  </div>
);
}