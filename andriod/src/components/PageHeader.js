import { StyleSheet, Text, View } from "react-native";

export default function PageHeader({ eyebrow, title, description }) {
  return <View style={styles.wrap}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.title}>{title}</Text>{description ? <Text style={styles.description}>{description}</Text> : null}</View>;
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 24 },
  eyebrow: { color: "#E87524", fontWeight: "800", fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase" },
  title: { color: "#102A43", fontSize: 30, fontWeight: "800", marginTop: 6 },
  description: { color: "#64748B", fontSize: 15, lineHeight: 22, marginTop: 8 },
});
