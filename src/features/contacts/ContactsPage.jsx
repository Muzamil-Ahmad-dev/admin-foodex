/**
 * @file ContactsPage.jsx
 * @description Admin Support / Contact page (Mock data).
 */

import { useState } from "react";
import ContactTable from "./ContactTable";
import ContactModal from "./ContactModal";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      message: "I have an issue with my order.",
      status: "open",
      createdAt: "2026-01-30",
    },
    {
      _id: "2",
      name: "Sara Khan",
      email: "sara@gmail.com",
      message: "Food was delivered late.",
      status: "resolved",
      createdAt: "2026-01-29",
    },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);

  const handleResolve = (id) => {
    setContacts((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, status: "resolved" } : c
      )
    );
    setSelectedContact(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Support Queries</h1>

      <ContactTable
        data={contacts}
        onView={(contact) => setSelectedContact(contact)}
      />

      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onResolve={handleResolve}
        />
      )}
    </div>
  );
}
