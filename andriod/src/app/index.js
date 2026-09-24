import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function EntryScreen() {
  const { session, ready } = useAuth();
  const [elapsed, setElapsed] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setElapsed(true), 2000); return () => clearTimeout(timer); }, []);
  useEffect(() => {
    if (!elapsed || !ready) return;
    router.replace(session ? "/home" : "/welcome");
  }, [elapsed, ready, session]);
  return <View style={styles.screen}>
    <View style={styles.topCurve} />
    <View style={styles.brand}><Image source={require("../images/logo1.png")} style={styles.logo} resizeMode="contain" /><ActivityIndicator color="#F45A0A" size="large" style={{ marginTop: 32 }} /><Text style={styles.loading}>Loading your next project...</Text></View>
    <View style={styles.bottomCurve} />
  </View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: "#FFF", justifyContent: "center", overflow: "hidden" }, brand: { alignItems: "center", paddingHorizontal: 26 }, logo: { width: "100%", height: 320 }, loading: { color: "#193B59", marginTop: 14, fontSize: 15 }, topCurve: { position: "absolute", width: 270, height: 130, backgroundColor: "#082944", top: -50, left: -110, transform: [{ rotate: "-38deg" }] }, bottomCurve: { position: "absolute", height: 100, left: -40, right: -40, bottom: -70, backgroundColor: "#082944", borderTopWidth: 5, borderTopColor: "#F45A0A", borderRadius: 180 } });
