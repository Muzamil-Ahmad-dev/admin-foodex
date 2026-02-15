 import React, { useEffect, useState } from "react";
import {
  fetchContacts,
  deleteContact,
} from "./contactApi";

function SupportChat() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await fetchContacts();
      setContacts(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this query?")) return;

    try {
      await deleteContact(id);
      loadContacts();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p>Loading queries...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-700">
        Contact Queries
      </h2>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="border p-3 rounded shadow bg-white"
          >
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Message:</strong> {contact.message}</p>
            <p><strong>Status:</strong> {contact.status}</p>

            <button
              onClick={() => handleDelete(contact._id)}
              className="mt-2 text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupportChat;
