import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ArrowRight, Code2, Smartphone, Globe, Layers } from "lucide-react";

const features = [
  {
    id: 1,
    title: "IoT Development",
    subtitle: "Connected Intelligence",
    description: "End-to-end IoT ecosystems connecting physical assets to the digital cloud for real-time monitoring and automation.",
    icon: Cpu,
    color: "bg-cyan-500",
    stats: ["Smart Sensors", "Remote Control"]
  },
  {
    id: 2,
    title: "Software Development",
    subtitle: "Enterprise Solutions",
    description: "Custom software architectures designed for scalability, security, and seamless integration with existing workflows.",
    icon: Code2,
    color: "bg-cyan-500",
    stats: ["Cloud Native", "High Performance"]
  },
  {
    id: 3,
    title: "Mobile App Development",
    subtitle: "iOS & Android",
    description: "Intuitive, high-performance mobile applications that extend your business reach to every user's fingertips.",
    icon: Smartphone,
    color: "bg-cyan-500",
    stats: ["Cross-Platform", "User Centric"]
  },
  {
    id: 4,
    title: "All Technology Solution",
    subtitle: "Digital Transformation",
    description: "Comprehensive IT consulting and holistic technology strategies to drive innovation across your entire organization.",
    icon: Globe,
    color: "bg-cyan-500",
    stats: ["Consulting", "Integration"]
  }
];

export default function FeatureRingSection() {
  const [active, setActive] = useState(0);

  const handleSetActive = useCallback((index) => {
    setActive(index);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Content List */}
        <div className="space-y-4 relative z-10 text-center max-w-[900px] mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                className="mb-14 relative"
            >
                {/* Advanced Status Indicator */}
                <div className="flex items-center gap-3 mb-6 justify-center">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ 
                                    opacity: [0.2, 1, 0.2],
                                    height: [8, 16, 8] 
                                }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                className="w-1 bg-cyan-400 rounded-full"
                            />
                        ))}
                    </div>
                    <span className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.5em] font-black">Neural_Sync_Active</span>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase">
                    OUR CORE <br/>
                    <motion.span 
                        initial={{ backgroundPosition: "0% 50%" }}
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-size-[200%_auto] italic px-4 -mx-4 inline-block"
                    >
                        SERVICES
                    </motion.span>
                </h2>

                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-px bg-linear-to-r from-cyan-500/50 to-transparent mt-8 mb-8 origin-center"
                />

                <p className="text-zinc-400 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
                    Powering businesses with <span className="text-white">practical, future-ready technology</span> by delivering reliable software, electronics, and IoT solutions tailored to real-world needs.
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
                    <div className={`absolute top-0 left-0 bottom-0 w-1 bg-cyan-500 transition-transform duration-500 ${active === index ? "scale-y-100" : "scale-y-0"}`} />

                    <div className="flex items-start gap-4 z-10 relative">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${active === index ? "bg-cyan-500 text-black" : "bg-transparent/5 text-cyan-400 group-hover/item:bg-cyan-500/10"}`}>
                            <feature.icon size={24} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-lg md:text-xl font-black mb-1 transition-colors uppercase tracking-tight ${active === index ? "text-white" : "text-zinc-500 group-hover/item:text-zinc-300"}`}>
                                {feature.title}
                            </h3>
                            <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-cyan-500/60 mb-2">{feature.subtitle}</p>
                            
                            <AnimatePresence>
                                {active === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="h-px w-8 bg-transparent/10 mb-4" />
                                        <p className="text-zinc-300 text-sm leading-relaxed mb-4 max-w-md">
                                            {feature.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {feature.stats.map((stat, i) => (
                                                <span key={i} className="text-[9px] font-mono py-1 px-3 border border-white/10 rounded bg-black text-cyan-400 uppercase tracking-widest">
                                                    {stat}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <ArrowRight className={`text-zinc-600 transition-all duration-500 ${active === index ? "rotate-90 text-cyan-400 translate-x-1" : "group-hover/item:text-zinc-400"}`} size={20} />
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}