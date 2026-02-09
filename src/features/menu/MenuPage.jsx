/**
 * @file MenuPage.jsx
 * @description Admin Menu page (Mock data).
 * Displays food menu items in admin table.
 *
 * @author
 * Muzamil Ahmad
 */

import { useState } from "react";
import MenuTable from "./MenuTable";

export default function MenuPage() {
  const [menuItems] = useState([
    {
      _id: "1",
      name: "Paneer Butter Masala",
      category: "Main Course",
      price: 280,
      availability: "available",
      createdAt: "2026-01-20",
    },
    {
      _id: "2",
      name: "Chicken Biryani",
      category: "Main Course",
      price: 350,
      availability: "available",
      createdAt: "2026-01-18",
    },
    {
      _id: "3",
      name: "Veg Momos",
      category: "Starters",
      price: 120,
      availability: "unavailable",
      createdAt: "2026-01-15",
    },
    {
      _id: "4",
      name: "Cold Coffee",
      category: "Beverages",
      price: 90,
      availability: "available",
      createdAt: "2026-01-14",
    },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Menu Items</h1>
      <MenuTable data={menuItems} />
    </div>
  );
}
