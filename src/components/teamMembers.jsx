// TeamSection.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Jo Lee Wu",
    role: "CEO",
    img: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/m3.jpg",
  },
  {
    name: "Amanda Doe",
    role: "Developer",
    img: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/m4.jpg",
  },
  {
    name: "Mark Smith",
    role: "Manager",
    img: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/m1.jpg",
  },
  {
    name: "Jane Carter",
    role: "Developer",
    img: "https://xtratheme.com/elementor/smart-home/wp-content/uploads/sites/23/2018/06/m2.jpg",
  },
];

export default function TeamSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
    arrows: true,
  };

  return (
    <section className="bg-transparent py-16 px-4 md:px-16 text-white border-y border-white/5 relative z-10">
      <div className="md:flex md:items-center md:justify-between mb-12">
        <div className="md:w-1/3 text-center md:text-left">
          <span className="text-cyan-400 tracking-widest text-sm font-light">MEMBERS</span>
          <h2 className="text-3xl font-semibold mt-2">Our Team</h2>
          <p className="text-gray-400 mt-2">
            Dedicated experts building the future of industrial IoT.
          </p>
          <a
            href="#"
            className="inline-block mt-4 px-6 py-2 border border-cyan-500 text-cyan-400 font-semibold rounded hover:bg-cyan-500 hover:text-white transition"
          >
            All Team Members
          </a>
        </div>
        <div className="md:w-2/3 mt-8 md:mt-0">
          <Slider {...settings}>
            {teamMembers.map((member, index) => (
              <div key={index} className="px-2">
                <div className="bg-transparent/5 border border-white/10 rounded-lg overflow-hidden relative group">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-72 object-cover transition-opacity duration-300 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-4 text-white text-2xl">
                      <a href="#"><Facebook className="w-6 h-6 hover:text-cyan-400 transition-colors" /></a>
                      <a href="#"><Twitter className="w-6 h-6 hover:text-cyan-400 transition-colors" /></a>
                      <a href="#"><Linkedin className="w-6 h-6 hover:text-cyan-400 transition-colors" /></a>
                    </div>
                  </div>
                  <div className="p-4 text-center text-white">
                    <h3 className="text-xl font-medium">{member.name}</h3>
                    <p className="text-gray-300">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
