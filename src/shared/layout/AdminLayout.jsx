 "use client";

import { useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-amber-950/10 text-gray-100 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar
        isOpen={desktopOpen}
        setIsOpen={setDesktopOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Navbar */}
        <Navbar menuOpen={mobileOpen} setMenuOpen={setMobileOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#2D1B0E]">
          <Outlet /> {/* Nested routes will render here */}
        </main>
      </div>
    </div>
  );
}
