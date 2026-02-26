import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Zap, Target, Shield } from "lucide-react";

const services = [
  {
    title: "Investment",
    icon: <DollarSign className="w-6 h-6" />,
    text: "ouris vel locus vitoe felis vesti\nbulum volutpat. Etiom est\nnunc venen."
  },
  {
    title: "All in One",
    icon: <Zap className="w-6 h-6" />,
    text: "ouris vel locus vitoe felis vesti\nbulum volutpat. Etiom est\nnunc venen."
  },
  {
    title: "Best Target",
    icon: <Target className="w-6 h-6" />,
    text: "ouris vel locus vitoe felis vesti\nbulum volutpat. Etiom est\nnunc venen."
  },
  {
    title: "Safe & Secure",
    icon: <Shield className="w-6 h-6" />,
    text: "ouris vel locus vitoe felis vesti\nbulum volutpat. Etiom est\nnunc venen."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function Services() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-transparent rounded-xl p-8 border border-gray-200 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Icon and Title Container */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    {React.cloneElement(service.icon, { 
                      className: "w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" 
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Text with line breaks preserved */}
                <div className="text-gray-600 text-sm leading-relaxed flex-grow whitespace-pre-line font-light">
                  {service.text}
                </div>

                {/* Bottom accent line */}
                <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-primary/30 transition-colors duration-300">
                  <div className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
