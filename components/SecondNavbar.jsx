"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar"; //  IMPORT

export default function SecondNavbar() {
  const [isOpen, setIsOpen] = useState(false); // STATE

  return (
    <>
      <div className="bg-[#232f3e] text-white text-sm">
        <div className="flex items-center px-4 h-[40px] space-x-4 overflow-x-auto">

          {/* ALL MENU */}
          <div
            onClick={() => setIsOpen(true)} // OPEN SIDEBAR
            className="flex items-center gap-1 font-bold cursor-pointer whitespace-nowrap hover:border border-white px-2 py-1"
          >
            ☰ <span>All</span>
          </div>

          {/* REAL AMAZON ITEMS */}
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Fresh </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> MX Player </div>

          <Link href="/sell">
            <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap">
              Sell
            </div>
          </Link>

          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Bestsellers</div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Mobiles</div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Today's Deals </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> New Releases </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Customer Service </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Prime </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Amazon Pay </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Electronics </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Fashion </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Home & Kitchen </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Computers </div>
          <div className="hover:border border-white px-2 py-1 cursor-pointer whitespace-nowrap"> Toys & Games </div>

        </div>
      </div>

      {/* SIDEBAR */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}