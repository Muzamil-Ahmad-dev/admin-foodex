 "use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";
import { GiChefToque } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, admin } = useSelector((state) => state.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(adminLogin({ email, password }));

    if (adminLogin.fulfilled.match(resultAction)) {
      const { accessToken, refreshToken } = resultAction.payload;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      setSuccess("Login successful!");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (admin) navigate("/dashboard");
  }, [admin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D1B0E] px-4">
      <div className="p-6 rounded-2xl w-80 sm:w-96 shadow-2xl border border-amber-800">

        {/* Logo */}
        <div className="flex justify-center gap-2 mb-4">
          <GiChefToque className="text-3xl text-amber-500" />
          <h1 className="text-2xl font-bold text-amber-400">
            Foodify
          </h1>
        </div>

        <h2 className="text-center text-amber-300 mb-4">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-2">{error}</p>
        )}
        {success && (
          <p className="text-green-400 text-center mb-2">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-xl px-4 py-2 bg-[#3B2415] text-white placeholder-gray-400 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 caret-white"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-xl px-4 py-2 bg-[#3B2415] text-white placeholder-gray-400 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10 caret-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-amber-300 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/admin/register" className="text-orange-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;