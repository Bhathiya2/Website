import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getProjectById, updateProject, API_HOST } from "../api/ProjectApi";
import SuccessModal from "../components/SuccessModal";

export default function ProjectsEdit() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const initial = location.state?.project || { id, title: "", description: "", status: "draft" };

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [status, setStatus] = useState(initial.status || "draft");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    // if project was passed via navigation state, use it
    if (location.state?.project) {
      const p = location.state.project;
      if (mounted) {
        setTitle(p.title || "");
        setDescription(p.description || "");
        setStatus(p.status || "draft");
        // resolve existing image field
        let img = p.image || p.image_url || p.thumbnail || p.img || p.photo;
        if (img && typeof img === 'object') img = img.url || img.path || img.src || null;
        if (img) {
          if (/^https?:\/\//i.test(img) || img.startsWith('//')) setExistingImageUrl(img);
          else setExistingImageUrl(`${API_HOST}/storage/${String(img).replace(/^\/+/, '')}`);
        }
      }
      return () => { mounted = false };
    }

    // otherwise fetch from API
    setLoading(true);
    getProjectById(id)
      .then((res) => {
        const p = res.data;
        if (!mounted) return;
        setTitle(p.title || "");
        setDescription(p.description || "");
        setStatus(p.status || "draft");
        let img = p.image || p.image_url || p.thumbnail || p.img || p.photo;
        if (img && typeof img === 'object') img = img.url || img.path || img.src || null;
        if (img) {
          if (/^https?:\/\//i.test(img) || img.startsWith('//')) setExistingImageUrl(img);
          else setExistingImageUrl(`${API_HOST}/storage/${String(img).replace(/^\/+/, '')}`);
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError(err?.response?.data?.message || err.message || "Failed to load project");
      })
      .finally(() => { if (mounted) setLoading(false) });

    return () => { mounted = false };
  }, [id, location.state]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    updateProject(id, { title, description, status, image: imageFile })
      .then(() => {
        setShowSuccessModal(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err?.response?.data?.message || err.message || "Failed to update project");
      })
      .finally(() => setLoading(false));
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/dashboard/projects");
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded-lg bg-white/5 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 rounded-lg bg-white/5 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" rows={5} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Image</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => inputRef.current?.click()} className="px-4 py-2 bg-white/5 text-white rounded-md hover:bg-white/10">Choose Image</button>
                <span className="text-sm text-zinc-400">{imageFile ? imageFile.name : (existingImageUrl ? 'Current image' : 'No file chosen')}</span>
              </div>
              <input ref={inputRef} type="file" accept="image/*" onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setImageFile(f);
                if (f) setPreview(URL.createObjectURL(f));
              }} className="hidden" />
              {preview ? (
                <div className="mt-3"><img src={preview} alt="preview" className="max-h-44 rounded-md object-cover" /></div>
              ) : (existingImageUrl && (
                <div className="mt-3"><img src={existingImageUrl} alt="current" className="max-h-44 rounded-md object-cover" onError={(e)=>{e.currentTarget.style.display='none'}} /><div className="text-xs text-zinc-400 mt-2 break-all">{existingImageUrl}</div></div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold disabled:opacity-60 hover:opacity-90 cursor-pointer">{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-white/5 rounded-lg hover:opacity-90 cursor-pointer">Cancel</button>
          </div>
          {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
        </form>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Project Updated Successfully"
        message="The project information has been updated. You will be redirected to the projects list."
      />
    </AdminLayout>
  );
}
