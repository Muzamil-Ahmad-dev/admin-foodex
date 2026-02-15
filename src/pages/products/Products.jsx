 // ProductsPage.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Products</h1>
      {/* Nested routes (Add / List) render here */}
      <Outlet />
    </div>
  );
};

export default ProductsPage;
