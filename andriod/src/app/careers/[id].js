import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Screen from "../../components/Screen";
import { api } from "../../config/api";

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams(); const [state, setState] = useState({ loading: true, job: null, error: "" });
  useEffect(() => { api.getJob(id).then((response) => setState({ loading: false, job: response?.data?.job, error: "" })).catch((error) => setState({ loading: false, job: null, error: error.message })); }, [id]);
  if (state.loading) return <Screen><ActivityIndicator color="#E87524" size="large" /></Screen>; if (!state.job) return <Screen><Text>{state.error || "Job not found."}</Text></Screen>;
  const job = state.job; return <Screen><View style={styles.card}><Text style={styles.title}>{job.title}</Text><Text style={styles.meta}>{job.department || "Laxmi Construction"}</Text><Text style={styles.meta}>{job.location || "Location to be confirmed"} · {job.type || "Full Time"}</Text><Text style={styles.heading}>About the role</Text><Text style={styles.copy}>{job.description || "Role information will be updated soon."}</Text></View></Screen>;
}
const styles = StyleSheet.create({ card: { backgroundColor: "#FFF", borderRadius: 20, padding: 20 }, title: { color: "#102A43", fontSize: 28, fontWeight: "800" }, meta: { color: "#64748B", marginTop: 8 }, heading: { color: "#102A43", fontSize: 19, fontWeight: "800", marginTop: 24 }, copy: { color: "#475569", lineHeight: 24, marginTop: 8 } });
