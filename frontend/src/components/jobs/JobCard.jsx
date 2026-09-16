import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

function JobCard({
  job,
  onApply,
}) {
  if (!job) {
    return null;
  }

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-200
        hover:shadow-xl
        hover:shadow-slate-900/5
      "
    >
      {/* Top */}

      <div className="flex items-start justify-between gap-4">

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-orange-50
            text-orange-500
            transition
            duration-300
            group-hover:bg-orange-500
            group-hover:text-white
          "
        >
          <FiBriefcase size={21} />
        </div>

        <span
          className="
            rounded-full
            bg-emerald-50
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-emerald-600
          "
        >
          {job.status || "Open"}
        </span>

      </div>

      {/* Content */}

      <div className="mt-5 flex-1">

        <h3 className="text-lg font-bold text-[#0F2D4A] transition group-hover:text-orange-500">
          {job.title || "Untitled Position"}
        </h3>

        {job.department && (
          <p className="mt-1 text-xs font-medium text-slate-400">
            {job.department}
          </p>
        )}

        {/* Meta */}

        <div className="mt-5 space-y-2.5">

          {job.location && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FiMapPin
                size={15}
                className="shrink-0 text-orange-500"
              />
              <span>{job.location}</span>
            </div>
          )}

          {job.type && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FiBriefcase
                size={15}
                className="shrink-0 text-orange-500"
              />
              <span>{job.type}</span>
            </div>
          )}

          {job.experience && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FiClock
                size={15}
                className="shrink-0 text-orange-500"
              />
              <span>{job.experience}</span>
            </div>
          )}

        </div>

        {/* Description */}

        {job.description && (
          <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
            {job.description}
          </p>
        )}

      </div>

      {/* Bottom */}

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">

        <div>
          {job.salary && (
            <p className="text-sm font-bold text-[#0F2D4A]">
              {job.salary}
            </p>
          )}

          {job.postedAt && (
            <p className="mt-1 text-[11px] text-slate-400">
              Posted {job.postedAt}
            </p>
          )}
        </div>

        <Link
          to={`/jobs/${job.id || job._id}`}
          className="
            group/link
            inline-flex
            items-center
            gap-1.5
            rounded-xl
            bg-orange-50
            px-4
            py-2.5
            text-xs
            font-bold
            text-orange-500
            transition
            duration-200
            hover:bg-orange-500
            hover:text-white
          "
        >
          View Job

          <FiArrowRight
            size={14}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>

      </div>

      {onApply && (
        <button
          type="button"
          onClick={() => onApply(job)}
          className="
            mt-3
            w-full
            rounded-xl
            bg-[#0F2D4A]
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#0a2238]
          "
        >
          Apply Now
        </button>
      )}

    </article>
  );
}

export default JobCard;