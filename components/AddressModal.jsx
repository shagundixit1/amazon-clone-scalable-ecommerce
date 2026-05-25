"use client";

import { useState } from "react";

export default function AddressModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://amazon-clone-backend-production-0d92.up.railway.app/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.mobile,
          postalCode: form.pincode,
          country: "India",
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          state: form.state,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Address added successfully");
        onClose();
        window.location.reload();
      } else {
        alert(data.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Add an address</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="px-6 py-4">

          {/* TITLE */}
          <h3 className="text-xl font-semibold mb-4">
            Enter a new delivery address
          </h3>

          {/* AUTOFILL BOX */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded flex justify-between items-center mb-4">
            <p className="text-sm">
              Save time. Autofill your current location.
            </p>
            <button className="border px-3 py-1 rounded text-sm">
              Autofill
            </button>
          </div>

          {/* COUNTRY */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Country/Region
            </label>
            <select className="w-full border p-2 rounded">
              <option>India</option>
            </select>
          </div>

          {/* FULL NAME */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Full name (First and Last name)
            </label>
            <input
              name="fullName"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* MOBILE */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Mobile number
            </label>
            <input
              name="mobile"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* PINCODE */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Pincode
            </label>
            <input
              name="pincode"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* ADDRESS LINE 1 */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Flat, House no., Building
            </label>
            <input
              name="addressLine1"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* ADDRESS LINE 2 */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Area, Street, Sector
            </label>
            <input
              name="addressLine2"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* LANDMARK */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Landmark
            </label>
            <input
              name="landmark"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* CITY + STATE */}
          <div className="flex gap-3 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Town/City
              </label>
              <input
                name="city"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                State
              </label>
              <input
                name="state"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded font-semibold"
          >
            {loading ? "Saving..." : "Use this address"}
          </button>

        </div>
      </div>
    </div>
  );
}