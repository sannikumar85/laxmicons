import { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { api } from "../config/api";
import { AuthShell, Brand, Caption, ErrorNote, Field, PrimaryButton, COLORS } from "../components/AuthUI";

export default function RegisterScreen() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const update = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const submit = async () => {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.password) return setError("Enter your name, email address and password.");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Enter a valid email address.");
    if (form.password.length < 6) return setError("Your password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("The passwords do not match.");
    setBusy(true);
    try { const response = await api.register({ name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim(), password: form.password }); router.replace({ pathname: "/verify", params: { email: form.email.trim().toLowerCase(), devCode: response.data?.verificationCode || "" } }); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  return <AuthShell image={require("../images/construction-service.jpg")}><Brand /><Text style={heading}>Create your account</Text><Caption>Request services and follow your projects in one place.</Caption><View style={{ height: 22 }} /><ErrorNote>{error}</ErrorNote><Field label="Full name" placeholder="Your full name" value={form.name} onChangeText={(v) => update("name", v)} autoCapitalize="words" returnKeyType="next" /><Field label="Email address" placeholder="you@example.com" value={form.email} onChangeText={(v) => update("email", v)} keyboardType="email-address" autoCapitalize="none" autoComplete="email" returnKeyType="next" /><Field label="Mobile number (optional)" placeholder="+91 98765 43210" value={form.phone} onChangeText={(v) => update("phone", v)} keyboardType="phone-pad" /><Field label="Password" placeholder="At least 6 characters" value={form.password} onChangeText={(v) => update("password", v)} secureTextEntry autoCapitalize="none" /><Field label="Confirm password" placeholder="Enter password again" value={form.confirm} onChangeText={(v) => update("confirm", v)} secureTextEntry autoCapitalize="none" /><PrimaryButton title="Create account" onPress={submit} loading={busy} /><View style={{ height: 20 }} /><Caption>Already registered? <Text onPress={() => router.replace("/login")} style={link}>Sign in</Text></Caption></AuthShell>;
}
const heading = { color: COLORS.navy, fontSize: 26, fontWeight: "900", textAlign: "center", marginBottom: 6 };
const link = { color: COLORS.orange, fontWeight: "800" };
