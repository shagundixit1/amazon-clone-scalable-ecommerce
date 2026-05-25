"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const router = useRouter();

  // 🔹 STATES
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState("TITLE");

  // 🔹 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login?redirect=/sell");
    }
  }, [router]);

  // 🔹 CLOUDINARY
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

  // 🔹 IMAGE HANDLER
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files) as File[];

    if (images.length + files.length > 3) {
      alert("Max 3 images allowed");
      return;
    }

    setUploading(true);

    try {
      let uploaded: string[] = [];

      for (let file of files) {
        const url = await uploadToCloudinary(file);
        uploaded.push(url);
      }

      setImages((prev) => [...prev, ...uploaded]);
    } catch {
      alert("Upload failed");
    }

    setUploading(false);
  };

  // 🔹 SINGLE FINAL SUBMIT
  const handleSubmit = async () => {
    if (submitting) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      return;
    }

    if (!title || !price || !stock || images.length === 0) {
      alert("Fill all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        "https://amazon-clone-backend-production-0d92.up.railway.app/api/products",
        {
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
            description,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Product added");

        // RESET
        setTitle("");
        setPrice("");
        setCategory("");
        setStock("");
        setImages([]);
        setDescription("");

        router.refresh();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Error");
    }

    setSubmitting(false);
  };

  // 🔹 TAB CONTENT (NO SUBMIT HERE)
  const renderContent = () => {
    switch (activeTab) {
      case "TITLE":
        return (
          <input
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2"
          />
        );

      case "IMAGE":
        return (
          <>
            <div className="border border-dashed p-4 flex items-center gap-4">
              <label className="bg-gray-700 text-white px-4 py-2 cursor-pointer">
                Upload images
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
              </label>
              <span className="text-sm text-gray-600">
                Drag images here to upload
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Max 3 images
            </p>

            {uploading && <p>Uploading...</p>}

            <div className="flex gap-3 mt-3">
              {images.map((img, i) => (
                <img key={i} src={img} className="w-16 h-16 object-cover" />
              ))}
            </div>

            <textarea
              placeholder="Add short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border w-full p-2 mt-4"
            />
          </>
        );

      case "CATEGORY":
        return (
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border w-full p-2"
          />
        );

      case "PRICE":
        return (
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border w-full p-2"
          />
        );

      case "QUANTITY":
        return (
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border w-full p-2"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeded] flex justify-center p-10">
      <div className="bg-white p-6 w-[700px] border">

        <h1 className="text-2xl mb-1">List Your Products</h1>
        <p className="text-sm text-gray-600 mb-4">
          Select an option to get started.
        </p>

        {/* TABS */}
        <div className="flex gap-3 mb-4">
          {["TITLE", "IMAGE", "CATEGORY", "PRICE", "QUANTITY"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border text-sm ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT BOX */}
        <div className="border border-blue-400 p-5">
          <p className="mb-4 text-sm">
            Start creating a new listing with just a few keywords and up to 3 images.
          </p>

          {renderContent()}
        </div>

        {/*  ONLY ONE SUBMIT (FINAL FIX) */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`px-6 py-2 ${
              submitting
                ? "bg-gray-400"
                : "bg-[#ffd814] hover:bg-[#f7ca00]"
            }`}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
}