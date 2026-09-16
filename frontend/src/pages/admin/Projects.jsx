import React, { useEffect, useMemo, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import projectService from "../../services/projectService";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    projectService.getProjects({ status: "all" })
      .then((response) => setProjects(response?.data?.projects || []))
      .catch((requestError) => setError(requestError.message || "Unable to load projects."))
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        !status || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);

  const deleteProject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    projectService.deleteProject(id)
      .then(() => setProjects((prev) => prev.filter((project) => (project.id || project._id) !== id)))
      .catch((requestError) => setError(requestError.message || "Unable to delete project."));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#E87524]">
            Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
            Projects
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add, edit and manage construction projects.
          </p>
        </div>

        <Link
          to="/admin/projects/add"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E87524] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#d9681b] hover:shadow-md active:scale-95"
        >
          <FiPlus />
          Add Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={17}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#E87524]"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="ongoing">Ongoing</option>
          <option value="planning">Planning</option>
        </select>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Project
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Category
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Location
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan="5" className="p-10 text-center text-sm text-gray-500">Loading projects...</td></tr> : filteredProjects.map((project) => (
                <tr
                  key={project.id || project._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#102A43]">
                      {project.title}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <FiCalendar size={12} />
                      {project.startDate}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {project.category}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin className="text-[#E87524]" />
                      {project.location}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={project.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/projects/${project.id || project._id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                        title="View"
                      >
                        <FiEye size={16} />
                      </Link>

                      <Link
                        to={`/admin/projects/edit/${project.id || project._id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-orange-50 hover:text-[#E87524]"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          deleteProject(project.id || project._id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!filteredProjects.length && (
          <div className="p-10 text-center text-sm text-gray-500">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const classes = {
    completed: "bg-green-50 text-green-700",
    ongoing: "bg-orange-50 text-orange-700",
    planning: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        classes[status] || "bg-gray-50 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export default Projects;