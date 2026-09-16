import {
  FiEdit2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

function ProjectTable({
  projects = [],
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

      <div className="px-5 py-4 border-b border-slate-100">

        <h3 className="font-bold text-[#0F2D4A]">
          Projects
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          Manage construction projects
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[720px] text-left">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Project
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Category
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Location
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {projects.map((project) => (

              <tr
                key={project.id}
                className="hover:bg-slate-50 transition"
              >

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-orange-50" />
                    )}

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        {project.title || "Untitled Project"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {project.client || "Client not specified"}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {project.category || "-"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {project.location || "-"}
                </td>

                <td className="px-5 py-4">

                  <span
                    className="
                      inline-flex
                      px-2.5
                      py-1
                      rounded-full
                      bg-emerald-50
                      text-emerald-600
                      text-xs
                      font-semibold
                    "
                  >
                    {project.status || "Completed"}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() => onView?.(project)}
                      className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition"
                      aria-label="View project"
                    >
                      <FiEye size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit?.(project)}
                      className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
                      aria-label="Edit project"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(project)}
                      className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                      aria-label="Delete project"
                    >
                      <FiTrash2 size={15} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {projects.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-400">
          No projects found.
        </div>
      )}

    </div>
  );
}

export default ProjectTable;