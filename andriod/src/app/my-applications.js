import { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import { api } from "../config/api";
import { PortalScreen, DataCard, Loading, Empty, Badge, Notice, formatDate, COLORS } from "../components/PortalUI";
import { useRequireAuth } from "../hooks/useRequireAuth";
export default function MyApplicationsScreen() {
  useRequireAuth(); const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(() => { api.getMyApplications().then((r) => setItems(r.data?.applications || [])).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { load(); }, [load]);
  return <PortalScreen title="Job applications"><Notice message={error} />{loading ? <Loading /> : items.length ? items.map((item) => <DataCard key={item._id}><Text style={{ color: COLORS.navy, fontWeight: "900", fontSize: 16 }}>{item.job?.title || item.customPosition || "Direct application"}</Text><Text style={{ color: "#64748B" }}>{item.job?.department || "Laxmi Construction"}</Text><Badge>{item.status}</Badge><Text style={{ color: "#718096", fontSize: 12 }}>Applied {formatDate(item.createdAt)}</Text>{item.adminNote ? <Text style={{ color: COLORS.navy }}>Recruitment note: {item.adminNote}</Text> : null}</DataCard>) : <Empty>You have not submitted any job applications yet.</Empty>}</PortalScreen>;
}

