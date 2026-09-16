import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiBriefcase,
  FiTool,
  FiClipboard,
  FiArrowUpRight,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import StatCard from "../../components/dashboard/StatCard";
import ProjectStatus from "../../components/dashboard/ProjectStatus";
import RecentRequests from "../../components/dashboard/RecentRequests";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import adminService from "../../services/adminService";

const AdminDashboard = () => {
  const [liveStats, setLiveStats] = useState({});
  const [dashboard, setDashboard] = useState({ recentProjects: [], recentRequests: [] });
  useEffect(() => { Promise.all([adminService.getAdminStats(), adminService.getAdminDashboard()]).then(([statsResponse, dashboardResponse]) => { setLiveStats(statsResponse?.data?.stats || {}); setDashboard(dashboardResponse?.data || {}); }).catch((error) => console.error("Unable to load admin dashboard:", error)); }, []);
  const stats = [
    {
      title: "Total Users",
      value: liveStats.users ?? "—",
      icon: <FiUsers />,
      trend: "+12%",
      description: "from last month",
    },
    {
      title: "Total Projects",
      value: liveStats.projects ?? "—",
      icon: <FiBriefcase />,
      trend: "+8%",
      description: "from last month",
    },
    {
      title: "Service Requests",
      value: liveStats.serviceRequests ?? "—",
      icon: <FiClipboard />,
      trend: "+18%",
      description: "from last month",
    },
    {
      title: "Labour Requests",
      value: liveStats.labourRequests ?? "—",
      icon: <FiTool />,
      trend: "+6%",
      description: "from last month",
    },
  ];

  const projects = dashboard.recentProjects?.map((project) => ({
    id: project._id,
    title: project.title,
    client: project.client || "Project client",
    progress: project.progress,
    status: project.status,
  })) || [];
  /* const projects = [
    {
      id: 1,
      title: "Modern Residential Building",
      client: "Rajesh Kumar",
      progress: 85,
      status: "Ongoing",
    },
    {
      id: 2,
      title: "Commercial Complex",
      client: "Amit Sharma",
      progress: 100,
      status: "Completed",
    },
    {
      id: 3,
      title: "House Renovation",
      client: "Priya Singh",
      progress: 45,
      status: "Ongoing",
    },
  ]; */

  const requests = dashboard.recentRequests?.map((request) => ({
    id: request._id,
    title: request.service,
    user: request.user?.name || request.customerName,
    location: request.location,
    status: request.status,
    date: request.createdAt,
  })) || [];
  /* const requests = [
    {
      id: 1,
      title: "Residential Construction",
      user: "Rahul Kumar",
      location: "Muzaffarpur",
      status: "Pending",
      date: "Today",
    },
    {
      id: 2,
      title: "Construction Consultancy",
      user: "Amit Singh",
      location: "Patna",
      status: "In Progress",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Renovation Service",
      user: "Neha Gupta",
      location: "Muzaffarpur",
      status: "Completed",
      date: "12 Sep",
    },
  ]; */

  const notifications = [
    {
      id: 1,
      title: "New service request",
      message: "Rahul Kumar submitted a construction request.",
      type: "info",
      time: "10 min ago",
    },
    {
      id: 2,
      title: "New user registered",
      message: "A new customer has joined the platform.",
      type: "success",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Job application received",
      message: "A new application is waiting for review.",
      type: "warning",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-[#E87524]">
          Admin Panel
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#102A43] sm:text-3xl">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your construction platform from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction
          title="Add Project"
          description="Create a new project"
          href="/admin/projects/add"
          icon={<FiBriefcase />}
        />

        <QuickAction
          title="Manage Users"
          description="View registered users"
          href="/admin/users"
          icon={<FiUsers />}
        />

        <QuickAction
          title="Service Requests"
          description="Review pending requests"
          href="/admin/service-requests"
          icon={<FiClipboard />}
        />

        <QuickAction
          title="Job Applications"
          description="Review applications"
          href="/admin/job-applications"
          icon={<FiCheckCircle />}
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#102A43]">
                Project Status
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Current project progress
              </p>
            </div>

            <a
              href="/admin/projects"
              className="flex items-center gap-1 text-sm font-semibold text-[#E87524]"
            >
              View All
              <FiArrowUpRight size={15} />
            </a>
          </div>

          <ProjectStatus projects={projects} />
        </div>

        <NotificationPanel
          notifications={notifications}
        />
      </div>

      {/* Recent Requests */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#102A43]">
              Recent Requests
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Latest service requests from users
            </p>
          </div>

          <a
            href="/admin/service-requests"
            className="flex items-center gap-1 text-sm font-semibold text-[#E87524]"
          >
            View All
            <FiArrowUpRight size={15} />
          </a>
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
}) => {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#E87524] transition-all duration-300 group-hover:bg-[#E87524] group-hover:text-white">
          {icon}
        </div>

        <FiArrowUpRight
          className="text-gray-300 transition-colors group-hover:text-[#E87524]"
          size={18}
        />
      </div>

      <h3 className="mt-4 font-bold text-[#102A43]">
        {title}
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>
    </a>
  );
};

export default AdminDashboard;