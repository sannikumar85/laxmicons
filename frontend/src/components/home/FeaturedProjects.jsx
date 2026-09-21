import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiMapPin,
} from "react-icons/fi";

const projects = [
  {
    title: "Modern Residence",
    category: "Residential",
    location: "Muzaffarpur, Bihar",
    image: "/images/projects/project-1.jpg",
  },
  {
    title: "Contemporary Living",
    category: "Residential",
    location: "Bihar, India",
    image: "/images/projects/project-2.jpg",
  },
  {
    title: "Urban Commercial Space",
    category: "Commercial",
    location: "Bihar, India",
    image: "/images/projects/project-3.jpg",
  },
  {
    title: "Premium Family Home",
    category: "Residential",
    location: "Bihar, India",
    image: "/images/projects/project-4.jpg",
  },
  {
    title: "Landscape & Courtyard",
    category: "Renovation",
    location: "Bihar, India",
    image: "/images/projects/project-5.jpg",
  },
  {
    title: "Modern Architecture",
    category: "Residential",
    location: "Bihar, India",
    image: "/images/projects/project-6.jpg",
  },
];

function FeaturedProjects() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

          <div>

            <p className="text-orange-500 text-sm font-bold tracking-[0.2em] uppercase mb-3">
              Our Work
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2D4A]">
              Featured Projects
            </h2>

            <p className="text-slate-500 mt-4 max-w-xl leading-7">
              Explore selected spaces designed and built with attention
              to quality, functionality and modern aesthetics.
            </p>

          </div>

          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-[#0F2D4A] font-semibold"
          >

            Explore All Projects

            <FiArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
            />

          </Link>

        </div>

        {/* ================= PROJECT GRID ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <Link
              to="/projects"
              key={project.title}
              className="group relative h-[280px] overflow-hidden rounded-2xl sm:h-[330px]"
            >

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 via-[#071827]/20 to-transparent" />

              {/* Category */}

              <span className="absolute top-5 left-5 bg-white/95 text-[#0F2D4A] text-xs font-semibold px-3 py-2 rounded-full">
                {project.category}
              </span>

              {/* Arrow */}

              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center text-[#0F2D4A] group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">

                <FiArrowUpRight size={18} />

              </div>

              {/* Content */}

              <div className="absolute bottom-0 left-0 right-0 p-6">

                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-white/70 text-sm">

                  <FiMapPin size={14} />

                  {project.location}

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProjects;
