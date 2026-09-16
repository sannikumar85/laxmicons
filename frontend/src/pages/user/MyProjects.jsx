import React, { useMemo, useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

import ProjectGrid from "../../components/projects/ProjectGrid";

const MyProjects = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const projects = [
    {
      id: "project-1",
      title: "Modern Residential Building",
      category: "Residential",
      location: "Muzaffarpur, Bihar",
      status: "Ongoing",
      startDate: "Jan 2026",
      endDate: "Dec 2026",
      image: "/images/projects/project-1.jpg",
      description:
        "Modern residential construction project with complete planning and execution.",
    },
    {
      id: "project-2",
      title: "House Renovation",
      category: "Renovation",
      location: "Muzaffarpur, Bihar",
      status: "Completed",
      startDate: "Jan 2026",
      endDate: "Apr 2026",
      image: "/images/projects/project-3.jpg",
      description:
        "Complete home renovation and remodeling project.",
    },
    {
      id: "project-3",
      title: "Commercial Interior",
      category: "Commercial",
      location: "Patna, Bihar",
      status: "Ongoing",
      startDate: "Jun 2026",
      endDate: "Nov 2026",
      image: "/images/projects/project-5.jpg",
      description:
        "Commercial interior construction and finishing work.",
    },
  ];

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
  }, [search, status]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#E87524]">
          Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
          My Projects
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Track your construction projects and their progress.
        </p>
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
            placeholder="Search your projects..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
          />
        </div>

        <div className="relative">
          <FiFilter
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 min-w-[180px] appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-[#E87524]"
          >
            <option value="">All Projects</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      <ProjectGrid projects={filteredProjects} />
    </div>
  );
};

export default MyProjects;