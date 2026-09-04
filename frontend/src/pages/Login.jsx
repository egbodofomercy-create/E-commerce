import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

 const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    let response;

    if (currentState === "Sign Up") {
      response = await axiosConfig.post("/api/user/register", formData);
    } else {
      response = await axiosConfig.post("/api/user/login", formData);
    }

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message);
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
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
          className="w-full px-3 py-2 border rounded"
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
        className="w-full px-3 py-2 border rounded"
        required
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onChangeHandler}
        placeholder="Password"
        className="w-full px-3 py-2 border rounded"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">
          Forgot your password?
        </p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-blue-500"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-blue-500"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-3 rounded hover:bg-blue-600 transition"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;