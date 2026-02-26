import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "FREE",
    period: "Life Time",
    features: [
      "Industrial IOT Lite",
      "1 Machine Connected",
      "Standard Dashboards",
      "Email Alerts",
      "Community Support",
    ],
  },
  {
    name: "Standard",
    price: "$99",
    period: "Monthly",
    features: [
      "Full IoT Access",
      "5 Machines Connected",
      "Custom Reports",
      "SMS & Email Alerts",
      "24/7 Technical Support",
    ],
  },
  {
    name: "Enterprise",
    price: "$249",
    period: "Monthly",
    featured: true,
    features: [
      "Unlimited Machine Sync",
      "AI Predictive Analytics",
      "On-Premise Deployment",
      "Dedicated Success Manager",
      "Custom API Integration",
    ],
  },
  {
    name: "Custom",
    price: "Quote",
    period: "Yearly",
    features: [
      "Full Factory Network",
      "Custom Protocol Support",
      "White-label Option",
      "Staff Training Included",
      "Service Level Agreement",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-transparent z-10 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-4"
          >
            Flexible Plans
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white relative z-10"
          >
            Ready to scale your <span className="text-cyan-400">factory?</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.featured
                  ? "bg-[#0a0a0a] backdrop-blur-md border border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.15)] lg:-mt-4 lg:mb-4 transform scale-105"
                  : "bg-black/40 backdrop-blur-md text-white border border-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                  Recommended
                </div>
              )}

              <h3
                className={`uppercase tracking-widest text-sm font-bold mb-6 ${plan.featured ? "text-cyan-300" : "text-gray-300"}`}
              >
                {plan.name}
              </h3>

              <div className="mb-8">
                <p className="text-4xl font-bold">{plan.price}</p>
                <p
                  className={`text-sm mt-1 font-medium ${plan.featured ? "text-gray-300" : "text-gray-400"}`}
                >
                  {plan.period}
                </p>
              </div>

              <div
                className={`w-full h-px mb-8 ${plan.featured ? "bg-transparent/10" : "bg-transparent/5"}`}
              ></div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.featured ? "bg-cyan-500 text-black" : "bg-cyan-500/10 text-cyan-400"}`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span
                      className={
                        plan.featured ? "text-gray-200" : "text-gray-300"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group ${
                  plan.featured
                    ? "bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    : "bg-transparent/10 text-white hover:bg-transparent/20 border border-white/5"
                }`}
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
