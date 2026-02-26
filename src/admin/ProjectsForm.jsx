import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { createProject } from "../api/ProjectApi";
import SuccessModal from "../components/SuccessModal";

export default function ProjectsForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setError("")
    createProject({ title, description, status, image: imageFile })
      .then(() => {
        setShowSuccessModal(true);
      })
      .catch((err) => {
        console.error(err)
        setError(err?.response?.data?.message || err.message || "Failed to create project")
      })
      .finally(() => setLoading(false))
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/dashboard/projects");
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Add Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" rows={5} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="draft" className="text-black">Draft</option>
                <option value="published" className="text-black">Published</option>
                <option value="archived" className="text-black">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Upload Image</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="px-4 py-2 bg-white/5 text-white rounded-md hover:bg-white/10"
                >
                  Choose Image
                </button>
                <span className="text-sm text-zinc-400">{imageFile ? imageFile.name : 'No file chosen'}</span>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setImageFile(f);
                  if (f) setPreview(URL.createObjectURL(f));
                  else setPreview("");
                }}
                className="hidden"
              />
              {preview && (
                <div className="mt-3">
                  <img src={preview} alt="preview" className="max-h-44 rounded-md object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:opacity-90 cursor-pointer font-semibold disabled:opacity-60">{loading ? 'Creating...' : 'Create'}</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-white/5 rounded-lg hover:opacity-90 cursor-pointer">Cancel</button>
          </div>
          {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
        </form>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Project Created Successfully"
        message="The project has been added to the system. You will be redirected to the projects list."
      />
    </AdminLayout>
  );
}
