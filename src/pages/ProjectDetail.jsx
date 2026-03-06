import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getProjectById, getProjects, API_HOST } from "../api/ProjectApi";

/* -------------------- Helpers -------------------- */
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

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

/* -------------------- Animations -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* -------------------- Skeleton -------------------- */
const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-[55vh] bg-white/5" />
    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="space-y-4">
        <div className="h-5 w-3/4 bg-white/10 rounded" />
        <div className="h-4 w-1/2 bg-white/5 rounded" />
        <div className="h-4 w-2/3 bg-white/5 rounded" />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="h-7 w-1/3 bg-white/10 rounded" />
        <div className="h-4 w-full bg-white/5 rounded" />
        <div className="h-4 w-5/6 bg-white/5 rounded" />
        <div className="h-4 w-2/3 bg-white/5 rounded" />
      </div>
    </div>
  </div>
);

/* ====================================================
   PROJECT DETAIL
   ==================================================== */
export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [project, setProject] = useState(null);
  const [more, setMore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Sync project whenever id changes */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setError("");

    // If the navigation state carries a matching project, use it immediately
    if (location.state?.project && String(location.state.project.id) === String(id)) {
      setProject(location.state.project);
      setLoading(false);
      return;
    }

    // Otherwise (direct URL hit or id mismatch), fetch from API
    setLoading(true);
    setProject(null);
    getProjectById(id)
      .then((res) => setProject(res.data))
      .catch(() => setError("Project not found."))
      .finally(() => setLoading(false));
  }, [id]);

  /* Fetch all projects for "More Projects" section */
  useEffect(() => {
    getProjects()
      .then((res) => {
        const all = (res.data || []).filter(
          (p) => p.status === "published" && String(p.id) !== String(id)
        );
        setMore(all.slice(0, 3));
      })
      .catch(() => {});
  }, [id]);

  if (loading) return (
    <div className="bg-transparent min-h-screen text-white">
      <Skeleton />
    </div>
  );

  if (error || !project) return (
    <div className="bg-transparent min-h-screen text-white flex flex-col items-center justify-center gap-6">
      <p className="text-zinc-400 uppercase tracking-widest text-sm">{error || "Project not found."}</p>
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm uppercase tracking-widest font-bold"
      >
        <ArrowLeft size={16} /> Back to Projects
      </button>
    </div>
  );

  const imgUrl = resolveImageUrl(project.image);
  const idLabel = String(project.id).padStart(2, "0");

  return (
    <div className="bg-transparent min-h-screen text-white">
      <title>{project.title} | Sky Smart Intelligence</title>

      {/* ── Hero Banner ── */}
      <div className="relative h-[60vh] min-h-[380px] overflow-hidden">
        {/* Background image */}
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d1a] via-[#020d1a]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d1a]/60 to-transparent" />

        {/* Decorative cyan glow */}
        <div className="absolute -bottom-20 left-1/4 w-[500px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none" />

        {/* Back button */}
        <div className="absolute top-8 left-6 lg:left-12 z-20">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors text-xs uppercase tracking-widest font-bold bg-black/40 backdrop-blur border border-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={14} />
            Back to Projects
          </button>
        </div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="absolute bottom-10 left-6 lg:left-12 z-10 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              {project.status}
            </span>
            <span className="text-[10px] font-black text-zinc-500 tracking-[0.3em] uppercase">
              ID.{idLabel}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-white mb-3">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-xl">
              {project.description.length > 120
                ? project.description.slice(0, 120) + "…"
                : project.description}
            </p>
          )}
        </motion.div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Sidebar: Project Details ── */}
          <motion.aside
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <motion.div
              variants={fadeUp}
              className="bg-black/40 border border-white/8 rounded-2xl p-7 sticky top-8"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400 mb-6 flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-500" />
                Project Details
              </h3>

              <div className="space-y-5">
                {/* Status */}
                <motion.div variants={fadeUp} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    <Tag size={13} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-0.5">Status</p>
                    <p className="text-sm text-white font-medium capitalize">{project.status}</p>
                  </div>
                </motion.div>

                {/* Date Added */}
                {project.created_at && (
                  <motion.div variants={fadeUp} className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                      <Calendar size={13} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-0.5">Added</p>
                      <p className="text-sm text-white font-medium">{formatDate(project.created_at)}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Decorative divider */}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-cyan-500/20 to-transparent" />

              {/* ID badge */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Project Reference</span>
                <span className="font-black text-cyan-500 text-xs tracking-widest">PRJ-{idLabel}</span>
              </div>
            </motion.div>
          </motion.aside>

          {/* ── Main: Overview ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Overview card */}
            <motion.div
              variants={fadeUp}
              className="bg-black/40 border border-white/8 rounded-2xl p-8"
            >
              <h2 className="text-lg font-black uppercase tracking-widest text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-5 bg-cyan-500 rounded-full" />
                Project Overview
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {project.description || "No description provided for this project."}
              </p>
            </motion.div>

            {/* Full image preview (if available) */}
            {imgUrl && (
              <motion.div
                variants={fadeUp}
                className="rounded-2xl overflow-hidden border border-white/8"
              >
                <img
                  src={imgUrl}
                  alt={project.title}
                  className="w-full object-cover max-h-[420px]"
                  onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
                />
              </motion.div>
            )}

            {/* Highlights strip */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                { label: "Status", value: project.status, accent: true },
                { label: "ID", value: `PRJ-${idLabel}` },
                { label: "Added", value: formatDate(project.created_at) || "—" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-black/40 border border-white/8 rounded-xl p-5 flex flex-col gap-1"
                >
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">{item.label}</span>
                  <span className={`text-base font-black tracking-tight capitalize ${item.accent ? "text-cyan-400" : "text-white"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── More Projects ── */}
        {more.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="flex gap-1">
                {[1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                ))}
              </div>
              <h2 className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400">
                More Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {more.map((p) => {
                const mImgUrl = resolveImageUrl(p.image);
                const goTo = () => navigate(`/projects/${p.id}`, { state: { project: p } });
                return (
                  <div
                    key={p.id}
                    onClick={goTo}
                    className="group bg-black/40 border border-white/8 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 cursor-pointer"
                  >
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      {mImgUrl ? (
                        <img
                          src={mImgUrl}
                          alt={p.title}
                          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                          <span className="text-zinc-700 text-xs uppercase tracking-widest">No Image</span>
                        </div>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); goTo(); }}
                        className="absolute top-3 right-3 z-20 bg-black/70 backdrop-blur border border-white/10 p-2 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 flex"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">ID.{String(p.id).padStart(2, "0")}</span>
                      <h3 className="text-base font-black uppercase tracking-tight text-white mt-1 group-hover:text-cyan-400 transition-colors">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="text-zinc-500 text-xs mt-2 leading-relaxed line-clamp-2">{p.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
