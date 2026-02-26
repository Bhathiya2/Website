import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

export default function ReportCTA() {
  return (
    <section className="py-24 bg-transparent relative z-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="group relative p-8 md:p-12 border border-white/10 bg-transparent/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Cyber accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <FileText size={32} />
                </div>
                <div className="text-left">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white">Annual Intelligence Report</h3>
                    <p className="text-zinc-500 text-sm font-medium">Download the 2024 Global Automation Forecast</p>
                </div>
            </div>

            <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl flex items-center gap-3 shadow-lg shadow-cyan-500/20"
            >
                Get Report <ArrowRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
