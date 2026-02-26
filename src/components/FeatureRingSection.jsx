import { useState, memo, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  ArrowRight,
  Code2,
  Smartphone,
  Globe,
  Layers,
} from "lucide-react";
import ServiceScene3D from "./ServiceScene3D";

const features = [
  {
    id: 1,
    title: "IoT Development",
    subtitle: "Connected Intelligence",
    description:
      "End-to-end IoT ecosystems connecting physical assets to the digital cloud for real-time monitoring and automation.",
    icon: Cpu,
    color: "bg-cyan-500",
    stats: ["Smart Sensors", "Remote Control"],
  },
  {
    id: 2,
    title: "Software Development",
    subtitle: "Enterprise Solutions",
    description:
      "Custom software architectures designed for scalability, security, and seamless integration with existing workflows.",
    icon: Code2,
    color: "bg-cyan-500",
    stats: ["Cloud Native", "High Performance"],
  },
  {
    id: 3,
    title: "Mobile App Development",
    subtitle: "iOS & Android",
    description:
      "Intuitive, high-performance mobile applications that extend your business reach to every user's fingertips.",
    icon: Smartphone,
    color: "bg-cyan-500",
    stats: ["Cross-Platform", "User Centric"],
  },
  {
    id: 4,
    title: "All Technology Solution",
    subtitle: "Digital Transformation",
    description:
      "Comprehensive IT consulting and holistic technology strategies to drive innovation across your entire organization.",
    icon: Globe,
    color: "bg-cyan-500",
    stats: ["Consulting", "Integration"],
  },
];

// Memoized 3D Experience to prevent full canvas re-renders
const VisualExperience = memo(({ active, features }) => (
  <div className="relative h-[600px] hidden lg:block">
    {/* Ambient Background Glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

    <div className="relative h-full w-full flex items-center justify-center">
      {/* 3D Scene Container */}
      <div className="absolute inset-0 z-0">
        <ServiceScene3D activeIndex={active} />
      </div>

      {/* Overlaying HUD Elements (Minimal) */}
      <div className="relative z-10 w-full h-full pointer-events-none p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <motion.div
            key={`title-${active}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl"
          >
            <div className="text-[10px] font-mono text-cyan-400 mb-1 uppercase tracking-widest font-bold">
              Protocol_Selected
            </div>
            <div className="text-xl font-black text-white uppercase">
              {features[active].title}
            </div>
          </motion.div>

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
          {features[active].stats.map((stat, i) => (
            <motion.div
              key={`stat-${active}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-black/40 backdrop-blur-md border border-white/5 p-4 rounded-xl"
            >
              <div className="text-[9px] text-zinc-400 uppercase font-black tracking-widest mb-1 italic">
                Metric_0{i + 1}
              </div>
              <div className="text-white font-black text-xs uppercase tracking-tight">
                {stat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rotating Rings (Purely Visual) */}
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
));

export default function FeatureRingSection() {
  const [active, setActive] = useState(0);

  const handleSetActive = useCallback((index) => {
    setActive(index);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: Content List */}
        <div className="space-y-4 relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="mb-14 relative"
          >
            {/* Advanced Status Indicator */}
            <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      height: [8, 16, 8],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    className="w-1 bg-cyan-400 rounded-full"
                  />
                ))}
              </div>
              <span className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.5em] font-black">
                Neural_Sync_Active
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase">
              OUR CORE <br />
              <motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-size-[200%_auto] italic"
              >
                SERVICES &nbsp;
              </motion.span>
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, ease: "circOut" }}
              className="h-px bg-linear-to-r from-cyan-500/50 to-transparent mt-8 mb-8 origin-center lg:origin-left"
            />

            <p className="text-zinc-300 text-base md:text-lg font-medium leading-relaxed max-w-xl border-l md:border-l-0 lg:border-l border-white/10 pl-6 md:pl-0 lg:pl-8 mx-auto lg:mx-0">
              Powering businesses with{" "}
              <span className="text-white">
                practical, future-ready technology
              </span>{" "}
              by delivering reliable software, electronics, and IoT solutions
              tailored to real-world needs.
            </p>
          </motion.div>

          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              onClick={() => handleSetActive(index)}
              whileHover={{ x: 10 }}
              className={`p-5 md:p-6 rounded-xl border cursor-pointer transition-all duration-500 relative overflow-hidden group/item ${
                active === index
                  ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                  : "bg-transparent border-white/5 hover:border-white/10"
              }`}
            >
              {/* Pulsing Active Glow */}
              {active === index && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-cyan-500/5 blur-xl -z-10"
                />
              )}

              {/* Active Indicator Accent */}
              <div
                className={`absolute top-0 left-0 bottom-0 w-1 bg-cyan-500 transition-transform duration-500 ${active === index ? "scale-y-100" : "scale-y-0"}`}
              />

              <div className="flex items-start gap-4 z-10 relative">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${active === index ? "bg-cyan-500 text-black" : "bg-transparent/5 text-cyan-400 group-hover/item:bg-cyan-500/10"}`}
                >
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg md:text-xl font-black mb-1 transition-colors uppercase tracking-tight ${active === index ? "text-white" : "text-zinc-400 group-hover/item:text-zinc-300"}`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-cyan-500/40 mb-2">
                    {feature.subtitle}
                  </p>

                  <AnimatePresence>
                    {active === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="h-px w-8 bg-transparent/10 mb-4" />
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-md">
                          {feature.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {feature.stats.map((stat, i) => (
                            <span
                              key={i}
                              className="text-[9px] font-mono py-1 px-3 border border-white/10 rounded bg-black text-cyan-400 uppercase tracking-widest"
                            >
                              {stat}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <ArrowRight
                  className={`text-zinc-500 transition-all duration-500 ${active === index ? "rotate-90 text-cyan-400 translate-x-1" : "group-hover/item:text-zinc-300"}`}
                  size={20}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Visual Experience (Memoized) */}
        <VisualExperience active={active} features={features} />
      </div>
    </section>
  );
}
