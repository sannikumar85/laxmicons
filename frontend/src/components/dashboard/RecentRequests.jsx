import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
} from "react-icons/fi";

function RecentRequests({
  requests = [],
  onView,
}) {
  const getStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          icon: FiCheckCircle,
          text: "text-emerald-600",
          bg: "bg-emerald-50",
        };

      case "rejected":
        return {
          icon: FiXCircle,
          text: "text-red-500",
          bg: "bg-red-50",
        };

      default:
        return {
          icon: FiClock,
          text: "text-orange-500",
          bg: "bg-orange-50",
        };
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

        <div>

          <h3 className="font-bold text-[#0F2D4A]">
            Recent Requests
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Your latest service requests
          </p>

        </div>

        <button
          type="button"
          className="hidden items-center gap-1 text-xs font-semibold text-orange-500 transition hover:text-orange-600 sm:flex"
        >
          View All
          <FiArrowRight size={14} />
        </button>

      </div>

      {/* Request List */}

      <div className="divide-y divide-slate-100">

        {requests.map((request) => {

          const status = getStatus(
            request.status
          );

          const StatusIcon = status.icon;

          return (
            <div
              key={request.id}
              className="
                flex
                items-center
                gap-3
                p-4
                transition
                hover:bg-slate-50/60
                sm:px-5
              "
            >

              {/* Icon */}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <FiFileText size={18} />
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-semibold text-slate-800">
                  {request.service || "Service Request"}
                </p>

                <p className="mt-1 truncate text-xs text-slate-400">
                  {request.date || "Date not available"}
                </p>

              </div>

              {/* Status */}

              <span
                className={`
                  inline-flex
                  shrink-0
                  items-center
                  gap-1
                  rounded-full
                  px-2
                  py-1
                  text-[10px]
                  font-semibold
                  ${status.bg}
                  ${status.text}
                `}
              >
                <StatusIcon size={11} />

                <span className="hidden xs:inline">
                  {request.status || "Pending"}
                </span>

              </span>

              {/* View */}

              {onView && (
                <button
                  type="button"
                  onClick={() => onView(request)}
                  className="
                    hidden
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-slate-100
                    text-slate-500
                    transition
                    hover:bg-orange-50
                    hover:text-orange-500
                    sm:flex
                  "
                  aria-label="View request"
                >
                  <FiArrowRight size={15} />
                </button>
              )}

            </div>
          );
        })}

      </div>

      {/* Empty */}

      {requests.length === 0 && (
        <div className="px-5 py-12 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <FiFileText size={21} />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-700">
            No requests yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Your service requests will appear here.
          </p>

        </div>
      )}

    </div>
  );
}

export default RecentRequests;