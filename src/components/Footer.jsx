import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import SkyLogo from "../assets/Logo/Final-bakrmvd.png";

export default function Footer() {
  return (
    <footer className="bg-[#000508] text-gray-300 relative overflow-hidden pt-32 pb-12 border-t border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Futuristic CTA Section */}
        <div className="relative mb-24 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-8 md:p-12 backdrop-blur-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
                Ready to <span className="text-cyan-400">Sync?</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-md">
                Join our elite network of innovators and stay at the pulse of
                automation.
              </p>
            </div>

            <div className="w-full lg:w-max flex flex-col sm:flex-row gap-4">
              <div className="relative group flex-grow lg:flex-none">
                <input
                  type="email"
                  placeholder="Enter high-speed email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500/50 text-white placeholder:text-gray-600 transition-all font-mono text-sm"
                />
                <div className="absolute inset-0 rounded-xl bg-cyan-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
              </div>
              <button className="bg-transparent text-black hover:bg-cyan-400 hover:text-black font-black px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-sm active:scale-95 shadow-lg shadow-white/5">
                Dispatch <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="relative inline-block group">
              <div className="absolute -inset-2 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-48 h-12 flex items-center">
                <img
                  src={SkyLogo}
                  alt="Sky Smart"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-400 font-medium">
              Architecting the sovereign layer of industrial intelligence. We
              don't just automate; we evolve systems.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(34,211,238,0.1)",
                    borderColor: "rgba(34,211,238,0.4)",
                  }}
                  className="w-12 h-12 bg-transparent/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Matrix */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-50">
              Infrastructure
            </h4>
            <ul className="space-y-4">
              {[
                "IoT Networks",
                "Neural Systems",
                "Cloud Sync",
                "Asset Edge",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group text-sm font-semibold"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500 scale-0 group-hover:scale-100 transition-transform"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Intelligence Network */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-50">
              Intelligence
            </h4>
            <ul className="space-y-4">
              {[
                "Research Lab",
                "Case Deployment",
                "Technical API",
                "Privacy Vault",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group text-sm font-semibold"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500 scale-0 group-hover:scale-100 transition-transform"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Node */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-50">
              Terminal
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start text-gray-400 group">
                <div className="w-10 h-10 rounded-lg bg-transparent/5 flex items-center justify-center shrink-0 group-hover:text-cyan-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium leading-relaxed mt-1">
                  No. A/59, Hungampola, Moronthota,
                  <br />
                  Kegalle, Sri Lanka
                </span>
              </li>
              <li className="flex gap-4 items-center text-gray-400 group">
                <div className="w-10 h-10 rounded-lg bg-transparent/5 flex items-center justify-center shrink-0 group-hover:text-cyan-400 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-mono tracking-tighter group-hover:text-white transition-colors">
                  info@skysmart.lk
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Hub */}
        <div className="border-t border-white/5 pt-12 flex flex-col lg:flex-row items-center justify-between gap-8 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest whitespace-nowrap">
              © {new Date().getFullYear()} Sky Smart Tech Core
            </p>
            <div className="hidden md:block w-px h-4 bg-transparent/10" />
            <div className="flex gap-6">
              {["Privacy_Protocol", "Terms_of_Sync"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[11px] font-mono text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest leading-none"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 bg-transparent/[0.02] border border-white/5 rounded-full">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-cyan-500 rounded-full" />
            </div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em]">
              Global_Network_Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
