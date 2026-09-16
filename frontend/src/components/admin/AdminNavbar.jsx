import { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar({
  onMenuClick,
  adminName = "Admin",
  notificationCount = 3,
  onLogout,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 h-16 sm:h-[72px] bg-white border-b border-slate-200">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* LEFT */}

        <div className="flex items-center gap-3 min-w-0">

          <button
            type="button"
            onClick={onMenuClick}
            className="
              lg:hidden
              w-10
              h-10
              shrink-0
              rounded-xl
              bg-slate-100
              text-slate-700
              flex
              items-center
              justify-center
              hover:bg-orange-50
              hover:text-orange-500
              transition
            "
            aria-label="Open admin menu"
          >
            <FiMenu size={21} />
          </button>

          <div className="hidden sm:block">
            <p className="text-xs text-slate-400">
              Administration
            </p>

            <h1 className="text-lg font-bold text-[#0F2D4A]">
              Admin Panel
            </h1>
          </div>

        </div>

        {/* SEARCH */}

        <div className="hidden md:flex flex-1 max-w-md mx-auto">

          <div className="relative w-full">

            <FiSearch
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="search"
              placeholder="Search..."
              className="
                w-full
                h-10
                rounded-xl
                bg-slate-50
                border
                border-slate-200
                pl-11
                pr-4
                text-sm
                outline-none
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-500/10
                transition
              "
            />

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification */}

          <button
            type="button"
            className="
              relative
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              text-slate-600
              hover:bg-slate-100
              hover:text-orange-500
              transition
            "
            aria-label="Notifications"
            onClick={() => navigate("/admin/contact-messages")}
          >

            <FiBell size={19} />

            {notificationCount > 0 && (
              <span
                className="
                  absolute
                  top-1
                  right-1
                  min-w-4
                  h-4
                  px-1
                  rounded-full
                  bg-orange-500
                  text-white
                  text-[9px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  border-2
                  border-white
                "
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}

          </button>

          {/* Profile */}

          <div className="relative">

            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="
                flex
                items-center
                gap-2
                sm:gap-3
                rounded-xl
                px-2
                py-1.5
                hover:bg-slate-50
                transition
              "
              aria-expanded={profileOpen}
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-[#0F2D4A]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-sm
                "
              >
                {adminName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden sm:block text-left">

                <p className="text-sm font-semibold text-slate-800">
                  {adminName}
                </p>

                <p className="text-[11px] text-slate-400">
                  Administrator
                </p>

              </div>

              <FiChevronDown
                size={16}
                className={`
                  hidden sm:block
                  text-slate-400
                  transition-transform
                  ${profileOpen ? "rotate-180" : ""}
                `}
              />

            </button>

            {/* Dropdown */}

            {profileOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-2
                  w-52
                  rounded-2xl
                  bg-white
                  border
                  border-slate-200
                  shadow-xl
                  overflow-hidden
                  animate-dropdown
                "
              >

                <Link to="/admin/settings" onClick={() => setProfileOpen(false)}
                  type="button"
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-slate-700
                    hover:bg-slate-50
                    transition
                  "
                >
                  <FiUser size={17} />
                  Profile
                </Link>

                <Link to="/admin/settings" onClick={() => setProfileOpen(false)}
                  type="button"
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-slate-700
                    hover:bg-slate-50
                    transition
                  "
                >
                  <FiSettings size={17} />
                  Settings
                </Link>

                <div className="h-px bg-slate-100" />

                <button
                  type="button"
                  onClick={onLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-red-500
                    hover:bg-red-50
                    transition
                  "
                >
                  <FiLogOut size={17} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}

export default AdminNavbar;