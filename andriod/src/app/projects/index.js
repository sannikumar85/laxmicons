import { ActivityIndicator, Text } from "react-native";
import { useEffect, useState } from "react";
import Screen from "../../components/Screen";
import PageHeader from "../../components/PageHeader";
import ProjectCard from "../../components/ProjectCard";
import { api } from "../../config/api";

export default function ProjectsScreen() {
  const [state, setState] = useState({ loading: true, projects: [], error: "" });
  useEffect(() => { api.getProjects().then((response) => setState({ loading: false, projects: response?.data?.projects || [], error: "" })).catch((error) => setState({ loading: false, projects: [], error: error.message })); }, []);
  return <Screen><PageHeader eyebrow="Our work" title="Projects delivered with purpose" description="Explore selected construction and consultancy work." />{state.loading ? <ActivityIndicator color="#E87524" size="large" /> : state.error ? <Text>{state.error}</Text> : state.projects.map((project) => <ProjectCard key={project._id} project={project} />)}</Screen>;
}
