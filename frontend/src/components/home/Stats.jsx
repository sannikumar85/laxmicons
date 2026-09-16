import {
  FiCalendar,
  FiAward,
  FiUsers,
} from "react-icons/fi";

import {
  FaBuilding,
} from "react-icons/fa";

const stats = [
  {
    number: "50+",
    label: "Projects Delivered",
    icon: FaBuilding,
  },
  {
    number: "100+",
    label: "Happy Clients",
    icon: FiUsers,
  },
  {
    number: "10+",
    label: "Years Experience",
    icon: FiCalendar,
  },
  {
    number: "100%",
    label: "Commitment to Quality",
    icon: FiAward,
  },
];

function Stats() {
  return (
    <section className="bg-[#0F2D4A] py-14">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="px-4 sm:px-8 lg:px-10 py-3 text-center group"
              >

                <div className="mx-auto w-11 h-11 rounded-xl bg-white/10 text-orange-400 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">

                  <Icon size={20} />

                </div>

                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.number}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  {stat.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Stats;