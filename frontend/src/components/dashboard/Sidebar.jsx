import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUser,
  FiBriefcase,
  FiFileText,
  FiHardDrive,
  FiBell,
  FiSettings,
  FiX,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

function Sidebar({
  isOpen = false,
  onClose,
  userName = "User",
  onLogout,
}) {
  const menuItems = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: FiGrid,
    },
    {
      label: "My Profile",
      path: "/dashboard/profile",
      icon: FiUser,
    },
    {
      label: "My Projects",
      path: "/dashboard/projects",
      icon: FaBuilding,
    },
    {
      label: "Service Requests",
      path: "/dashboard/service-requests",
      icon: FiFileText,
    },
    {
      label: "Job Applications",
      path: "/dashboard/job-applications",
      icon: FiBriefcase,
    },
    {
      label: "Notifications",
      path: "/dashboard/notifications",
      icon: FiBell,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: FiSettings,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="
            fixed
            inset-0
            z-40
            bg-[#071827]/50
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          bottom-0
          z-50
          flex
          w-[270px]
          flex-col
          bg-[#0F2D4A]
          text-white
          transition-transform
          duration-300
          ease-out
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">

          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
              <FaBuilding size={18} />
            </div>

            <div>
              <p className="font-bold tracking-wide">
                LAXMI
              </p>

              <p className="text-[9px] font-bold tracking-[0.2em] text-orange-400">
                CONSTRUCTION
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-white/60
              transition
              hover:bg-white/10
              hover:text-white
              lg:hidden
            "
          >
            <FiX size={20} />
          </button>

        </div>

        {/* User mini profile */}
        <div className="border-b border-white/10 px-4 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {userName}
              </p>

              <p className="text-xs text-white/40">
                Customer Account
              </p>
            </div>

          </div>

        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
            Dashboard
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    min-h-11
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-950/20"
                        : "text-white/65 hover:bg-white/10 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon
                    size={18}
                    className="shrink-0"
                  />

                  <span className="flex-1">
                    {item.label}
                  </span>

                  <FiChevronRight
                    size={15}
                    className="
                      -translate-x-1
                      opacity-0
                      transition-all
                      duration-200
                      group-hover:translate-x-0
                      group-hover:opacity-60
                    "
                  />
                </NavLink>
              );
            })}

          </div>

        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">

          <button
            type="button"
            onClick={onLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              font-medium
              text-white/65
              transition
              hover:bg-red-500/10
              hover:text-red-300
            "
          >
            <FiLogOut size={18} />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;