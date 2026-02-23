 /**
 * @file AdminRegisterPage.jsx
 * @description
 * This component renders the **Admin Registration Page** for the Foodify application.
 * It allows new administrators to register by providing their name, email, and password.
 * 
 * Features include:
 * - Form input handling for name, email, and password
 * - Show/hide password toggle
 * - Integration with Redux for admin registration
 * - Feedback messages for success or error
 * - Automatic navigation to dashboard upon successful registration or if already logged in
 * - Responsive styling using Tailwind CSS
 * - Icons for enhanced UI using React Icons
 * 
 * @module Pages/AdminRegisterPage
 * @author 
 * Muzamil Ahmad
 *
 * @dependencies
 * - React & React Hooks (useState, useEffect)
 * - React Redux (useDispatch, useSelector) for state management
 * - React Router (useNavigate, Link) for navigation
 * - React Icons (GiChefToque, FaEye, FaEyeSlash) for UI elements
 * - Redux Slice: authSlice for admin registration
 */

"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminRegister } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";
import { GiChefToque } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * Admin Registration Page Component
 * 
 * Handles the complete lifecycle of admin registration:
 * - Capturing form inputs
 * - Dispatching registration action
 * - Handling loading, success, and error states
 * - Navigating to dashboard upon success
 */
const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux state for admin registration */
  const { loading, error, admin } = useSelector((state) => state.admin);

  /** Form data state for controlled inputs */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  /** Show/hide password state */
  const [showPassword, setShowPassword] = useState(false);

  /** Local success message state */
  const [success, setSuccess] = useState(null);

  /**
   * Handle input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /**
   * Handle form submission
   * Dispatches admin registration action to Redux
   * Stores tokens in sessionStorage and navigates to dashboard on success
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(adminRegister(formData));

    if (adminRegister.fulfilled.match(resultAction)) {
      const { accessToken, refreshToken } = resultAction.payload;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      setSuccess("Admin registered successfully!");
      navigate("/dashboard");
    }
  };

  /**
   * Redirect to dashboard if already logged in
   */
  useEffect(() => {
    if (admin) navigate("/dashboard");
  }, [admin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D1B0E] px-4">
      <div className="p-6 rounded-2xl w-80 sm:w-96 shadow-2xl border border-amber-800">
        
        {/* Logo Header */}
        <div className="flex justify-center gap-2 mb-4">
          <GiChefToque className="text-3xl text-amber-500" />
          <h1 className="text-2xl font-bold text-amber-400">
            Foodify
          </h1>
        </div>

        <h2 className="text-center text-amber-300 mb-4">
          Admin Registration
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-2">{error}</p>
        )}

        {success && (
          <p className="text-green-400 text-center mb-2">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full rounded-xl px-4 py-2 bg-[#3B2415] text-white placeholder-gray-400 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 caret-white"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full rounded-xl px-4 py-2 bg-[#3B2415] text-white placeholder-gray-400 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 caret-white"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-amber-300 mt-4">
          Already have an account?{" "}
          <Link to="/admin" className="text-orange-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegisterPage;