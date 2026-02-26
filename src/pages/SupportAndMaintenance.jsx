import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, Shield, BarChart3 } from "lucide-react";
import PageCover from "../components/PageCover";
import product_1 from "../assets/product_1.jpg";

/* -------------------- Animations -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const features = [
  {
    title: "Real-Time Monitoring",
    description:
      "Continuous data collection from sensors and devices to deliver instant, actionable insights.",
    icon: BarChart3,
  },
  {
    title: "Edge Computing",
    description:
      "Process data at the source to enable faster response times and reduced latency.",
    icon: Zap,
  },
  {
    title: "Secure Connectivity",
    description:
      "Encrypted communication protocols ensuring data integrity and privacy.",
    icon: Shield,
  },
  {
    title: "Scalable Architecture",
    description: "Modular designs that grow with your business needs.",
    icon: Cpu,
  },
];

export default function IoTDevelopment() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return (
    <>
      <title>
        IoT Development | Sky Smart Intelligence - End-to-End IoT Solutions
      </title>
      <meta
        name="description"
        content="Explore our IoT development services: connecting physical assets to digital clouds for real-time monitoring and automation."
      />
      <link
        rel="canonical"
        href="https://skyaccount.perahara.lk/services/iot-development"
      />

      {/* Page Cover */}
      <PageCover title="IoT Development" />

      <div className="bg-transparent text-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[70vh] md:min-h-screen flex items-center justify-center py-24">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10" />

          <div className="container mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-20 items-center lg:pl-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10%" }}
                variants={fadeUp}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"
                      />
                    ))}
                  </div>
                  <span className="text-cyan-400 tracking-[0.4em] text-[10px] font-black uppercase">
                    IoT Ecosystem [EST-2026]
                  </span>
                </div>

                <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">
                  Connecting <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic pr-2">
                    The Physical World
                  </span>
                </h2>

                <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 max-w-xl">
                  End-to-end IoT ecosystems that bridge physical assets to the
                  digital cloud, enabling real-time monitoring, predictive
                  analytics, and intelligent automation for industrial
                  excellence.
                </p>

                <motion.a
                  href="/company/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-transparent/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-transparent/10 hover:border-cyan-500/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                >
                  Get Started <ArrowRight size={18} className="text-cyan-400" />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-linear-to-r from-cyan-500/20 to-blue-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                {/* <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl h-[400px] sm:h-[480px] md:h-[540px]"> */}
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-square max-h-[440px] md:max-h-[540px]">
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                  <img
                    src={product_1}
                    alt="IoT Development"
                    className="w-full h-full object-cover brightness-75 hover:grayscale-0 hover:scale-105 transition-all duration-1000"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-20 bg-transparent">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10%" }}
              variants={fadeUp}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-black mb-6 text-white">
                Why IoT Matters
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The Internet of Things (IoT) enables devices, systems, and
                  applications to communicate and share data more effectively.
                  By connecting physical components with software platforms,
                  organizations can improve visibility, automation, and control
                  across their operations.
                </p>
                <p>
                  Our IoT development services focus on building practical,
                  connected solutions where sensors, microcontrollers, and
                  software work together seamlessly. These systems help monitor
                  conditions, collect useful data, and support informed
                  decision-making.
                </p>
                <p>
                  We design IoT solutions with an emphasis on reliability,
                  security, and scalability, ensuring they are maintainable,
                  efficient, and adaptable as requirements evolve.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-transparent">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10%" }}
              variants={fadeUp}
              className="text-center mb-16"
            >
              <span className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">
                Key Features
              </span>
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                IoT Capabilities
              </h3>
              <p className="text-gray-400 max-w-3xl mx-auto">
                Our IoT solutions are engineered for reliability, security, and
                performance in demanding industrial environments.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/50 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <Icon size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-transparent text-white overflow-hidden">
          <motion.div
            className="max-w-4xl mx-auto text-center px-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Digitize Your Operations?
            </h3>
            <p className="text-gray-200 mb-8">
              Let's discuss how IoT can transform your business processes.
            </p>
            <motion.a
              href="/company/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-transparent/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-transparent/10 hover:border-cyan-500/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
            >
              Contact Us <ArrowRight size={18} className="text-cyan-400" />
            </motion.a>
          </motion.div>
        </section>
      </div>
    </>
  );
}
