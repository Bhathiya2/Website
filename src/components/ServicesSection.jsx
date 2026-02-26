import ServiceCard from "./ServiceCard";
import { PiggyBank, Layers, Target, ShieldCheck, Cloud, Smile } from "lucide-react";

const services = [
  {
    title: "Eco Investment",
    icon: PiggyBank,
    description: "Smart investment solutions for modern homes."
  },
  {
    title: "All in One",
    icon: Layers,
    description: "Everything you need in one smart system."
  },
  {
    title: "Best Target",
    icon: Target,
    description: "Optimized solutions for your needs."
  },
  {
    title: "Safe & Secure",
    icon: ShieldCheck,
    description: "Advanced security and protection."
  },
  {
    title: "Cloud Based",
    icon: Cloud,
    description: "Access your system anywhere, anytime."
  },
  {
    title: "User Friendly",
    icon: Smile,
    description: "Simple, fast, and intuitive UI."
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-transparent relative z-10">
      {/* Title */}
      <div className="text-center mb-14">
        <p className="text-sm tracking-widest text-cyan-400 font-bold uppercase">SERVICES</p>
        <h2 className="text-3xl font-bold mt-3 text-white">
          What We Do Exactly?
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-14">
        <button className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
          Free Consultation →
        </button>
      </div>
    </section>
  );
}
