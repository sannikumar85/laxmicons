import {
  FiInbox,
  FiRefreshCw,
  FiPlus,
} from "react-icons/fi";

function EmptyState({
  icon = <FiInbox size={28} />,
  title = "Nothing here yet",
  description = "There is no information to display right now.",
  actionLabel = "",
  onAction,
  actionIcon = <FiPlus size={16} />,
  className = "",
}) {
  return (
    <div
      className={`
        w-full
        flex
        items-center
        justify-center
        py-16
        px-5
        ${className}
      `}
    >
      <div className="max-w-md text-center">

        {/* Icon */}

        <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
          {icon}
        </div>

        {/* Title */}

        <h3 className="text-xl font-bold text-[#0F2D4A]">
          {title}
        </h3>

        {/* Description */}

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>

        {/* Action */}

        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-orange-500
              text-white
              text-sm
              font-semibold
              hover:bg-orange-600
              transition
              duration-200
              active:scale-[0.98]
            "
          >
            {actionIcon}
            {actionLabel}
          </button>
        )}

      </div>
    </div>
  );
}

export default EmptyState;