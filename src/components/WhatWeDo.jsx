// WhatWeDo.jsx
import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Target, Shield, Zap } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Investment",
    description: "ouris vel locus vitoe felis vesti\nbulum volutpat. Etiom est\nnunc venen.",
    icon: <DollarSign className="w-10 h-10 text-primary" />,
    color: "white",
  },
  {
    id: 2,
    title: "All in One",
    description: "ouris vel locus vitoe felis vesti\nbulum volutpat. Etiom est\nnunc venen.",
    icon: <Zap className="w-10 h-10 text-primary" />,
    color: "white",
  },
  {
    id: 3,
    title: "Best Target",
    description: "ouris vel locus vitoe felis vesti\nbulum volutpat. Etiom est\nnunc venen.",
    icon: <Target className="w-10 h-10 text-primary" />,
    color: "white",
  },
  {
    id: 4,
    title: "Safe & Secure",
    description: "ouris vel locus vitoe felis vesti\nbulum volutpat. Etiom est\nnunc venen.",
    icon: <Shield className="w-10 h-10 text-primary" />,
    color: "from-red-500/10 to-red-600/5",
  },
];

const WhatWeDo = () => {
  return (
    <section id="what-we-do" className="py-20 bg-gray-50 relative z-10 -mt-1">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive solutions tailored to your industrial automation needs
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Card */}
              <div className={`bg-gradient-to-br ${service.color} backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-200/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}>
                {/* Icon Container */}
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description - preserving line breaks */}
                <div className="text-gray-600 text-center whitespace-pre-line leading-relaxed font-light">
                  {service.description}
                </div>

                {/* Decorative Bottom Line */}
                <div className="mt-6 h-1 w-16 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your industrial operations?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-secondary hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;