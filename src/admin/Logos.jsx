import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getLogos, deleteLogo } from "../api/LogoApi";
import { API_HOST } from "../api/ProjectApi";

export default function Logos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    getLogos()
      .then((res) => {
        if (!mounted) return;
        const data = Array.isArray(res) ? res : (res?.data || []);
        setItems(data);
      })
      .catch(() => setItems([]))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const openConfirm = (id) => {
    setConfirmId(id);
    setConfirmOpen(true);
    setSuccess("");
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmId(null);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    deleteLogo(id)
      .then(() => {
        setItems((prev) => prev.filter((x) => x.id !== id));
        setSuccess("Logo deleted.");
        setTimeout(() => setSuccess(""), 2500);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setDeletingId(null);
        closeConfirm();
      });
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black">Logos</h1>
          <Link to="new" className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500 text-black rounded-md font-semibold hover:opacity-90 cursor-pointer">+ Add Logo</Link>
        </div>

        {loading ? (
          <div className="text-zinc-400">Loading logos...</div>
        ) : (
          <>
            {success && <div className="mb-4 rounded-md bg-emerald-600/20 border border-emerald-600 text-emerald-200 px-3 py-2">{success}</div>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {items.map((logo) => {
                // backend may return the file under several keys; include `logo` (new column)
                const src = logo?.url || logo?.path || logo?.filename || logo?.image || logo?.logo || logo?.file || logo?.src;
                let resolved = null;
                if (src) {
                  const s = String(src);
                  if (/^https?:\/\//i.test(s) || s.startsWith('//')) {
                    resolved = s;
                  } else {
                    const clean = s.replace(/^\/+/, '');
                    // If the backend already returned a storage path, avoid double-prefixing
                    if (clean.startsWith('storage/')) resolved = `${API_HOST}/${clean}`;
                    else resolved = `${API_HOST}/storage/${clean}`;
                  }
                }

                return (
                  <div key={logo.id} className="p-6 rounded-2xl bg-accent/20 border border-cyan-600 flex flex-col">
                    {resolved && (
                      <div className="mb-4 h-32 w-full overflow-hidden rounded-md flex items-center justify-center">
                        <img
                          src={resolved}
                          alt={logo.name || "logo"}
                          className="h-28 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="100%" height="100%" fill="%230b0b0b"/><text x="50%" y="50%" fill="%23ffffff" font-size="14" text-anchor="middle" dominant-baseline="middle">Image not available</text></svg>';
                          }}
                        />
                      </div>
                    )}
                    {/* image path intentionally hidden */}
                    <div className="text-sm text-zinc-100 uppercase tracking-widest mb-2 mt-3">Logo #{logo.id}</div>
                    <div className="text-2xl font-bold">{logo.name || '—'}</div>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <button onClick={() => openConfirm(logo.id)} disabled={deletingId === logo.id} className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:opacity-90 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed">{deletingId === logo.id ? 'Deleting...' : 'Delete'}</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Confirm modal */}
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeConfirm}>
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-2">Confirm delete</h3>
              <p className="text-sm text-zinc-400 mb-4">Are you sure you want to delete this logo? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={closeConfirm} className="px-4 py-2 bg-white/5 rounded-md cursor-pointer hover:opacity-90">Cancel</button>
                <button onClick={() => handleDelete(confirmId)} disabled={deletingId === confirmId} className="px-4 py-2 bg-red-600 text-white rounded-md hover:opacity-90 cursor-pointer disabled:cursor-not-allowed">{deletingId === confirmId ? 'Deleting...' : 'Delete'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
