import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiMapPin,
  FiPhone,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";

function LabourDetails({
  labour,
  onRequest,
}) {
  if (!labour) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
          <FiUser size={22} />
        </div>

        <h2 className="mt-4 text-xl font-bold text-[#0F2D4A]">
          Worker not found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          The labour profile you are looking for is unavailable.
        </p>

        <Link
          to="/labour"
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-orange-500
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-orange-600
          "
        >
          <FiArrowLeft size={16} />
          Back to Labour
        </Link>

      </div>
    );
  }

  const isAvailable =
    labour.available !== false;

  const skills = Array.isArray(labour.skills)
    ? labour.skills
    : [];

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* Header */}

      <div className="bg-slate-50/70 p-5 sm:p-7 lg:p-8">

        <Link
          to="/labour"
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
          Back to Labour
        </Link>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Profile */}

          <div className="flex items-center gap-4">

            {labour.image ? (
              <img
                src={labour.image}
                alt={labour.name}
                className="
                  h-20
                  w-20
                  rounded-2xl
                  object-cover
                  sm:h-24
                  sm:w-24
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-2xl
                  bg-orange-50
                  text-orange-500
                  sm:h-24
                  sm:w-24
                "
              >
                <FiUser size={34} />
              </div>
            )}

            <div>

              <span
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  ${
                    isAvailable
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }
                `}
              >
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${
                      isAvailable
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }
                  `}
                />

                {isAvailable
                  ? "Available"
                  : "Unavailable"}
              </span>

              <h1 className="mt-2 text-2xl font-bold text-[#0F2D4A] sm:text-3xl">
                {labour.name}
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {labour.skill || "Construction Worker"}
              </p>

            </div>

          </div>

          {/* Request */}

          {onRequest && (
            <button
              type="button"
              disabled={!isAvailable}
              onClick={() => onRequest(labour)}
              className="
                inline-flex
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
                disabled:cursor-not-allowed
                disabled:bg-slate-200
                disabled:text-slate-400
              "
            >
              <FiCheckCircle size={17} />
              Request Worker
            </button>
          )}

        </div>

      </div>

      {/* Content */}

      <div className="grid grid-cols-1 gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_300px] lg:p-8">

        <div>

          {/* About */}

          {labour.description && (
            <section>

              <h2 className="text-lg font-bold text-[#0F2D4A]">
                About Worker
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {labour.description}
              </p>

            </section>
          )}

          {/* Skills */}

          {skills.length > 0 && (
            <section className="mt-8">

              <h2 className="text-lg font-bold text-[#0F2D4A]">
                Skills
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">

                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-xl
                      bg-orange-50
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-orange-600
                    "
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </section>
          )}

          {/* Work Experience */}

          {labour.workHistory &&
            labour.workHistory.length > 0 && (
              <section className="mt-8">

                <h2 className="text-lg font-bold text-[#0F2D4A]">
                  Work Experience
                </h2>

                <div className="mt-4 space-y-3">

                  {labour.workHistory.map(
                    (work, index) => (
                      <div
                        key={`${work.title}-${index}`}
                        className="
                          rounded-xl
                          border
                          border-slate-200
                          p-4
                        "
                      >

                        <p className="text-sm font-semibold text-slate-800">
                          {work.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {work.duration}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

        </div>

        {/* Sidebar */}

        <aside>

          <div className="rounded-2xl border border-slate-200 bg-white">

            <div className="border-b border-slate-100 px-5 py-4">

              <h3 className="font-bold text-[#0F2D4A]">
                Worker Information
              </h3>

            </div>

            <div className="divide-y divide-slate-100">

              <InfoItem
                icon={<FiBriefcase size={16} />}
                label="Primary Skill"
                value={
                  labour.skill ||
                  "Not specified"
                }
              />

              <InfoItem
                icon={<FiClock size={16} />}
                label="Experience"
                value={
                  labour.experience ||
                  "Not specified"
                }
              />

              <InfoItem
                icon={<FiMapPin size={16} />}
                label="Location"
                value={
                  labour.location ||
                  "Not specified"
                }
              />

              {labour.phone && (
                <InfoItem
                  icon={<FiPhone size={16} />}
                  label="Phone"
                  value={labour.phone}
                />
              )}

            </div>

          </div>

        </aside>

      </div>

    </article>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3 px-5 py-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-xs font-semibold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}

export default LabourDetails;