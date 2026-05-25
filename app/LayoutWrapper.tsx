"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");
  const isCheckoutPage = pathname.startsWith("/checkout");

  // AUTH PAGE
  if (isAuthPage) {
    return <>{children}</>;
  }

  // CHECKOUT PAGE (AMAZON STYLE)
  if (isCheckoutPage) {
    return (
      <div className="bg-[#eaeded] min-h-screen flex flex-col">

        {/* HEADER */}
        <div className="bg-[#131921] h-[60px] px-6 flex items-center justify-between relative">

          {/* LEFT LOGO */}
          <img
            src="/Amazon.png"
            alt="Amazon"
            className="h-8 cursor-pointer"
            onClick={() => window.location.href = "/"}
          />

          {/* CENTER TITLE */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-white text-[18px] font-medium tracking-wide">
            Secure checkout
          </div>

          {/* RIGHT CART */}
          <div
            onClick={() => window.location.href = "/cart"}
            className="flex items-center gap-2 cursor-pointer text-white"
          >
            <span className="text-[22px]">🛒</span>
            <span className="text-[14px] font-medium">Cart</span>
          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 px-6 py-6">
          {children}
        </div>

        {/* BACK TO TOP */}
        <div className="bg-[#37475a] text-white text-center py-3 text-sm cursor-pointer">
          Back to top
        </div>

        {/* FOOTER */}
        <div className="bg-[#232f3e] text-white text-center py-10 text-sm">
          <p className="mb-2">amazon</p>
          <p className="text-xs text-gray-300">
            Conditions of Use & Sale | Privacy Notice | Interest-Based Ads
          </p>
          <p className="text-xs text-gray-400 mt-1">
            © 1996–2026, Amazon.com, Inc. or its affiliates
          </p>
        </div>

      </div>
    );
  }

  // NORMAL PAGES
  return (
    <>
      <Navbar />
      <SecondNavbar />
      {children}
    </>
  );
}