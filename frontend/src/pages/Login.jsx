import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);

  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const switchState = () => {
    setCurrentState((prev) =>
      prev === "Login" ? "Sign Up" : "Login"
    );

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      let response;

      if (currentState === "Sign Up") {
        response = await axiosConfig.post(
          "/api/user/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );
      } else {
        response = await axiosConfig.post(
          "/api/user/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
      }

      if (response.data.success) {
        const userToken = response.data.token;

        localStorage.setItem("token", userToken);
        setToken(userToken);

        toast.success(
          response.data.message ||
            (currentState === "Login"
              ? "Login successful"
              : "Account created successfully")
        );

        navigate("/");
      } else {
        toast.error(
          response.data.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-5 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl text-blue-500 font-semibold">
          {currentState}
        </p>

        <hr className="border-none h-[2px] w-8 bg-blue-500" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChangeHandler}
          placeholder="Name"
          autoComplete="name"
          className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-blue-500"
          required
        />
      )}

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onChangeHandler}
        placeholder="Email"
        autoComplete="email"
        className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-blue-500"
        required
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onChangeHandler}
        placeholder="Password"
        autoComplete={
          currentState === "Login"
            ? "current-password"
            : "new-password"
        }
        className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-blue-500"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer text-gray-500 hover:text-gray-800">
          Forgot your password?
        </p>

        <button
          type="button"
          onClick={switchState}
          className="text-blue-500 hover:text-blue-600"
        >
          {currentState === "Login"
            ? "Create Account"
            : "Login Here"}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white font-medium py-3 rounded transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading
          ? "Please wait..."
          : currentState === "Login"
          ? "Sign In"
          : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
