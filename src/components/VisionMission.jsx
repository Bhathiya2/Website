import { Eye, Target } from "lucide-react";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function VisionMission() {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Vision & Mission
          </h2>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* VISION */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="bg-transparent/5 border border-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-sm hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Eye className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Our Vision</h3>
            </div>

            <p className="text-cyan-400 font-semibold italic py-4">
              “Fulfill customer needs beyond expectations”
            </p>

            <p className="text-gray-400 leading-relaxed">
              We strive to anticipate and exceed customer requirements by
              delivering solutions that go above and beyond expectations.
              Through continuous innovation and close collaboration, we ensure
              every interaction creates value and builds lasting trust.
            </p>
          </motion.div>

          {/* MISSION */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            whileHover={{ y: -6 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 140, damping: 18 }}
            className="bg-transparent/5 border border-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-sm hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Target className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
            </div>

            <p className="text-purple-400 font-semibold italic py-4">
              “To be the leading Electronics Research and Design Center in South Asia”
            </p>

            <p className="text-gray-400 leading-relaxed">
              We aim to lead South Asia in electronics research and design by
              delivering innovative, reliable, and high-quality solutions.
              Through cutting-edge technology and a passion for excellence,
              we strive to set new industry standards and drive regional progress.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
