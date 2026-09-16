import {
  FiArrowUpRight,
  FiArrowDownRight,
} from "react-icons/fi";

function StatCard({
  title,
  value = "0",
  description = "",
  icon,
  trend,
  trendType = "positive",
  className = "",
}) {
  const isPositive = trendType === "positive";

  return (
    <div
      className={`
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-lg
        ${className}
      `}
    >

      <div className="flex items-start justify-between gap-4">

        {/* Content */}
        <div className="min-w-0">

          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F2D4A] sm:text-3xl">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}

          {trend && (
            <div className="mt-3 flex items-center gap-1.5">

              {isPositive ? (
                <FiArrowUpRight
                  size={14}
                  className="text-emerald-500"
                />
              ) : (
                <FiArrowDownRight
                  size={14}
                  className="text-red-500"
                />
              )}

              <span
                className={`
                  text-xs
                  font-semibold
                  ${
                    isPositive
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                `}
              >
                {trend}
              </span>

            </div>
          )}

        </div>

        {/* Icon */}
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-orange-50
            text-orange-500
            transition-all
            duration-300
            group-hover:bg-orange-500
            group-hover:text-white
          "
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;