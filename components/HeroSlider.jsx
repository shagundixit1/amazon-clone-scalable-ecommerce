"use client";
import { useEffect, useState } from "react";

const images = [
  "/banners/billboard.jpg",
  "/banners/billboard2.jpg",
  "/banners/billboard3.jpg",
  "/banners/billboard4.jpg",
  "/banners/billboard5.jpg",
  "/banners/billboard6.jpg",
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
    <div className="relative w-full h-[800px] overflow-hidden">

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