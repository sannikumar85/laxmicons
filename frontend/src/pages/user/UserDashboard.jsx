import React, { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiClipboard,
  FiFileText,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import StatCard from "../../components/dashboard/StatCard";
import RecentRequests from "../../components/dashboard/RecentRequests";
import projectService from "../../services/projectService";
import serviceRequestService from "../../services/serviceRequestService";
import jobService from "../../services/jobService";

const UserDashboard = () => {
  const [data, setData] = useState({ projects: [], services: [], applications: [] });
  useEffect(() => { Promise.all([projectService.getMyProjects(), serviceRequestService.getMyServiceRequests(), jobService.getMyJobApplications()]).then(([projects, services, applications]) => setData({ projects: projects?.data?.projects || [], services: services?.data?.requests || [], applications: applications?.data?.applications || [] })).catch((error) => console.error("Unable to load dashboard:", error)); }, []);
  const stats = [
    {
      title: "My Projects",
      value: data.projects.length,
      icon: <FiBriefcase />,
      trend: "",
      description: "assigned projects",
    },
    {
      title: "Service Requests",
      value: data.services.length,
      icon: <FiClipboard />,
      trend: "+2",
      description: "this month",
    },
    {
      title: "Job Applications",
      value: data.applications.length,
      icon: <FiFileText />,
      trend: "1",
      description: "active application",
    },
  ];


  const requests = data.services.map((request) => ({
    id: request._id,
    title: request.service,
    user: "You",
    location: request.location,
    status: request.status,
    date: request.createdAt,
  }));
  /* const requests = [
    {
      id: 1,
      title: "Residential Construction",
      user: "You",
      location: "Muzaffarpur",
      status: "In Progress",
      date: "Today",
    },
    {
      id: 2,
      title: "Construction Consultancy",
      user: "You",
      location: "Patna",
      status: "Pending",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Renovation Service",
      user: "You",
      location: "Muzaffarpur",
      status: "Completed",
      date: "12 Sep",
    },
  ]; */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-[#E87524]">
          Welcome Back
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#102A43] sm:text-3xl">
          User Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your projects, requests and applications.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-[#102A43]">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            title="Request Service"
            description="Start a new service request"
            href="/dashboard/service-requests/create"
            icon={<FiClipboard />}
          />

          <QuickAction
            title="Find Jobs"
            description="Explore career opportunities"
            href="/careers"
            icon={<FiFileText />}
          />
        </div>
      </div>

      {/* Assigned projects appear only after the organisation assigns work. */}
      <div className={`grid gap-6 ${data.projects.length ? "xl:grid-cols-[1.5fr_1fr]" : "xl:grid-cols-1"}`}>
        {data.projects.length > 0 && <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#102A43]">
                My Projects
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Current project progress
              </p>
            </div>

            <Link
              to="/dashboard/projects"
              className="flex items-center gap-1 text-sm font-semibold text-[#E87524]"
            >
              View All
              <FiArrowRight size={15} />
            </Link>
          </div>

          <div className="space-y-3">{data.projects.map((project) => <Link key={project._id} to={`/dashboard/projects/${project._id}`} className="block rounded-xl border border-slate-100 p-4 hover:border-orange-200"><div className="flex items-center justify-between"><span className="font-semibold text-[#102A43]">{project.title}</span><span className="text-xs font-semibold text-orange-500">{project.progress || 0}%</span></div><div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-orange-500" style={{ width: `${project.progress || 0}%` }} /></div></Link>)}</div>
        </div>}

        {/* Account Status */}
        <div className="rounded-2xl bg-[#102A43] p-6 text-white shadow-lg">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E87524]">
            <FiCheckCircle size={20} />
          </div>

          <h2 className="mt-5 text-xl font-bold">
            Account Status
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/65">
            Your account is active. You can manage your projects,
            service requests and applications from your dashboard.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            Active Account
          </div>

          <Link
            to="/dashboard/profile"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#E87524]"
          >
            View Profile
            <FiArrowRight />
          </Link>
        </div>
      </div>

      {/* Requests */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#102A43]">
              Recent Requests
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Your latest service requests
            </p>
          </div>

          <Link
            to="/dashboard/service-requests"
            className="flex items-center gap-1 text-sm font-semibold text-[#E87524]"
          >
            View All
            <FiArrowRight size={15} />
          </Link>
        </div>

        <RecentRequests requests={requests} />
      </div>
    </div>
  );
};

const QuickAction = ({
  title,
  description,
  href,
  icon,
}) => (
  <Link
    to={href}
    className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-md"
  >
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#E87524] transition-all duration-300 group-hover:bg-[#E87524] group-hover:text-white">
      {icon}
    </div>

    <h3 className="mt-4 font-bold text-[#102A43]">
      {title}
    </h3>

    <p className="mt-1 text-xs text-gray-500">
      {description}
    </p>
  </Link>
);

export default UserDashboard;