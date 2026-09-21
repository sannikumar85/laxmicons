import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectDetailsComponent from "../../components/projects/ProjectDetails";
import projectService from "../../services/projectService";

export default function ProjectDetails() {
  const { id } = useParams(); const navigate = useNavigate(); const [project, setProject] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { projectService.getProjectById(id).then((response) => setProject(response?.data?.project)).catch(() => setProject(null)).finally(() => setLoading(false)); }, [id]);
  if (loading) return <div className="rounded-2xl bg-white p-10 text-center text-sm text-gray-500">Loading project...</div>;
  return <ProjectDetailsComponent project={project} onContact={() => navigate("/contact")} />;
}
