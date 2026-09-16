import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiCompass,
  FiUsers,
  FiTool,
} from "react-icons/fi";

import {
  FaBuilding,
} from "react-icons/fa";

const services = [
  {
    title: "Construction",
    description:
      "Residential and commercial construction with quality materials and professional execution.",
    image: "/images/construction-service.jpg",
    icon: FaBuilding,
  },
  {
    title: "Consultancy",
    description:
      "Professional planning, project guidance and construction consultancy for your requirements.",
    image: "/images/consultancy-service.jpg",
    icon: FiCompass,
  },
  {
    title: "Labour Supply",
    description:
      "Reliable and skilled workforce for construction projects of different scales.",
    image: "/images/labour-service.jpg",
    icon: FiUsers,
  },
  {
    title: "Renovation",
    description:
      "Transform existing spaces with practical renovation and modern design solutions.",
    image: "/images/renovation-service.jpg",
    icon: FiTool,
  },
];

function ServicesPreview() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mb-12">

          <div className="max-w-2xl">

            <p className="text-orange-500 text-sm font-bold tracking-[0.2em] uppercase mb-3">
              What We Do
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2D4A] leading-tight">

              Complete Construction

              <span className="block text-slate-400">
                Solutions Under One Roof.
              </span>

            </h2>

          </div>

          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-[#0F2D4A] font-semibold"
          >

            View All Services

            <FiArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />

          </Link>

        </div>

        {/* ================= SERVICE CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {services.map((service) => {

            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >

                {/* Image */}

                <div className="relative h-56 overflow-hidden">

                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D4A]/80 via-transparent to-transparent" />

                  {/* Icon */}

                  <div className="absolute left-5 bottom-5 w-12 h-12 rounded-xl bg-white text-orange-500 flex items-center justify-center shadow-lg">

                    <Icon size={21} />

                  </div>

                </div>

                {/* Content */}

                <div className="p-6">

                  <h3 className="text-xl font-bold text-[#0F2D4A]">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-6 mt-3">
                    {service.description}
                  </p>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-orange-500"
                  >

                    Learn More

                    <FiArrowUpRight size={16} />

                  </Link>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default ServicesPreview;