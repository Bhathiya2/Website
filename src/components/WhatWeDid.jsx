import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: 100, suffix: "%", label: "Project Transparency" },
  { value: 40, suffix: "+", label: "Systems Delivered" },
  { value: 5, suffix: "+", label: "Technology Domains" },
  { value: 24, suffix: "/7", label: "Support Availability" }
];

const Counter = ({ from = 0, to, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration: duration,
        delay: 0.2,
        ease: "circOut"
      });
      return controls.stop;
    } else {
      count.set(from);
    }
  }, [to, count, isInView, duration, from]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default function WhatWeDid() {
  return (
    <section className="py-32 bg-transparent text-white relative overflow-hidden z-10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-cyan-400"></div>
              <span className="tracking-[4px] text-cyan-400 text-sm font-bold uppercase">
                IMPACT MEASURED
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">
              Numbers that speak <br/>
              <span className="text-cyan-400">louder than words.</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              We focus on measurable outcomes, ensuring our solutions deliver real value through efficiency, reliability, and thoughtful system design.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-bold hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center gap-2 group"
            >
              View Case Studies
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:border-cyan-500/50 hover:bg-white/10 transition-colors group"
              >
                <div className="text-5xl font-black text-white mb-2 flex items-baseline">
                  <Counter from={0} to={item.value} duration={2} />
                  <span className="text-cyan-400 text-3xl ml-1">{item.suffix}</span>
                </div>
                <div className="h-1 w-12 bg-white/20 group-hover:bg-cyan-500 transition-colors mb-4 rounded-full"></div>
                <p className="text-gray-400 font-medium tracking-wide uppercase text-sm group-hover:text-gray-200">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
