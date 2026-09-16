import {
  FiUsers,
  FiFileText,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";

import { FaBuilding } from "react-icons/fa";

function AdminStats({
  stats = {},
}) {
  const items = [
    {
      label: "Total Users",
      value: stats.users ?? "0",
      change: stats.userChange ?? "+0%",
      icon: FiUsers,
    },
    {
      label: "Projects",
      value: stats.projects ?? "0",
      change: stats.projectChange ?? "+0%",
      icon: FaBuilding,
    },
    {
      label: "Service Requests",
      value: stats.requests ?? "0",
      change: stats.requestChange ?? "+0%",
      icon: FiFileText,
    },
    {
      label: "Job Applications",
      value: stats.applications ?? "0",
      change: stats.applicationChange ?? "+0%",
      icon: FiBriefcase,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

      {items.map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="
              group
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-5
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-0.5
              transition-all
              duration-300
            "
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-xs sm:text-sm text-slate-500">
                  {item.label}
                </p>

                <p className="mt-2 text-2xl sm:text-3xl font-bold text-[#0F2D4A]">
                  {item.value}
                </p>

                <div className="mt-2 flex items-center gap-1.5">

                  <FiTrendingUp
                    size={13}
                    className="text-emerald-500"
                  />

                  <span className="text-xs font-semibold text-emerald-500">
                    {item.change}
                  </span>

                  <span className="text-xs text-slate-400">
                    this month
                  </span>

                </div>

              </div>

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-xl
                  bg-orange-50
                  text-orange-500
                  flex
                  items-center
                  justify-center
                  group-hover:bg-orange-500
                  group-hover:text-white
                  transition-all
                  duration-300
                "
              >
                <Icon size={20} />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default AdminStats;