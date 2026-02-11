 // src/components/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginThunk, adminLoginThunk } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ isAdmin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      if (isAdmin) {
        const result = await dispatch(adminLoginThunk({ email, password })).unwrap();
        if (result.role === "admin") navigate("/admin/dashboard");
      } else {
        const result = await dispatch(userLoginThunk({ email, password })).unwrap();
        if (result.role === "user") navigate("/orders");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">
        {isAdmin ? "Admin Login" : "User Login"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 rounded text-white font-bold ${
          loading ? "bg-gray-400" : "bg-amber-500"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </form>
  );
};

export default LoginPage;
