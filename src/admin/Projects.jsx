import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getProjects, deleteProject, API_HOST } from "../api/ProjectApi";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getProjects()
      .then((res) => {
        setProjects(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError(err?.response?.data?.message || err.message || "Failed to load projects");
      })
      .finally(() => setLoading(false));
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
    // perform delete (called after user confirms)
    setDeletingId(id);
    deleteProject(id)
      .then(() => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setSuccess("Project deleted.");
        // clear success after a short delay
        setTimeout(() => setSuccess(""), 2500);
      })
      .catch((err) => {
        console.error(err);
        setError(err?.response?.data?.message || err.message || "Failed to delete project");
      })
      .finally(() => {
        setDeletingId(null);
        closeConfirm();
      });
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black">Projects</h1>
          <Link to="/dashboard/projects/new" className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500 text-black rounded-md font-semibold hover:opacity-90 cursor-pointer">+ Add Project</Link>
        </div>

        {loading ? (
          <div className="text-zinc-400">Loading projects...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <>
            {success && <div className="mb-4 rounded-md bg-emerald-600/20 border border-emerald-600 text-emerald-200 px-3 py-2">{success}</div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => {
            let img = p.image || p.image_url || p.thumbnail || p.img || p.photo;
            // if img is object with url
            if (img && typeof img === 'object') img = img.url || img.path || img.src || null;
            let imgUrl = null;
            if (img) {
              // Absolute external URL
              if (/^https?:\/\//i.test(img) || img.startsWith('//')) {
                imgUrl = img;
              } else {
                // ensure we use backend storage path: /storage/<file>
                const clean = String(img).replace(/^\/+/, '');
                imgUrl = `${API_HOST}/storage/${clean}`;
              }
            }

            return (
              <div key={p.id} className="p-6 rounded-2xl bg-accent/20 border border-cyan-600 flex flex-col">
                {imgUrl && (
                  <div className="mb-4 h-40 w-full overflow-hidden rounded-md">
                    <img
                      src={imgUrl}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.warn('Project image failed to load:', imgUrl);
                        // replace with a subtle SVG placeholder
                        e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400"><rect width="100%" height="100%" fill="%230b0b0b"/><text x="50%" y="50%" fill="%23ffffff" font-size="20" text-anchor="middle" dominant-baseline="middle">Image not available</text></svg>';
                      }}
                    />
                    <div className="text-xs text-zinc-400 mt-2 break-all">{imgUrl}</div>
                  </div>
                )}
                  <div className="text-sm text-zinc-100 uppercase tracking-widest mb-2">Project #{p.id}</div>
                  <div className="text-2xl font-bold">{p.title}</div>
                  <p className="text-sm text-zinc-400 mt-3 flex-1">{p.description}</p>
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <Link to={`/dashboard/projects/${p.id}/edit`} state={{ project: p }} className="px-3 py-1.5 bg-yellow-500 text-black rounded-md hover:opacity-90">Edit</Link>
                    <button onClick={() => openConfirm(p.id)} disabled={deletingId === p.id} className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:opacity-90 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed">{deletingId === p.id ? 'Deleting...' : 'Delete'}</button>
                  </div>
                </div>
              )
            })}
          </div>
          </>
        )}
        {/* Confirm modal */}
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeConfirm}>
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-2">Confirm delete</h3>
              <p className="text-sm text-zinc-400 mb-4">Are you sure you want to delete project #{confirmId}? This action cannot be undone.</p>
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
