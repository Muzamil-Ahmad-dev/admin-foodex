 import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

// Login page for admin
import LoginPage from "../features/auth/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Admin login route */}
      <Route path="/admin" element={<LoginPage isAdmin={true} />} />

      {/* Admin panel routes (visible to anyone) */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />

        {/* PRODUCTS NESTED ROUTES */}
        <Route path="products" element={<Products />}>
          <Route path="add" element={<AddFood />} />
          <Route path="list" element={<FoodList />} />
        </Route>

        {/* CATEGORIES NESTED ROUTES */}
        <Route path="categories" element={<CategoriesPage />}>
          <Route path="add" element={<CategoriesAdd />} />
          <Route path="list" element={<CategoriesList />} />
        </Route>

        {/* Others */}
        <Route path="users" element={<Users />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
