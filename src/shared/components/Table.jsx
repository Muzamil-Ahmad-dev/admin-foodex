 import React from "react";
import { motion } from "framer-motion";

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
    