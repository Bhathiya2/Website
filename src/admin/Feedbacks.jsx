import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getFeedbacks, deleteFeedback } from "../api/FeedbackApi";

function Stars({ value = 0 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <svg key={i} className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-zinc-600'}`} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.172L12 18.896l-7.336 3.874 1.402-8.172L.132 9.21l8.2-1.192L12 .587z" />
          </svg>
        );
      })}
    </div>
  );
}

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getFeedbacks()
      .then((data) => {
        if (!mounted) return;
        // `getFeedbacks` returns an array
        setFeedbacks(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err?.message || "Failed to load feedbacks");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false };
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Feedbacks</h1>
          <Link to="/dashboard/feedbacks/new" className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500 text-black rounded-md font-semibold hover:opacity-90 cursor-pointer">+ Add Feedback</Link>
        </div>

        {loading ? (
          <div className="text-zinc-400">Loading feedbacks...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : feedbacks.length === 0 ? (
          <div className="text-zinc-400">No feedbacks yet.</div>
        ) : (
          <>
            {success && <div className="mb-4 rounded-md bg-emerald-600/20 border border-emerald-600 text-emerald-200 px-3 py-2">{success}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((f) => (
              <div key={f.id} className="p-4 rounded-2xl bg-accent/20 border border-white/5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-zinc-100 font-semibold">{f.author}</div>
                    {f.position && <div className="text-xs text-zinc-400">{f.position}</div>}
                  </div>
                  <Stars value={Number(f.rating) || 0} />
                </div>
                <div className="text-sm text-zinc-300">{f.message || f.text || f.body}</div>
                <div className="mt-3 flex justify-end">
                  <button onClick={() => { setConfirmId(f.id); setConfirmOpen(true); setSuccess(""); }} disabled={deletingId === f.id} className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:opacity-90 disabled:opacity-60">{deletingId === f.id ? 'Deleting...' : 'Delete'}</button>
                </div>
              </div>
            ))}
            </div>
          </>
        )}
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => { setConfirmOpen(false); setConfirmId(null); }}>
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-2">Confirm delete</h3>
              <p className="text-sm text-zinc-400 mb-4">Are you sure you want to delete feedback #{confirmId}? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => { setConfirmOpen(false); setConfirmId(null); }} className="px-4 py-2 bg-white/5 rounded-md hover:opacity-90 cursor-pointer">Cancel</button>
                <button onClick={async () => {
                    setDeletingId(confirmId);
                    try {
                      await deleteFeedback(confirmId);
                      setFeedbacks((prev) => prev.filter((x) => x.id !== confirmId));
                      setSuccess('Feedback deleted.');
                      setTimeout(() => setSuccess(''), 2500);
                    } catch (err) {
                      console.error(err);
                      setError(err?.message || 'Failed to delete feedback');
                    } finally {
                      setDeletingId(null);
                      setConfirmOpen(false);
                      setConfirmId(null);
                    }
                  }} disabled={deletingId === confirmId} className="px-4 py-2 bg-red-600 text-white rounded-md hover:opacity-90 cursor-pointer">{deletingId === confirmId ? 'Deleting...' : 'Delete'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
