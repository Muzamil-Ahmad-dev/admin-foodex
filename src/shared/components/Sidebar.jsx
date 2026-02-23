 "use client";

import React, { useState } from "react";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaBars,
  FaTags,
  FaHeadset,
  FaShoppingCart,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../features/auth/authSlice";

/**
 * Sidebar component for desktop and mobile.
 * Displays navigation menu with nested items, admin-only sections,
 * and logout functionality.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Sidebar open state for desktop
 * @param {Function} props.setIsOpen - Toggle sidebar open state
 * @param {boolean} props.mobileOpen - Sidebar open state for mobile
 * @param {Function} props.setMobileOpen - Toggle mobile sidebar
 * @component
 * @example
 * return <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
 */
const Sidebar = ({ isOpen, setIsOpen, mobileOpen, setMobileOpen }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const [openMenu, setOpenMenu] = useState(null);

  /**
   * Handles admin logout and closes mobile sidebar if open
   */
  const handleLogout = async () => {
    await dispatch(adminLogout());
    if (mobileOpen) setMobileOpen(false);
  };

  // Sidebar menu configuration
  const menu = [
    { name: "Dashboard", icon: FaHome, path: "/dashboard" },
    ...(admin?.role === "admin"
      ? [
          {
            name: "Categories",
            icon: FaTags,
            children: [
              { name: "Add Category", icon: FaPlus, path: "/categories/add" },
              { name: "Category List", icon: FaList, path: "/categories/list" },
            ],
          },
          {
            name: "Products",
            icon: FaBox,
            children: [
              { name: "Add Product", icon: FaPlus, path: "/products/add" },
              { name: "Product List", icon: FaList, path: "/products/list" },
            ],
          },
          { name: "Users", icon: FaUsers, path: "/users" },
          { name: "Orders", icon: FaShoppingCart, path: "/orders" },
        ]
      : []),
    { name: "Contact & Support", icon: FaHeadset, path: "/contact" },
    { name: "Logout", icon: FaSignOutAlt, action: handleLogout },
  ];

  /**
   * Render a menu item (can be parent with children or single item)
   *
   * @param {Object} props
   * @param {Object} props.item - Menu item configuration
   * @returns {JSX.Element}
   */
  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isOpenSub = openMenu === item.name;

    // Single item without children
    if (!item.children) {
      return item.action ? (
        <div
          onClick={item.action}
          className={`cursor-pointer w-full flex items-center rounded-xl px-4 py-3
            ${isOpen ? "gap-4 justify-start" : "justify-center"}
            text-gray-300 hover:bg-white/5 hover:text-amber-300`}
        >
          <Icon className="text-xl" />
          {isOpen && <span className="text-lg font-medium">{item.name}</span>}
        </div>
      ) : (
        <NavLink to={item.path} end onClick={() => mobileOpen && setMobileOpen(false)}>
          {({ isActive }) => (
            <motion.div
              whileHover={{ x: isOpen ? 6 : 0 }}
              className={`relative w-full flex items-center rounded-xl px-4 py-3
                ${isOpen ? "gap-4 justify-start" : "justify-center"}
                ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-amber-300"
                }`}
            >
              <Icon className="text-xl" />
              {isOpen && <span className="text-lg font-medium">{item.name}</span>}
            </motion.div>
          )}
        </NavLink>
      );
    }

    // Parent item with children
    return (
      <div>
        <motion.div
          onClick={() => setOpenMenu(isOpenSub ? null : item.name)}
          className={`cursor-pointer w-full flex items-center rounded-xl px-4 py-3
            ${isOpen ? "gap-4 justify-start" : "justify-center"}
            text-gray-300 hover:bg-white/5 hover:text-amber-300`}
        >
          <Icon className="text-xl" />
          {isOpen && (
            <>
              <span className="text-lg font-medium flex-1">{item.name}</span>
              <FaChevronDown
                className={`transition-transform ${isOpenSub ? "rotate-180" : ""}`}
              />
            </>
          )}
        </motion.div>

        <AnimatePresence>
          {isOpen && isOpenSub && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-10 mt-1 space-y-1 overflow-hidden"
            >
              {item.children.map((child) => {
                const ChildIcon = child.icon;
                return (
                  <NavLink
                    key={child.name}
                    to={child.path}
                    end
                    onClick={() => mobileOpen && setMobileOpen(false)}
                  >
                    {({ isActive }) => (
                      <div
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm
                          ${
                            isActive
                              ? "text-amber-400 bg-white/5"
                              : "text-gray-400 hover:text-amber-300"
                          }`}
                      >
                        <ChildIcon className="text-xs" />
                        {child.name}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Scrollable container classes
  const scrollClass =
    "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-transparent hover:scrollbar-thumb-amber-400";

  return (
    <>
      {/* DESKTOP */}
      <aside
        className={`hidden lg:flex h-screen border-r transition-all duration-300
          ${isOpen ? "w-72 px-6 bg-[#2D1B0E]/95 border-amber-900/40" : "w-20 px-3 bg-[#3B2A1E]/95 border-amber-900/20"}`}
      >
        <div className="flex flex-col w-full h-full py-4 justify-between">
          <div className={scrollClass}>
            <div className="flex items-center justify-between mb-4">
              {isOpen && (
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Foodify
                </h1>
              )}
              <button onClick={() => setIsOpen(!isOpen)} className="text-amber-400 hover:text-orange-500">
                <FaBars size={20} />
              </button>
            </div>
            <nav className="space-y-2">{menu.map((item) => <MenuItem key={item.name} item={item} />)}</nav>
          </div>
          <div className={`text-xs text-gray-400 mt-4 ${!isOpen && "hidden"}`}>© 2025 Foodify</div>
        </div>
      </aside>

      {/* MOBILE */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#2D1B0E]/95 border-r border-amber-900/40 px-6 py-6 flex flex-col lg:hidden"
            >
              <div className={`${scrollClass} space-y-2`}>
                <div className="flex items-center justify-between mb-4">
                  {isOpen && (
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      Foodify
                    </h1>
                  )}
                  <button onClick={() => setMobileOpen(false)} className="text-amber-400 hover:text-orange-500">
                    <FaBars size={20} />
                  </button>
                </div>
                <nav className="space-y-2">{menu.map((item) => <MenuItem key={item.name} item={item} />)}</nav>
              </div>
              <div className="text-xs text-gray-400 mt-4">© 2025 Foodify</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;