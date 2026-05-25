"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const params = useSearchParams();

  const identifier = params.get("identifier") || "";
  const redirect = params.get("redirect"); // 🔥 NEW

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(identifier);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (loading) return; // 🔥 prevent multiple clicks

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          identifier: mobile,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ SUCCESS → redirect properly
        if (redirect) {
          router.push(redirect); // 🔥 go back to sell
        } else {
          router.push("/"); // 🔥 normal signup
        }
      } else {
        // ❌ ONLY show real backend error
        if (data?.msg) {
          alert(data.msg);
        }
      }

    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-10">

      {/* LOGO */}
      <h1 className="text-3xl font-bold mb-6">
        amazon<span className="text-sm align-super">.in</span>
      </h1>

      {/* CARD */}
      <div className="w-[350px] border border-gray-300 rounded-md p-6">

        <h2 className="text-xl font-semibold mb-4">
          Create Account
        </h2>

        <label className="text-sm font-semibold">Mobile number</label>

        <div className="flex gap-2 mt-1 mb-4">
          <div className="border px-3 py-2 rounded bg-gray-100 text-sm">
            IN +91
          </div>

          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="flex-1 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <label className="text-sm font-semibold">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First and last name"
          className="w-full border border-gray-400 rounded px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="text-sm font-semibold">
          Password (at least 6 characters)
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-400 rounded px-3 py-2 mt-1 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <p className="text-xs text-gray-600 mb-4">
          Passwords must be at least 6 characters.
        </p>

        <p className="text-xs text-gray-700 mb-4">
          To verify your number, we will send you a text message with a temporary code.
        </p>

        <button
          onClick={handleSignup}
          disabled={loading} // 🔥 disable while loading
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full font-medium"
        >
          {loading ? "Please wait..." : "Verify mobile number"}
        </button>

        <hr className="my-5" />

        <p className="text-sm">
          Already a customer?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 cursor-pointer"
          >
            Sign in instead
          </span>
        </p>

        <p className="text-xs text-gray-700 mt-4">
          By creating an account, you agree to Amazon’s{" "}
          <span className="text-blue-600 cursor-pointer">Conditions of Use</span>{" "}
          and{" "}
          <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-10 text-center text-xs text-gray-600">
        <div className="flex justify-center gap-4 mb-2">
          <span>Conditions of Use</span>
          <span>Privacy Notice</span>
          <span>Help</span>
        </div>
        <p>© 1996–2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}