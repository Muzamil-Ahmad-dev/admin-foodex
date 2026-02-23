 import React, { useEffect, useState } from "react";
import { fetchContacts, deleteContact, respondToContact } from "./contactApi";

function SupportChat() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [responseText, setResponseText] = useState({}); // store responses per contact
  const [respondingId, setRespondingId] = useState(null); // track which contact is being responded

  // Load all contacts
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

  // Optimistic delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this query?")) return;
    try {
      // Remove from UI immediately
      setContacts((prev) => prev.filter((c) => c._id !== id));
      await deleteContact(id);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
      // Re-fetch in case delete failed
      loadContacts();
    }
  };

  // Respond to a contact
  const handleRespond = async (id) => {
    if (!responseText[id]) {
      alert("Response cannot be empty!");
      return;
    }

    try {
      setRespondingId(id);
      const updated = await respondToContact(id, {
        response: responseText[id],
        status: "resolved",
      });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? updated : c))
      );
      // Clear the response input
      setResponseText((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setRespondingId(null);
    }
  };

  if (loading)
    return <p className="text-amber-400 font-semibold">Loading queries...</p>;
  if (error)
    return <p className="text-red-500 font-semibold">{error}</p>;

  return (
    <div className="p-4 sm:p-6">
      {/* Page Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
        Contact Queries
      </h2>

      {/* Grid of Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.length === 0 && (
          <p className="text-gray-400 text-center col-span-full py-6">
            No contact queries found.
          </p>
        )}

        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-[#3B2A1E]/80 p-4 rounded-xl shadow-md text-white flex flex-col justify-between"
          >
            <div className="space-y-1">
              <p>
                <span className="font-semibold text-amber-400">Name:</span>{" "}
                {contact.name}
              </p>
              <p>
                <span className="font-semibold text-amber-400">Email:</span>{" "}
                {contact.email}
              </p>
              <p>
                <span className="font-semibold text-amber-400">Message:</span>{" "}
                {contact.message}
              </p>
              {contact.response && (
                <p>
                  <span className="font-semibold text-amber-400">Response:</span>{" "}
                  {contact.response}
                </p>
              )}
              <p>
                <span className="font-semibold text-amber-400">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    contact.status === "resolved"
                      ? "bg-green-600"
                      : "bg-orange-500"
                  }`}
                >
                  {contact.status.toUpperCase()}
                </span>
              </p>
              <p className="text-xs text-gray-300 mt-1">
                {new Date(contact.createdAt).toLocaleString()}
              </p>

              {/* Respond Section */}
              {!contact.response && (
                <div className="mt-2">
                  <textarea
                    value={responseText[contact._id] || ""}
                    onChange={(e) =>
                      setResponseText({
                        ...responseText,
                        [contact._id]: e.target.value,
                      })
                    }
                    placeholder="Type response..."
                    className="w-full p-2 rounded bg-gray-800 text-white text-sm"
                  />
                  <button
                    onClick={() => handleRespond(contact._id)}
                    disabled={respondingId === contact._id}
                    className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                  >
                    {respondingId === contact._id ? "Responding..." : "Respond"}
                  </button>
                </div>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(contact._id)}
              className="mt-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition self-start"
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