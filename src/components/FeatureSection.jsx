import { motion } from "framer-motion";
import { CheckCircle2, Factory, Cpu, Zap, Radio, Activity } from "lucide-react";
import who_we_are from "../assets/who_we_are.jpeg";
import SmartCore3D from "./SmartCore3D";

export default function FeatureSection() {
  return (
    <section className="py-16 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        {/* LEFT: VISUAL COMPOSITION (3D Neural Core) - hidden on small screens */}
        <div className="hidden md:flex relative items-center justify-center py-10 lg:py-0 order-1 lg:order-1 overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-[550px]"
          >
            <div className="relative z-10 w-full aspect-square">
              <SmartCore3D />

              {/* Orbiting Tech Rings (CSS Visuals for depth) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative w-[280px] h-[280px] md:w-[580px] md:h-[580px]">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`ring-${i}`}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 15 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 border border-cyan-500/10 rounded-full"
                      style={{
                        transform: `rotateX(${60 + i * 15}deg) rotateY(${i * 20}deg)`,
                      }}
                    />
                  ))}

                  {/* Data Nodes */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`node-${i}`}
                      animate={{
                        opacity: [0.1, 0.5, 0.1],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      style={{
                        top: `${50 + Math.sin(i * 45) * 45}%`,
                        left: `${50 + Math.cos(i * 45) * 45}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Subtle Backdrop Radial */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-500/10 blur-[150px] rounded-full -z-10" />
          </motion.div>
        </div>

        {/* RIGHT: CONTENT */}
        <div className="relative order-2 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-md"
          >
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-1 h-3 bg-cyan-400 rounded-full"
                />
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">
              Who We Are
            </span>
          </motion.div>

          <div className="mb-10">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tighter text-center lg:text-left uppercase"
            >
              {["CONNECTING", "IDEAS &", "TECHNOLOGY."].map((text, i) => (
                <motion.div key={i} className="overflow-hidden py-1">
                  <motion.span
                    variants={{
                      hidden: { y: "100%", rotate: 5 },
                      visible: { y: 0, rotate: 0 },
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`block ${i === 2 ? "text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500" : ""}`}
                  >
                    {text}
                  </motion.span>
                </motion.div>
              ))}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-px w-full bg-linear-to-r from-cyan-400/50 via-transparent to-transparent mt-8 origin-left"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-zinc-300 mb-12 leading-relaxed max-w-xl font-medium border-l-2 md:border-l-0 lg:border-l-2 border-white/5 pl-6 md:pl-0 lg:pl-8 mx-auto lg:mx-0 text-center lg:text-left"
          >
            We don’t just build technology;{" "}
            <span className="text-white">we make it practical</span> Sky Smart
            Technology connects software and electronic systems to deliver
            reliable, scalable solutions through{" "}
            <span className="text-cyan-400">
              IoT and embedded system integration
            </span>
            .
          </motion.p>

          {/* New Advanced Module Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Smart System Monitoring",
                icon: <Activity size={18} />,
                status: "ACTIVE",
                desc: "Real-time device and system status visibility",
              },
              {
                title: "Scalable Software Core",
                icon: <Cpu size={18} />,
                status: "STABLE",
                desc: "Modular and maintainable application architecture",
              },
              {
                title: "Hardware–Software Integration",
                icon: <Zap size={18} />,
                status: "CONNECTED",
                desc: "Seamless interaction between electronics and software",
              },
              {
                title: "Secure Data Handling",
                icon: <Radio size={18} />,
                status: "PROTECTED",
                desc: "Best-practice security for applications and devices",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="group relative p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/20 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    {item.icon}
                  </div>
                  <span className="text-[8px] font-mono text-cyan-400/40 tracking-widest group-hover:text-cyan-400 transition-colors">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-white font-bold text-sm mb-1 group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h4>
                <p className="text-[10px] text-zinc-400 font-medium">
                  {item.desc}
                </p>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/2 rounded-2xl transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
