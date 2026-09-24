import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { assetUrl } from "../config/api";

export default function ProjectCard({ project }) {
  return <Pressable onPress={() => router.push(`/projects/${project._id}`)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
    {project.image ? <Image source={{ uri: assetUrl(project.image) }} style={styles.image} /> : <View style={styles.imagePlaceholder}><Text>No image available</Text></View>}
    <View style={styles.body}><Text style={styles.badge}>{project.category || "Construction"}</Text><Text style={styles.title}>{project.title}</Text><Text style={styles.meta}>{project.location || "Location to be confirmed"}</Text><Text style={styles.link}>View project →</Text></View>
  </Pressable>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFF", borderRadius: 18, overflow: "hidden", marginBottom: 16, shadowColor: "#0F172A", shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  pressed: { opacity: 0.88 }, image: { height: 180, width: "100%" }, imagePlaceholder: { height: 180, alignItems: "center", justifyContent: "center", backgroundColor: "#E2E8F0" },
  body: { padding: 16 }, badge: { alignSelf: "flex-start", backgroundColor: "#FFF1E8", color: "#C85B13", fontSize: 11, fontWeight: "800", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99 },
  title: { color: "#102A43", fontSize: 20, fontWeight: "800", marginTop: 12 }, meta: { color: "#64748B", fontSize: 14, marginTop: 6 }, link: { color: "#E87524", fontSize: 14, fontWeight: "800", marginTop: 16 },
});
