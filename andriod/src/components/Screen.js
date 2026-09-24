import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";

export default function Screen({ children, scroll = true }) {
  const content = scroll ? <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView> : children;
  return <SafeAreaView style={styles.safe}><StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F9FC" },
  content: { padding: 20, paddingBottom: 40 },
});
