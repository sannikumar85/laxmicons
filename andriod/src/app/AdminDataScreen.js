import { Alert, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { api } from "../config/api";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { Badge, Button, DataCard, Empty, FormField, Loading, Notice, PortalScreen, SectionTitle, formatDate } from "../components/PortalUI";
import { COLORS } from "../components/AuthUI";

const NAV = [
  ["Service requests", "/admin/service-requests"], ["Labour directory", "/admin/labour"], ["Labour requests", "/admin/labour-requests"],
  ["Jobs", "/admin/jobs"], ["Job applications", "/admin/applications"], ["Projects", "/admin/projects"],
  ["Users", "/admin/users"], ["Contact messages", "/admin/contact"], ["Settings", "/admin/settings"]
];
const MODULES = {
  serviceRequests: { title: "Service requests", loader: () => api.adminServiceRequests().then(x => x.data.requests), status: ["pending", "approved", "in-progress", "completed", "rejected"], update: (x, status) => api.updateAdminServiceStatus(x._id, { status, adminNote: x.adminNote || "" }) },
  labourRequests: { title: "Labour requests", loader: () => api.adminLabourRequests().then(x => x.data.requests), status: ["pending", "approved", "assigned", "in-progress", "completed", "rejected"], update: (x, status) => api.updateAdminLabourStatus(x._id, { status, adminNote: x.adminNote || "" }) },
  labour: { title: "Skilled labour directory", loader: () => api.getLabour().then(x => x.data.labour) },
  jobs: { title: "Jobs", loader: () => api.adminJobs().then(x => x.data.jobs) },
  applications: { title: "Job applications", loader: () => api.adminApplications().then(x => x.data.applications), status: ["applied", "under-review", "shortlisted", "selected", "rejected"], update: (x, status) => api.updateApplicationStatus(x._id, status) },
  projects: { title: "Projects", loader: () => api.adminProjects().then(x => x.data.projects) },
  users: { title: "Users", loader: () => api.adminUsers().then(x => x.data.users) },
  contact: { title: "Contact messages", loader: () => api.adminMessages().then(x => x.data.messages) }
};

export default function AdminDataScreen({ moduleKey }) {
  const auth = useRequireAuth(true);
  const spec = MODULES[moduleKey];
  const [items, setItems] = useState([]); const [busy, setBusy] = useState(true); const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); const [editingId, setEditingId] = useState(null); const [form, setForm] = useState({ title: "", department: "", location: "", description: "", category: "Construction", client: "", name: "", skill: "", experience: "", dailyRate: "", availability: "available", phone: "", status: "planning" });
  const [saving, setSaving] = useState(false); const [success, setSuccess] = useState("");
  const load = useCallback(() => { spec.loader().then(setItems).catch(e => setError(e.message)).finally(() => setBusy(false)); }, [spec]);
  useEffect(() => { if (auth.ready && auth.session?.user?.role === "admin") load(); }, [auth.ready, auth.session, load]);
  const act = async (operation, message) => { try { setError(""); await operation(); setSuccess(message); await load(); } catch (e) { setError(e.message); } };
  const nextStatus = (item) => spec.status[(spec.status.indexOf(item.status) + 1 + spec.status.length) % spec.status.length];
  const submit = async () => {
    if (moduleKey === "labour" ? (!form.name.trim() || !form.skill.trim()) : !form.title.trim()) return setError(moduleKey === "labour" ? "Enter the worker name and skill." : "Enter a title.");
    setSaving(true); setError("");
    try {
      const payload = moduleKey === "labour" ? { ...form, experience: Number(form.experience) || 0, dailyRate: Number(form.dailyRate) || 0 } : form;
      if (editingId) {
        if (moduleKey === "jobs") await api.updateJob(editingId, payload);
        else if (moduleKey === "labour") await api.updateLabourProfile(editingId, payload);
        else await api.updateProject(editingId, payload);
      } else if (moduleKey === "jobs") await api.createJob({ ...payload, status: "open", responsibilities: [], requirements: [] });
      else if (moduleKey === "labour") await api.createLabourProfile(payload);
      else await api.createProject(payload);
      setForm({ title: "", department: "", location: "", description: "", category: "Construction", client: "", name: "", skill: "", experience: "", dailyRate: "", availability: "available", phone: "", status: "planning" }); setShowForm(false); setSuccess(editingId ? "Changes saved." : `${spec.title.slice(0, -1)} created.`); setEditingId(null); await load();
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  };
  const editItem = (item) => { setEditingId(item._id); setForm({ title: item.title || "", department: item.department || "", location: item.location || "", description: item.description || "", category: item.category || "Construction", client: item.client || "", name: item.name || "", skill: item.skill || "", experience: String(item.experience || ""), dailyRate: String(item.dailyRate || ""), availability: item.availability || "available", phone: item.phone || "", status: item.status || "planning", progress: String(item.progress || 0) }); setShowForm(true); };
  const confirmDelete = (item, operation) => Alert.alert("Delete item?", "This action cannot be undone.", [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => act(() => operation(item), "Deleted successfully.") }]);
  const renderItem = (item) => {
    const id = item._id;
    const title = item.service || item.labourName || item.title || item.customPosition || item.applicantName || item.name || item.subject || "Request";
    const secondary = item.user?.name || item.email || item.client || item.location || item.skill || "";
    const details = item.description || item.message || item.coverLetter || item.requirements || "";
    return <DataCard key={id}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}><Text style={{ flex: 1, color: COLORS.navy, fontSize: 16, fontWeight: "900" }}>{title}</Text>{item.status ? <Badge>{item.status}</Badge> : null}</View>
      {!!secondary && <Text style={{ color: "#617287" }}>{secondary}{item.phone ? ` · ${item.phone}` : ""}</Text>}
      {!!item.location && <Text style={{ color: "#617287" }}>Location: {item.location}</Text>}
      {!!item.createdAt && <Text style={{ color: "#91A0B2", fontSize: 12 }}>{formatDate(item.createdAt)}</Text>}
      {!!details && <Text numberOfLines={4} style={{ color: "#516477", lineHeight: 20 }}>{details}</Text>}
      {item.resume ? <Pressable onPress={() => Alert.alert("Resume", `Resume file: ${item.resume}`)}><Text style={{ color: COLORS.orange, fontWeight: "700" }}>Resume attached</Text></Pressable> : null}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 5 }}>
        {spec.status && <Button title={`Set ${nextStatus(item)}`} variant="outline" onPress={() => act(() => spec.update(item, nextStatus(item)), "Status updated.")} />}
        {moduleKey === "users" && <Button title={item.status === "blocked" ? "Unblock user" : "Block user"} variant="outline" onPress={() => act(() => api.updateUserStatus(id, item.status === "blocked" ? "active" : "blocked"), "User status updated.")} />}
        {moduleKey === "contact" && item.status !== "read" && <Button title="Mark read" variant="outline" onPress={() => act(() => api.markMessageRead(id), "Message marked read.")} />}
        {(moduleKey === "jobs" || moduleKey === "projects" || moduleKey === "labour") && <Button title="Edit" variant="outline" onPress={() => editItem(item)} />}
        {moduleKey === "jobs" && <Button title={item.status === "open" ? "Close job" : "Reopen job"} variant="outline" onPress={() => act(() => api.updateJob(id, { status: item.status === "open" ? "closed" : "open" }), "Job updated.")} />}
        {moduleKey === "projects" && <Button title="Update progress" variant="outline" onPress={() => { const value = Math.min(100, Number(item.progress || 0) + 10); act(() => api.updateProject(id, { progress: value }), `Project progress set to ${value}%.`); }} />}
        {moduleKey === "labour" && <Button title="Remove worker" variant="danger" onPress={() => confirmDelete(item, x => api.deleteLabourProfile(x._id))} />}
        {moduleKey === "jobs" && <Button title="Delete" variant="danger" onPress={() => confirmDelete(item, x => api.deleteJob(x._id))} />}
        {moduleKey === "projects" && <Button title="Delete" variant="danger" onPress={() => confirmDelete(item, x => api.deleteProject(x._id))} />}
        {moduleKey === "users" && <Button title="Delete user" variant="danger" onPress={() => confirmDelete(item, x => api.deleteUser(x._id))} />}
        {moduleKey === "applications" && <Button title="Delete" variant="danger" onPress={() => confirmDelete(item, x => api.deleteApplication(x._id))} />}
        {moduleKey === "contact" && <Button title="Delete" variant="danger" onPress={() => confirmDelete(item, x => api.deleteMessage(x._id))} />}
      </View>
    </DataCard>;
  };
  return <PortalScreen title={spec.title} eyebrow="ADMIN PANEL">
    <ScrollNav />
    {moduleKey === "jobs" || moduleKey === "projects" || moduleKey === "labour" ? <Button title={showForm ? "Close form" : moduleKey === "jobs" ? "+ Add job" : moduleKey === "labour" ? "+ Add worker" : "+ Add project"} variant="outline" onPress={() => { setShowForm(!showForm); setEditingId(null); }} /> : null}
    {showForm && <DataCard>
      <SectionTitle>{editingId ? "Edit listing" : moduleKey === "jobs" ? "Create a job listing" : moduleKey === "labour" ? "Add skilled worker" : "Create a project"}</SectionTitle>
      {moduleKey === "labour" ? <FormField label="Worker name" value={form.name} onChangeText={name => setForm({ ...form, name })} /> : <FormField label="Title" value={form.title} onChangeText={title => setForm({ ...form, title })} />}
      {moduleKey === "labour" ? <><FormField label="Skill / trade" value={form.skill} onChangeText={skill => setForm({ ...form, skill })} /><FormField label="Location" value={form.location} onChangeText={location => setForm({ ...form, location })} /><FormField label="Phone" value={form.phone} onChangeText={phone => setForm({ ...form, phone })} keyboardType="phone-pad" /><FormField label="Experience (years)" value={form.experience} onChangeText={experience => setForm({ ...form, experience })} keyboardType="number-pad" /><FormField label="Daily rate" value={form.dailyRate} onChangeText={dailyRate => setForm({ ...form, dailyRate })} keyboardType="decimal-pad" /><FormField label="Availability" value={form.availability} onChangeText={availability => setForm({ ...form, availability })} /><FormField label="Description" value={form.description} multiline onChangeText={description => setForm({ ...form, description })} /></> : moduleKey === "jobs" ? <><FormField label="Department" value={form.department} onChangeText={department => setForm({ ...form, department })} /><FormField label="Location" value={form.location} onChangeText={location => setForm({ ...form, location })} /><FormField label="Description" value={form.description} multiline onChangeText={description => setForm({ ...form, description })} /></> : <><FormField label="Category" value={form.category} onChangeText={category => setForm({ ...form, category })} /><FormField label="Client" value={form.client} onChangeText={client => setForm({ ...form, client })} /><FormField label="Location" value={form.location} onChangeText={location => setForm({ ...form, location })} /><FormField label="Description" value={form.description} multiline onChangeText={description => setForm({ ...form, description })} /></>}
      <Button title={saving ? "Saving…" : editingId ? "Save changes" : "Create"} disabled={saving} onPress={submit} />
    </DataCard>}
    <Notice message={error} /><Notice type="success" message={success} />
    {busy ? <Loading /> : items.length ? items.map(renderItem) : <Empty>No {spec.title.toLowerCase()} found.</Empty>}
  </PortalScreen>;
}

function ScrollNav() { return <View><Text style={{ color: "#718096", fontSize: 12, marginBottom: 8 }}>ADMIN TOOLS · tap to open</Text><View style={{ flexDirection: "row", flexWrap: "wrap", gap: 7 }}>{NAV.map(([title, path]) => <Pressable key={path} onPress={() => router.replace(path)} style={{ backgroundColor: "#FFF", borderRadius: 12, paddingVertical: 9, paddingHorizontal: 11, borderWidth: 1, borderColor: "#E5EAF0" }}><Text style={{ color: COLORS.navy, fontWeight: "700", fontSize: 12 }}>{title}</Text></Pressable>)}</View></View>; }









