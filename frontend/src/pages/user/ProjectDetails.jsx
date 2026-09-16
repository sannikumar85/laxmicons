import React from "react";
import { useParams } from "react-router-dom";

import ProjectDetailsComponent from "../../components/projects/ProjectDetails";

const ProjectDetails = () => {
  const { id } = useParams();

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
      overview:
        "This project includes complete residential construction with professional planning, structural work, electrical work, plumbing and finishing.",
      scope: [
        "Site planning",
        "Civil construction",
        "Structural work",
        "Electrical work",
        "Plumbing",
        "Finishing work",
      ],
      features: [
        "Quality construction materials",
        "Professional project management",
        "Modern construction methods",
      ],
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
      overview:
        "The project focused on improving the existing residential space with modern finishing and structural improvements.",
      scope: [
        "Repair work",
        "Interior improvement",
        "Flooring",
        "Painting",
      ],
      features: [
        "Modern finishing",
        "Improved functionality",
        "Quality materials",
      ],
    },
  ];

  const project = projects.find(
    (item) => item.id === id
  );

  return (
    <ProjectDetailsComponent
      project={project}
      onContact={() => {
        window.location.href = "/contact";
      }}
    />
  );
};

export default ProjectDetails;