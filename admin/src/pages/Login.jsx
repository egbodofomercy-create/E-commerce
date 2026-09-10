import { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

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
        setError(response.data.message || "Invalid admin credentials");
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Could not reach the server. Is your backend running?"
      );
    } finally {
      setLoading(false);
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

      {error && (
        <p className="text-red-600 text-sm -mt-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`text-white py-3 rounded transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;