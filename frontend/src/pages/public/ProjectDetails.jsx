import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import projectService from "../../services/projectService";
import ProjectDetailsView from "../../components/projects/ProjectDetails";
export default function ProjectDetails() { const {id}=useParams(); const navigate=useNavigate(); const [project,setProject]=useState(null); useEffect(()=>{projectService.getProjectById(id).then(r=>setProject(r?.data?.project)).catch(()=>setProject(null));},[id]); return <div className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6"><ProjectDetailsView project={project} onContact={()=>navigate("/contact")}/></div>; }
