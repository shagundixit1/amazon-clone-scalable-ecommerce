
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTimeout(() => {
        router.replace("/auth/login?redirect=/sell");
      }, 0);
    }
  }, [router]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Amazon-clone");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbv8amek4/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    setUploading(true);

    try {
      let uploadedUrls: string[] = [];

      for (let file of files) {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
      }

      console.log("UPLOADED URLS:", uploadedUrls);

      setImages((prev) => [...prev, ...uploadedUrls].slice(0, 3));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }

    setUploading(false);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      router.push("/auth/login");
      return;
    }

    if (!title || !price || !stock) {
      alert("Title, price and quantity are required");
      return;
    }

    if (images.length === 0) {
      alert("At least 1 image is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          categoryName: category,
          stock: Number(stock),
          images,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Added Successfully");

        setTitle("");
        setPrice("");
        setCategory("");
        setStock("");
        setImages([]);

        router.push("/");
        router.refresh();
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeded] flex justify-center items-center">
      <div className="bg-white p-6 w-[400px] shadow">

        <h1 className="text-xl font-bold mb-4">Sell a Product</h1>

        <input
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 mb-3"
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border w-full p-2 mb-3"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border w-full p-2 mb-3"
        />

        {uploading && <p className="text-sm">Uploading images...</p>}

        <input
          placeholder="Category (Electronics, Fashion...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border w-full p-2 mb-3"
        />

        <input
          type="number"
          placeholder="Quantity (Stock)"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border w-full p-2 mb-4"
        />

        <button
          onClick={handleSubmit}
          className="bg-yellow-400 w-full py-2 font-semibold"
        >
          Add Product
        </button>

      </div>
    </div>
  );
}