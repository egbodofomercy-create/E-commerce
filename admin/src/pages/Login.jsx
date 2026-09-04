import { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
  setToken(response.data.token);
  localStorage.setItem("adminToken", response.data.token);
} else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-4 w-[90%] sm:max-w-96 m-auto mt-20"
    >
      <h1 className="text-2xl font-semibold text-blue-500">
        Admin Login
      </h1>

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3"
        required
      />

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-3"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-3 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;