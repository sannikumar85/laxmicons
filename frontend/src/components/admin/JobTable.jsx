import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function JobTable({
  jobs = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

      <div className="px-5 py-4 border-b border-slate-100">

        <h3 className="font-bold text-[#0F2D4A]">
          Jobs
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          Manage career opportunities
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[800px] text-left">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Position
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Department
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Location
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Type
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

            {jobs.map((job) => (

              <tr
                key={job.id || job._id}
                className="hover:bg-slate-50 transition"
              >

                <td className="px-5 py-4">

                  <p className="text-sm font-semibold text-slate-800">
                    {job.title || "Untitled Position"}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {job.applicants ?? 0} applicants
                  </p>

                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {job.department || "-"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {job.location || "-"}
                </td>

                <td className="px-5 py-4">

                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {job.type || "Full Time"}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <span
                    className={`
                      px-2.5
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        job.status === "closed"
                          ? "bg-red-50 text-red-500"
                          : "bg-emerald-50 text-emerald-600"
                      }
                    `}
                  >
                    {job.status || "active"}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() => onView?.(job)}
                      className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center"
                    >
                      <FiEye size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit?.(job)}
                      className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center justify-center"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(job)}
                      className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center"
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

      {jobs.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-400">
          No jobs found.
        </div>
      )}

    </div>
  );
}

export default JobTable;