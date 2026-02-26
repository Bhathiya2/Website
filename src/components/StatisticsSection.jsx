import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Factory, Globe2, Cpu, ShieldCheck } from "lucide-react";

const Counter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const count = useMotionValue(0);
  
  // Detect if it's a decimal number
  const isDecimal = value.includes('.');
  const numericValue = parseFloat(value) || 0;
  const suffix = value.replace(/[0-9.]/g, ''); // Keep the suffix, but remove numbers and the dot
  
  const rounded = useTransform(count, (latest) => {
    if (isDecimal) {
      return latest.toFixed(1) + suffix;
    }
    return Math.round(latest) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 2,
        delay: 0.2,
        ease: "circOut"
      });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [numericValue, count, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const stats = [
  {
    id: 1,
    value: "50+",
    label: "Completed Projects",
    description: "Software, electronics, and IoT solutions delivered.",
    icon: Factory
  },
  {
    id: 2,
    value: "10+",
    label: "Active Clients",
    description: "Businesses supported across multiple industries.",
    icon: Cpu
  },
  {
    id: 3,
    value: "5+",
    label: "Core Technologies",
    description: "Web, mobile, embedded systems, IoT, and PCB design.",
    icon: Globe2
  },
  {
    id: 4,
    value: "100%",
    label: "Project Commitment",
    description: "Focused on quality, reliability, and client satisfaction.",
    icon: ShieldCheck
  }
];

export default function StatisticsSection() {
  return (
    <section className="pb-32 bg-transparent text-white relative z-10 -mt-10">
      <div className="max-w-350 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 overflow-hidden group hover:border-cyan-400/30 transition-all duration-300"
            >
              {/* Cyber Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />

              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="mb-8 inline-flex p-4 rounded-xl bg-cyan-400/5 text-cyan-400 border border-cyan-400/10 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                   <stat.icon size={28} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-6xl font-black text-white mb-2 tracking-tighter items-center flex">
                  {isNaN(parseInt(stat.value)) ? (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500 italic uppercase text-4xl"
                    >
                      {stat.value}
                    </motion.span>
                  ) : (
                    <Counter value={stat.value} />
                  )}
                </h3>
                
                <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] font-black mb-6">
                  {stat.label}
                </p>
                
                <p className="text-zinc-500 text-sm leading-relaxed border-t border-white/5 pt-6 font-medium group-hover:text-zinc-400 transition-colors">
                  {stat.description}
                </p>
              </div>

              {/* Data-Ref ID */}
              <div className="absolute bottom-4 right-6 text-[8px] font-mono text-white/5 tracking-widest">
                METRIC_DATA_00{stat.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
