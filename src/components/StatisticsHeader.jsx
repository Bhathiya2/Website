import { motion } from "framer-motion";

export default function StatisticsHeader() {
  return (
    <section className="pt-32 pb-16 bg-transparent text-center relative z-10">
      <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex gap-1">
              {[1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />)}
          </div>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-cyan-400 tracking-[0.4em] text-[10px] font-black uppercase"
          >
            Company Growth Overview
          </motion.span>
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-4 flex items-center justify-center gap-4 flex-wrap"
      >
        <span className="relative">
          GLOBAL
          <motion.span 
            className="absolute -inset-x-2 -inset-y-1 bg-cyan-500/10 blur-xl rounded-full -z-10"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </span>
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic relative">
          IMPACT
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute -bottom-2 left-0 h-1 bg-cyan-500/50 blur-[2px]"
          />
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-12"
      >
        Technology solutions, projects, and growth milestones
      </motion.p>

      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="h-px max-w-lg bg-linear-to-r from-transparent via-cyan-500/50 to-transparent mx-auto origin-center"
      ></motion.div>
    </section>
  );
}
