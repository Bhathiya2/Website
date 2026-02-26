import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { createContact } from "../api/ContactApi.js";
import SuccessModal from "../components/SuccessModal.jsx";

export default function ContactsForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact({ name, email, subject, message });
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error creating contact:", error);
      alert("Failed to create contact. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Add Contact Message</h1>
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
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:opacity-90 cursor-pointer">Create</button>
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
        message="Contact created successfully!"
      />
    </AdminLayout>
  );
}
