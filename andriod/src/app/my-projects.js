import { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import { router } from "expo-router";
import { api, assetUrl } from "../config/api";
import { PortalScreen, DataCard, Loading, Empty, Button, Notice, formatDate, COLORS } from "../components/PortalUI";
import { useRequireAuth } from "../hooks/useRequireAuth";
export default function MyProjectsScreen() {
  useRequireAuth(); const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { api.getMyProjects().then((r) => setItems(r.data?.projects || [])).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  return <PortalScreen title="Assigned projects"><Notice message={error} />{loading ? <Loading /> : items.length ? items.map((project) => <DataCard key={project._id}>{project.image ? <Image source={{ uri: assetUrl(project.image) }} style={{ height: 160, borderRadius: 12 }} /> : null}<Text style={{ color: COLORS.orange, fontWeight: "800", fontSize: 12 }}>{project.category}</Text><Text style={{ color: COLORS.navy, fontWeight: "900", fontSize: 18 }}>{project.title}</Text><Text style={{ color: "#65758A" }}>{project.location} · {project.status}</Text>{typeof project.progress === "number" ? <Text style={{ color: COLORS.navy, fontWeight: "700" }}>Progress: {project.progress}%</Text> : null}<Text style={{ color: "#718096", fontSize: 12 }}>Updated {formatDate(project.updatedAt)}</Text><Button title="Project details →" onPress={() => router.push(`/projects/${project._id}`)} /></DataCard>) : <Empty>No projects have been assigned to your account yet.</Empty>}</PortalScreen>;
}
