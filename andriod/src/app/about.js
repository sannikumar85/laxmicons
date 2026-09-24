import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import PageHeader from "../components/PageHeader";

const values = [["Quality-led work", "Clear planning, careful execution and practical communication at every stage."], ["Local expertise", "A Bihar-focused team that understands local requirements and delivery realities."], ["People first", "We build long-term relationships with clients, workers and project partners."]];
export default function AboutScreen() { return <Screen><PageHeader eyebrow="About Laxmi Construction" title="Building trust into every project." description="We help families, businesses and project owners turn plans into dependable spaces." />{values.map(([title, copy]) => <View key={title} style={styles.card}><Text style={styles.title}>{title}</Text><Text style={styles.copy}>{copy}</Text></View>)}</Screen>; }
const styles = StyleSheet.create({ card: { backgroundColor: "#FFF", borderRadius: 18, padding: 20, marginBottom: 14, elevation: 2 }, title: { color: "#102A43", fontSize: 18, fontWeight: "800" }, copy: { color: "#64748B", fontSize: 15, lineHeight: 22, marginTop: 8 } });
