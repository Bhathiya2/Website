import { useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Timer, CheckCircle2, BarChart3 } from "lucide-react";
import ServiceScene3D from "./ServiceScene3D";

export default function ImageTextSection() {
  const containerRef = useRef(null);

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
           {/**/} INTELLIGENT{" "}
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
            className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto xl:mx-0 font-medium text-center xl:text-left"
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
              <p className="text-md text-gray-500">
                Efficient notification flows designed for faster response.
              </p>
            </div>

            <div className="group p-4 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <BarChart3 size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Downtime Analytics</h4>
              <p className="text-md text-gray-500">
                Clear insights into system performance and issue trends.
              </p>
            </div>

            <div className="group p-4 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <Timer size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Slash MTTR</h4>
              <p className="text-md text-gray-500">
                Designed to help reduce resolution time and system delays.
              </p>
            </div>

            <div className="group p-4 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Digital Audit</h4>
              <p className="text-md text-gray-500">
                Track system activities with clear logs and timestamps.
              </p>
            </div>
          </div>
        </div>

        {/* VISUAL (Right Side) — 3D IoT Scene */}
        <div className="relative group order-1 xl:order-2">
          <div className="relative h-[480px] xl:h-[600px]">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

            <div className="relative h-full w-full flex items-center justify-center">
              {/* 3D Scene */}
              <div className="absolute inset-0 z-0">
                <ServiceScene3D activeIndex={0} />
              </div>

              {/* HUD Overlay */}
              <div className="relative z-10 w-full h-full pointer-events-none p-8 xl:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                    <div className="text-[10px] font-mono text-cyan-400 mb-1 uppercase tracking-widest font-bold">
                      Protocol_Selected
                    </div>
                    <div className="text-xl font-black text-white uppercase">
                      IoT Development
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-cyan-400/40 uppercase tracking-widest mb-2 font-bold">
                      Node_Status
                    </div>
                    <div className="flex gap-1 justify-end">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="w-1.5 h-4 bg-cyan-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {["Smart Sensors", "Remote Control"].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-black/40 backdrop-blur-md border border-white/5 p-4 rounded-xl"
                    >
                      <div className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1 italic">
                        Metric_0{i + 1}
                      </div>
                      <div className="text-white font-black text-xs uppercase tracking-tight">
                        {stat}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rotating Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[1, 2, 3].map((r) => (
                  <motion.div
                    key={r}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10 + r * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute border border-cyan-500/5 rounded-full"
                    style={{
                      width: `${300 + r * 100}px`,
                      height: `${300 + r * 100}px`,
                      transform: `rotateX(${60 + r * 10}deg) rotateY(${r * 15}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
