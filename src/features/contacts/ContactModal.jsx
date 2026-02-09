 /**
 * @file ContactModal.jsx
 * @description Modal to view and resolve support queries (Mock).
 */

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function ContactModal({ contact, onClose, onResolve }) {
  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl w-96 p-6 relative shadow-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <FaTimes />
          </button>

          <h2 className="text-xl font-bold mb-4">Contact Details</h2>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Name:</strong> {contact.name}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Message:</strong> {contact.message}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{contact.status}</span>
            </p>
          </div>

          {contact.status === "open" && (
            <button
              onClick={() => onResolve(contact._id)}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              Mark as Resolved
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
