import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { api } from "../config/api";
import { PortalScreen, Loading, Empty, DataCard, Button, Notice, formatDate, COLORS } from "../components/PortalUI";
import { useRequireAuth } from "../hooks/useRequireAuth";
function target(link) { if (!link) return ""; if (link.includes("service-requests")) return "/service-requests"; if (link.includes("labour-requests")) return "/labour-requests"; if (link.includes("job-applications")) return "/my-applications"; if (link.includes("projects")) return "/my-projects"; if (link.includes("profile")) return "/profile"; return ""; }
export default function NotificationsScreen() {
  useRequireAuth(); const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(() => { api.getNotifications().then((r) => setItems(r.data?.notifications || [])).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { load(); }, [load]);
  const markRead = async (id) => { try { await api.markNotificationRead(id); setItems((old) => old.map((x) => x._id === id ? { ...x, read: true } : x)); } catch (e) { setError(e.message); } };
  const markAll = async () => { try { await api.markAllNotificationsRead(); setItems((old) => old.map((x) => ({ ...x, read: true }))); } catch (e) { setError(e.message); } };
  const remove = async (id) => { try { await api.deleteNotification(id); setItems((old) => old.filter((x) => x._id !== id)); } catch (e) { setError(e.message); } };
  const unread = items.filter((x) => !x.read).length;
  return <PortalScreen title="Notifications"><Notice message={error} />{unread ? <Button variant="outline" title={`Mark all ${unread} unread as read`} onPress={markAll} /> : null}{loading ? <Loading /> : items.length ? items.map((item) => { const path = target(item.link); return <DataCard key={item._id} style={{ borderColor: item.read ? "#EBEFF3" : "#FFD7B5" }}><View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}><Text style={{ color: COLORS.navy, fontSize: 15, fontWeight: "900", flex: 1 }}>{item.title}</Text>{!item.read ? <Text style={{ color: COLORS.orange, fontSize: 11, fontWeight: "900" }}>NEW</Text> : null}</View><Text style={{ color: "#5F7084", lineHeight: 20 }}>{item.message}</Text><Text style={{ color: "#8491A0", fontSize: 11 }}>{formatDate(item.createdAt)}</Text><View style={{ flexDirection: "row", gap: 8 }}>{path ? <Button variant="outline" title="Open" onPress={async () => { if (!item.read) await markRead(item._id); router.push(path); }} style={{ flex: 1 }} /> : null}{!item.read ? <Button variant="outline" title="Mark read" onPress={() => markRead(item._id)} style={{ flex: 1 }} /> : null}<Pressable onPress={() => remove(item._id)}><Text style={{ color: "#B83227", padding: 12, fontWeight: "800" }}>Delete</Text></Pressable></View></DataCard>; }) : <Empty>You’re all caught up. No notifications.</Empty>}</PortalScreen>;
}

