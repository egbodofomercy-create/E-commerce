
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axiosConfig from "../api/axiosConfig";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const {
  products,
  cartItems,
  getCartAmount,
  delivery_fee,
  token,
  clearCart,
} = useContext(ShopContext);

  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login before placing an order");
      navigate("/login");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.phone
    ) {
      toast.error("Please fill all delivery details");
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty");
      navigate("/collection");
      return;
    }

    setLoading(true);

    try {
      const orderItems = [];

      for (const itemId in cartItems) {
        const product = products.find(
          (item) => item._id === itemId
        );

        if (!product) continue;

        for (const color in cartItems[itemId]) {
          const quantity = cartItems[itemId][color];

          if (quantity > 0) {
            orderItems.push({
              productId: itemId,
              name: product.name,
              price: product.price,
              image: product.image?.[0] || "",
              color,
              quantity,
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const subtotal = getCartAmount();
      const totalAmount = subtotal + delivery_fee;

      const address = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        phone: formData.phone,
      };

      const paymentMethod =
        method === "card"
          ? "Card"
          : method === "transfer"
          ? "Bank Transfer"
          : "USSD";

      const response = await axiosConfig.post(
        "/api/order/create",
        {
          items: orderItems,
          amount: totalAmount,
          address,
          paymentMethod,
          payment: false,
        }
      );

     if (response.data.success) {
  const cartCleared = await clearCart();

  if (cartCleared) {
    toast.success("Order placed successfully!");
    navigate("/orders");
  } else {
    toast.success("Order placed successfully!");
    toast.error("Order saved, but cart could not be cleared.");
    navigate("/orders");
  }
} else {
        toast.error(
          response.data.message ||
            "Could not place order"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Could not place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="border-t pt-14"
    >
      {/* HEADING */}

      <div className="text-2xl mb-8">
        <h1 className="font-semibold text-blue-500">
          Delivery Information
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-8">

        {/* LEFT SIDE */}

        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

          <div className="flex gap-3">
            <input
              className="border p-3 w-full"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={onChangeHandler}
              required
            />

            <input
              className="border p-3 w-full"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={onChangeHandler}
              required
            />
          </div>

          <input
            className="border p-3 w-full"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />

          <input
            className="border p-3 w-full"
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={onChangeHandler}
            required
          />

          <div className="flex gap-3">
            <input
              className="border p-3 w-full"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={onChangeHandler}
              required
            />

            <input
              className="border p-3 w-full"
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={onChangeHandler}
              required
            />
          </div>

          <input
            className="border p-3 w-full"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="w-full sm:w-[450px]">

          <CartTotal />

          {/* PAYMENT */}

          <div className="mt-8">

            <h2 className="text-lg font-semibold mb-4 text-blue-500">
              Payment Method
            </h2>

            {/* CARD */}

            <div
              onClick={() => setMethod("card")}
              className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition ${
                method === "card"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    method === "card"
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-400"
                  }`}
                />

                <img
                  src={assets.card_icon}
                  alt=""
                  className="w-6"
                />

                <p className="font-medium">
                  Pay with Card
                </p>
              </div>

              <div className="flex gap-2">
                <img
                  src={assets.visa_icon}
                  alt=""
                  className="h-5"
                />

                <img
                  src={assets.mastercard_icon}
                  alt=""
                  className="h-5"
                />

                <img
                  src={assets.verve_icon}
                  alt=""
                  className="h-5"
                />
              </div>
            </div>

            {/* BANK TRANSFER */}

            <div
              onClick={() => setMethod("transfer")}
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer mt-3 transition ${
                method === "transfer"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  method === "transfer"
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              />

              <img
                src={assets.bank_icon}
                alt=""
                className="w-6"
              />

              <p className="font-medium">
                Bank Transfer
              </p>
            </div>

            {/* USSD */}

            <div
              onClick={() => setMethod("ussd")}
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer mt-3 transition ${
                method === "ussd"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  method === "ussd"
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              />

              <img
                src={assets.ussd_icon}
                alt=""
                className="w-6"
              />

              <p className="font-medium">
                USSD
              </p>
            </div>
          </div>

          {/* PLACE ORDER */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 text-white py-3 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
