 "use client";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Table from "../../shared/components/Table";
import StatusBadge from "../../shared/components/StatusBadge";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const columns = ["ID", "Product Name", "Category", "Price", "Status"];

  const data = [
    [1, "Margherita Pizza", "Pizza", "$12", <StatusBadge status="active" />],
    [2, "Veg Burger", "Burger", "$8", <StatusBadge status="pending" />],
    [3, "Chocolate Cake", "Dessert", "$5", <StatusBadge status="inactive" />],
    [4, "Caesar Salad", "Salad", "$7", <StatusBadge status="active" />],
  ];

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
        Product Management
      </h1>

      {/* Nested routes render here (add / list) */}
      <Outlet />

      <div className="overflow-x-auto mt-6">
        {products.length > 0 ? (
          <Table columns={columns} data={products} />
        ) : (
          <div className="text-gray-400 text-center py-10">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
}
