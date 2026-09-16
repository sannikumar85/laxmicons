import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo1.png";

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2D4A] text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= MAIN FOOTER ================= */}

        <div className="py-14 sm:py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ================= COMPANY ================= */}

          <div className="sm:col-span-2 lg:col-span-1">

            <Link
              to="/"
              className="inline-block"
            >
              <img
                src={logo}
                alt="Laxmi Construction"
                className="w-44 sm:w-48 h-auto object-contain"
                loading="lazy"
              />
            </Link>

            <p className="mt-5 text-sm text-slate-300 leading-7 max-w-sm">
              Building reliable spaces with quality construction,
              expert planning and professional consultancy.
            </p>

            {/* Social */}

            <div className="flex gap-3 mt-6">

              <a
                href="#"
                aria-label="Facebook"
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:bg-orange-500
                  transition
                  duration-200
                "
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:bg-orange-500
                  transition
                  duration-200
                "
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:bg-orange-500
                  transition
                  duration-200
                "
              >
                <FaLinkedinIn size={16} />
              </a>

            </div>

          </div>

          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="text-base font-bold text-white mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Services", "/services"],
                ["Projects", "/projects"],
                ["Careers", "/careers"],
                ["Contact", "/contact"],
              ].map(([name, path]) => (

                <Link
                  key={name}
                  to={path}
                  className="
                    text-sm
                    text-slate-300
                    hover:text-orange-400
                    transition
                    duration-200
                  "
                >
                  {name}
                </Link>

              ))}

            </div>

          </div>

          {/* ================= SERVICES ================= */}

          <div>

            <h3 className="text-base font-bold text-white mb-5">
              Our Services
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/services"
                className="text-sm text-slate-300 hover:text-orange-400 transition"
              >
                Residential Construction
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-300 hover:text-orange-400 transition"
              >
                Commercial Construction
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-300 hover:text-orange-400 transition"
              >
                Construction Consultancy
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-300 hover:text-orange-400 transition"
              >
                Labour Supply
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-300 hover:text-orange-400 transition"
              >
                Renovation & Remodeling
              </Link>

            </div>

          </div>

          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="text-base font-bold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-5">

              {/* Location */}

              <div className="flex gap-3">

                <FiMapPin
                  size={19}
                  className="shrink-0 text-orange-400 mt-0.5"
                />

                <p className="text-sm text-slate-300 leading-6">
                  Muzaffarpur, Bihar,
                  <br />
                  India
                </p>

              </div>

              {/* Phone */}

              <a
                href="tel:+919999999999"
                className="flex gap-3 group"
              >

                <FiPhone
                  size={19}
                  className="shrink-0 text-orange-400"
                />

                <span className="text-sm text-slate-300 group-hover:text-orange-400 transition">
                  +91 99999 99999
                </span>

              </a>

              {/* Email */}

              <a
                href="mailto:info@laxmiconstruction.com"
                className="flex gap-3 group"
              >

                <FiMail
                  size={19}
                  className="shrink-0 text-orange-400"
                />

                <span className="text-sm text-slate-300 group-hover:text-orange-400 transition break-all">
                  info@laxmiconstruction.com
                </span>

              </a>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM FOOTER ================= */}

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs sm:text-sm text-slate-400 text-center md:text-left">
            © {currentYear} Laxmi Construction. All rights reserved.
          </p>

          <div className="flex items-center gap-5 sm:gap-7">

            <Link
              to="/"
              className="text-xs sm:text-sm text-slate-400 hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="text-xs sm:text-sm text-slate-400 hover:text-white transition"
            >
              Terms & Conditions
            </Link>

            <a
              href="#"
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition"
              aria-label="Back to top"
            >
              <FiArrowUpRight size={15} />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;