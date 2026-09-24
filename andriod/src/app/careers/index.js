import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Screen from "../../components/Screen";
import PageHeader from "../../components/PageHeader";
import { api } from "../../config/api";

export default function CareersScreen() {
  const [state, setState] = useState({ loading: true, jobs: [], error: "" });
  useEffect(() => { api.getJobs().then((response) => setState({ loading: false, jobs: response?.data?.jobs || [], error: "" })).catch((error) => setState({ loading: false, jobs: [], error: error.message })); }, []);
  return <Screen><PageHeader eyebrow="Careers" title="Build your career with us" description="Explore current vacancies with Laxmi Construction." />{state.loading ? <ActivityIndicator color="#E87524" size="large" /> : state.error ? <Text>{state.error}</Text> : state.jobs.map((job) => <Pressable key={job._id} style={styles.card} onPress={() => router.push(`/careers/${job._id}`)}><Text style={styles.title}>{job.title}</Text><Text style={styles.department}>{job.department || "Laxmi Construction"}</Text><Text style={styles.meta}>{job.location || "Location to be confirmed"} · {job.type || "Full Time"}</Text><Text style={styles.link}>View role →</Text></Pressable>)}</Screen>;
}
const styles = StyleSheet.create({ card: { backgroundColor: "#FFF", borderRadius: 18, padding: 20, marginBottom: 14, elevation: 2 }, title: { color: "#102A43", fontSize: 20, fontWeight: "800" }, department: { color: "#E87524", fontWeight: "700", marginTop: 6 }, meta: { color: "#64748B", marginTop: 8 }, link: { color: "#E87524", fontWeight: "800", marginTop: 16 } });
