const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://amazon-clone-backend-production-0d92.up.railway.app";

// fallback if env fails
const FALLBACK_URL = "https://amazon-clone-backend-production-0d92.up.railway.app";

// GET ALL PRODUCTS
export const getProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Primary failed");

    const data = await res.json();
    return data?.data || [];
  } catch {
    // 🔥 fallback
    const res = await fetch(`${FALLBACK_URL}/api/products`);
    const data = await res.json();
    return data?.data || [];
  }
};

// GET PRODUCT BY ID
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Primary failed");

    const data = await res.json();
    return data?.data || null;
  } catch {
    const res = await fetch(`${FALLBACK_URL}/api/products/${id}`);
    const data = await res.json();
    return data?.data || null;
  }
};