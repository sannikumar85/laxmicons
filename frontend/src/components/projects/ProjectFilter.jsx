import React from "react";
import {
  FiSearch,
  FiFilter,
  FiX,
} from "react-icons/fi";

const ProjectFilter = ({
  filters,
  onChange,
  onReset,
}) => {
  const handleChange = (field, value) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  const hasFilters =
    filters?.search ||
    filters?.category ||
    filters?.status;

  return (
    <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={filters?.search || ""}
            onChange={(e) =>
              handleChange("search", e.target.value)
            }
            placeholder="Search projects..."
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-[#E87524]/10"
          />
        </div>

        {/* Category */}
        <div className="relative min-w-full sm:min-w-[180px] lg:min-w-[200px]">
          <FiFilter
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={filters?.category || ""}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
            className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-[#E87524]/10"
          >
            <option value="">All Categories</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Renovation">Renovation</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Consultancy">Consultancy</option>
          </select>
        </div>

        {/* Status */}
        <div className="min-w-full sm:min-w-[180px] lg:min-w-[180px]">
          <select
            value={filters?.status || ""}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-[#E87524]/10"
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        {/* Reset */}
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 text-sm font-semibold text-gray-600 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiX size={17} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilter;