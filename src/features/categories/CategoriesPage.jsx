/**
 * @file CategoriesPage.jsx
 * @description Admin Categories page (Mock data).
 * Displays food categories in a reusable admin table.
 *
 * @author
 * Muzamil Ahmad
 */

import { useState } from "react";
import CategoryTable from "./CategoryTable";

export default function CategoriesPage() {
  const [categories] = useState([
    {
      _id: "1",
      name: "Starters",
      description: "Light dishes served before main course",
      status: "active",
      createdAt: "2026-01-10",
    },
    {
      _id: "2",
      name: "Main Course",
      description: "Full meals with rich flavors",
      status: "active",
      createdAt: "2026-01-12",
    },
    {
      _id: "3",
      name: "Desserts",
      description: "Sweet dishes to finish the meal",
      status: "inactive",
      createdAt: "2026-01-15",
    },
    {
      _id: "4",
      name: "Beverages",
      description: "Drinks and refreshments",
      status: "active",
      createdAt: "2026-01-18",
    },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Food Categories</h1>
      <CategoryTable data={categories} />
    </div>
  );
}
