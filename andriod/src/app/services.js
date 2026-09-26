import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import Screen from "../components/Screen";
import PageHeader from "../components/PageHeader";
const services = [
  ["Residential & Commercial Construction", "Complete residential and commercial construction delivered with careful planning and quality materials."],
  ["Construction Consultancy", "Practical technical guidance, estimates and planning support for confident decisions."],
  ["Renovation & Remodeling", "Refresh and improve existing spaces with reliable renovation and remodeling teams."],
  ["Labour Supply", "Connect with skilled, dependable workers for your project requirements."],
  ["Project Management", "Coordinate schedules, resources and quality from planning through handover."],
  ["Other Construction Services", "Talk to our team about a tailored construction solution."],
];
export default function ServicesScreen() { return <Screen><PageHeader eyebrow="What we do" title="Construction services built around you" description="From the first plan to the final finish, we help you build with clarity." />{services.map(([title, copy]) => <View key={title} style={styles.card}><View style={styles.icon}><Text style={styles.iconText}>⌂</Text></View><Text style={styles.title}>{title}</Text><Text style={styles.copy}>{copy}</Text><Pressable onPress={() => router.push({ pathname: "/service-request", params: { service: title } })}><Text style={styles.action}>Request service →</Text></Pressable></View>)}<Pressable style={styles.labour} onPress={() => router.push("/labour")}><Text style={styles.labourTitle}>Looking for skilled workers?</Text><Text style={styles.labourText}>Browse available labour and send a request →</Text></Pressable></Screen>; }
const styles = StyleSheet.create({ card: { backgroundColor: "#FFF", borderRadius: 18, padding: 20, marginBottom: 14, elevation: 2 }, icon: { height: 42, width: 42, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: "#FFF1E8", marginBottom: 12 }, iconText: { color: "#E87524", fontSize: 24, fontWeight: "900" }, title: { color: "#102A43", fontSize: 19, fontWeight: "800" }, copy: { color: "#64748B", fontSize: 14, lineHeight: 21, marginTop: 8 }, action: { color: "#E87524", fontSize: 14, fontWeight: "800", marginTop: 15 }, labour: { backgroundColor: "#102A43", padding: 19, borderRadius: 18, marginBottom: 10 }, labourTitle: { color: "#FFF", fontSize: 16, fontWeight: "800" }, labourText: { color: "#FFD0AD", marginTop: 6 } });
