"use client";

import { useState, useEffect } from "react";

export default function ProductImages({ product }) {
  const images =
    product?.images?.length > 0
      ? product.images.map((img) => img.imageUrl)
      : product?.thumbnail
      ? [product.thumbnail]
      : [];

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [product]); // important

  return (
    <div>
      {/* MAIN IMAGE */}
      {mainImage && (
        <img
          src={mainImage}
          className="w-full h-[500px] object-contain mb-4"
        />
      )}

      {/* THUMBNAILS */}
      <div className="flex gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setMainImage(img)}
            className={`w-[70px] h-[70px] object-contain border p-1 cursor-pointer ${
              mainImage === img ? "border-black" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}