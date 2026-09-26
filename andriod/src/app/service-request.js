import { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "../config/api";
import { PortalScreen, FormField, Button, Notice, DataCard, COLORS } from "../components/PortalUI";
import { useRequireAuth } from "../hooks/useRequireAuth";
const OPTIONS = ["Residential Construction", "Commercial Construction", "Construction Consultancy", "Renovation & Remodeling", "Labour Supply", "Project Management", "Other Construction Services"];
export default function ServiceRequestScreen() {
  const { session } = useRequireAuth(); const params = useLocalSearchParams();
  const [form, setForm] = useState({ service: String(params.service || ""), customerName: session?.user?.name || "", phone: session?.user?.phone || "", location: "", preferredDate: "", description: "" });
  const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState("");
  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const submit = async () => {
    setError(""); setSuccess("");
    if (!form.service || !form.customerName.trim() || !form.phone.trim() || !form.location.trim() || !form.preferredDate.trim()) return setError("Complete the service, name, phone, location and preferred date fields.");
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) return setError("Enter a valid 10-digit Indian phone number.");
    setBusy(true); try { await api.createServiceRequest({ ...form, customerName: form.customerName.trim(), phone: form.phone.replace(/\s/g, ""), location: form.location.trim(), preferredDate: form.preferredDate, description: form.description.trim() || "No additional requirements supplied." }); setSuccess("Your request has been sent. You can follow its status in My Requests."); setForm((old) => ({ ...old, location: "", preferredDate: "", description: "" })); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  return <PortalScreen title="Request a service"><DataCard><Text style={{ color: COLORS.navy, fontSize: 19, fontWeight: "900" }}>Tell us what you need</Text><Text style={{ color: "#718096", lineHeight: 20 }}>Our team will review your request and contact you.</Text></DataCard><Notice message={error} /><Notice type="success" message={success} />{success ? <Button title="View my requests" onPress={() => router.push("/service-requests")} /> : null}<Text style={{ color: COLORS.ink, fontWeight: "800", marginTop: 4 }}>Choose a service</Text><View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>{OPTIONS.map((name) => <Button key={name} variant={form.service === name ? "primary" : "outline"} title={name} onPress={() => set("service", name)} style={{ minHeight: 38, paddingVertical: 8, paddingHorizontal: 11 }} />)}</View><FormField label="Full name" value={form.customerName} onChangeText={(v) => set("customerName", v)} autoCapitalize="words" /><FormField label="Phone number" value={form.phone} onChangeText={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))} keyboardType="phone-pad" /><FormField label="Project location" value={form.location} onChangeText={(v) => set("location", v)} placeholder="City / Area" /><FormField label="Preferred date (YYYY-MM-DD)" value={form.preferredDate} onChangeText={(v) => set("preferredDate", v)} placeholder="2026-10-15" /><FormField label="Requirements" value={form.description} onChangeText={(v) => set("description", v)} multiline placeholder="Describe your project and requirements" /><Button title={busy ? "Submitting…" : "Submit request"} onPress={submit} disabled={busy} /></PortalScreen>;
}
