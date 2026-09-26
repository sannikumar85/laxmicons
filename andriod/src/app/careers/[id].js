import { useEffect, useState } from "react";
import { Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { PortalScreen, FormField, Button, DataCard, Loading, Notice, Badge, COLORS } from "../../components/PortalUI";
const resumeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams(); const { session } = useAuth();
  const [job, setJob] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [resume, setResume] = useState(null); const [busy, setBusy] = useState(false); const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ applicantName: session?.user?.name || "", email: session?.user?.email || "", phone: session?.user?.phone || "", coverLetter: "" });
  useEffect(() => { api.getJob(id).then((r) => setJob(r.data?.job)).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, [id]);
  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const pickResume = async () => { const r = await DocumentPicker.getDocumentAsync({ type: resumeTypes, copyToCacheDirectory: true }); if (r.canceled) return; const file = r.assets?.[0]; if (!file) return; if (file.size > 5 * 1024 * 1024) return setError("Resume must be no larger than 5 MB."); setResume(file); setError(""); };
  const apply = async () => {
    setError(""); if (!session) return router.push({ pathname: "/login", params: { next: `/careers/${id}` } });
    if (!form.applicantName.trim() || !form.email.trim() || !form.phone.trim() || !resume) return setError("Name, email, phone and resume are required.");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Enter a valid email address.");
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) return setError("Enter a valid 10-digit Indian phone number.");
    const data = new FormData(); data.append("applicantName", form.applicantName.trim()); data.append("email", form.email.trim().toLowerCase()); data.append("phone", form.phone.replace(/\s/g, "")); data.append("coverLetter", form.coverLetter.trim()); data.append("resume", { uri: resume.uri, name: resume.name, type: resume.mimeType || "application/pdf" });
    setBusy(true); try { await api.applyForJob(id, data); setSuccess("Application submitted successfully."); setResume(null); } catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  if (loading) return <PortalScreen title="Career details"><Loading /></PortalScreen>;
  if (!job) return <PortalScreen title="Career details"><Notice message={error || "This job could not be found."} /></PortalScreen>;
  return <PortalScreen title="Career details"><DataCard><Badge>{job.status}</Badge><Text style={{ color: COLORS.navy, fontSize: 24, fontWeight: "900" }}>{job.title}</Text><Text style={{ color: COLORS.orange, fontWeight: "800" }}>{job.department || "Laxmi Construction"}</Text><Text style={{ color: "#627286" }}>{job.location} · {job.type} · {job.experience}</Text><Text style={{ color: COLORS.navy, fontWeight: "800" }}>Salary: {job.salary || "Not disclosed"}</Text><Text style={{ color: "#475569", lineHeight: 22 }}>{job.description || "Role details will be shared by the recruitment team."}</Text>{job.responsibilities?.length ? <><Text style={{ color: COLORS.navy, fontWeight: "900" }}>Responsibilities</Text>{job.responsibilities.map((x, i) => <Text key={i} style={{ color: "#475569" }}>• {x}</Text>)}</> : null}{job.requirements?.length ? <><Text style={{ color: COLORS.navy, fontWeight: "900" }}>Requirements</Text>{job.requirements.map((x, i) => <Text key={i} style={{ color: "#475569" }}>• {x}</Text>)}</> : null}</DataCard><Notice type="success" message={success} /><Notice message={error} /><DataCard><Text style={{ color: COLORS.navy, fontSize: 19, fontWeight: "900" }}>Apply for this role</Text><FormField label="Full name" value={form.applicantName} onChangeText={(v) => set("applicantName", v)} autoCapitalize="words" /><FormField label="Email" value={form.email} onChangeText={(v) => set("email", v)} keyboardType="email-address" autoCapitalize="none" /><FormField label="Phone" value={form.phone} onChangeText={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))} keyboardType="phone-pad" /><FormField label="Cover letter" value={form.coverLetter} onChangeText={(v) => set("coverLetter", v)} multiline /><Button variant="outline" title={resume?.name || "Choose PDF or Word resume"} onPress={pickResume} /><Text style={{ color: "#718096", fontSize: 12 }}>Maximum file size: 5 MB.</Text><Button title={busy ? "Submitting…" : "Submit application"} onPress={apply} disabled={busy || job.status !== "open"} /></DataCard></PortalScreen>;
}
