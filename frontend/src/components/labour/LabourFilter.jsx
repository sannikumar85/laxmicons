import { FiSearch, FiFilter, FiX } from "react-icons/fi";

function LabourFilter({
  filters = {},
  onChange,
  onReset,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    onChange?.({
      ...filters,
      [name]: value,
    });
  };

  const hasFilters =
    filters.search ||
    filters.skill ||
    filters.location ||
    filters.experience ||
    filters.availability;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

      {/* Header */}

      <div className="mb-4 flex items-center justify-between gap-3">

        <div className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <FiFilter size={17} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0F2D4A]">
              Find Labour
            </h3>

            <p className="text-[10px] text-slate-400">
              Search workers based on your requirements
            </p>
          </div>

        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-red-500
              transition
              hover:text-red-600
            "
          >
            <FiX size={14} />
            Clear
          </button>
        )}

      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

        {/* Search */}

        <div className="relative lg:col-span-2">

          <FiSearch
            size={17}
            className="
              pointer-events-none
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="search"
            name="search"
            value={filters.search || ""}
            onChange={handleChange}
            placeholder="Search worker or skill..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-10
              pr-3
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

        {/* Skill */}

        <select
          name="skill"
          value={filters.skill || ""}
          onChange={handleChange}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
        >
          <option value="">All Skills</option>
          <option value="mason">Mason</option>
          <option value="carpenter">Carpenter</option>
          <option value="electrician">Electrician</option>
          <option value="plumber">Plumber</option>
          <option value="painter">Painter</option>
          <option value="welder">Welder</option>
          <option value="helper">Helper</option>
        </select>

        {/* Location */}

        <input
          type="text"
          name="location"
          value={filters.location || ""}
          onChange={handleChange}
          placeholder="Location"
          className="
            h-11
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-3
            text-sm
            text-slate-700
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-orange-400
            focus:bg-white
            focus:ring-4
            focus:ring-orange-500/10
          "
        />

        {/* Experience */}

        <select
          name="experience"
          value={filters.experience || ""}
          onChange={handleChange}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
        >
          <option value="">
            Experience
          </option>

          <option value="0-2">
            0–2 Years
          </option>

          <option value="2-5">
            2–5 Years
          </option>

          <option value="5-10">
            5–10 Years
          </option>

          <option value="10+">
            10+ Years
          </option>
        </select>

      </div>

      {/* Availability */}

      <div className="mt-4 flex flex-wrap items-center gap-2">

        <span className="text-xs font-semibold text-slate-500">
          Availability:
        </span>

        {[
          {
            value: "",
            label: "All",
          },
          {
            value: "available",
            label: "Available",
          },
          {
            value: "unavailable",
            label: "Unavailable",
          },
        ].map((item) => {

          const active =
            (filters.availability || "") ===
            item.value;

          return (
            <button
              key={item.value || "all"}
              type="button"
              onClick={() =>
                onChange?.({
                  ...filters,
                  availability: item.value,
                })
              }
              className={`
                rounded-lg
                px-3
                py-1.5
                text-[10px]
                font-bold
                transition
                ${
                  active
                    ? "bg-orange-500 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-500"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}

      </div>

    </div>
  );
}

export default LabourFilter;