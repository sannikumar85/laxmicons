import {
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";

function ProjectStatus({
  projects = [],
  onViewProject,
}) {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          icon: FiCheckCircle,
          bg: "bg-emerald-50",
          text: "text-emerald-600",
        };

      case "delayed":
        return {
          icon: FiAlertCircle,
          bg: "bg-red-50",
          text: "text-red-500",
        };

      default:
        return {
          icon: FiClock,
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
            My Projects
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Track your current projects
          </p>
        </div>

        <button
          type="button"
          className="
            hidden
            items-center
            gap-1
            text-xs
            font-semibold
            text-orange-500
            transition
            hover:text-orange-600
            sm:flex
          "
        >
          View All
          <FiArrowRight size={14} />
        </button>

      </div>

      {/* Projects */}

      <div className="divide-y divide-slate-100">

        {projects.map((project) => {

          const statusStyle = getStatusStyle(
            project.status
          );

          const StatusIcon = statusStyle.icon;

          const progress = Math.min(
            Math.max(Number(project.progress) || 0, 0),
            100
          );

          return (
            <div
              key={project.id}
              className="p-5 transition hover:bg-slate-50/60"
            >

              <div className="flex items-start gap-3">

                {/* Image */}

                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className="
                      h-12
                      w-12
                      shrink-0
                      rounded-xl
                      object-cover
                    "
                  />
                ) : (
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-orange-50" />
                )}

                {/* Info */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h4 className="truncate text-sm font-semibold text-slate-800">
                        {project.title || "Untitled Project"}
                      </h4>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        {project.location || "Location not specified"}
                      </p>

                    </div>

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
                        font-semibold
                        ${statusStyle.bg}
                        ${statusStyle.text}
                      `}
                    >
                      <StatusIcon size={12} />
                      {project.status || "In Progress"}
                    </span>

                  </div>

                  {/* Progress */}

                  <div className="mt-4">

                    <div className="mb-1.5 flex items-center justify-between">

                      <span className="text-[11px] font-medium text-slate-400">
                        Progress
                      </span>

                      <span className="text-[11px] font-bold text-slate-600">
                        {progress}%
                      </span>

                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-orange-500 transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

              {onViewProject && (
                <button
                  type="button"
                  onClick={() =>
                    onViewProject(project)
                  }
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600"
                >
                  View project
                  <FiArrowRight size={13} />
                </button>
              )}

            </div>
          );
        })}

      </div>

      {/* Empty */}

      {projects.length === 0 && (
        <div className="px-5 py-12 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <FiClock size={21} />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-700">
            No projects yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Your projects will appear here.
          </p>

        </div>
      )}

    </div>
  );
}

export default ProjectStatus;