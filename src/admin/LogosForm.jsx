import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { createLogo } from "../api/LogoApi";
import SuccessModal from "../components/SuccessModal";

export default function LogosForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputRef = useRef(null);

  function handleFile(e) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return setError("Please select a file.");
    const fd = new FormData();
    fd.append("logo", file);
    fd.append("name", name);
    setSubmitting(true);
    setError("");
    createLogo(fd)
      .then(() => setShowSuccessModal(true))
      .catch((err) => setError(err?.response?.data?.message || err.message || 'Upload failed'))
      .finally(() => setSubmitting(false));
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/dashboard/logos");
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Add Logo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Name (optional)</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-lg bg-accent/20 text-white placeholder:text-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          <div>
            <label className="block text-sm text-zinc-400 mb-1">File</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 bg-white/5 text-white rounded-md hover:bg-white/10"
              >
                Choose File
              </button>
              <span className="text-sm text-zinc-400">{file ? file.name : 'No file chosen'}</span>
            </div>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </div>
          </div>
          {preview && (
            <div>
              <div className="text-sm">Preview</div>
              <img src={preview} alt="preview" className="h-24 object-contain mt-2" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button type="submit" disabled={submitting} className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:opacity-90 cursor-pointer font-semibold disabled:opacity-60">{submitting ? 'Uploading...' : 'Upload'}</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-white/5 rounded-lg hover:opacity-90 cursor-pointer">Cancel</button>
          </div>
          {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
        </form>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Logo Uploaded"
        message="The logo has been uploaded. You will be redirected to the logos list."
      />
    </AdminLayout>
  );
}
