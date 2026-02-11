 import { FaBell, FaUserCircle, FaBars, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdminDashboard, logout as logoutApi } from "../auth/auth.api";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch admin profile
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const res = await getAdminDashboard(); // ✅ API call to /admin/dashboard
        setAdmin(res.admin); // res.admin comes from backend
      } catch (err) {
        setAdmin(null);
        console.error("Admin fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi(); // clears refresh token cookie
      setAdmin(null);
      localStorage.removeItem("accessToken");
      navigate("/admin"); // redirect to admin login
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="w-full bg-[#2D1B0E]/90 backdrop-blur-sm border-b border-amber-900/30 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Hamburger + Dashboard Title */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-amber-400"
          >
            <FaBars size={22} />
          </motion.button>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
            Dashboard
          </h2>
        </div>

        {/* Right: Notification + Admin / Login */}
        <div className="flex items-center gap-4 lg:gap-6">
          <motion.div whileHover={{ scale: 1.2 }} className="relative cursor-pointer text-amber-400">
            <FaBell size={22} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="cursor-pointer text-amber-400">
              <FaUserCircle size={26} />
            </motion.div>

            {loading ? (
              <span className="text-amber-400 font-semibold hidden sm:inline">Loading...</span>
            ) : admin ? (
              <>
                <span className="text-amber-400 font-semibold hidden sm:inline">{admin.name}</span>
                <motion.button
                  onClick={handleLogout}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 ml-2 hidden sm:inline"
                  title="Logout"
                >
                  <FaSignOutAlt />
                </motion.button>
              </>
            ) : (
              <Link
                to="/admin"
                className="text-amber-400 font-semibold hover:underline hidden sm:inline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="h-[3px] w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 shadow-md" />
    </div>
  );
};

export default Navbar;
