import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPlay,
  FiCheckCircle,
  FiUsers,
  FiCompass,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

function Hero() {
  return (
    <section
      className="
        relative
        min-h-[720px]
        sm:min-h-[760px]
        lg:min-h-[820px]
        flex
        items-center
        overflow-hidden
        bg-[#071827]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <div className="absolute inset-0">

        <img
          src="/images/hero-construction.jpg"
          alt="Construction project by Laxmi Construction"
          className="
            w-full
            h-full
            object-cover
            object-center
          "
          fetchPriority="high"
          decoding="async"
        />

        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-[#071827]/65" />

        {/* Left-side readability gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#071827]
            via-[#071827]/85
            to-[#071827]/20
          "
        />

        {/* Bottom fade */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-40
            bg-gradient-to-t
            from-[#071827]/60
            to-transparent
          "
        />

      </div>

      {/* =====================================================
          DECORATIVE ELEMENTS
          Lightweight CSS only
      ====================================================== */}

      <div
        className="
          absolute
          -right-32
          top-24
          hidden
          h-[500px]
          w-[500px]
          rounded-full
          border
          border-white/10
          lg:block
          hero-ring
        "
        aria-hidden="true"
      />

      <div
        className="
          absolute
          -right-10
          top-44
          hidden
          h-[330px]
          w-[330px]
          rounded-full
          border
          border-orange-400/10
          lg:block
        "
        aria-hidden="true"
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pt-24
          sm:pt-28
          lg:pt-24
        "
      >

        <div className="max-w-3xl">

          {/* =================================================
              EYEBROW
          ================================================== */}

          <div className="hero-item hero-delay-0">

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                bg-white/10
                px-3.5
                py-2
                sm:px-4
                backdrop-blur-md
              "
            >

              <span
                className="
                  relative
                  flex
                  h-2
                  w-2
                "
                aria-hidden="true"
              >
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-orange-400
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-orange-500
                  "
                />
              </span>

              <span
                className="
                  text-[10px]
                  sm:text-xs
                  font-semibold
                  tracking-[0.16em]
                  sm:tracking-[0.2em]
                  text-white/90
                "
              >
                BUILDING WITH PURPOSE
              </span>

            </div>

          </div>

          {/* =================================================
              MAIN HEADING
          ================================================== */}

          <h1
            className="
              hero-item
              hero-delay-1
              mt-6
              text-[2.65rem]
              leading-[1.05]
              tracking-tight
              font-extrabold
              text-white

              sm:text-5xl
              md:text-6xl

              lg:text-[4.5rem]
              xl:text-[5rem]
            "
          >

            Building Your

            <span className="block mt-1">

              Dreams Into{" "}

              <span className="relative inline-block text-orange-500">

                Reality.

                {/* Small underline */}
                <span
                  className="
                    absolute
                    left-0
                    -bottom-2
                    h-1
                    w-14
                    rounded-full
                    bg-orange-500
                    sm:w-20
                  "
                  aria-hidden="true"
                />

              </span>

            </span>

          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              hero-item
              hero-delay-2
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-slate-200

              sm:text-base
              sm:leading-8

              lg:text-lg
            "
          >
            From residential homes to commercial spaces, we deliver
            quality construction and professional consultancy designed
            around your vision.
          </p>

          {/* =================================================
              CTA BUTTONS
          ================================================== */}

          <div
            className="
              hero-item
              hero-delay-3
              mt-8
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:gap-4
            "
          >

            {/* Primary CTA */}

            <Link
              to="/contact"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-orange-500
                px-6
                py-3.5
                text-sm
                font-bold
                text-white

                shadow-lg
                shadow-orange-950/20

                transition-all
                duration-200
                ease-out

                hover:-translate-y-0.5
                hover:bg-orange-600
                hover:shadow-xl
                hover:shadow-orange-500/20

                active:translate-y-0
              "
            >

              <span>
                Start Your Project
              </span>

              <FiArrowRight
                size={18}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />

            </Link>

            {/* Secondary CTA */}

            <Link
              to="/projects"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/25
                bg-white/10
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                backdrop-blur-sm

                transition-all
                duration-200
                ease-out

                hover:-translate-y-0.5
                hover:border-white/40
                hover:bg-white/15

                active:translate-y-0
              "
            >

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  transition
                  duration-200
                  group-hover:bg-orange-500
                "
              >
                <FiPlay
                  size={13}
                  className="ml-0.5"
                />
              </span>

              <span>
                Explore Projects
              </span>

            </Link>

          </div>

          {/* =================================================
              TRUST FEATURES
          ================================================== */}

          <div
            className="
              hero-item
              hero-delay-4
              mt-10
              max-w-3xl

              border-t
              border-white/15

              pt-6
              sm:mt-12
              sm:pt-7
            "
          >

            <div
              className="
                grid
                grid-cols-1
                gap-5

                sm:grid-cols-3
                sm:gap-4
              "
            >

              <HeroFeature
                icon={<FaBuilding size={17} />}
                title="Quality Builds"
                description="Built to last"
              />

              <HeroFeature
                icon={<FiCompass size={19} />}
                title="Expert Planning"
                description="Clear & reliable"
              />

              <HeroFeature
                icon={<FiUsers size={18} />}
                title="Skilled Team"
                description="Experienced professionals"
              />

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-1/2
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-white/50

          md:flex
        "
        aria-hidden="true"
      >

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.3em]
          "
        >
          Scroll
        </span>

        <span className="hero-scroll-line" />

      </div>

    </section>
  );
}

/* =========================================================
   HERO FEATURE COMPONENT
========================================================= */

function HeroFeature({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3">

      {/* Icon */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-orange-400/20
          bg-orange-500/10
          text-orange-400
        "
      >
        {icon}
      </div>

      {/* Text */}

      <div className="min-w-0">

        <p className="truncate text-sm font-semibold text-white">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-white/55">
          {description}
        </p>

      </div>

    </div>
  );
}

export default Hero;