"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 TEMP CHECK (later replace with auth system)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  return (
    <div className="mt-10">

      {/* 🔹 SIGN IN SECTION (ONLY IF NOT LOGGED IN) */}
      {!isLoggedIn && (
        <div className="bg-white text-center py-8 border">
          <h2 className="text-lg font-bold mb-2">
            See personalized recommendations
          </h2>

          <button className="bg-yellow-400 hover:bg-yellow-500 px-8 py-2 rounded font-semibold">
            Sign in
          </button>

          <p className="text-sm mt-2">
            New customer?{" "}
            <span className="text-blue-600 cursor-pointer">
              Start here.
            </span>
          </p>
        </div>
      )}

      {/* 🔹 BACK TO TOP */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-[#37475A] text-white text-center py-3 cursor-pointer hover:bg-[#485769]"
      >
        Back to top
      </div>

      {/* 🔹 MAIN FOOTER */}
      <div className="bg-[#232F3E] text-white px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1200px] mx-auto">

          <div>
            <h3 className="font-bold mb-3">Get to Know Us</h3>
            <p>About Amazon</p>
            <p>Careers</p>
            <p>Press Releases</p>
            <p>Amazon Science</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Connect with Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Make Money with Us</h3>
            <p>Sell on Amazon</p>
            <p>Sell under Amazon Accelerator</p>
            <p>Protect and Build Your Brand</p>
            <p>Amazon Global Selling</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Let Us Help You</h3>
            <p>Your Account</p>
            <p>Returns Centre</p>
            <p>Help</p>
          </div>

        </div>
      </div>

      {/* 🔹 BOTTOM BAR */}
      <div className="bg-[#131A22] text-gray-400 text-center py-6 text-sm">
        <p>Conditions of Use & Sale | Privacy Notice | Interest-Based Ads</p>
        <p className="mt-2">
          © 1996-2026, Amazon Clone
        </p>
      </div>

    </div>
  );
}