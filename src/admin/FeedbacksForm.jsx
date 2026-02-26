import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { createFeedback } from "../api/FeedbackApi";
import SuccessModal from "../components/SuccessModal";

export default function FeedbacksForm() {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [position, setPosition] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    createFeedback({ author, position, rating: Number(rating), message })
      .then(() => {
        setShowSuccessModal(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err?.message || err?.error || "Failed to create feedback");
      })
      .finally(() => setLoading(false));
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/dashboard/feedbacks");
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Add Feedback</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Author</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Position (optional)</label>
            <input value={position} onChange={(e) => setPosition(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Rating (1-5)</label>
            <input type="number" value={rating} onChange={(e) => setRating(Math.max(1, Math.min(5, Number(e.target.value || 1))))} min={1} max={5} className="w-32 p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" rows={4} />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:opacity-90 cursor-pointer disabled:opacity-60">{loading ? 'Creating...' : 'Create'}</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-white/5 rounded-lg hover:opacity-90 cursor-pointer">Cancel</button>
          </div>
          {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
        </form>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Feedback Created Successfully"
        message="The feedback has been added to the system. You will be redirected to the feedbacks list."
      />
    </AdminLayout>
  );
}
