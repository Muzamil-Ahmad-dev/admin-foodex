 import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "../shared/layout/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";

// Products
import Products from "../pages/products/Products";
import AddFood from "../pages/products/Add";
import FoodList from "../pages/products/List";

// Categories
import CategoriesPage from "../pages/categories/Categories";
import CategoriesAdd from "../pages/categories/Add";
import CategoriesList from "../pages/categories/List";

// Others
import Users from "../pages/users/Users";
import ContactPage from "../pages/contact/Contact";
import OrdersPage from "../pages/orders/Orders";

// Login/Register
import LoginPage from "../features/auth/LoginPage";
import AdminRegisterPage from "../features/auth/AdminRegisterPage";

// Protected Route for Admin
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/admin" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ADMIN LOGIN/REGISTER */}
      <Route path="/admin" element={<LoginPage />} />
      <Route path="/admin/register" element={<AdminRegisterPage />} />

      {/* PROTECTED ADMIN DASHBOARD */}
      <Route
        path="/"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />

        {/* Products */}
        <Route path="products">
          <Route index element={<Products />} />
          <Route path="add" element={<AddFood />} />
          <Route path="list" element={<FoodList />} />
        </Route>

        {/* Categories */}
        <Route path="categories">
          <Route index element={<CategoriesPage />} />
          <Route path="add" element={<CategoriesAdd />} />
          <Route path="list" element={<CategoriesList />} />
        </Route>

        {/* Other admin pages */}
        <Route path="users" element={<Users />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      {/* Redirect root to dashboard for logged-in admin */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Catch-all 404 redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
