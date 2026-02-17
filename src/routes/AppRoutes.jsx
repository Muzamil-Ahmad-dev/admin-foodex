 import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "../shared/layout/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";

// Products
import ProductsPage from "../pages/products/Products";
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

// Auth
import LoginPage from "../features/auth/LoginPage";
import AdminRegisterPage from "../features/auth/AdminRegisterPage";

/* ==========================
   Admin Protected Route
========================== */
const AdminRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.admin) || {};

  if (!admin) return <Navigate to="/admin" replace />;
  if (admin.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

/* ==========================
   App Routes
========================== */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Admin Auth */}
      <Route path="/admin" element={<LoginPage />} />
      <Route path="/admin/register" element={<AdminRegisterPage />} />

      {/* Admin Protected Area */}
      <Route
        path="/"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Products */}
        <Route path="products">
          <Route index element={<ProductsPage />} />
          <Route path="add" element={<AddFood />} />
          <Route path="list" element={<FoodList />} />
        </Route>

        {/* Categories */}
        <Route path="categories">
          <Route index element={<CategoriesPage />} />
          <Route path="add" element={<CategoriesAdd />} />
          <Route path="list" element={<CategoriesList />} />
        </Route>

        {/* Other pages */}
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AppRoutes;
