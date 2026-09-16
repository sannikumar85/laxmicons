import React from "react";
import ProjectCard from "./ProjectCard";
import EmptyState from "../common/EmptyState";

const ProjectGrid = ({
  projects = [],
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            {/* Image skeleton */}
            <div className="h-60 animate-pulse bg-gray-200" />

            <div className="space-y-4 p-5">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <EmptyState
        title="No Projects Found"
        message="There are no projects matching your current search or filter."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id || project._id}
          project={{
            ...project,
            id: project.id || project._id,
          }}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;