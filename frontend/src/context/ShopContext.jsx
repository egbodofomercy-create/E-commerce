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
  // Cart State
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Add To Cart
  const addToCart = async (itemId, color) => {
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
      let cartData = structuredClone(cartItems);

      if (cartData[itemId]) {
        if (cartData[itemId][color]) {
          cartData[itemId][color] += 1;
        } else {
          cartData[itemId][color] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][color] = 1;
      }

      setCartItems(cartData);
      toast.success("Added to cart!");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};
  const updateQuantity = (itemId, color, quantity) => {
  let cartData = structuredClone(cartItems);

  if (quantity === 0) {
    delete cartData[itemId][color];

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  } else {
    cartData[itemId][color] = quantity;
  }

  setCartItems(cartData);
};
  // Total Cart Items
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

  // Total Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);

      if (!itemInfo) continue;

      for (const color in cartItems[item]) {
        if (cartItems[item][color] > 0) {
          totalAmount += itemInfo.price * cartItems[item][color];
        }
      }
    }

    return totalAmount;
  };

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
    toast.error(error.response?.data?.message || error.message);
  }
};

useEffect(() => {
  const fetchProducts = async () => {
    await getProductsData();
  };

  fetchProducts();
}, []);


  const value = {
  products,
  currency,
  delivery_fee,
  search,
  token,
  setToken,
  setSearch,
  showSearch,
  setShowSearch,
  cartItems,
  setCartItems,
  addToCart,
  updateQuantity,
  getCartCount,
  getCartAmount,
};

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;