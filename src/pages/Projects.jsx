import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageCover from "../components/PageCover";
import { getProjects, API_HOST } from "../api/ProjectApi";

/* -------------------- Animations -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

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

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    getProjects()
      .then((res) => {
        const all = res.data || [];
        setProjects(all.filter((p) => p.status === "published"));
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load projects.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-transparent min-h-screen text-white">
      <title>Projects & Case Studies | Sky Smart Intelligence - Industrial IoT Portfolio</title>
      <meta name="description" content="Explore our portfolio of successful industrial IoT and automation projects, from energy optimization to smart agriculture and maritime logistics." />
      <link rel="canonical" href="https://skyaccount.perahara.lk/company/projects" />
      {/* Page Cover */}
      <PageCover title="Case Studies" />

      <section className="py-24 px-6 lg:px-20 overflow-hidden relative">
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
             <div>
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex gap-1">
                        {[1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />)}
                    </div>
                    <span className="text-cyan-400 tracking-[0.4em] text-[10px] font-black uppercase">
                        Archive [PRJ-DATA]
                    </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                   Proven <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic pr-3">Integrations</span>
                </h2>
             </div>
             <p className="text-zinc-500 text-sm max-w-sm font-medium uppercase tracking-widest leading-relaxed">
                Exploring the frontiers of industrial efficiency across diverse global sectors.
             </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-black/50 border border-white/5 rounded-[2rem] overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-white/5" />
                  <div className="p-8 space-y-3">
                    <div className="h-3 w-20 bg-white/10 rounded" />
                    <div className="h-6 w-3/4 bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-2/3 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-zinc-500 text-center py-20">{error}</p>
          ) : projects.length === 0 ? (
            <p className="text-zinc-500 text-center py-20 uppercase tracking-widest text-sm">No projects found.</p>
          ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {projects.map((project, index) => {
              const imgUrl = resolveImageUrl(project.image);
              const idLabel = String(project.id).padStart(2, "0");
              return (
              <motion.article
                key={project.id}
                variants={fadeUp}
                onClick={() => navigate(`/projects/${project.id}`, { state: { project } })}
                className="group relative bg-black/50 border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                   <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                   {imgUrl ? (
                     <img
                       src={imgUrl}
                       alt={project.title}
                       className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                       onError={(e) => { e.currentTarget.style.display = "none"; }}
                     />
                   ) : (
                     <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                       <span className="text-zinc-600 text-xs uppercase tracking-widest">No Image</span>
                     </div>
                   )}
                   <div className="absolute top-4 right-4 z-20">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id}`, { state: { project } }); }}
                        className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 flex"
                      >
                         <ArrowRight size={20} />
                      </button>
                   </div>
                </div>

                <div className="p-8">
                   <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase bg-cyan-500/10 px-2 py-0.5 rounded">Active</span>
                      <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase">ID.{idLabel}</span>
                   </div>
                   <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                      {project.title}
                   </h3>
                   <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
                      {project.description}
                   </p>
                   <div className="h-px w-full bg-white/5 group-hover:bg-cyan-500/20 transition-colors" />
                </div>
              </motion.article>
              );
            })}
          </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
