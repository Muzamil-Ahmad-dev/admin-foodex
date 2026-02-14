 "use client";

import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaTimes,
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
import { fetchCurrentUser, logout } from "../../features/auth/authSlice";
import axios from "axios";

const Sidebar = ({ isOpen, setIsOpen, mobileOpen, setMobileOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://foodex-backend--muzamilsakhi079.replit.app/api/auth/logout",
        {},
        { withCredentials: true } // cookies sent automatically
      );
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  // Menu items dynamically based on role
  const menu = [
    { name: "Dashboard", icon: FaHome, path: "/dashboard" },

    ...(user?.role === "admin"
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

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isOpenSub = openMenu === item.name;

    // SIMPLE LINK OR ACTION
    if (!item.children) {
      return item.action ? (
        <div
          onClick={item.action}
          className={`cursor-pointer w-full flex items-center rounded-xl px-4 py-3
          ${isOpen ? "gap-4 justify-start" : "justify-center"} text-gray-300 hover:bg-white/5 hover:text-amber-300`}
        >
          <Icon className="text-xl" />
          {isOpen && <span className="text-lg font-medium">{item.name}</span>}
        </div>
      ) : (
        <NavLink to={item.path} end>
          {({ isActive }) => (
            <motion.div
              whileHover={{ x: isOpen ? 6 : 0 }}
              onClick={() => mobileOpen && setMobileOpen(false)}
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

    // NESTED MENU
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
              <FaChevronDown className={`transition-transform ${isOpenSub ? "rotate-180" : ""}`} />
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
                  <NavLink key={child.name} to={child.path} end>
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

  return (
    <>
      {/* DESKTOP */}
      <aside
        className={`hidden lg:flex h-screen border-r transition-all duration-300
          ${isOpen ? "w-72 px-6 bg-[#2D1B0E]/95 border-amber-900/40" : "w-20 px-3 bg-[#3B2A1E]/95 border-amber-900/20"}`}
      >
        <div className="flex flex-col w-full py-8 justify-between">
          <div>
            <div className="flex items-center justify-between">
              {isOpen && (
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Foodify
                </h1>
              )}
              <button onClick={() => setIsOpen(!isOpen)} className="text-amber-400 hover:text-orange-500">
                <FaBars size={20} />
              </button>
            </div>

            <nav className="mt-10 space-y-2">
              {menu.map((item) => (
                <MenuItem key={item.name} item={item} />
              ))}
            </nav>
          </div>

          <div className={`text-xs text-gray-400 ${!isOpen && "hidden"}`}>© 2025 Foodify</div>
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
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#2D1B0E]/95 border-r border-amber-900/40 px-6 py-6 flex flex-col justify-between lg:hidden"
            >
              <nav className="space-y-2">
                {menu.map((item) => (
                  <MenuItem key={item.name} item={item} />
                ))}
              </nav>

              <div className="text-xs text-gray-400">© 2025 Foodify</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
