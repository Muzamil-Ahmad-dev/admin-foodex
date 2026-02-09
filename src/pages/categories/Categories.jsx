 import React from "react";
import { Outlet } from "react-router-dom";

function CategoriesPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Categories Management
      </h1>

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}

export default CategoriesPage;
