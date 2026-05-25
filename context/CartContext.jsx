"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCart([]);
        return;
      }

      const res = await fetch("https://amazon-clone-backend-production-0d92.up.railway.app/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCart(data.cartItems || []);
      } else {
        setCart([]);
      }
    } catch (err) {
      console.error(err);
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://amazon-clone-backend-production-0d92.up.railway.app/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Error adding to cart");
        return;
      }

      await fetchCart();

    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  // const removeFromCart = (id) => {
  //   setCart((prev) => prev.filter((item) => item.id !== id));
  // };

  // const increaseQty = (id) => {
  //   setCart((prev) =>
  //     prev.map((item) =>
  //       item.id === id
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     )
  //   );
  // };

  const removeFromCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(`https://amazon-clone-backend-production-0d92.up.railway.app/api/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // REFRESH CART FROM BACKEND
    fetchCart();

  } catch (err) {
    console.error(err);
  }
};

  const increaseQty = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    await fetch("https://amazon-clone-backend-production-0d92.up.railway.app/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, type: "inc" }),
    });

    fetchCart();
  } catch (err) {
    console.error(err);
  }
};

const decreaseQty = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    await fetch("https://amazon-clone-backend-production-0d92.up.railway.app/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, type: "dec" }),
    });

    fetchCart();
  } catch (err) {
    console.error(err);
  }
};

const clearCart = () => {
  setCart([]);
};

  

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);