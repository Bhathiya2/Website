import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getContactById, updateContact } from "../api/ContactApi.js";
import SuccessModal from "../components/SuccessModal.jsx";

export default function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contact = await getContactById(id);
        setName(contact.name || "");
        setEmail(contact.email || "");
        setSubject(contact.subject || "");
        setMessage(contact.message || "");
      } catch (err) {
        setError("Failed to load contact");
        console.error("Error fetching contact:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContact(id, { name, email, subject, message });
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Failed to update contact. Please try again.");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <p className="text-zinc-400">Loading contact...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-8">
          <p className="text-red-400">{error}</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:opacity-90 cursor-pointer">
            Go Back
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Edit Contact Message</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" rows={4} />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:opacity-90 cursor-pointer">Update</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-white/5 rounded-lg hover:opacity-90 cursor-pointer">Cancel</button>
          </div>
        </form>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate("/dashboard/contacts");
        }}
        title="Success"
        message="Contact updated successfully!"
      />
    </AdminLayout>
  );
}
