import {
  FiEye,
  FiCheck,
  FiX,
} from "react-icons/fi";

function ServiceRequestTable({
  requests = [],
  onView,
  onApprove,
  onReject,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

      <div className="px-5 py-4 border-b border-slate-100">

        <h3 className="font-bold text-[#0F2D4A]">
          Service Requests
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          Review and manage customer requests
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[850px] text-left">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Customer
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Service
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Location
              </th>

              <th className="px-5 py-3 text-xs uppercase font-bold text-slate-500">
                Date
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

            {requests.map((request) => (

              <tr
                key={request.id}
                className="hover:bg-slate-50 transition"
              >

                <td className="px-5 py-4">

                  <p className="text-sm font-semibold text-slate-800">
                    {request.customerName || "-"}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {request.email || request.phone || "-"}
                  </p>

                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {request.service || "-"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {request.location || "-"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {request.date || "-"}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`
                      inline-flex
                      px-2.5
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        request.status === "approved"
                          ? "bg-emerald-50 text-emerald-600"
                          : request.status === "rejected"
                            ? "bg-red-50 text-red-500"
                            : "bg-amber-50 text-amber-600"
                      }
                    `}
                  >
                    {request.status || "pending"}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() => onView?.(request)}
                      className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition"
                      aria-label="View request"
                    >
                      <FiEye size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onApprove?.(request)}
                      className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition"
                      aria-label="Approve request"
                    >
                      <FiCheck size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onReject?.(request)}
                      className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                      aria-label="Reject request"
                    >
                      <FiX size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {requests.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-400">
          No service requests found.
        </div>
      )}

    </div>
  );
}

export default ServiceRequestTable;