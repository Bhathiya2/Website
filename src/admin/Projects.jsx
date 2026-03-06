import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getProjects, deleteProject, API_HOST } from "../api/ProjectApi";

const resolveImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === "object") img = img.url || img.path || img.src || null;
  if (!img) return null;
  const s = String(img);
  if (/^https?:\/\//i.test(s) || s.startsWith("//")) return s;
  const clean = s.replace(/^\/+/, "");
  if (clean.startsWith("storage/")) return `${API_HOST}/api/${clean}`;
  return `${API_HOST}/api/storage/${clean}`;
};

const statusBadge = (status) => {
  const map = {
    published: "bg-emerald-600/20 border-emerald-600 text-emerald-300",
    draft: "bg-zinc-700/40 border-zinc-600 text-zinc-300",
    archived: "bg-yellow-600/20 border-yellow-600 text-yellow-300",
  };
  return map[status] || map.draft;
};

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getProjects()
      .then((res) => setProjects(res.data || []))
      .catch(() => setError("Failed to load projects."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
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
    deleteProject(id)
      .then(() => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setSuccess("Project deleted successfully.");
        setTimeout(() => setSuccess(""), 3000);
      })
      .catch(() => setError("Failed to delete project."))
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
          <Link
            to="new"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500 text-black rounded-md font-semibold hover:opacity-90"
          >
            + Add Project
          </Link>
        </div>

        {success && (
          <div className="mb-4 rounded-md bg-emerald-600/20 border border-emerald-600 text-emerald-200 px-3 py-2">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-600/20 border border-red-600 text-red-300 px-3 py-2">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-zinc-400">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-zinc-500 py-16 text-center uppercase tracking-widest text-sm">
            No projects found.{" "}
            <Link to="new" className="text-cyan-400 underline">
              Add the first one.
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3 text-zinc-400 font-semibold w-16">
                    ID
                  </th>
                  <th className="px-4 py-3 text-zinc-400 font-semibold w-20">
                    Image
                  </th>
                  <th className="px-4 py-3 text-zinc-400 font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-3 text-zinc-400 font-semibold">
                    Description
                  </th>
                  <th className="px-4 py-3 text-zinc-400 font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-zinc-400 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  const imgUrl = resolveImageUrl(project.image);
                  return (
                    <tr
                      key={project.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-zinc-500">#{project.id}</td>
                      <td className="px-4 py-3">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={project.title}
                            className="w-14 h-10 object-cover rounded-md"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-14 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                            <span className="text-zinc-600 text-[9px]">
                              N/A
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-white max-w-[180px] truncate">
                        {project.title}
                      </td>
                      <td className="px-4 py-3 text-zinc-400 max-w-[260px] truncate">
                        {project.description || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded border text-xs font-semibold uppercase tracking-wider ${statusBadge(project.status)}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(`${project.id}/edit`, {
                                state: { project },
                              })
                            }
                            className="px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded-md hover:bg-white/10 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openConfirm(project.id)}
                            disabled={deletingId === project.id}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:opacity-90 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                          >
                            {deletingId === project.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Confirm delete modal */}
        {confirmOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={closeConfirm}
          >
            <div
              className="bg-zinc-900 border border-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Confirm Delete
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeConfirm}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-md cursor-pointer hover:opacity-90"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmId)}
                  disabled={deletingId === confirmId}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
                >
                  {deletingId === confirmId ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
