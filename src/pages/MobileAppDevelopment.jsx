import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Users, Zap, Shield } from "lucide-react";
import PageCover from "../components/PageCover";
import ind_04 from "../assets/MobileApp.jpg";

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
    title: "Cross-Platform",
    description: "Applications designed to run smoothly on Android, iOS, and web platforms.",
    icon: Smartphone,
  },
  {
    title: "User-Centric Design",
    description: "Clean, intuitive interfaces focused on real user needs.",
    icon: Users,
  },
  {
    title: "High Performance",
    description: "Optimized applications for speed, stability, and responsiveness.",
    icon: Zap,
  },
  {
    title: "Secure & Reliable",
    description: "Developed using industry-standard security and best practices.",
    icon: Shield,
  },
];

export default function MobileAppDevelopment() {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
    return (
        <>
            <title>Mobile App Development | Sky Smart Intelligence - Intuitive Mobile Solutions</title>
            <meta name="description" content="Explore our mobile app development services: high-performance apps that extend your business reach to users worldwide." />
            <link rel="canonical" href="https://skyaccount.perahara.lk/services/mobile-app-development" />

            {/* Page Cover */}
            <PageCover title="Mobile App Development" />

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
                                        {[1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />)}
                                    </div>
                                    <span className="text-cyan-400 tracking-[0.4em] text-[10px] font-black uppercase">
                                        Mobile Solutions [EST-2026]
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">
                                    Apps That <br />
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic pr-3">Connect & Engage</span>
                                </h2>

                                <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 max-w-xl">
                                    Intuitive, high-performance mobile applications designed to bring your business closer to users, improving engagement and delivering consistent experiences across devices.
                                </p>

                                <motion.a
                                    href="/company/contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 bg-transparent/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-transparent/10 hover:border-cyan-500/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                                >
                                    Get App Quote <ArrowRight size={18} className="text-cyan-400" />
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
                                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-square max-h-[440px] md:max-h-[540px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                                    <img
                                        src={ind_04}
                                        alt="Mobile App Development"
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
                            Why a Mobile-First Strategy
                            </h3>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    Mobile devices play a central role in how people interact with businesses today. A mobile-first approach allows organizations to reach users more effectively, deliver faster experiences, and improve accessibility across everyday touchpoints.
                                </p>
                                <p>
                                    Our mobile development team builds intuitive and responsive applications optimized for performance across Android, iOS, and modern web platforms. We focus on practical design, usability, and solid architecture to create apps that are reliable and easy to use.
                                </p>
                                <p>
                                    From initial concept to deployment and ongoing updates, we help ensure your application stays secure, maintainable, and aligned with evolving platform standards and user expectations.
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
                            <span className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">App Features</span>
                            <h3 className="text-3xl md:text-4xl font-black mb-4">Mobile Excellence</h3>
                            <p className="text-gray-400 max-w-3xl mx-auto">
                                We build mobile applications that balance clean design, performance, and usability across modern devices.
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
                                        className="bg-black/50 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all"
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
                                            <Icon size={24} />
                                        </div>
                                        <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                                        <p className="text-gray-400 text-sm">{feature.description}</p>
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
                            Ready to Launch Your App?
                        </h3>
                        <p className="text-gray-200 mb-8">
                            Let’s transform your mobile app idea into a reliable, scalable solution.
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