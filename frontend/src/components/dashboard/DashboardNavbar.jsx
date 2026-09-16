import { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function DashboardNavbar({
  onMenuClick,
  userName = "User",
  notificationCount = 0,
  onLogout,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white sm:h-[72px]">

      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open dashboard menu"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-700
              transition
              hover:bg-orange-50
              hover:text-orange-500
              lg:hidden
            "
          >
            <FiMenu size={21} />
          </button>

          <div className="hidden sm:block">
            <p className="text-xs text-slate-400">
              Welcome back
            </p>

            <h1 className="text-lg font-bold text-[#0F2D4A]">
              {userName}
            </h1>
          </div>

        </div>

        {/* Search */}
        <div className="mx-auto hidden max-w-md flex-1 md:flex">

          <div className="relative w-full">

            <FiSearch
              size={18}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="search"
              placeholder="Search your dashboard..."
              className="
                h-10
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                outline-none
                transition
                focus:border-orange-400
                focus:bg-white
                focus:ring-4
                focus:ring-orange-500/10
              "
            />

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notifications */}
          <button
            type="button"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-orange-500
            "
            aria-label="Notifications"
            onClick={() => navigate("/dashboard/notifications")}
          >

            <FiBell size={19} />

            {notificationCount > 0 && (
              <span
                className="
                  absolute
                  right-1
                  top-1
                  flex
                  h-4
                  min-w-4
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-orange-500
                  px-1
                  text-[9px]
                  font-bold
                  text-white
                "
              >
                {notificationCount > 9
                  ? "9+"
                  : notificationCount}
              </span>
            )}

          </button>

          {/* Profile */}
          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setProfileOpen((prev) => !prev)
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                px-1.5
                py-1.5
                transition
                hover:bg-slate-50
                sm:gap-3
                sm:px-2
              "
              aria-expanded={profileOpen}
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F2D4A] text-sm font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold text-slate-800">
                  {userName}
                </p>

                <p className="text-[11px] text-slate-400">
                  Customer
                </p>

              </div>

              <FiChevronDown
                size={16}
                className={`
                  hidden
                  text-slate-400
                  transition-transform
                  sm:block
                  ${profileOpen ? "rotate-180" : ""}
                `}
              />

            </button>

            {profileOpen && (
              <div className="animate-dropdown absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                <Link
                  to="/dashboard/profile"
                  onClick={() => setProfileOpen(false)}
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <FiUser size={17} />
                  My Profile
                </Link>

                <Link
                  to="/dashboard/settings"
                  onClick={() => setProfileOpen(false)}
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <FiSettings size={17} />
                  Settings
                </Link>

                <div className="h-px bg-slate-100" />

                <button
                  type="button"
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
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

export default DashboardNavbar;