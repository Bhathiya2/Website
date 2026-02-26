import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, Eye, TrendingUp } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* VALUES */
const values = [
  {
    title: "Reliability",
    desc: "Delivering consistent, dependable solutions that customers can trust in every operation.",
    icon: ShieldCheck,
  },
  {
    title: "Practical Innovation",
    desc: "Building smart, usable technologies that solve real-world industrial challenges.",
    icon: Lightbulb,
  },
  {
    title: "Transparency",
    desc: "Maintaining open communication, honest processes, and clear visibility at every stage.",
    icon: Eye,
  },
  {
    title: "Continuous Improvement",
    desc: "Continuously evolving our systems, skills, and processes to achieve better outcomes.",
    icon: TrendingUp,
  },
];

/* Animation */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const OurValuesSection = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    dots: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-20 bg-transparent px-6 lg:px-20 overflow-hidden">
      {/* HEADER */}
      <motion.div
        className="text-center mb-14"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
      >
        <span className="text-cyan-400 tracking-[0.4em] text-[10px] font-black uppercase mb-2 block">
          Core DNA [SYS-02]
        </span>
        <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">
          What{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic pr-2">
            Drives
          </span>{" "}
          Us
        </h2>
      </motion.div>

      {/* VALUES SLIDER */}
      <Slider {...settings}>
        {values.map((item, index) => (
          <motion.div
            key={index}
            className="px-3"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, margin: "-10%" }}
          >
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-black/50 border border-white/5 p-8 rounded-4xl h-full transition-all hover:border-cyan-500/30 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-14 h-14 rounded-2xl bg-transparent/5 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                <item.icon size={28} />
              </div>

              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default OurValuesSection;
