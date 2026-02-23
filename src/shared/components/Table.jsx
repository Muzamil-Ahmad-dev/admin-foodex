 import React from "react";
import { motion } from "framer-motion";

/**
 * A reusable table component with hover animation.
 *
 * @param {Object} props
 * @param {string[]} props.columns - Array of column header titles
 * @param {Array<Array<React.ReactNode>>} props.data - 2D array of table rows and cells
 * @component
 * @example
 * const columns = ["Name", "Email", "Status"];
 * const data = [
 *   ["Alice", "alice@example.com", <StatusBadge status="active" />],
 *   ["Bob", "bob@example.com", <StatusBadge status="inactive" />],
 * ];
 * return <Table columns={columns} data={data} />
 */
const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-[#3B1F0F]/70 rounded-xl shadow-lg border border-amber-900/30">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead className="bg-[#3B1F0F]/80 text-amber-400">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-semibold border-b border-amber-800"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr
              key={i}
              whileHover={{ backgroundColor: "rgba(120, 53, 15, 0.2)" }}
              className="border-b border-amber-800 text-gray-300 text-xs sm:text-sm md:text-base"
            >
              {row.map((cell, idx) => (
                <td key={idx} className="px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;