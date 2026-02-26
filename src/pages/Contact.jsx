import React, { useEffect } from "react";
import PageCover from "../components/PageCover";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const contactItems = [
  {
    title: "Email",
    value: "info@skysmart.lk",
    href: "mailto:info@skysmart.lk",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "Office: 035 227 8457",
    href: "tel:+18003334455",
    icon: Phone,
  },
  {
    title: "Address",
    value: "No. A/59, Hungampola, Moronthota, Kegalle, Sri Lanka",
    href: "https://www.google.com/maps?q=Sky+Smart+Technology,+Sri+Lanka",
    icon: MapPin,
    external: true,
  },
];

const socialItems = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:info@skysmart.lk", label: "Email" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-transparent min-h-screen text-white">
      <title>Contact Us | Sky Smart Intelligence - Engineering Support & Inquiry</title>
      <meta name="description" content="Get in touch with Sky Smart Intelligence for industrial IoT consulting, automation solutions, or technical support in Kegalle, Sri Lanka." />
      <link rel="canonical" href="https://skyaccount.perahara.lk/company/contact" />
      {/* Page Cover */}
      <PageCover title="Contact" />

      {/* Grid Layout for Info and Message */}
      <section className="relative overflow-hidden min-h-[70vh] md:min-h-screen flex items-center justify-center py-24">
        <div className="container mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center lg:pl-16">
          
          {/* Left Column: Info Terminal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            variants={fadeUp}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                    {[1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />)}
                </div>
                <span className="text-cyan-400 tracking-[0.4em] text-[10px] font-black uppercase">
                  Communication Terminal [COM-01]
                </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              ESTABLISH <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 italic pr-2">CONNECTION</span>
            </h2>

            <p className="text-gray-400 text-lg font-light leading-relaxed mb-12 max-w-lg">
              Our engineering support team is ready to analyze your industrial challenges. Deploy a message directly to our core system for rapid response.
            </p>

            <div className="space-y-6">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="flex items-center gap-6 p-6 bg-black/50 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group overflow-hidden relative"
                    whileHover={{ x: 10 }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black tracking-widest text-zinc-500 uppercase mb-1">{item.title}</h4>
                      <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase">{item.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Deployment Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="bg-black/80 border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl relative"
          >
            <div className="absolute top-0 right-10 w-24 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute bottom-0 left-10 w-24 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 italic tracking-tighter">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              DIRECT_MESSAGE.EXE
            </h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">User.Name</label>
                  <input type="text" placeholder="Identity" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">Source.Protocol</label>
                  <input type="email" placeholder="Email@Network" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors text-sm" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">Org.Unit</label>
                  <input type="text" placeholder="Company/Organization" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">Comm.Channel</label>
                  <input type="tel" placeholder="Contact Number" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors text-sm" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">Ticket.Subject</label>
                  <input type="text" placeholder="Topic Overflow" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">Project.Scale</label>
                  <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors text-sm">
                    {/* <option value="" disabled selected className="text-zinc-500">Select Project Type</option> */}
                    <option value="consultation">Consultation</option>
                    <option value="development">Development</option>
                    <option value="integration">System Integration</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">Priority.Level</label>
                  <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors text-sm">
                    {/* <option value="" disabled selected className="text-zinc-500">Select Urgency</option> */}
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">Budget.Range</label>
                  <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors text-sm">
                    {/* <option value="" disabled selected className="text-zinc-500">Select Budget Range</option> */}
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase text-zinc-500 ml-2">Data.Packet</label>
                <textarea rows="4" placeholder="Input message data..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-500/50 outline-none transition-colors resize-none text-sm"></textarea>
              </div>

              <button className="w-full bg-cyan-600 hover:bg-cyan-500 py-5 rounded-xl font-black text-xs tracking-[0.3em] uppercase transition-all shadow-lg shadow-cyan-950 hover:shadow-cyan-500/40 active:scale-[0.98] text-white">
                Deploy Message
              </button>
            </form>
          </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        {/* Location Section */}
        <div className="mt-32 lg:pl-16">
             <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-zinc-800"></div>
                <h4 className="text-xs font-black tracking-[0.4em] text-zinc-500 uppercase">Geospatial_Node [SRI-01]</h4>
             </div>
             
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: false, margin: "-10%" }}
               className="w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-1000 group"
             >
                <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none group-hover:opacity-0 transition-opacity z-10" />
                <iframe
                    title="Sky Smart Technology Location"
                    src="https://www.google.com/maps?q=Sky+Smart+Technology,+Sri+Lanka&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                />
             </motion.div>
        </div>

        {/* Social Bridge */}
        <div className="flex flex-wrap items-center justify-center gap-12 mt-32 pt-12">
            {socialItems.map((item, i) => (
                <motion.a
                   key={i}
                   href={item.href}
                   whileHover={{ y: -5, color: "#22d3ee" }}
                   className="flex items-center gap-3 text-zinc-500 font-bold text-[10px] tracking-widest uppercase transition-colors"
                >
                   <item.icon size={16} />
                   {item.label}
                </motion.a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
