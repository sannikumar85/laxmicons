import {
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
} from "react-icons/fi";

function UserTable({
  users = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden">

      {/* Header */}

      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">

        <div>

          <h3 className="font-bold text-[#0F2D4A]">
            Users
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Manage registered users
          </p>

        </div>

        <span className="text-xs font-semibold text-slate-500">
          {users.length} users
        </span>

      </div>

      {/* Desktop Table */}

      <div className="hidden md:block overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">
                User
              </th>

              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">
                Email
              </th>

              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">
                Role
              </th>

              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">
                Status
              </th>

              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase text-right">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {users.map((user) => (

              <tr
                key={user.id}
                className="hover:bg-slate-50/70 transition"
              >

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        {user.name || "Unknown User"}
                      </p>

                      <p className="text-xs text-slate-400">
                        {user.phone || "No phone"}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {user.email || "-"}
                </td>

                <td className="px-5 py-4">

                  <span className="inline-flex px-2.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 capitalize">
                    {user.role || "user"}
                  </span>

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
                        user.status === "inactive"
                          ? "bg-red-50 text-red-500"
                          : "bg-emerald-50 text-emerald-600"
                      }
                    `}
                  >
                    {user.status || "active"}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() => onEdit?.(user)}
                      className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-500 flex items-center justify-center transition"
                      aria-label="Edit user"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(user)}
                      className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                      aria-label="Delete user"
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

      {/* Mobile Cards */}

      <div className="md:hidden divide-y divide-slate-100">

        {users.map((user) => (

          <div
            key={user.id}
            className="p-4"
          >

            <div className="flex items-start justify-between gap-3">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>

                  <p className="font-semibold text-sm text-slate-800">
                    {user.name || "Unknown User"}
                  </p>

                  <p className="text-xs text-slate-400 break-all">
                    {user.email || "-"}
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
                aria-label="More options"
              >
                <FiMoreVertical size={17} />
              </button>

            </div>

            <div className="mt-4 flex items-center justify-between">

              <div className="flex gap-2">

                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 capitalize">
                  {user.role || "user"}
                </span>

                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600">
                  {user.status || "active"}
                </span>

              </div>

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() => onEdit?.(user)}
                  className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center"
                >
                  <FiEdit2 size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete?.(user)}
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"
                >
                  <FiTrash2 size={14} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {users.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-400">
          No users found.
        </div>
      )}

    </div>
  );
}

export default UserTable;