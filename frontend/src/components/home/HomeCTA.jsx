import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiPhone,
} from "react-icons/fi";

function HomeCTA() {
  return (
    <section className="py-20 sm:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-[#0F2D4A] px-5 py-12 sm:px-10 sm:py-16 lg:px-16">

          {/* Decorative circles */}

          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/10" />

          <div className="absolute -right-5 -bottom-32 w-72 h-72 rounded-full border border-orange-500/20" />

          {/* Content */}

          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-center gap-10">

            <div>

              <p className="text-orange-400 text-sm font-bold tracking-[0.2em] uppercase mb-3">
                Start Your Project
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight">
                Have a Project in Mind?
              </h2>

              <p className="text-slate-300 mt-5 max-w-xl leading-7">
                Tell us what you are planning. Our team can help you
                understand the next steps for your construction project.
              </p>

            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">

              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
              >

                Request a Consultation

                <FiArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />

              </Link>

              <a
                href="tel:+919999999999"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-semibold transition"
              >

                <FiPhone size={18} />

                Talk to Us

              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HomeCTA;
