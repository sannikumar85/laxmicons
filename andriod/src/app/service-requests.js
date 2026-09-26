import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { router } from "expo-router";
import { api } from "../config/api";
import { PortalScreen, Loading, Empty, DataCard, Badge, Button, Notice, formatDate, SectionTitle, COLORS } from "../components/PortalUI";
import { useRequireAuth } from "../hooks/useRequireAuth";
export default function ServiceRequestsScreen() {
  useRequireAuth(); const [requests, setRequests] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = () => { api.getServiceRequests().then((r) => setRequests(r.data?.requests || [])).catch((e) => setError(e.message)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const cancel = (item) => Alert.alert("Cancel request?", `Cancel your ${item.service} request?`, [{ text: "Keep request", style: "cancel" }, { text: "Cancel request", style: "destructive", onPress: async () => { try { await api.cancelServiceRequest(item._id); load(); } catch (e) { setError(e.message); } } }]);
  return <PortalScreen title="Service requests"><Button title="+  New request" onPress={() => router.push("/service-request")} /><Notice message={error} /><SectionTitle>Your requests</SectionTitle>{loading ? <Loading /> : requests.length ? requests.map((item) => <DataCard key={item._id}><View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}><Text style={{ color: COLORS.navy, fontWeight: "900", fontSize: 16, flex: 1 }}>{item.service}</Text><Badge>{item.status}</Badge></View><Text style={{ color: "#5F7084", lineHeight: 20 }}>{item.description}</Text><Text style={{ color: "#7B8794", fontSize: 12 }}>Location: {item.location || "—"}  ·  Submitted {formatDate(item.createdAt)}</Text>{item.adminNote ? <Text style={{ color: COLORS.navy }}>Team note: {item.adminNote}</Text> : null}{["pending", "approved"].includes(item.status) ? <Button title="Cancel request" variant="danger" onPress={() => cancel(item)} /> : null}</DataCard>) : <Empty>No service requests yet. Submit one to start.</Empty>}</PortalScreen>;
}

