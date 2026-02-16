 import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
   All Routes Public
========================== */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth pages (optional) */}
      <Route path="/admin" element={<LoginPage />} />
      <Route path="/admin/register" element={<AdminRegisterPage />} />

      {/* All pages inside layout */}
      <Route path="/" element={<AdminLayout />}>
        {/* Dashboard - now public */}
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
