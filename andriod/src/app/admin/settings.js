import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { Button, DataCard, FormField, Loading, Notice, PortalScreen, SectionTitle } from "../../components/PortalUI";
export default function AdminSettings() {
  const auth = useRequireAuth(true); const [data, setData] = useState(null); const [password, setPassword] = useState({ currentPassword: "", newPassword: "", confirm: "" }); const [error, setError] = useState(""); const [message, setMessage] = useState("");
  useEffect(() => { if (auth.ready && auth.session?.user?.role === "admin") api.adminSettings().then(x => setData(x.data.settings)).catch(e => setError(e.message)); }, [auth.ready, auth.session]);
  const changePassword = async () => { if (!password.currentPassword || password.newPassword.length < 6 || password.newPassword !== password.confirm) return setError("Enter your current password and matching new passwords (at least 6 characters)."); try { await api.changePassword({ currentPassword: password.currentPassword, newPassword: password.newPassword }); setPassword({ currentPassword: "", newPassword: "", confirm: "" }); setMessage("Password changed."); setError(""); } catch (e) { setError(e.message); } };
  if (!data) return <PortalScreen title="Admin settings"><Loading /><Notice message={error} /></PortalScreen>;
  return <PortalScreen title="Admin settings" eyebrow="ADMIN PANEL"><SectionTitle>Application information</SectionTitle><DataCard><FormField label="Company" value={data.companyName || ""} editable={false} /><FormField label="Admin email" value={data.email || "Not configured"} editable={false} /><FormField label="Environment" value={data.environment || ""} editable={false} /></DataCard><SectionTitle>Change password</SectionTitle><DataCard><FormField label="Current password" secureTextEntry value={password.currentPassword} onChangeText={currentPassword => setPassword({ ...password, currentPassword })} /><FormField label="New password" secureTextEntry value={password.newPassword} onChangeText={newPassword => setPassword({ ...password, newPassword })} /><FormField label="Confirm new password" secureTextEntry value={password.confirm} onChangeText={confirm => setPassword({ ...password, confirm })} /><Button title="Change password" onPress={changePassword} /></DataCard><Notice message={error} /><Notice type="success" message={message} /></PortalScreen>;
}




