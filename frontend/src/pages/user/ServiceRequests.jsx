import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiEye,
  FiPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const ServiceRequests = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const requests = [
    {
      id: "SR-001",
      service: "Residential Construction",
      location: "Muzaffarpur, Bihar",
      date: "18 Sep 2026",
      status: "In Progress",
      description:
        "Complete house construction requirement.",
    },
    {
      id: "SR-002",
      service: "Construction Consultancy",
      location: "Patna, Bihar",
      date: "15 Sep 2026",
      status: "Pending",
      description:
        "Need consultancy for upcoming construction.",
    },
    {
      id: "SR-003",
      service: "Renovation",
      location: "Muzaffarpur, Bihar",
      date: "10 Sep 2026",
      status: "Completed",
      description:
        "Residential renovation requirement.",
    },
  ];

  const filtered = useMemo(() => {
    return requests.filter((request) => {
      const searchMatch =
        request.service
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        request.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        !status || request.status === status;

      return searchMatch && statusMatch;
    });
  }, [search, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#E87524]">
            Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
            Service Requests
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track all your submitted service requests.
          </p>
        </div>

        <Link
          to="/dashboard/service-requests/create"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E87524] px-5 text-sm font-semibold text-white hover:bg-[#d9681b]"
        >
          <FiPlus />
          New Request
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <FiSearch
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search requests..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#E87524]"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Requests */}
      <div className="space-y-4">
        {filtered.map((request) => (
          <div
            key={request.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]">
                  <FiClock size={20} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[#102A43]">
                      {request.service}
                    </h3>

                    <span className="text-xs text-gray-400">
                      {request.id}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-600">
                    {request.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiMapPin />
                      {request.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiCalendar />
                      {request.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Status status={request.status} />

                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-4 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  <FiEye />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}

        {!filtered.length && (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500">
            No service requests found.
          </div>
        )}
      </div>
    </div>
  );
};

const Status = ({ status }) => {
  const style =
    status === "Completed"
      ? "bg-green-50 text-green-700"
      : status === "In Progress"
      ? "bg-orange-50 text-orange-700"
      : "bg-blue-50 text-blue-700";

  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
};

export default ServiceRequests;