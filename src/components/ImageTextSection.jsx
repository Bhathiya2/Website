import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Check,
  Rocket,
  Zap,
  Timer,
  TrendingUp,
  AlertCircle,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export default function ImageTextSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-transparent overflow-hidden relative z-10 px-4 md:px-0"
    >
      <div className="max-w-[1400px] mx-auto grid xl:grid-cols-2 gap-16 xl:gap-24 items-center">
        {/* CONTENT (Left Side) */}
        <div className="relative order-2 xl:order-1 px-2 md:px-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="flex items-center gap-3 mb-6 xl:justify-start justify-center"
          >
            <div className="h-px w-10 bg-cyan-400"></div>
            <span className="text-cyan-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
              Integrated System Architecture
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1] tracking-tighter text-center xl:text-left uppercase"
          >
            INTELLIGENT{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic">
              RESPONSE
            </span>{" "}
            <br className="hidden md:block" /> NETWORK
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.3 }}
            className="text-zinc-300 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto xl:mx-0 font-medium text-center xl:text-left"
          >
            Transform standalone systems into a{" "}
            <span className="text-white">connected digital workflow</span>. We
            design solutions that improve system visibility, simplify
            communication, and help teams respond faster to operational events.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="group p-4 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <Zap size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Smart Routing</h4>
              <p className="text-md text-gray-400">
                Efficient notification flows designed for faster response.
              </p>
            </div>

            <div className="group p-4 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <BarChart3 size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Downtime Analytics</h4>
              <p className="text-md text-gray-400">
                Clear insights into system performance and issue trends.
              </p>
            </div>

            <div className="group p-4 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <Timer size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Slash MTTR</h4>
              <p className="text-md text-gray-400">
                Designed to help reduce resolution time and system delays.
              </p>
            </div>

            <div className="group p-4 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Digital Audit</h4>
              <p className="text-md text-gray-400">
                Track system activities with clear logs and timestamps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
