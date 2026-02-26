import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* Animation Variants */
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const TeamSection = () => {
  return (
    <section className="bg-transparent px-6 lg:px-20 py-2 overflow-hidden relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

        {/* Left Content */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
        >
          <h3 className="text-cyan-400 tracking-[0.3em] text-sm font-bold uppercase mb-4">
            Our Minds
          </h3>

          <motion.div
            className="w-12 h-1 bg-cyan-400 mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-10%" }}
          />

          <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white leading-tight">
            Architecting the <br/>
            <span className="text-cyan-400">Future</span>
          </h2>

          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            Our diverse team of engineers and industry specialists is united by a single mission: 
            to render the impossible, inevitable. We combine deep domain expertise with advanced 
            software and intelligent technologies to solve complex industrial challenges.
          </p>

          {/* <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-transparent/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-transparent/10 hover:border-cyan-500/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
          >
            Meet the Builders <ArrowRight size={18} className="text-cyan-400" />
          </motion.a> */}
        </motion.div>

        {/* Right Image */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
        >
          <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
          <img
            src="https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/p9.jpg"
            alt="Team at work"
            className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default TeamSection;
