"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();

  const redirect = params.get("redirect");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);

  useEffect(() => {
    document.body.style.opacity = "1";
    document.body.style.filter = "none";
    document.documentElement.style.opacity = "1";
    document.documentElement.style.filter = "none";
  }, []);

  const handleContinue = async () => {
    const res = await fetch("http://localhost:5000/api/auth/check-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier }),
    });

    const data = await res.json();
    setIsExistingUser(data.exists);
  };

  const handleSubmit = async () => {
    const redirect = params.get("redirect");

    try {
      if (!isExistingUser) {
        const registerRes = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, identifier, password }),
        });

        const registerData = await registerRes.json();

        if (!registerRes.ok) {
          alert(registerData.msg || "Something went wrong");
          return;
        }
      }

      const loginRes = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const loginData = await loginRes.json();

      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));

        router.push(redirect || "/");
      } else {
        alert(loginData.msg || "Login failed");
      }

    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white pt-6">

      <h1 className="text-3xl font-bold mb-6">
        amazon<span className="text-sm align-super">.in</span>
      </h1>

      <div className="w-[350px] border border-gray-300 p-6 rounded-md bg-white">

        <h2 className="text-xl font-semibold mb-4">
          {isExistingUser === null
            ? "Sign in or create account"
            : isExistingUser
            ? "Enter password"
            : "Create account"}
        </h2>

        <label className="text-sm font-medium">
          Enter mobile number or email
        </label>

        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full border border-gray-400 rounded-sm px-2 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {isExistingUser === false && (
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-400 rounded-sm px-2 py-2 mb-4"
          />
        )}

        {isExistingUser !== null && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 rounded-sm px-2 py-2 mb-4"
          />
        )}

        {isExistingUser === null ? (
          <button
            onClick={handleContinue}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-full font-medium"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-full font-medium"
          >
            {isExistingUser ? "Login" : "Register"}
          </button>
        )}

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon's{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Conditions of Use
          </span>{" "}
          and{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Privacy Notice
          </span>.
        </p>

        <hr className="my-4" />

        <p className="text-sm font-semibold">
          Buying for work?
        </p>

        <p className="text-sm text-blue-600 hover:underline cursor-pointer mt-1">
          Create a free business account
        </p>
      </div>

      <div className="mt-10 text-xs text-gray-500 flex gap-6">
        <span className="hover:underline cursor-pointer">Conditions of Use</span>
        <span className="hover:underline cursor-pointer">Privacy Notice</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        © 1996–2026, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginInner />
    </Suspense>
  );
}