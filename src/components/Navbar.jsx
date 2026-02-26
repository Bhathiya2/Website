import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import SkyLogo from "../assets/Logo/Final-bakrmvd.png"

const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          layout
          className={`relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            scrolled 
              ? "w-full max-w-4xl bg-black/80 backdrop-blur-xl border border-white/5 md:border-white/10 rounded-full pl-6 pr-2 py-2.5 shadow-[0_8px_32px_rgba(0,188,212,0.1)]" 
              : "w-full max-w-[1400px] bg-transparent py-4 px-6"
          }`}
        >
          {/* Top Scanned Border on Scroll */}
          {scrolled && (
            <motion.div 
              layoutId="nav-glow"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent z-20"
            />
          )}

          {/* LOGO */}
          <div className="flex items-center gap-3">
             <Link to="/" className="block relative group">
                <img
                  src={SkyLogo}
                  alt="Sky Smart"
                  className={`object-contain transition-all duration-500 ${scrolled ? "h-7" : "h-10 md:h-12"} brightness-110`}
                />
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -z-10" />
             </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 bg-transparent px-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-5 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 group ${
                   scrolled ? "text-zinc-400 hover:text-white" : "text-white/80 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <motion.div className="absolute bottom-1.5 left-5 right-5 h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTION */}
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`hidden md:flex items-center gap-2 px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-lg border ${
                  scrolled 
                    ? "bg-cyan-500 border-cyan-400 text-black shadow-cyan-500/20" 
                    : "bg-transparent/5 backdrop-blur-md border-white/10 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10"
                }`}
             >
                Connect <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </motion.button>

             {/* MOBILE TOGGLE */}
             <button 
               onClick={() => setOpen(!open)}
               className={`md:hidden p-2 rounded-full transition-colors ${
                 scrolled ? "bg-transparent/10 text-white" : "bg-transparent/10 text-white"
               }`}
             >
               {open ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
        </motion.div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {open && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md md:hidden"
             onClick={() => setOpen(false)}
           >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 250 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-black border-l border-white/5 p-8 flex flex-col"
              >
                 {/* Cyber Scanline for Mobile Menu */}
                 <motion.div 
                    animate={{ top: ["-10%", "110%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-cyan-500/10 pointer-events-none"
                 />

                 <div className="flex justify-between items-center mb-16 relative z-10">
                    <img src={SkyLogo} alt="Logo" className="h-8 brightness-150" />
                    <button 
                        onClick={() => setOpen(false)} 
                        className="p-3 bg-transparent/5 border border-white/10 rounded-xl text-white hover:bg-cyan-500 hover:text-black transition-all"
                    >
                      <X size={20} />
                    </button>
                 </div>

                 <nav className="flex flex-col gap-2 relative z-10">
                   {menuItems.map((item, i) => (
                     <motion.div
                       key={item.name}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 0.1 + (i * 0.05) }}
                       className="group p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-transparent/5 flex justify-between items-center transition-all"
                     >
                        <Link to={item.path} onClick={() => setOpen(false)} className="flex flex-col w-full">
                            <span className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                                {item.name}
                            </span>
                            <span className="text-[8px] font-mono text-white/20 tracking-[0.3em] uppercase">Sector_{item.name === "Home" ? "00" : "0" + i}</span>
                        </Link>
                       <ArrowRight size={20} className="text-cyan-500 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                     </motion.div>
                   ))}
                 </nav>

                 <div className="mt-auto pt-8 border-t border-white/5 relative z-10">
                    <div className="mb-6 flex justify-between items-center px-4">
                        <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase italic">Encryption Status</span>
                        <span className="text-[9px] font-mono text-cyan-400 tracking-widest uppercase font-black">Secure</span>
                    </div>
                    <button className="relative w-full py-5 bg-cyan-500 text-black font-black uppercase text-xs tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.3)] group overflow-hidden">
                       <div className="absolute inset-0 bg-transparent/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                       Log Into Portal <ArrowRight size={14} />
                    </button>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
