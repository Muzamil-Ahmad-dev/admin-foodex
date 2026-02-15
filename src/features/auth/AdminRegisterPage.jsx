 import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminRegister } from "./authSlice"; // make sure you import correct slice
import { useNavigate, Link } from "react-router-dom";

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, admin } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // always enforced
  });

  const [success, setSuccess] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(adminRegister(formData));

    if (adminRegister.fulfilled.match(resultAction)) {
      setSuccess("Admin registered successfully!");
      navigate("/dashboard"); // redirect to dashboard
    }
  };

  useEffect(() => {
    // If already logged in as admin, redirect
    if (admin) {
      navigate("/dashboard");
    }
  }, [admin, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-amber-700">
          Admin Registration
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm mt-2 text-center">{success}</p>
          )}
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/admin"
            className="text-amber-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
