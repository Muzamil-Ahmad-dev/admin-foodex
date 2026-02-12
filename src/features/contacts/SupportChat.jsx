 import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BASE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api";
const CONTACT_URL = `${BASE_URL}/contact`;

const SupportChat = () => {
  const { user } = useSelector((state) => state.auth); // ✅ use Redux
  const [queries, setQueries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // ------------------------------
  // 1️⃣ Fetch queries if admin
  // ------------------------------
  const fetchQueries = async () => {
    if (!user || user.role !== "admin") return;
    try {
      setLoading(true);
      const res = await axios.get(CONTACT_URL, { withCredentials: true });
      setQueries(res.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // 2️⃣ Send response
  // ------------------------------
  const sendResponse = async () => {
    if (!reply.trim() || !selected) return;
    try {
      setActionLoading(true);
      await axios.put(
        `${CONTACT_URL}/${selected._id}/respond`,
        { response: reply.trim(), status: "resolved" },
        { withCredentials: true }
      );
      setReply("");
      setSelected(null);
      fetchQueries();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send response");
    } finally {
      setActionLoading(false);
    }
  };

  // ------------------------------
  // 3️⃣ Delete query
  // ------------------------------
  const deleteQuery = async (id) => {
    if (!window.confirm("Delete this query?")) return;
    try {
      setActionLoading(true);
      await axios.delete(`${CONTACT_URL}/${id}`, { withCredentials: true });
      fetchQueries();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete query");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") fetchQueries();
    else setLoading(false);
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  if (!user || user.role !== "admin") return <div className="min-h-screen flex items-center justify-center text-yellow-600">Please log in as admin to access this panel.</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4 text-amber-700">Support Queries</h2>
      
      {queries.length === 0 ? (
        <p>No queries yet.</p>
      ) : (
        <ul className="space-y-4">
          {queries.map((q) => (
            <li key={q._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
              <div>
                <p><strong>{q.name}:</strong> {q.message}</p>
                {q.response && <p className="text-green-600 mt-1"><strong>Response:</strong> {q.response}</p>}
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => setSelected(q)}
                  disabled={actionLoading}
                  className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
                >
                  Respond
                </button>
                <button
                  onClick={() => deleteQuery(q._id)}
                  disabled={actionLoading}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Response box */}
      {selected && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Reply to {selected.name}</h3>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <div className="flex gap-2">
            <button
              onClick={sendResponse}
              disabled={actionLoading}
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
            >
              {actionLoading ? "Sending..." : "Send Reply"}
            </button>
            <button
              onClick={() => { setSelected(null); setReply(""); }}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
