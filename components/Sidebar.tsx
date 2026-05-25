"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext"; // adjust path if needed

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const { clearCart } = useCart();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

//   clear cart from local storage so after logout it should not show in logged out app
//   localStorage.removeItem("cart");
  clearCart(); 
//   after logout website should be auto refresh as window object checked that itself while doing through router you have to refresh by yourself
  window.location.href = "/";
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* SIDEBAR */}
      <div className="relative w-[280px] bg-white h-full shadow-lg p-4">

        <h2 className="text-lg font-bold mb-4">Hello</h2>

        <hr className="mb-4" />

        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}