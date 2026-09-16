import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logos/logo1.png";

import {
  FiMenu,
  FiX,
  FiPhone,
  FiArrowRight,
} from "react-icons/fi";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Careers",
      path: "/careers",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 pt-3 sm:pt-4">

        <nav className="relative bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-900/5 rounded-2xl">

          {/* ================= TOP NAV ================= */}

          <div className="h-[72px] sm:h-20 px-4 sm:px-6 flex items-center justify-between">

            {/* ================= LOGO ================= */}

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            >

              <div className="h-11 w-24 sm:h-14 sm:w-32 flex items-center overflow-hidden">

                <img
                  src={logo}
                  alt="Laxmi Construction"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  fetchPriority="high"
                />

              </div>

              <div className="hidden sm:block">

                <p className="font-bold text-[#0F2D4A] text-sm leading-none tracking-wide">
                  LAXMI
                </p>

                <p className="text-[9px] font-bold text-orange-500 tracking-[0.22em] mt-1">
                  CONSTRUCTION
                </p>

              </div>

            </Link>

            {/* ================= DESKTOP NAV ================= */}

            <div className="hidden lg:flex items-center gap-6 xl:gap-8">

              {navLinks.map((link) => (

                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `
                    relative
                    py-2
                    text-sm
                    font-semibold
                    transition-colors
                    duration-200
                    ${
                      isActive
                        ? "text-orange-500"
                        : "text-slate-700 hover:text-orange-500"
                    }
                    `
                  }
                >
                  {link.name}
                </NavLink>

              ))}

            </div>

            {/* ================= DESKTOP ACTIONS ================= */}

            <div className="hidden lg:flex items-center gap-3">

              <a
                href="tel:+919999999999"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  text-slate-700
                  hover:text-orange-500
                  transition
                "
              >
                <FiPhone size={16} />
                <span>Call Us</span>
              </a>

              {isAuthenticated ? <Link to={user?.role === "admin" ? "/admin" : "/dashboard"} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:text-orange-500">Dashboard</Link> : <><Link to="/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:text-orange-500">Login</Link><Link to="/register" className="rounded-xl border border-orange-500 px-3 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-50">Register</Link></>}

              {isAuthenticated && <button type="button" onClick={logout} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:text-red-500">Logout</button>}

              <Link
                to="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  hover:shadow-lg
                  hover:shadow-orange-500/20
                  active:scale-[0.98]
                "
              >

                Get Started

                <FiArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />

              </Link>

            </div>

            {/* ================= MOBILE BUTTON ================= */}

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="
                lg:hidden
                w-10
                h-10
                rounded-xl
                bg-slate-100
                text-slate-800
                flex
                items-center
                justify-center
                hover:bg-orange-50
                hover:text-orange-500
                transition
              "
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
            >

              {mobileOpen ? (
                <FiX size={22} />
              ) : (
                <FiMenu size={22} />
              )}

            </button>

          </div>

          {/* ================= MOBILE MENU ================= */}

          <div
            className={`
              lg:hidden
              overflow-hidden
              transition-all
              duration-300
              ease-out
              ${
                mobileOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }
            `}
          >

            <div className="border-t border-slate-100 px-4 sm:px-5 py-4">

              <div className="flex flex-col gap-1">

                {navLinks.map((link) => (

                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-semibold
                      transition
                      ${
                        isActive
                          ? "bg-orange-50 text-orange-500"
                          : "text-slate-700 hover:bg-slate-50"
                      }
                      `
                    }
                  >
                    {link.name}
                  </NavLink>

                ))}

              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">

                {!isAuthenticated && <div className="grid grid-cols-2 gap-3 sm:col-span-2"><Link to="/login" onClick={closeMobileMenu} className="flex items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700">Login</Link><Link to="/register" onClick={closeMobileMenu} className="flex items-center justify-center rounded-xl border border-orange-500 py-3 text-sm font-semibold text-orange-500">Register</Link></div>}

                <a
                  href="tel:+919999999999"
                  onClick={closeMobileMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    text-slate-700
                    text-sm
                    font-semibold
                    hover:border-orange-300
                    hover:text-orange-500
                    transition
                  "
                >
                  <FiPhone size={16} />
                  Call Us
                </a>

                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-xl
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    text-sm
                    font-semibold
                    transition
                  "
                >
                  Get Started
                  <FiArrowRight size={16} />
                </Link>

              </div>

            </div>

          </div>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;