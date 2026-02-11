 import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api";
const CONTACT_URL = `${BASE_URL}/contact`;

// ✅ get token from localStorage (set on login)
const getToken = () => localStorage.getItem("accessToken");

const SupportChat = () => {
  const [queries, setQueries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // ------------------------------
  // 1️⃣ Check admin token
  // ------------------------------
  const checkAdminLogin = async () => {
    const token = getToken();
    if (!token) {
      setAdminLoggedIn(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/auth/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.admin && res.data.admin.role === "admin") {
        setAdminLoggedIn(true);
        fetchQueries(token);
        setError("");
      } else {
        setAdminLoggedIn(false);
        setError("Access denied: Admins only");
      }
    } catch (err) {
      setAdminLoggedIn(false);
      setError(err.response?.data?.message || "Unauthorized: Please log in as admin");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // 2️⃣ Fetch queries with token
  // ------------------------------
  const fetchQueries = async (token) => {
    try {
      setLoading(true);
      const res = await axios.get(CONTACT_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueries(res.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // 3️⃣ Send response
  // ------------------------------
  const sendResponse = async () => {
    if (!reply.trim() || !selected) return;
    try {
      setActionLoading(true);
      const token = getToken();
      await axios.put(
        `${CONTACT_URL}/${selected._id}/respond`,
        { response: reply.trim(), status: "resolved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReply("");
      setSelected(null);
      fetchQueries(token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send response");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteQuery = async (id) => {
    if (!window.confirm("Delete this query?")) return;
    try {
      setActionLoading(true);
      const token = getToken();
      await axios.delete(`${CONTACT_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchQueries(token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete query");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    checkAdminLogin();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  if (error && !adminLoggedIn) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!adminLoggedIn) return <div className="min-h-screen flex items-center justify-center text-yellow-600">Please log in as admin to access this panel.</div>;

  // ... render queries same as before
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* your existing UI */}
    </div>
  );
};

export default SupportChat;
