import {
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiCalendar,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function JobDetails({
  job,
  onApply,
}) {
  if (!job) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

        <h2 className="text-xl font-bold text-[#0F2D4A]">
          Job not found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          The job you are looking for is no longer available.
        </p>

        <Link
          to="/careers"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <FiArrowLeft size={16} />
          Back to Careers
        </Link>

      </div>
    );
  }

  const responsibilities = Array.isArray(
    job.responsibilities
  )
    ? job.responsibilities
    : [];

  const requirements = Array.isArray(
    job.requirements
  )
    ? job.requirements
    : [];

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* Header */}

      <div className="border-b border-slate-100 bg-slate-50/70 p-5 sm:p-7 lg:p-8">

        <Link
          to="/careers"
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-slate-500
            transition
            hover:text-orange-500
          "
        >
          <FiArrowLeft size={14} />
          Back to Careers
        </Link>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

          <div>

            <span className="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-orange-500">
              {job.status || "Open"}
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#0F2D4A] sm:text-3xl lg:text-4xl">
              {job.title}
            </h1>

            {job.department && (
              <p className="mt-2 text-sm font-medium text-slate-500">
                {job.department}
              </p>
            )}

          </div>

          {onApply && (
            <button
              type="button"
              onClick={() => onApply(job)}
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-orange-500
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-orange-500/15
                transition
                hover:-translate-y-0.5
                hover:bg-orange-600
              "
            >
              Apply Now
            </button>
          )}

        </div>

        {/* Meta */}

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <MetaItem
            icon={<FiMapPin size={17} />}
            label="Location"
            value={job.location || "Not specified"}
          />

          <MetaItem
            icon={<FiBriefcase size={17} />}
            label="Job Type"
            value={job.type || "Full Time"}
          />

          <MetaItem
            icon={<FiClock size={17} />}
            label="Experience"
            value={job.experience || "Not specified"}
          />

          <MetaItem
            icon={<FiCalendar size={17} />}
            label="Posted"
            value={job.postedAt || "Recently"}
          />

        </div>

      </div>

      {/* Content */}

      <div className="grid grid-cols-1 gap-10 p-5 sm:p-7 lg:grid-cols-[1fr_280px] lg:p-8">

        {/* Main */}

        <div>

          {job.description && (
            <section>

              <h2 className="text-lg font-bold text-[#0F2D4A]">
                About the Role
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {job.description}
              </p>

            </section>
          )}

          {responsibilities.length > 0 && (
            <section className="mt-9">

              <h2 className="text-lg font-bold text-[#0F2D4A]">
                Responsibilities
              </h2>

              <ul className="mt-4 space-y-3">

                {responsibilities.map(
                  (item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                    >
                      <FiCheckCircle
                        size={17}
                        className="mt-1 shrink-0 text-orange-500"
                      />

                      <span>{item}</span>
                    </li>
                  )
                )}

              </ul>

            </section>
          )}

          {requirements.length > 0 && (
            <section className="mt-9">

              <h2 className="text-lg font-bold text-[#0F2D4A]">
                Requirements
              </h2>

              <ul className="mt-4 space-y-3">

                {requirements.map(
                  (item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                    >
                      <FiCheckCircle
                        size={17}
                        className="mt-1 shrink-0 text-orange-500"
                      />

                      <span>{item}</span>
                    </li>
                  )
                )}

              </ul>

            </section>
          )}

        </div>

        {/* Sidebar */}

        <aside>

          <div className="rounded-2xl bg-[#0F2D4A] p-5 text-white">

            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-400">
              Position Summary
            </p>

            <h3 className="mt-3 text-lg font-bold">
              {job.title}
            </h3>

            {job.salary && (
              <div className="mt-5 border-t border-white/10 pt-5">

                <p className="text-xs text-white/45">
                  Salary
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {job.salary}
                </p>

              </div>
            )}

            {onApply && (
              <button
                type="button"
                onClick={() => onApply(job)}
                className="
                  mt-6
                  w-full
                  rounded-xl
                  bg-orange-500
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-orange-600
                "
              >
                Apply for this Position
              </button>
            )}

          </div>

        </aside>

      </div>

    </article>
  );
}

/* =========================================================
   META ITEM
========================================================= */

function MetaItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}

export default JobDetails;