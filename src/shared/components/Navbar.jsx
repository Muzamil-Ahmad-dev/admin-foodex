 import { FaBell, FaUserCircle, FaBars, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../../features/auth/authSlice";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.admin);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin");
  };

  return (
    <div className="w-full bg-[#2D1B0E]/90 backdrop-blur-sm border-b border-amber-900/30 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Hamburger + Title */}
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

        {/* Right: Notification + Admin */}
        <div className="flex items-center gap-4 lg:gap-6">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="relative cursor-pointer text-amber-400"
          >
            <FaBell size={22} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="cursor-pointer text-amber-400"
            >
              <FaUserCircle size={26} />
            </motion.div>

            {admin ? (
              <>
                <span className="text-amber-400 font-semibold hidden sm:inline">
                  {admin.name}
                </span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLogout}
                  className="text-red-500 font-semibold hidden sm:inline ml-2 flex items-center gap-1 hover:underline"
                >
                  <FaSignOutAlt /> Logout
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
