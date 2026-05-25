"use client";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505",
  "https://images.unsplash.com/photo-1598514982841-681f3d0d0a86"
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[550px] overflow-hidden">

      {/* IMAGE */}
      <img
        src={images[index]}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* 🔥 AMAZON BLUR + FADE (MAIN FIX) */}
      <div className="absolute bottom-0 w-full h-[260px] bg-gradient-to-t from-[#eaeded] via-[#eaeded]/95 to-transparent" />

      {/* LEFT BUTTON */}
      <button
        onClick={() =>
          setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
        className="absolute left-3 top-1/2 -translate-y-1/2 text-5xl text-black bg-white/40 px-3"
      >
        ‹
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-5xl text-black bg-white/40 px-3"
      >
        ›
      </button>

    </div>
  );
}