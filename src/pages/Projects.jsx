import React, { useEffect} from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PageCover from "../components/PageCover";

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

/* -------------------- Data -------------------- */
const projects = [
  {
    title: "Eco-Industrial Sync",
    image: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/f10-600x600.jpg",
    description: "Optimizing energy consumption across multi-factory nodes using AI predictive modeling.",
    link: "#",
  },
  {
    title: "Secure Port IoT",
    image: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/f9-600x600.jpg",
    description: "Deployment of encrypted edge telemetry for maritime logistics tracking.",
    link: "#",
  },
  {
    title: "Neural Smart Grid",
    image: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/f8-600x600.jpg",
    description: "Decentralized power management system for sustainable urban infrastructure.",
    link: "#",
  },
  {
    title: "Precision Ag-Tech",
    image: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/f7-600x600.jpg",
    description: "Satellite-linked moisture and nutrient optimization for large scale farms.",
    link: "#",
  },
  {
    title: "Factory Flow Core",
    image: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/f6-600x600.jpg",
    description: "Real-time bottleneck analysis using computer vision and LiDAR arrays.",
    link: "#",
  },
  {
    title: "Quantum Lab Link",
    image: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/f5-600x600.jpg",
    description: "Ultra-low latency data bridges for scientific research environments.",
    link: "#",
  },
];

const Projects = () => {
  useEffect(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {projects.map((project, index) => (
              <motion.article
                key={index}
                variants={fadeUp}
                className="group relative bg-black/50 border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                   <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                   <img
                     src={project.image}
                     alt={project.title}
                     className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                   />
                   <div className="absolute top-4 right-4 z-20">
                      <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                         <ArrowRight size={20} />
                      </div>
                   </div>
                </div>

                <div className="p-8">
                   <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase bg-cyan-500/10 px-2 py-0.5 rounded">Active</span>
                      <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase">ID.0{index + 1}</span>
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
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
