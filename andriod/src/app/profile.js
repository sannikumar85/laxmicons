import { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { api, assetUrl } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { PortalScreen, FormField, Button, DataCard, Notice, Loading } from "../components/PortalUI";
import { COLORS } from "../components/AuthUI";
const imageTypes = ["image/jpeg", "image/png", "image/webp"];
export default function ProfileScreen() {
  const { session, updateUser } = useAuth(); useRequireAuth();
  const [form, setForm] = useState({ name: session?.user?.name || "", phone: session?.user?.phone || "", address: session?.user?.address || "", city: session?.user?.city || "", state: session?.user?.state || "", pincode: session?.user?.pincode || "", bio: session?.user?.bio || "" });
  const [avatar, setAvatar] = useState(session?.user?.avatar || ""); const [photo, setPhoto] = useState(null); const [loading, setLoading] = useState(true); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [message, setMessage] = useState("");
  useEffect(() => {
    let active = true;
    api.getProfile().then((r) => {
      const user = r.data?.user;
      if (active && user) {
        setForm({ name: user.name || "", phone: user.phone || "", address: user.address || "", city: user.city || "", state: user.state || "", pincode: user.pincode || "", bio: user.bio || "" });
        setAvatar(user.avatar || ""); updateUser(user);
      }
    }).catch((e) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [updateUser]);
  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const pickPhoto = async () => { const r = await DocumentPicker.getDocumentAsync({ type: imageTypes, copyToCacheDirectory: true }); if (r.canceled) return; setPhoto(r.assets?.[0] || null); };
  const save = async () => { setError(""); setMessage(""); if (!form.name.trim()) return setError("Your name is required."); if (form.phone && !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) return setError("Enter a valid 10-digit Indian phone number."); setBusy(true); try { let r; if (photo) { const body = new FormData(); Object.entries(form).forEach(([key, value]) => body.append(key, value)); body.append("avatar", { uri: photo.uri, name: photo.name, type: photo.mimeType || "image/jpeg" }); r = await api.updateProfileWithImage(body); } else r = await api.updateProfile(form); const user = r.data?.user; if (user) { updateUser(user); setAvatar(user.avatar || avatar); } setPhoto(null); setMessage("Profile saved successfully."); } catch (e) { setError(e.message); } finally { setBusy(false); } };
  if (loading) return <PortalScreen title="My profile"><Loading /></PortalScreen>;
  return <PortalScreen title="My profile"><Notice message={error} /><Notice type="success" message={message} /><DataCard>{avatar ? <Image source={{ uri: assetUrl(avatar) }} style={{ width: 76, height: 76, borderRadius: 38, alignSelf: "center" }} /> : <Text style={{ alignSelf: "center", fontSize: 34, color: COLORS.orange }}>?</Text>}<Text style={{ color: COLORS.navy, fontWeight: "900", textAlign: "center", fontSize: 17 }}>{session?.user?.email}</Text><Button variant="outline" title={photo?.name || "Choose profile photo"} onPress={pickPhoto} /></DataCard><FormField label="Full name" value={form.name} onChangeText={(v) => set("name", v)} autoCapitalize="words" /><FormField label="Phone number" value={form.phone} onChangeText={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))} keyboardType="phone-pad" /><FormField label="Street address" value={form.address} onChangeText={(v) => set("address", v)} /><FormField label="City" value={form.city} onChangeText={(v) => set("city", v)} /><FormField label="State" value={form.state} onChangeText={(v) => set("state", v)} /><FormField label="PIN code" value={form.pincode} onChangeText={(v) => set("pincode", v.replace(/\D/g, "").slice(0, 6))} keyboardType="number-pad" /><FormField label="About you" value={form.bio} onChangeText={(v) => set("bio", v)} multiline /><Button title={busy ? "Saving�" : "Save profile"} onPress={save} disabled={busy} /></PortalScreen>;
}


