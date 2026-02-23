 import React from "react";
import { motion } from "framer-motion";

/**
 * Badge component to display a status label with color coding and animation.
 *
 * @param {Object} props
 * @param {string} props.status - The status to display. Can be "active", "inactive", or "pending".
 *                                 Any other value will display as a gray badge.
 * @component
 * @example
 * return <StatusBadge status="active" />
 */
const StatusBadge = ({ status }) => {
  const colors = {
    active: "bg-green-500/20 text-green-400",
    inactive: "bg-red-500/20 text-red-400",
    pending: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase ${colors[status] || "bg-gray-500/20 text-gray-400"}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
};

export default StatusBadge;