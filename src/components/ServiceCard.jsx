import React from 'react'
import { motion } from "framer-motion";

export default function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="group relative">
      {/* Cyber Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30 -translate-x-0.5 -translate-y-0.5 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30 translate-x-0.5 translate-y-0.5 group-hover:border-cyan-400 transition-colors" />

      <div className="h-full bg-black/40 backdrop-blur-xl border border-white/5 text-white p-8 rounded-lg text-center hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
        
        {/* Scanning Line */}
        <motion.div 
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none z-0"
        />

        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center justify-center p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/10 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-all duration-300">
            <Icon className="w-8 h-8 text-cyan-400 group-hover:text-black transition-colors" />
          </div>
          <h3 className="text-xl font-black mb-4 text-white group-hover:text-cyan-400 transition-colors tracking-tight uppercase">{title}</h3>
          <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">{description}</p>
        </div>

        {/* Technical Deco */}
        <div className="mt-8 pt-4 border-t border-white/5 flex justify-center items-center gap-4 text-[7px] font-mono text-white/10 tracking-[0.4em] uppercase">
            <span>MOD_77</span>
            <div className="w-1 h-1 rounded-full bg-cyan-500/20" />
            <span>ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
}
