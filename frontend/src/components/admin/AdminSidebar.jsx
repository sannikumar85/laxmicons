import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiHardDrive,
  FiMessageSquare,
  FiSettings,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

import { FaBuilding } from "react-icons/fa";

function AdminSidebar({
  isOpen = false,
  onClose,
}) {
  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: FiGrid,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: FiUsers,
    },
    {
      label: "Projects",
      path: "/admin/projects",
      icon: FaBuilding,
    },
    {
      label: "Service Requests",
      path: "/admin/service-requests",
      icon: FiFileText,
    },
    {
      label: "Labour",
      path: "/admin/labour",
      icon: FiHardDrive,
    },
    {
      label: "Jobs",
      path: "/admin/jobs",
      icon: FiBriefcase,
    },
    {
      label: "Job Applications",
      path: "/admin/job-applications",
      icon: FiFileText,
    },
    {
      label: "Messages",
      path: "/admin/contact-messages",
      icon: FiMessageSquare,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: FiSettings,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-[#071827]/50
            lg:hidden
          "
          aria-label="Close sidebar"
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
          w-[270px]
          bg-[#0F2D4A]
          text-white
          flex
          flex-col
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

        <div className="h-[72px] px-5 flex items-center justify-between border-b border-white/10">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-orange-500
                flex
                items-center
                justify-center
              "
            >
              <FaBuilding size={18} />
            </div>

            <div>

              <p className="font-bold tracking-wide">
                LAXMI
              </p>

              <p className="text-[9px] text-orange-400 tracking-[0.2em]">
                CONSTRUCTION
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              lg:hidden
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              text-white/60
              hover:bg-white/10
              hover:text-white
            "
            aria-label="Close sidebar"
          >
            <FiX size={20} />
          </button>

        </div>

        {/* Menu */}

        <nav className="flex-1 overflow-y-auto px-3 py-6">

          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
            Main Menu
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    items-center
                    gap-3
                    min-h-11
                    px-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-950/20"
                        : "text-white/65 hover:bg-white/8 hover:text-white"
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
                      opacity-0
                      -translate-x-1
                      transition-all
                      duration-200
                      group-hover:opacity-60
                      group-hover:translate-x-0
                    "
                  />

                </NavLink>
              );
            })}

          </div>

        </nav>

        {/* Bottom Card */}

        <div className="p-4">

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">

            <p className="text-sm font-semibold text-white">
              Need Help?
            </p>

            <p className="text-xs text-white/45 leading-5 mt-1">
              Contact the system administrator for assistance.
            </p>

            <button
              type="button"
              className="
                mt-3
                w-full
                py-2.5
                rounded-xl
                bg-white/10
                hover:bg-orange-500
                text-xs
                font-semibold
                text-white
                transition
              "
            >
              Support
            </button>

          </div>

        </div>

      </aside>
    </>
  );
}

export default AdminSidebar;
