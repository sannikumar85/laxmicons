import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function LabourTable({
  labour = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

      <div className="px-5 py-4 border-b border-slate-100">

        <h3 className="font-bold text-[#0F2D4A]">
          Labour Management
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          Manage available construction workers
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[850px] text-left">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Worker
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Skill
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Experience
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Location
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Availability
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {labour.map((worker) => (

              <tr
                key={worker.id}
                className="hover:bg-slate-50 transition"
              >

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold">
                      {worker.name?.charAt(0)?.toUpperCase() || "L"}
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        {worker.name || "Unknown Worker"}
                      </p>

                      <p className="text-xs text-slate-400">
                        {worker.phone || "-"}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {worker.skill || "-"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {worker.experience || "-"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {worker.location || "-"}
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
                        worker.available === false
                          ? "bg-red-50 text-red-500"
                          : "bg-emerald-50 text-emerald-600"
                      }
                    `}
                  >
                    {worker.available === false
                      ? "Unavailable"
                      : "Available"}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() => onView?.(worker)}
                      className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center"
                    >
                      <FiEye size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit?.(worker)}
                      className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center justify-center"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(worker)}
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

      {labour.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-400">
          No labour records found.
        </div>
      )}

    </div>
  );
}

export default LabourTable;