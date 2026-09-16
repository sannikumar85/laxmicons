import React, { useState } from "react";
import {
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const LabourRequests = () => {
  const [requests] = useState([
    {
      id: "LR-001",
      skill: "Mason",
      workers: 3,
      location: "Muzaffarpur, Bihar",
      startDate: "20 Sep 2026",
      duration: "30 Days",
      status: "Pending",
    },
    {
      id: "LR-002",
      skill: "Electrician",
      workers: 2,
      location: "Patna, Bihar",
      startDate: "25 Sep 2026",
      duration: "15 Days",
      status: "Confirmed",
    },
    {
      id: "LR-003",
      skill: "Painter",
      workers: 2,
      location: "Muzaffarpur, Bihar",
      startDate: "05 Sep 2026",
      duration: "10 Days",
      status: "Completed",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#E87524]">
            Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
            Labour Requests
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track your skilled labour requirements.
          </p>
        </div>

        <Link
          to="/labour"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E87524] px-5 text-sm font-semibold text-white hover:bg-[#d9681b]"
        >
          <FiPlus />
          New Request
        </Link>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]">
                  <FiUsers size={20} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#102A43]">
                      {request.skill}
                    </h3>

                    <span className="text-xs text-gray-400">
                      {request.id}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiUsers />
                      {request.workers} Workers
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiMapPin />
                      {request.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiCalendar />
                      {request.startDate}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiClock />
                      {request.duration}
                    </span>
                  </div>
                </div>
              </div>

              <Status status={request.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Status = ({ status }) => {
  const styles = {
    Pending: "bg-blue-50 text-blue-700",
    Confirmed: "bg-orange-50 text-orange-700",
    Completed: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
        styles[status] || "bg-gray-50 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export default LabourRequests;