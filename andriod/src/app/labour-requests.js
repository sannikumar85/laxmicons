import { useCallback, useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { router } from "expo-router";
import { api } from "../config/api";
import { PortalScreen, DataCard, Loading, Empty, Badge, Button, Notice, formatDate, SectionTitle, COLORS } from "../components/PortalUI";
import { useRequireAuth } from "../hooks/useRequireAuth";
export default function LabourRequestsScreen() {
  useRequireAuth(); const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(() => { api.getMyLabourRequests().then((r) => setItems(r.data?.requests || [])).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { load(); }, [load]);
  const cancel = (item) => Alert.alert("Cancel worker request?", "You can cancel this request while it is pending or approved.", [{ text: "Keep", style: "cancel" }, { text: "Cancel request", style: "destructive", onPress: async () => { try { await api.cancelLabourRequest(item._id); load(); } catch (e) { setError(e.message); } } }]);
  return <PortalScreen title="Labour requests"><Button title="+  Find skilled labour" onPress={() => router.push("/labour")} /><Notice message={error} /><SectionTitle>Your worker requests</SectionTitle>{loading ? <Loading /> : items.length ? items.map((item) => <DataCard key={item._id}><Text style={{ color: COLORS.navy, fontSize: 16, fontWeight: "900" }}>{item.labourName || item.labour?.name || item.skill || "Labour request"}</Text><Badge>{item.status}</Badge><Text style={{ color: "#65758A" }}>{item.skill} · {item.workersRequired} worker(s) · {item.location}</Text><Text style={{ color: "#65758A" }}>Start {formatDate(item.startDate)} · {item.duration || "Duration not set"}</Text>{item.adminNote ? <Text style={{ color: COLORS.navy }}>Team note: {item.adminNote}</Text> : null}{["pending", "approved"].includes(item.status) ? <Button title="Cancel request" variant="danger" onPress={() => cancel(item)} /> : null}</DataCard>) : <Empty>No labour requests yet.</Empty>}</PortalScreen>;
}

