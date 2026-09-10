/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosConfig from "../api/axiosConfig";

export const ShopContext = createContext({});

const ShopContextProvider = ({ children }) => {
  const currency = "₦";
  const delivery_fee = 5000;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );
const clearCart = async () => {
  if (!token) return false;

  try {
    const response = await axiosConfig.post("/api/cart/clear");

    if (response.data.success) {
      setCartItems({});
      return true;
    }

    toast.error(response.data.message || "Could not clear cart");
    return false;
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
        "Could not clear cart"
    );

    return false;
  }
};
  // ================= GET PRODUCTS =================

  const getProductsData = async () => {
    try {
      const response = await axiosConfig.get("/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    }
  };

  // ================= GET USER CART =================

  const getUserCart = async () => {
    if (!token) {
      setCartItems({});
      return;
    }

    try {
      const response = await axiosConfig.post("/api/cart/get");

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        setCartItems({});
      }
    }
  };

  // ================= ADD TO CART =================

  const addToCart = async (itemId, color) => {
    if (!token) {
      toast.error("Please login to add items to your cart");
      return;
    }

    if (!color) {
      toast.error("Please select a color");
      return;
    }

    try {
      const response = await axiosConfig.post("/api/cart/add", {
        itemId,
        color,
      });

      if (response.data.success) {
        setCartItems((prev) => {
          const cartData = structuredClone(prev);

          if (!cartData[itemId]) {
            cartData[itemId] = {};
          }

          if (cartData[itemId][color]) {
            cartData[itemId][color] += 1;
          } else {
            cartData[itemId][color] = 1;
          }

          return cartData;
        });

        toast.success("Added to cart!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ================= REMOVE ONE =================

  const removeFromCart = async (itemId, color) => {
    if (!token) return;

    try {
      const response = await axiosConfig.post("/api/cart/remove", {
        itemId,
        color,
      });

      if (response.data.success) {
        setCartItems((prev) => {
          const cartData = structuredClone(prev);

          if (!cartData[itemId]?.[color]) {
            return prev;
          }

          if (cartData[itemId][color] > 1) {
            cartData[itemId][color] -= 1;
          } else {
            delete cartData[itemId][color];

            if (
              Object.keys(cartData[itemId]).length === 0
            ) {
              delete cartData[itemId];
            }
          }

          return cartData;
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ================= UPDATE QUANTITY =================

  const updateQuantity = async (
    itemId,
    color,
    quantity
  ) => {
    if (!token) return;

    const currentQuantity =
      cartItems[itemId]?.[color] || 0;

    // Remove completely
    if (quantity <= 0) {
      try {
        for (let i = 0; i < currentQuantity; i++) {
          await axiosConfig.post("/api/cart/remove", {
            itemId,
            color,
          });
        }

        setCartItems((prev) => {
          const cartData = structuredClone(prev);

          if (cartData[itemId]) {
            delete cartData[itemId][color];

            if (
              Object.keys(cartData[itemId]).length === 0
            ) {
              delete cartData[itemId];
            }
          }

          return cartData;
        });
      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message ||
            "Could not remove item"
        );
      }

      return;
    }

    // Check stock
    const product = products.find(
      (item) => item._id === itemId
    );

    if (product && quantity > product.stock) {
      toast.error(
        `Only ${product.stock} available in stock`
      );
      return;
    }

    const difference =
      quantity - currentQuantity;

    try {
      if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          await axiosConfig.post("/api/cart/add", {
            itemId,
            color,
          });
        }
      }

      if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
          await axiosConfig.post("/api/cart/remove", {
            itemId,
            color,
          });
        }
      }

      setCartItems((prev) => {
        const cartData = structuredClone(prev);

        if (!cartData[itemId]) {
          cartData[itemId] = {};
        }

        cartData[itemId][color] = quantity;

        return cartData;
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Could not update quantity"
      );
    }
  };

  // ================= CART COUNT =================

  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      for (const color in cartItems[item]) {
        if (cartItems[item][color] > 0) {
          totalCount += cartItems[item][color];
        }
      }
    }

    return totalCount;
  };

  // ================= CART AMOUNT =================

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      const itemInfo = products.find(
        (product) => product._id === item
      );

      if (!itemInfo) continue;

      for (const color in cartItems[item]) {
        if (cartItems[item][color] > 0) {
          totalAmount +=
            itemInfo.price *
            cartItems[item][color];
        }
      }
    }

    return totalAmount;
  };

  // ================= LOAD PRODUCTS =================

  // Product fetching is intentionally done on mount.
  // The ESLint rule can incorrectly flag this standard
  // async data-fetching pattern.
  useEffect(() => {
    getProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================= LOAD USER CART =================

  useEffect(() => {
    getUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ================= CONTEXT =================

  const value = {
    products,
    currency,
    delivery_fee,

    search,
    setSearch,

    showSearch,
    setShowSearch,

    token,
    setToken,

    cartItems,
    setCartItems,

    getProductsData,
    getUserCart,

    addToCart,
    removeFromCart,
    updateQuantity,

    getCartCount,
    getCartAmount,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;