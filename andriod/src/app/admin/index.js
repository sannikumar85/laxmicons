import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { api } from "../../config/api";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { Button, DataCard, Loading, Notice, PortalScreen, SectionTitle } from "../../components/PortalUI";
import { COLORS } from "../../components/AuthUI";
const LINKS = [["Service requests", "/admin/service-requests"], ["Labour directory", "/admin/labour"], ["Labour requests", "/admin/labour-requests"], ["Jobs", "/admin/jobs"], ["Job applications", "/admin/applications"], ["Projects", "/admin/projects"], ["Users", "/admin/users"], ["Contact messages", "/admin/contact"], ["Settings", "/admin/settings"]];
export default function AdminHome() {
  const auth = useRequireAuth(true); const [data, setData] = useState(null); const [error, setError] = useState("");
  useEffect(() => { if (auth.ready && auth.session?.user?.role === "admin") api.adminDashboard().then(x => setData(x.data)).catch(e => setError(e.message)); }, [auth.ready, auth.session]);
  return <PortalScreen title="Admin dashboard" eyebrow="ADMIN PANEL"><Text style={{ color: "#65778A", lineHeight: 21 }}>Manage the same customer requests, projects, careers and accounts as the website.</Text><Notice message={error} />{!data ? <Loading /> : <><SectionTitle>Platform overview</SectionTitle><DataCard>{Object.entries(data.stats || {}).map(([name, value]) => <Text key={name} style={{ color: COLORS.navy, paddingVertical: 5, fontWeight: "700" }}>{name.replace(/[A-Z]/g, c => ` ${c.toLowerCase()}`)} · {value}</Text>)}</DataCard><SectionTitle>Management</SectionTitle>{LINKS.map(([title, path]) => <Button key={path} title={`${title}  ?`} variant="outline" onPress={() => router.push(path)} />)}</>}</PortalScreen>;
}


