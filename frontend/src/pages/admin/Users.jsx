import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiUser,
  FiMail,
  FiPhone,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

const Users = () => {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "9876543210",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@example.com",
      phone: "9876543211",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Sharma",
      email: "amit@example.com",
      phone: "9876543212",
      role: "User",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Admin",
      email: "admin@laxmiconstruction.com",
      phone: "9876543213",
      role: "Admin",
      status: "Active",
    },
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.phone.includes(search)
    );
  }, [users, search]);

  const deleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;

    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#E87524]">
          Management
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
          Users
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage registered customers and administrators.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative max-w-lg">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={17}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  User
                </th>
                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Contact
                </th>
                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Role
                </th>
                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Status
                </th>
                <th className="px-5 py-4 text-right text-xs uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-[#E87524]">
                        <FiUser />
                      </div>

                      <div>
                        <p className="font-semibold text-[#102A43]">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: #{user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMail size={14} />
                      {user.email}
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                      <FiPhone size={13} />
                      {user.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                        title="View"
                      >
                        <FiEye size={16} />
                      </button>

                      {user.role !== "Admin" && (
                        <button
                          onClick={() =>
                            deleteUser(user.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;