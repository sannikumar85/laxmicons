import {
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiClock,
} from "react-icons/fi";

function NotificationPanel({
  notifications = [],
  onNotificationClick,
}) {
  const getNotificationStyle = (type) => {
    switch (type?.toLowerCase()) {
      case "success":
        return {
          icon: FiCheckCircle,
          bg: "bg-emerald-50",
          text: "text-emerald-600",
        };

      case "warning":
        return {
          icon: FiAlertCircle,
          bg: "bg-amber-50",
          text: "text-amber-600",
        };

      case "info":
        return {
          icon: FiInfo,
          bg: "bg-blue-50",
          text: "text-blue-500",
        };

      default:
        return {
          icon: FiBell,
          bg: "bg-orange-50",
          text: "text-orange-500",
        };
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

        <div>

          <h3 className="font-bold text-[#0F2D4A]">
            Notifications
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Latest updates from Laxmi Construction
          </p>

        </div>

        {notifications.length > 0 && (
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-500">
            {notifications.length} new
          </span>
        )}

      </div>

      {/* Notifications */}

      <div className="divide-y divide-slate-100">

        {notifications.map((notification) => {

          const style = getNotificationStyle(
            notification.type
          );

          const NotificationIcon = style.icon;

          return (
            <button
              key={notification.id}
              type="button"
              onClick={() =>
                onNotificationClick?.(
                  notification
                )
              }
              className="
                flex
                w-full
                items-start
                gap-3
                p-4
                text-left
                transition
                hover:bg-slate-50/70
                sm:px-5
              "
            >

              {/* Icon */}

              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${style.bg}
                  ${style.text}
                `}
              >
                <NotificationIcon size={17} />
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-3">

                  <p className="text-sm font-semibold text-slate-800">
                    {notification.title || "Notification"}
                  </p>

                  {!notification.read && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  )}

                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {notification.message || ""}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400">

                  <FiClock size={11} />

                  {notification.time || "Recently"}

                </div>

              </div>

            </button>
          );
        })}

      </div>

      {/* Empty */}

      {notifications.length === 0 && (
        <div className="px-5 py-12 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <FiBell size={21} />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-700">
            All caught up
          </p>

          <p className="mt-1 text-xs text-slate-400">
            You don't have any new notifications.
          </p>

        </div>
      )}

    </div>
  );
}

export default NotificationPanel;