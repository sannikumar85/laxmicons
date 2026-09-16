import { Link } from "react-router-dom";
import { FiArrowRight, FiHome } from "react-icons/fi";

function PageHeader({
  eyebrow = "Laxmi Construction",
  title,
  description = "",
  breadcrumb = "",
  image = "/images/hero-construction.jpg",
}) {
  return (
    <section className="relative min-h-[360px] sm:min-h-[410px] flex items-end overflow-hidden pt-28">

      {/* Background */}

      <div className="absolute inset-0">

        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="eager"
        />

        <div className="absolute inset-0 bg-[#071827]/70" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/90 via-[#071827]/65 to-[#071827]/30" />

      </div>

      {/* Content */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-14">

        {/* Breadcrumb */}

        <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-white/65 mb-5">

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 hover:text-white transition"
          >
            <FiHome size={14} />
            Home
          </Link>

          <FiArrowRight size={13} />

          <span className="text-white/90">
            {breadcrumb || title}
          </span>

        </div>

        {/* Eyebrow */}

        {eyebrow && (
          <p className="text-orange-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3">
            {eyebrow}
          </p>
        )}

        {/* Title */}

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Description */}

        {description && (
          <p className="mt-5 text-sm sm:text-base text-slate-200 leading-7 max-w-2xl">
            {description}
          </p>
        )}

      </div>

    </section>
  );
}

export default PageHeader;