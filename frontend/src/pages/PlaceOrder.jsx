import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    phone: "",
  });

  const [method, setMethod] = useState("card");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

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

    console.log(formData);
    console.log(method);

    navigate("/orders");
  };

  return (
    <form onSubmit={onSubmitHandler} className="border-t pt-14">

      {/* Heading */}
      <div className="text-2xl mb-8">
        <h1 className="font-semibold text-blue-500">
          Delivery Information
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-8">

        {/* Left Side */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

          <div className="flex gap-3">
            <input
              className="border p-3 w-full"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={onChangeHandler}
            />

            <input
              className="border p-3 w-full"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={onChangeHandler}
            />
          </div>

          <input
            className="border p-3 w-full"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={onChangeHandler}
          />

          <input
            className="border p-3 w-full"
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={onChangeHandler}
          />

          <div className="flex gap-3">
            <input
              className="border p-3 w-full"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={onChangeHandler}
            />

            <input
              className="border p-3 w-full"
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={onChangeHandler}
            />
          </div>

          <input
            className="border p-3 w-full"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={onChangeHandler}
          />

        </div>

        {/* Right Side */}
        <div className="w-full sm:w-[450px]">

          <CartTotal />

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
                ></div>

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
                <img src={assets.visa_icon} alt="" className="h-5" />
                <img src={assets.mastercard_icon} alt="" className="h-5" />
                <img src={assets.verve_icon} alt="" className="h-5" />
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
              ></div>

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
              ></div>

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

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </form>
  );
};

export default PlaceOrder;