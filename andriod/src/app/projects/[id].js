import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Screen from "../../components/Screen";
import { api, assetUrl } from "../../config/api";

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams(); const [state, setState] = useState({ loading: true, project: null, error: "" });
  useEffect(() => { api.getProject(id).then((response) => setState({ loading: false, project: response?.data?.project, error: "" })).catch((error) => setState({ loading: false, project: null, error: error.message })); }, [id]);
  if (state.loading) return <Screen><ActivityIndicator color="#E87524" size="large" /></Screen>; if (!state.project) return <Screen><Text>{state.error || "Project not found."}</Text></Screen>;
  const project = state.project; return <Screen>{project.image ? <Image source={{ uri: assetUrl(project.image) }} style={styles.image} /> : null}<View style={styles.card}><Text style={styles.category}>{project.category}</Text><Text style={styles.title}>{project.title}</Text><Text style={styles.location}>{project.location}</Text><Text style={styles.copy}>{project.overview || project.description || "Project information will be updated soon."}</Text></View></Screen>;
}
const styles = StyleSheet.create({ image: { height: 250, width: "100%", borderRadius: 20, marginBottom: 18 }, card: { backgroundColor: "#FFF", borderRadius: 20, padding: 20 }, category: { color: "#E87524", fontWeight: "800", fontSize: 12, textTransform: "uppercase" }, title: { color: "#102A43", fontSize: 28, fontWeight: "800", marginTop: 8 }, location: { color: "#64748B", marginTop: 8 }, copy: { color: "#475569", fontSize: 16, lineHeight: 25, marginTop: 20 } });
