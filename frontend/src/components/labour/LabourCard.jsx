import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiClock,
  FiArrowRight,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";

function LabourCard({
  labour,
  onRequest,
}) {
  if (!labour) {
    return null;
  }

  const isAvailable =
    labour.available !== false;

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
      {/* TOP */}

      <div className="flex items-start justify-between gap-4">

        {/* Profile */}

        <div className="flex items-center gap-3">

          {labour.image ? (
            <img
              src={labour.image}
              alt={labour.name || "Labour worker"}
              loading="lazy"
              className="
                h-14
                w-14
                shrink-0
                rounded-xl
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-orange-50
                text-orange-500
              "
            >
              <FiUser size={23} />
            </div>
          )}

          <div className="min-w-0">

            <h3 className="truncate text-base font-bold text-[#0F2D4A] transition group-hover:text-orange-500">
              {labour.name || "Worker"}
            </h3>

            <p className="mt-1 truncate text-xs font-medium text-slate-400">
              {labour.skill || "Construction Worker"}
            </p>

          </div>

        </div>

        {/* Availability */}

        <span
          className={`
            inline-flex
            shrink-0
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

      </div>

      {/* INFO */}

      <div className="mt-5 space-y-2.5">

        {labour.location && (
          <div className="flex items-center gap-2 text-sm text-slate-500">

            <FiMapPin
              size={15}
              className="shrink-0 text-orange-500"
            />

            <span className="truncate">
              {labour.location}
            </span>

          </div>
        )}

        {labour.experience && (
          <div className="flex items-center gap-2 text-sm text-slate-500">

            <FiClock
              size={15}
              className="shrink-0 text-orange-500"
            />

            <span>
              {labour.experience} experience
            </span>

          </div>
        )}

        {labour.phone && (
          <div className="flex items-center gap-2 text-sm text-slate-500">

            <FiPhone
              size={15}
              className="shrink-0 text-orange-500"
            />

            <span>
              {labour.phone}
            </span>

          </div>
        )}

      </div>

      {/* SKILLS */}

      {Array.isArray(labour.skills) &&
        labour.skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">

            {labour.skills
              .slice(0, 4)
              .map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-lg
                    bg-slate-100
                    px-2.5
                    py-1
                    text-[10px]
                    font-semibold
                    text-slate-600
                  "
                >
                  {skill}
                </span>
              ))}

          </div>
        )}

      {/* BOTTOM */}

      <div className="mt-auto pt-6">

        <div className="mb-4 border-t border-slate-100" />

        <div className="flex items-center gap-2">

          <Link
            to={`/labour/${labour.id}`}
            className="
              inline-flex
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-slate-200
              px-3
              py-2.5
              text-xs
              font-bold
              text-slate-600
              transition
              hover:border-orange-300
              hover:text-orange-500
            "
          >
            View Details

            <FiArrowRight size={13} />
          </Link>

          {onRequest && (
            <button
              type="button"
              disabled={!isAvailable}
              onClick={() => onRequest(labour)}
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-orange-500
                px-3
                py-2.5
                text-xs
                font-bold
                text-white
                transition
                hover:bg-orange-600
                disabled:cursor-not-allowed
                disabled:bg-slate-200
                disabled:text-slate-400
              "
            >
              Request Worker
              <FiCheckCircle size={13} />
            </button>
          )}

        </div>

      </div>

    </article>
  );
}

export default LabourCard;