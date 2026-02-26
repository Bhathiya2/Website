import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLogos } from "../api/LogoApi";
import { API_HOST } from "../api/ProjectApi";

export default function Partners() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getLogos()
      .then((res) => {
        if (!mounted) return;
        const items = Array.isArray(res) ? res : (res?.data || []);
        const urls = items
          .map((item) => {
            const src = item?.url || item?.path || item?.filename || item?.image || item?.logo || item?.file || item?.src;
            if (!src) return null;
            const s = String(src);
            if (/^https?:\/\//i.test(s) || s.startsWith("//")) return s;
            const clean = s.replace(/^\/+/, "");
            if (clean.startsWith("storage/")) return `${API_HOST}/${clean}`;
            return `${API_HOST}/storage/${clean}`;
          })
          .filter(Boolean);
        setLogos(urls);
      })
      .catch(() => setLogos([]))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const list = logos.length ? logos : [];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden z-10">
      <div className="max-w-350 mx-auto px-6 mb-16 relative">
        <div className="flex flex-col items-center text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-12 h-1 bg-cyan-400 mb-6"
            />
            <span className="text-cyan-400 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">
              Trusted Network
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Powering the world's <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">smartest ecosystems</span>
            </h2>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-linear-to-r from-black to-transparent z-10 invisible md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-linear-to-l from-black to-transparent z-10 invisible md:block" />

        <div className="flex w-full overflow-hidden group py-10">
          <div className="flex space-x-24 animate-marquee whitespace-nowrap items-center">
            {list.concat(list).map((logo, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.06, filter: "brightness(1.05)" }}
                className="h-20 w-48 flex items-center justify-center opacity-100 transition-all duration-300 cursor-pointer"
              >
                <img src={logo} alt={`Partner ${i}`} className="max-h-16 w-auto object-contain" loading="lazy" />
              </motion.div>
            ))}
          </div>
          
           <div className="flex space-x-24 animate-marquee whitespace-nowrap items-center" aria-hidden="true">
            {list.concat(list).map((logo, i) => (
              <motion.div 
                key={i + 9999} 
                whileHover={{ scale: 1.06, filter: "brightness(1.05)" }}
                className="h-20 w-48 flex items-center justify-center opacity-100 transition-all duration-300 cursor-pointer"
              >
                <img src={logo} alt={`Partner ${i}`} className="max-h-16 w-auto object-contain" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-300 mx-auto h-px bg-linear-to-r from-transparent via-white/10 to-transparent mt-12" />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
