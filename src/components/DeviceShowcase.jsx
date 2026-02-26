import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Tablet,
  Terminal,
  ShieldCheck,
  Activity,
} from "lucide-react";

const DeviceShowcase = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black/50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block"
          >
            Multi-Device Access
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            Mobile &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic">
              Tablet Interfaces
            </span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT: Device Mockups (Phone & Tablet) */}
          <div className="relative flex items-center justify-center pt-20">
            {/* iPad (Table/iPage) Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateX: 20 }}
              whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-1 w-[80%] max-w-[500px] aspect-[4/3] bg-zinc-900 rounded-[2rem] border-8 border-zinc-800 shadow-2xl overflow-hidden p-2"
            >
              <div className="absolute inset-0 bg-black overflow-hidden flex flex-col p-6">
                {/* Tablet UI */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-black text-black">
                      S
                    </div>
                    <span className="text-xs font-bold tracking-widest text-white/50">
                      SKY_DASHBOARD
                    </span>
                  </div>
                  <Activity size={14} className="text-cyan-400" />
                </div>

                <div className="grid grid-cols-2 gap-4 flex-grow">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] text-zinc-400 mb-1 uppercase tracking-widest">
                      Network Load
                    </div>
                    <div className="text-2xl font-black text-white">84.2%</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] text-zinc-400 mb-1 uppercase tracking-widest">
                      Security Status
                    </div>
                    <div className="text-2xl font-black text-white">READY</div>
                  </div>
                  <div className="col-span-2 bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
                    <div className="text-[10px] text-cyan-400 mb-2 uppercase tracking-widest">
                      Live Neural Feed
                    </div>
                    <div className="h-20 flex items-end gap-1">
                      {[4, 7, 2, 8, 5, 9, 3, 6, 8, 4].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: [
                              `${h * 10}%`,
                              `${((h + 2) % 10) * 10}%`,
                              `${h * 10}%`,
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                          className="flex-grow bg-cyan-500/50 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* iPhone (Phone) Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 100, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, y: 40, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute -right-4 md:right-0 bottom-0 z-10 w-[40%] max-w-[220px] aspect-[9/19] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden p-2"
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-800 rounded-full" />
              <div className="absolute inset-0 bg-black overflow-hidden flex flex-col pt-10 px-4">
                {/* Phone UI */}
                <div className="w-12 h-12 rounded-full border border-cyan-500/30 mx-auto mb-6 flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-full bg-cyan-500 animate-pulse shadow-[0_0_15px_#06b6d4]" />
                </div>
                <div className="text-center mb-6">
                  <div className="text-[8px] text-zinc-400 uppercase tracking-widest mb-1">
                    Authenticated User
                  </div>
                  <div className="text-xs font-black text-white uppercase tracking-tighter">
                    Admin_Alpha
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {[Terminal, ShieldCheck, Activity].map((Icon, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5"
                    >
                      <Icon size={14} className="text-cyan-400" />
                      <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ x: [-50, 50] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-full h-full bg-cyan-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-4 text-cyan-500">
                <div className="h-px w-8 bg-cyan-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Seamless Portability
                </span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white">
                Your Intelligence Node <br />
                <span className="italic">Anywhere in the World</span>
              </h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Sky Smart solutions go beyond a single device. Our web and
                mobile applications adapt seamlessly to phones and tablets,
                giving users secure access to system data and controls wherever
                they are.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  label: "Adaptive UI",
                  desc: "Responsive layouts across all devices",
                },
                {
                  label: "Live Sync",
                  desc: "Consistent data across platforms",
                },
                {
                  label: "Secure Access",
                  desc: "Protected user authentication",
                },
                {
                  label: "Offline Support",
                  desc: "Access critical data when needed",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 border border-white/5 bg-white/5 rounded-2xl"
                >
                  <div className="text-white text-xs font-black uppercase tracking-widest mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono leading-tight">
                    {stat.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-fit px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl flex items-center gap-4 group"
            >
              Preview Mobile Dashboard
              <Smartphone
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceShowcase;
