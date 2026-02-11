 // src/components/SupportChat.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api/contact";
const PROFILE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api/auth/user/profile";

const SupportChat = () => {
  const [queries, setQueries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // -------------------- Check Admin Login --------------------
  const checkAdminLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.get(PROFILE_URL, { withCredentials: true });

      if (res.data.user.role === "admin") {
        setAdminLoggedIn(true);
        fetchQueries(); // fetch queries only if admin
      } else {
        setError("Access denied: Admins only");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unauthorized: Please log in as admin");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Fetch All Queries (Admin Only) --------------------
  const fetchQueries = async () => {
    try {
      const res = await axios.get(BASE_URL, { withCredentials: true });
      setQueries(res.data.data);
      setError(""); // clear previous errors
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
    }
  };

  // -------------------- Send Admin Response --------------------
  const sendResponse = async () => {
    if (!selected) return;

    try {
      await axios.put(
        `${BASE_URL}/${selected._id}/respond`,
        { response: reply, status: "resolved" },
        { withCredentials: true }
      );

      setReply("");
      setSelected(null);
      fetchQueries(); // refresh list
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send response");
    }
  };

  // -------------------- Delete Query (Admin Only) --------------------
  const deleteQuery = async (id) => {
    if (!window.confirm("Delete this query?")) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
      fetchQueries();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete query");
    }
  };

  useEffect(() => {
    checkAdminLogin();
  }, []);

  // -------------------- Loading State --------------------
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  // -------------------- Error State --------------------
  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 space-y-2">
        <p>{error}</p>
        <button
          onClick={() => {
            setError("");
            checkAdminLogin();
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );

  // -------------------- Not Admin --------------------
  if (!adminLoggedIn)
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-600">
        Please log in as admin to access this panel.
      </div>
    );

  // -------------------- Main Admin Panel --------------------
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Support Panel</h2>

      {/* Queries Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {queries.map((q) => (
          <div key={q._id} className="bg-white rounded-xl shadow p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800">{q.name}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  q.status === "resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {q.status}
              </span>
            </div>

            <p className="text-xs text-gray-500">{q.email}</p>

            <div className="bg-gray-50 border rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">User:</span> {q.message}
              </p>
            </div>

            {q.response && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <span className="font-medium">Admin:</span> {q.response}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setSelected(q);
                  setReply(q.response || "");
                }}
                className="flex-1 bg-blue-600 text-white text-sm py-1.5 rounded-lg hover:bg-blue-700"
              >
                {q.response ? "Edit Reply" : "Reply"}
              </button>

              <button
                onClick={() => deleteQuery(q._id)}
                className="flex-1 bg-red-500 text-white text-sm py-1.5 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => {
            setSelected(null);
            setReply("");
          }}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Reply to {selected.name}
            </h3>

            <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
              <span className="font-medium">User:</span> {selected.message}
            </div>

            <textarea
              className="w-full border rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Type admin response..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelected(null);
                  setReply("");
                }}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={sendResponse}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
