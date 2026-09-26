import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { PortalScreen, DataCard, SectionTitle, COLORS } from "../components/PortalUI";
import { useRequireAuth } from "../hooks/useRequireAuth";
const links = [
  ["Profile", "Update your name, contact and address", "/profile", "◉"],
  ["Service requests", "Create, track and cancel service requests", "/service-requests", "⌂"],
  ["Labour requests", "Track your worker bookings", "/labour-requests", "⚒"],
  ["My projects", "See projects assigned to your account", "/my-projects", "▤"],
  ["Job applications", "See application status and updates", "/my-applications", "✓"],
  ["Notifications", "Read account and project updates", "/notifications", "♧"],
  ["Settings", "Password and notification preferences", "/settings", "⚙"],
];
export default function DashboardScreen() {
  const { session } = useRequireAuth();
  return <PortalScreen title="My account" eyebrow={session?.user?.name || "CUSTOMER DASHBOARD"}><DataCard><Text style={{ fontSize: 22, fontWeight: "900", color: COLORS.navy }}>Welcome back</Text><Text style={{ color: "#66778A", lineHeight: 21 }}>Manage your construction requests, projects and account in one place.</Text></DataCard><SectionTitle>Account tools</SectionTitle>{links.map(([title, copy, path, icon]) => <Pressable key={path} onPress={() => router.push(path)}><DataCard style={{ flexDirection: "row", alignItems: "center" }}><Text style={{ color: COLORS.orange, fontSize: 24, width: 42 }}>{icon}</Text><View style={{ flex: 1 }}><Text style={{ color: COLORS.navy, fontSize: 15, fontWeight: "800" }}>{title}</Text><Text style={{ color: "#718096", fontSize: 12, marginTop: 4 }}>{copy}</Text></View><Text style={{ color: COLORS.orange, fontSize: 24 }}>›</Text></DataCard></Pressable>)}</PortalScreen>;
}
