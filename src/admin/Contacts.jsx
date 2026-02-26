import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getContacts, deleteContact } from "../api/ContactApi.js";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.jsx";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        setError("Failed to load contacts");
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async () => {
    if (!contactToDelete) return;
    try {
      await deleteContact(contactToDelete.id);
      setContacts(contacts.filter(contact => contact.id !== contactToDelete.id));
      setIsDeleteModalOpen(false);
      setContactToDelete(null);
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Failed to delete contact. Please try again.");
    }
  };

  const openDeleteModal = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };
  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <Link to="/dashboard/contacts/new" className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500 text-black rounded-md font-semibold hover:opacity-90 cursor-pointer">+ Add Contact</Link>
        </div>
        <div className="space-y-4">
          {loading ? (
            <p className="text-zinc-400">Loading contacts...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : contacts.length === 0 ? (
            <p className="text-zinc-400">No contacts found.</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="p-4 rounded-lg bg-black/30 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-zinc-400">
                    From: {contact.email} ({contact.name})
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/contacts/${contact.id}/edit`} className="px-3 py-1 bg-cyan-500 text-black rounded-md text-sm font-semibold hover:opacity-90 cursor-pointer">
                      Edit
                    </Link>
                    <button onClick={() => openDeleteModal(contact)} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:opacity-90 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-sm text-zinc-300 mt-1">
                  Subject: {contact.subject}
                </div>
                <p className="mt-2">"{contact.message}"</p>
              </div>
            ))
          )}
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete the contact from ${contactToDelete?.email}? This action cannot be undone.`}
      />
    </AdminLayout>
  );
}
